using RealGimm.Core.Reports;
using RealGimm.Core.Reports.Generators;

namespace RealGimm.FunctionalTests.Web.Tests.Report.ReportTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class IMURateRecapByUnitsReportTests(SeededDbWebFactory factory) : BaseReportTests(factory)
{
  public override Guid ReportId => IMURateRecapByUnitsReportGenerator.StaticId;
  public override ReportGeneratorFilter[] Filters { get; } =
  [
    new ReportGeneratorFilter(IMURateRecapByUnitsReportGenerator.FilterManagementSubjectId, null, "9", null),
  ];
}
