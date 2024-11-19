using RealGimm.Core.IAM;
using RealGimm.Core.Reports.Interfaces;
using RealGimm.Web.Common.Models;

namespace RealGimm.Web.Common.Queries;

public class ReportGeneratorQueries
{
  [BackOfficePermission(Features.COMMON_REPORT_GENERATORS, Permission.Read)]
  public async IAsyncEnumerable<ReportGeneratorOutput> GetAvailableReportGenerators([Service] IServiceProvider serviceProvider)
  {
    var reportGenerators = serviceProvider.GetServices<IReportGenerator>();

    foreach (var generator in reportGenerators)
    {
      await generator.InitializeFiltersAsync();
      yield return new ReportGeneratorOutput(generator.Id, generator.Name, generator.SupportedFormats, generator.FilterFields);
    }
  }
}
