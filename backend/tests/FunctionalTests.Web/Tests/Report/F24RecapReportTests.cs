using RealGimm.Core.Reports;
using RealGimm.Core.Reports.Generators;

namespace RealGimm.FunctionalTests.Web.Tests.Report.ReportTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class F24RecapReportTests(SeededDbWebFactory factory) : BaseReportTests(factory)
{
  public override Guid ReportId => F24RecapReportGenerator.StaticId;
  public override ReportGeneratorFilter[] Filters { get; } =
  [
    new ReportGeneratorFilter(F24RecapReportGenerator.FilterYear, DateTime.Now.AddYears(-1).Year, null, null),
    new ReportGeneratorFilter(F24RecapReportGenerator.FilterManagementSubjectId, null, "9", null)
  ];
}
