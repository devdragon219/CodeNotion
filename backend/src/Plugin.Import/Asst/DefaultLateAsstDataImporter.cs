using RealGimm.SharedKernel.Interfaces;
using Dapper;
using System.Data.SqlClient;
using RealGimm.Core.Common.ConfigAggregate;
using RealGimm.Core.Common.Interfaces;
using Microsoft.Extensions.Logging;
using RealGimm.Core;
using RealGimm.Core.Common.ConfigAggregate.Specifications;
using RealGimm.SharedKernel;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Common.CityAggregate;
using RealGimm.Core.Common.CustomCodeAggregate;
using Microsoft.EntityFrameworkCore;
using RealGimm.Plugin.Import.Common;
using RealGimm.Core.Common.CustomCodeAggregate.Specification;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Asst.EstateSubUnitAggregate;
using RealGimm.Plugin.Import.Asst.Models;
using RealGimm.Core.Asst.FloorTemplateAggregate;
using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Core.Asst.AssetTaxCalculationAggregate;
using RealGimm.Core.Shared.Specifications;

namespace RealGimm.Plugin.Import.Asst;

public partial class DefaultLateAsstDataImporter : IUpstreamDataImporter, IConfigurableModule
{
  public int ExecutionOrder => 120;

  public ConfigFunction Function => ConfigFunction.DataImport;
  public string[] ConfigurationParameters
  {
    get
    {
      return [
        ConfigWellKnownNames.DATA_IMPORT_CONNECTION_STRING,
        ConfigWellKnownNames.DATA_IMPORT_DISABLE_VALIDATION
      ];
    }
  }

  private string? _connectionString;
  private bool _disableValidation;
  public required ILogger<DefaultLateAsstDataImporter> _logger { protected get; init; }
  public required IReadRepository<Config> _configRepository { protected get; init; }
  public required IReadRepository<CadastralUnit> _cadastralUnits { protected get; init; }
  public required IRepository<AssetTaxCalculation> _taxCalculations { protected get; init; }
  public required IRepository<CustomCode> _codeRepository { protected get; init; }
  public required IServiceProvider _serviceProvider { protected get; init; }

  private async Task EnsureInitializedAsync(CancellationToken cancellationToken)
  {
    if (!string.IsNullOrEmpty(_connectionString)) return;

    var connectionString = await _configRepository.FirstOrDefaultAsync(
      new ConfigByFunctionNameSpec(
        ConfigFunction.DataImport,
        ConfigWellKnownNames.DATA_IMPORT_CONNECTION_STRING),
      cancellationToken);

    if (connectionString is null || string.IsNullOrEmpty(connectionString.Value))
    {
      throw new ArgumentNullException("Upstream Connection String is missing");
    }

    var disableValidation = await _configRepository.FirstOrDefaultAsync(
      new ConfigByFunctionNameSpec(
        ConfigFunction.DataImport,
        ConfigWellKnownNames.DATA_IMPORT_DISABLE_VALIDATION
        ),
      cancellationToken);

    _disableValidation = disableValidation?.Value.IsHumanTrue() ?? false;

    _connectionString = connectionString.Value;
  }

  public async Task PerformUpstreamUpdate(CancellationToken cancellationToken)
  {
    await EnsureInitializedAsync(cancellationToken);

    _logger.LogInformation("Begin syncing LATE-ASST data from upstream");
    var dateStart = DateTime.UtcNow;

    await CadastralUnitTaxData(cancellationToken);

    _logger.LogInformation("Done syncing LATE-ASST data from upstream (took {elapsed})", DateTime.UtcNow - dateStart);
  }

