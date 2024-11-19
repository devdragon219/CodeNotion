using Ardalis.Result;
using Microsoft.Extensions.Caching.Distributed;
using RealGimm.Core;
using RealGimm.Core.IAM;
using RealGimm.Core.Reports;
using RealGimm.Core.Reports.Interfaces;
using RealGimm.SharedKernel;
using RealGimm.WebCommons.Models;

namespace RealGimm.Web.Common.Mutations;

public class ReportGeneratorMutations
{
  [BackOfficePermission(Features.COMMON_REPORT_GENERATORS, Permission.Read)]
  public async Task<Result<IEnumerable<FileUrlOutput>>> GenerateReports(
    Guid reportGeneratorId,
    ReportFormat[] targetReportFormats,
    ReportGeneratorFilter[] filters,
    [Service] IServiceProvider serviceProvider,
    [Service] IDistributedCache distributedCache)
  {
    var reportGenerator = serviceProvider
      .GetServices<IReportGenerator>()
      .Single(generator => generator.Id == reportGeneratorId);

    await reportGenerator.InitializeFiltersAsync();

    if (targetReportFormats.Except(reportGenerator.SupportedFormats).Any())
    {
      return Result.Invalid(ErrorCode.ReportGeneratorDoesntSupportSpecifiedFormat.ToValidationError());
    }

    var results = new List<FileUrlOutput>();

    foreach (var reportFormat in targetReportFormats.Distinct())
    {
      var fileEntry = await reportGenerator.GenerateReportAsync(reportFormat, filters);
      var fileId = Guid.NewGuid();
      var cacheEntryOptions = new DistributedCacheEntryOptions().SetAbsoluteExpiration(Constants.DEFAULT_REPORT_DURATION);

      distributedCache.Set(fileId.ToString(), fileEntry.ToByteArray(), cacheEntryOptions);
      results.Add(new FileUrlOutput($"{QueriesBase.API_FILE_BASE}{fileId}"));
    }

    return results;
  }
}
