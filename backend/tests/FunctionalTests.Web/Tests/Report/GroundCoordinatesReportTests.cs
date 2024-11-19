using RealGimm.Core.Reports;
using RealGimm.Core.Reports.Generators;

namespace RealGimm.FunctionalTests.Web.Tests.Report.ReportTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GroundCoordinatesReportTests(SeededDbWebFactory factory) : BaseReportTests(factory)
{
  public override Guid ReportId => GroundCoordinatesReportGenerator.StaticId;
  public override ReportGeneratorFilter[] Filters { get; } =
  [
    new ReportGeneratorFilter(GroundCoordinatesReportGenerator.FilterManagementSubjectId, null, "4", null)
  ];
}
