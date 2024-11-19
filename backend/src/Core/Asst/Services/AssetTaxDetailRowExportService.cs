using ClosedXML.Excel;
using RealGimm.Core.Asst.AssetTaxCalculationAggregate.Models;
using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Extensions;
using RealGimm.Core.Shared.Services;
using RealGimm.SharedKernel;

namespace RealGimm.Core.Asst.Services;

public sealed partial class AssetTaxDetailRowExportService : ExportService<AssetTaxDetailRow, AssetTaxDetailRowExportService.Data, AssetTaxDetailRowExportService>
{
  protected override async Task<IList<Data>> SelectItemsAsync(
    IEnumerable<AssetTaxDetailRow> entities,
    CancellationToken cancellationToken = default)
  {
    var results = new List<Data>();
    foreach (var estates in entities.Select(e => e.SubRows))
    {
      foreach (var estate in estates)
      {
        results.AddRange(estate.SubRows.Select(e => new Data(e)));
      }
    }

    return await Task.FromResult(results);
  }

  protected override Dictionary<string, Func<Data, XLCellValue>> CreateExcelDataSelector()
   => new()
   {
     [nameof(AssetTaxDetailEstateUnitItem.EstateUnitInternalCode)] = item => item.EstateUnitItem.EstateUnitInternalCode,
     ["EstateUnitAddress"] = item => FormatAddress(item.EstateUnitItem.Address),

     [nameof(AssetTaxDetailEstateUnitItem.CadastralCoordinates)]
       = item => string.Join(Environment.NewLine, item.EstateUnitItem.CadastralCoordinates.Select(c => $"{c.Level1} - {c.Level2} - {c.Level3} - {c.Level4} - {c.Level5}")),

     [$"{nameof(AssetTaxDetailEstateUnitItem.CadastralUnitIncome)}.{nameof(CadastralUnitIncome.MacroCategory)}"]
       = item => item.EstateUnitItem.CadastralUnitIncome is not null ? item.EstateUnitItem.CadastralUnitIncome!.MacroCategory : string.Empty,

     [$"{nameof(AssetTaxDetailEstateUnitItem.CadastralUnitIncome)}.{nameof(CadastralUnitIncome.MicroCategory)}"]
       = item => item.EstateUnitItem.CadastralUnitIncome is not null ? item.EstateUnitItem.CadastralUnitIncome!.MicroCategory : string.Empty,

     [$"{nameof(AssetTaxDetailEstateUnitItem.CadastralUnitIncome)}.{nameof(CadastralUnitIncome.MetricAmount)}"]
       = item => item.EstateUnitItem.CadastralUnitIncome is not null ? item.EstateUnitItem.CadastralUnitIncome!.MetricAmount : string.Empty,

     [nameof(AssetTaxDetailEstateUnitItem.ActualizedCadastralIncome)] = item => item.EstateUnitItem.ActualizedCadastralIncome,
     [nameof(AssetTaxDetailEstateUnitItem.GrossCadastralIncome)] = item => item.EstateUnitItem.GrossCadastralIncome,

     [$"{nameof(AssetTaxDetailEstateUnitItem.CadastralUnitIncome)}.{nameof(CadastralUnitIncome.Type)}"]
       = item => item.EstateUnitItem.CadastralUnitIncome is not null ? LocalizeEnumValue(item.EstateUnitItem.CadastralUnitIncome!.Type) : string.Empty,

     [nameof(AssetTaxDetailEstateUnitItem.EstateUnitOwnershipPercent)] = item => item.EstateUnitItem.EstateUnitOwnershipPercent,
     [nameof(AssetTaxDetailEstateUnitItem.BaseTaxableAmount)] = item => item.EstateUnitItem.BaseTaxableAmount,

     [$"{nameof(AssetTaxDetailEstateUnitItem.CadastralUnitTaxConfig)}.{nameof(CadastralUnitTaxConfig.Value)}"]
       = item => item.EstateUnitItem.CadastralUnitTaxConfig is not null ? item.EstateUnitItem.CadastralUnitTaxConfig!.Value : string.Empty,

     [nameof(AssetTaxDetailEstateUnitItem.AmountPaid)] = item => item.EstateUnitItem.AmountPaid
   };

  protected override void FormatWorksheet(IXLWorksheet worksheet)
  {
    var columnsToFormat = new[]{
      Localizer[nameof(AssetTaxDetailEstateUnitItem.ActualizedCadastralIncome)].Value,
      Localizer[nameof(AssetTaxDetailEstateUnitItem.GrossCadastralIncome)].Value,
      Localizer[nameof(AssetTaxDetailEstateUnitItem.BaseTaxableAmount)].Value,
      Localizer[nameof(AssetTaxDetailEstateUnitItem.AmountPaid)].Value,
    };

    foreach (var columnToFormat in columnsToFormat)
    {
      worksheet.RangeUsed()!.AsTable().FindColumn(e => e.FirstCell().Value.ToString() == columnToFormat)
               .Style.NumberFormat.Format = Constants.EXPORT_NUMBERFORMAT_CURRENCY;
    }

    base.FormatWorksheet(worksheet);
  }

  private string FormatAddress(Address address)
    => $"{address.Toponymy}, {address.Numbering} - {address.LocalPostCode} - {SharedLocalizer.LocalizeCountry(address.CountryISO!).Value}";
}
