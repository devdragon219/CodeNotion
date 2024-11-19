using ClosedXML.Excel;
using RealGimm.Core.Common.AccountingItemAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Common.Services;

public sealed class AccountingItemExportService : ExportService<AccountingItem, AccountingItemExportService>
{
  protected override Dictionary<string, Func<AccountingItem, XLCellValue>> CreateExcelDataSelector()
    => new()
    {
      [nameof(AccountingItem.InternalCode)] = ai
        => ai.InternalCode,

      [nameof(AccountingItem.Description)] = ai
        => ai.Description,

      [nameof(AccountingItem.ExternalCode)] = ai
        => ai.ExternalCode
    };
}
