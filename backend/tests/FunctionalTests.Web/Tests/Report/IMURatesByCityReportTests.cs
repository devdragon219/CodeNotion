using RealGimm.Core.Reports;
using RealGimm.Core.Reports.Generators;

namespace RealGimm.FunctionalTests.Web.Tests.Report.ReportTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class IMURatesByCityReportTests(SeededDbWebFactory factory) : BaseReportTests(factory)
{
  public override Guid ReportId => IMURatesByCityReportGenerator.StaticId;
  public override ReportGeneratorFilter[] Filters { get; } =
  [
    new ReportGeneratorFilter(IMURatesByCityReportGenerator.FilterManagementSubjectId, null, "4", null),
    new ReportGeneratorFilter(IMURatesByCityReportGenerator.FilterYear, DateTime.Now.AddYears(-2).Year, null, null)
  ];
}
