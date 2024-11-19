using ClosedXML.Excel;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Common.AccountingItemAggregate;
using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.Core.Prop.BillItemTypeAggregate;
using RealGimm.Core.Shared.Services;
using RealGimm.Core.Shared.Specifications;

namespace RealGimm.Core.Prop.Services;

public sealed partial class BillItemTypeExportService : ExportService<BillItemType, BillItemTypeExportService.Data, BillItemTypeExportService>
{
  public required IReadRepository<AccountingItem> _accountingItemRepository { private get; init; }
  public required IReadRepository<VATRate> _vatRateRepository { private get; init; }

  protected override Dictionary<string, Func<Data, XLCellValue>> CreateExcelDataSelector()
    => new()
    {
      [nameof(Data.InternalCode)] = data => data.InternalCode,
      [nameof(Data.Description)] = data => data.Description,
      [nameof(Data.Applicability)] = data => data.Applicability,
      [nameof(Data.Sign)] = data => data.Sign,
      [nameof(Data.DefaultAccountingItem)] = data => data.DefaultAccountingItem,
      [nameof(Data.SubjectAC)] = data => data.SubjectAC,
      [nameof(Data.ExemptAC)] = data => data.ExemptAC,
      [nameof(Data.NonTaxableAC)] = data => data.NonTaxableAC,
      [nameof(Data.SubjectPC)] = data => data.SubjectPC,
      [nameof(Data.ExemptPC)] = data => data.ExemptPC,
      [nameof(Data.NonTaxablePC)] = data => data.NonTaxablePC
    };

  protected override async Task<IList<Data>> SelectItemsAsync(
    IEnumerable<BillItemType> billItemTypes,
    CancellationToken cancellationToken = default)
  {
    var accountingItems = await _accountingItemRepository
      .AsQueryable(
        new GetByIdsSpec<AccountingItem>(billItemTypes
          .Where(billItemType => billItemType.DefaultAccountingItemId.HasValue)
          .Select(billItemType => billItemType.DefaultAccountingItemId!.Value)
          .Distinct()))
      .Select(accountingItem => new { accountingItem.Id, accountingItem.InternalCode })
      .ToDictionaryAsync(accountingItem => accountingItem.Id, cancellationToken);

    var vatRates = await _vatRateRepository
      .AsQueryable(
        new GetByIdsSpec<VATRate>(billItemTypes
          .SelectMany(billItemType => new int[]
          {
            billItemType.ActiveSubjectVRId,
            billItemType.ActiveExemptVRId,
            billItemType.ActiveNonTaxableVRId,
            billItemType.PassiveSubjectVRId,
            billItemType.PassiveExemptVRId,
            billItemType.PassiveNonTaxableVRId
          })
          .Distinct()))
      .Select(vatRate => new { vatRate.Id, vatRate.Description })
      .ToDictionaryAsync(vatRate => vatRate.Id, cancellationToken);

    return billItemTypes
      .Select(billItemType =>
      {
        var applicability = string.Join(
            separator: ",",
            new List<string>()
            {
              billItemType.IsForContractFee ? Localizer[$"{nameof(Data.Applicability)}.ContractFee"] : string.Empty,
              billItemType.IsForContractCosts ? Localizer[$"{nameof(Data.Applicability)}.ContractCosts"] : string.Empty,
              billItemType.IsForAdministration ? Localizer[$"{nameof(Data.Applicability)}.Administration"] : string.Empty,
              billItemType.IsForTax ? Localizer[$"{nameof(Data.Applicability)}.Tax"] : string.Empty
            }.Where(item => !string.IsNullOrEmpty(item)));

        var defaultAccountingItem = billItemType.DefaultAccountingItemId is null
          ? null
          : accountingItems[billItemType.DefaultAccountingItemId!.Value].InternalCode;

        return new Data
        {
          InternalCode = billItemType.InternalCode,
          Description = billItemType.Description,
          Applicability = applicability,
          Sign = billItemType.IsPositive ? "+" : "-",
          DefaultAccountingItem = defaultAccountingItem,
          SubjectAC = vatRates[billItemType.ActiveSubjectVRId].Description,
          ExemptAC = vatRates[billItemType.ActiveExemptVRId].Description,
          NonTaxableAC = vatRates[billItemType.ActiveNonTaxableVRId].Description,
          SubjectPC = vatRates[billItemType.PassiveSubjectVRId].Description,
          ExemptPC = vatRates[billItemType.PassiveExemptVRId].Description,
          NonTaxablePC = vatRates[billItemType.PassiveNonTaxableVRId].Description
        };
      })
      .ToArray();
  }
}