  private async Task CadastralUnitTaxData(
    CancellationToken cancellationToken)
  {
    var taxData = await CadastralUnitTaxes(cancellationToken);

    _logger.LogInformation("Received {TaxCount} raw tax data entries from upstream for {CuCount} units",
      taxData.Sum(kvp => kvp.Value.Length),
      taxData.Count);

    var keys = taxData.Keys.ToArray();

    var cuTranscodings = (await _codeRepository.AsQueryable(
      new CustomCodeTranscoding<CadastralUnit>(
        DefaultAsstDataImporter.IMPORT_ASST_PROVIDER)
      )
      .GroupBy(etx => etx.ExternalCode ?? string.Empty)
      .Select(grp => new
      {
        grp.Key,
        First = grp.First().InternalCode
      })
      .Where(ct => keys.Contains(ct.Key))
      .ToListAsync(cancellationToken))
      .Select(obj => new
      {
        obj.Key,
        First = Convert.ToInt32(obj.First)
      })
      .ToDictionary(ctx => ctx.Key, ctx => ctx.First);

    var cadastralUnits = await _cadastralUnits
      .AsQueryable(new GetByIdsSpec<CadastralUnit>(
        cuTranscodings.Values
      ))
      .ToDictionaryAsync(
        cu => cu.Id,
        cancellationToken);

    taxData = taxData
      .Where(kvp => cuTranscodings.ContainsKey(kvp.Key))
      .ToDictionary(kvp => kvp.Key, kvp => kvp.Value);

    _logger.LogInformation("After data consolidation, tax entries for {Count} cadastral units remain", taxData.Count);

    var cuIdArray = cuTranscodings.Values.ToArray();

    var allTaxPayments = await _taxCalculations
        .AsQueryable()
        .Include(tax => tax.Installments)
        .Where(tax => cuIdArray.Contains(tax.CadastralUnit.Id))
        .GroupBy(t => t.CadastralUnit.Id)
        .ToDictionaryAsync(
          grp => grp.Key,
          cancellationToken);

    //Check for CU that were merged together
    var taxMismatches = allTaxPayments
      .Where(cuKvp => cuKvp.Value
        .GroupBy(tax => tax.TaxCalculatorId.ToString() + tax.Year)
        .Any(grp => grp.Select(t => t.TotalAmount).Distinct().Count(ta => ta > 0) > 1))
      .Select(cuKvp => cuKvp.Key)
      .ToArray();

    if(taxMismatches.Length > 0)
    {
      _logger.LogInformation("There are {Count} cadastral units that have multiple tax payments for the same year with different amounts",
        taxMismatches.Length);
    }

    int added = 0, updated = 0;

    var allToAdd = new List<AssetTaxCalculation>();
    var allToUpdate = new List<AssetTaxCalculation>();

    //Import all tax data for any CU that is in the transcoding list
    foreach (var cuTaxes in taxData)
    {
      var cuId = cuTranscodings[cuTaxes.Key];

      if (!cadastralUnits.ContainsKey(cuId))
      {
        //Just skip
        continue;
      }

      var cu = cadastralUnits[cuId];

      //If there are multiple tax payments for the same CU / year / taxcalculator
      // only keep one - they should all have the same value!!
      //Try taking the larger paid amount - at worst, zero, but keep the zero entry
      // if it is the only one.
      var taxPayments = allTaxPayments.TryGetValue(cuId, out var tpGroup)
        ? [.. tpGroup
            .GroupBy(t => t.TaxCalculatorId.ToString() + t.Year)
            .Select(grp => grp.OrderByDescending(g => g.TotalAmount).First())]
        : Array.Empty<AssetTaxCalculation>();

      foreach (var toAdd in cuTaxes.Value
        .Where(tax => !taxPayments
          .Any(p => p.TaxCalculatorId == tax.TaxCalculatorId && p.Year == tax.Year)))
      {
        var tax = new AssetTaxCalculation();

        tax.SetData(toAdd.TaxCalculatorName!,
          toAdd.TaxCalculatorId,
          toAdd.Year,
          toAdd.TotalAmount,
          0);

        tax.SetCadastralUnit(cu);

        //Also integrate installments if IMU or ILIA

        allToAdd.Add(tax);

        added++;
      }

      foreach (var toUpdate in cuTaxes.Value
        .Where(tax => taxPayments
          .Any(p => p.TaxCalculatorId == tax.TaxCalculatorId
            && p.Year == tax.Year
            && p.TotalAmount != tax.TotalAmount)))
      {
        var tax = taxPayments
          .First(p => p.TaxCalculatorId == toUpdate.TaxCalculatorId
            && p.Year == toUpdate.Year);

        //Also integrate installments if IMU or ILIA

        tax.SetData(toUpdate.TaxCalculatorName!,
          toUpdate.TaxCalculatorId,
          toUpdate.Year,
          toUpdate.TotalAmount,
          0);

        allToUpdate.Add(tax);

        updated++;
      }

    }

    _logger.LogInformation("Storing added/updated tax entries");

    if (allToAdd.Count > 0)
    {
      await _taxCalculations.AddRangeAsync(allToAdd, cancellationToken);
    }

    if (allToUpdate.Count > 0)
    {
      await _taxCalculations.UpdateRangeAsync(allToUpdate, cancellationToken);
    }

    _logger.LogInformation("LATE ASST tax data copied from upstream ({added} added, {updated} updated)",
      added, updated);
  }
}
