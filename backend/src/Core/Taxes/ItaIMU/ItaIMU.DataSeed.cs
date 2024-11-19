using System.Globalization;
using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RealGimm.Core.Common.TaxConfigAggregate;
using RealGimm.Core.Common.TaxConfigAggregate.Specifications;

namespace RealGimm.Core.Taxes.ItaIMU;

public partial class ItaIMU
{
  public async Task FixDataSeedAsync()
  {
    using var stream = Assembly
      .GetExecutingAssembly()
      .GetManifestResourceStream("RealGimm.Core.Taxes.ItaIMU.coeff-d.csv")
      ?? throw new InvalidOperationException("Expected resource cannot be read.");

    using var reader = new StreamReader(stream);

    var staticList = new List<CoeffRevalD>();

    try
    {
      string? line;
      while ((line = await reader.ReadLineAsync()) is not null)
      {
        var pieces = line.Split(';');
        staticList.Add(new CoeffRevalD(
          Convert.ToInt32(pieces[0], CultureInfo.InvariantCulture),
          Convert.ToInt32(pieces[1], CultureInfo.InvariantCulture),
          Convert.ToDecimal(pieces[2], CultureInfo.InvariantCulture)
        ));
      }
    }
    catch (Exception ex)
    {
      _logger.LogError(ex, "Error while parsing CSV");
      return;
    }

    //Add any missing data to the current configuration
    var coeffConfigYears = await _taxConfigRepository
      .AsQueryable(
        new TaxConfigByCalculatorSpec(Identifier),
        new TaxConfigByTableYearSpec(ItaIMUConfiguration.TBL_REVALUATION_COEFF_D, null),
        new TaxConfigIncludeAllSpec()
        )
      .ToListAsync();

    foreach (var year in staticList.GroupBy(r => r.BaseYear))
    {
      var existing = coeffConfigYears.FirstOrDefault(tc => tc.Year == year.Key);

      if (existing is null)
      {
        //Add the entire year's worth of coefficients
        var newTc = new TaxConfig();
        newTc.SetReferenceData(
          Identifier,
          year.Key,
          ItaIMUConfiguration.TBL_REVALUATION_COEFF_D);

        newTc.SubValues.AddRange(
          year.Select(y =>
          {
            var newSv = new TaxConfigSubValue();
            newSv.SetReferenceData(
              y.CoeffYear.ToString(),
              y.CoeffYear.ToString(),
              TaxConfigurationBase.SUBTBL_COEFFICIENTS);
            newSv.SetValues(SubValueType.Number, null, null, y.Rate, null);
            return newSv;
          })
        );

        await _taxConfigRepository.AddAsync(newTc);
      }
      else
      {
        //Check if any coefficients are missing
        var existingYears = existing.SubValues.Select(sv => sv.Code).ToList();

        existing.SubValues.AddRange(
          year
            .Where(y => !existingYears.Contains(y.CoeffYear.ToString()))
            .Select(y =>
            {
              var newSv = new TaxConfigSubValue();
              newSv.SetReferenceData(
                y.CoeffYear.ToString(),
                y.CoeffYear.ToString(),
                TaxConfigurationBase.SUBTBL_COEFFICIENTS);
              newSv.SetValues(SubValueType.Number, null, null, y.Rate, null);
              return newSv;
            })
        );

        await _taxConfigRepository.UpdateAsync(existing);
      }
    }
  }

  private record CoeffRevalD(int BaseYear, int CoeffYear, decimal Rate);
}
