using ClosedXML.Excel;
using RealGimm.Core.Common.InterestRateAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Common.Services;

public sealed class InterestRateExportService : ExportService<InterestRate, InterestRateExportService>
{

  protected override Dictionary<string, Func<InterestRate, XLCellValue>> CreateExcelDataSelector()
    => new()
    {
      [nameof(InterestRate.Since)] = InterestRate
        => InterestRate.Since?.ToString(),

      [nameof(InterestRate.Until)] = InterestRate
        => InterestRate.Until?.ToString(),

      [nameof(InterestRate.Rate)] = InterestRate
        => InterestRate.Rate
    };
}
