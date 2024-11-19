using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Core.Common.TaxConfigAggregate;
using RealGimm.Core.Taxes.Interfaces;

namespace RealGimm.Core.Taxes;

public class TaxCalculatorService
{
  static readonly Dictionary<Guid, Type> _calculatorTypes = [];
  static readonly object _calculatorTypesLock = new();
  private readonly IServiceProvider _serviceProvider;
  private readonly ILogger<TaxCalculatorService> _logger;
  private readonly IRepository<TaxConfig> _taxConfiguration;

  public TaxCalculatorService(IServiceProvider serviceProvider,
    ILogger<TaxCalculatorService> logger)
  {
    _logger = logger;
    _serviceProvider = serviceProvider.CreateScope().ServiceProvider;
    _taxConfiguration = _serviceProvider.GetRequiredService<IRepository<TaxConfig>>();
  }

  private void EnsureCacheReady()
  {
    if (!_calculatorTypes.Any())
    {
      var calculators = _serviceProvider.GetServices<ITaxCalculator>();

      lock (_calculatorTypesLock)
      {
        if (!_calculatorTypes.Any())
        {
          foreach (var svc in calculators)
          {
            _calculatorTypes.Add(svc.Identifier, svc.GetType());
          }
        }
      }
    }
  }

  public async Task<bool> DuplicateYearlyConfiguration(CancellationToken token)
  {
    EnsureCacheReady();

    var thisYear = DateTime.UtcNow.Year;

    //If the current (new) year is already present, skip the duplication altogether
    if (await _taxConfiguration.AsQueryable().AnyAsync(tc => tc.Year == thisYear))
    {
      _logger.LogInformation("Tax Configuration already present for year {year}", thisYear);
      return false;
    }

    _logger.LogInformation("Duplicating tax configuration for year {year}",
      thisYear);

    //Avoid duplicating configuration for non-existent tax calculators
    var taxCalculatorIds = _calculatorTypes.Keys;

    var lastYear = thisYear - 1;

    var currentConfig = (await _taxConfiguration
        .AsQueryable()
        .Where(tc => tc.Year == lastYear)
        .ToListAsync(cancellationToken: token)
      ).Where(tc => taxCalculatorIds.Contains(tc.TaxCalculator));

    await _taxConfiguration.AddRangeAsync(
      currentConfig.Select(tc =>
      {
        var newTc = new TaxConfig();
        newTc.SetReferenceData(tc.TaxCalculator, thisYear, tc.Table);
        newTc.SetGroupingData(tc.GroupingName, tc.GroupingReference);
        newTc.SubValues.AddRange(
          tc.SubValues.Select(sv =>
          {
            var newSv = new TaxConfigSubValue();
            newSv.SetReferenceData(sv.Code, sv.Label, sv.SubTable);
            newSv.SetValues(
              sv.ValueType,
              sv.BooleanValue,
              sv.StringValue,
              sv.NumberValue,
              sv.DateValue);
            return newSv;
          }));

        return newTc;
      }), token);

    foreach (var calculator in _serviceProvider.GetServices<ITaxCalculator>())
    {
      if (token.IsCancellationRequested)
      {
        return false;
      }

      await calculator.UpdateToNewYearAsync(token);
    }

    return true;
  }

  public async Task<ConfigSection[]> GetApplicableCalculators(CadastralUnit unit)
  {
    EnsureCacheReady();

    var calculators = _serviceProvider.GetServices<ITaxCalculator>();

    List<ConfigSection> applicableCalculatorsConfigurations = [];

    foreach (var calculator in calculators)
    {
      if (!await calculator.CheckApplicabilityAsync(unit))
      {
        continue;
      }

      applicableCalculatorsConfigurations.Add(await calculator.GetCadastralUnitFormAsync(unit));
    }

    return applicableCalculatorsConfigurations.ToArray();
  }

  public ITaxCalculator? GetTaxCalculator(Guid guid)
  {
    EnsureCacheReady();

    return _calculatorTypes.ContainsKey(guid)
      ? _serviceProvider.GetService(_calculatorTypes[guid]) as ITaxCalculator
      : null;
  }
}
