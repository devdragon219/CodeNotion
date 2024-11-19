using System.Globalization;
using ClosedXML.Excel;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Nrgy.CostChargeAggregate;
using RealGimm.Core.Shared.Services;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel;

namespace RealGimm.Core.Nrgy.CostChargeAggregate.Services;

public sealed partial class CostChargeExportService : ExportService<CostCharge, CostChargeExportService.Data, CostChargeExportService>
{
  public required IReadRepository<Estate> _estateRepository { private get; init; }
  public required IReadRepository<EstateUnit> _estateUnitRepository { private get; init; }

  protected override async Task<IList<Data>> SelectItemsAsync(
    IEnumerable<CostCharge> entities,
    CancellationToken cancellationToken = default)
  {
    var estatesInternalCodes = await _estateRepository
      .AsQueryable(new GetByIdsSpec<Estate>(entities.SelectMany(costCharge => costCharge.Service.EstateIds).Distinct()))
      .Select(estate => new { estate.Id, estate.InternalCode })
      .ToDictionaryAsync(estate => estate.Id, estate => estate.InternalCode, cancellationToken);
    
    var estateUnitsInternalCodes = await _estateUnitRepository
      .AsQueryable(new GetByIdsSpec<EstateUnit>(entities.SelectMany(costCharge => costCharge.Service.EstateUnitIds).Distinct()))
      .Select(estateUnit => new { estateUnit.Id, estateUnit.InternalCode })
      .ToDictionaryAsync(estateUnit => estateUnit.Id, estateUnit => estateUnit.InternalCode, cancellationToken);

    return entities
      .Select(costCharge =>
      {
        var currentEstatesIntenalCodes = costCharge.Service.EstateIds
          .Select(estateId => estatesInternalCodes[estateId])
          .ToArray();

        var currentEstateUnitsIntenalCodes = costCharge.Service.EstateUnitIds
          .Select(estateUnitId => estateUnitsInternalCodes[estateUnitId])
          .ToArray();

        return new Data(costCharge, currentEstatesIntenalCodes, currentEstateUnitsIntenalCodes);
      })
      .ToList();
  }

  protected override void FormatWorksheet(IXLWorksheet worksheet)
  {
    foreach (var property in new[] { Localizer[nameof(CostCharge.TotalAmount)], Localizer[nameof(CostCharge.TotalVATAmount)] })
    {
      var columnToFormat = worksheet.RangeUsed()!.AsTable().FindColumn(e => e.FirstCell().Value.ToString() == property.Value);
      columnToFormat.Style.NumberFormat.Format = Constants.EXPORT_NUMBERFORMAT_CURRENCY;
    }
    
    base.FormatWorksheet(worksheet);
  }

  protected override Dictionary<string, Func<Data, XLCellValue>> CreateExcelDataSelector()
  => new()
  {
    ["Estates"] = data => string.Join(",", data.EstatesInternalCodes),
    ["EstateUnits"] = data => string.Join(",", data.EstateUnitsInternalCodes),
    ["UtilityTypeCode"] = data => $"{data.CostCharge.Service.UtilityType.InternalCode} - {data.CostCharge.Service.UtilityType.Description}",
    [nameof(CostCharge.ReferenceDate)] = data => data.CostCharge.ReferenceDate.ToString(),
    [nameof(CostCharge.PeriodStart)] = data => data.CostCharge.PeriodStart.ToString(),
    [nameof(CostCharge.PeriodEnd)] = data => data.CostCharge.PeriodEnd.ToString(),
    [nameof(CostCharge.TotalAmount)] = data => data.CostCharge.TotalAmount,
    [nameof(CostCharge.DueDate)] = data => data.CostCharge.DueDate.ToString(),
    [nameof(CostCharge.InvoiceNumber)] = data => data.CostCharge.InvoiceNumber,
    [nameof(CostCharge.TotalVATAmount)] = data => data.CostCharge.TotalVATAmount,
    [nameof(CostCharge.InvoicedConsumptionAmount)] = data => $"{data.CostCharge.InvoicedConsumptionAmount.ToString("F2", CultureInfo.InvariantCulture)} {data.CostCharge.Service.UtilityType.MeasurementUnit}",
  };
}
