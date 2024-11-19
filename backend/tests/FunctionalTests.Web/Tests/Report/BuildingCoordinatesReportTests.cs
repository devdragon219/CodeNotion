using RealGimm.Core.Reports;
using RealGimm.Core.Reports.Generators;

namespace RealGimm.FunctionalTests.Web.Tests.Report.ReportTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class BuildingCoordinatesReportTests(SeededDbWebFactory factory) : BaseReportTests(factory)
{
  public override Guid ReportId => BuildingCoordinatesReportGenerator.StaticId;
  public override ReportGeneratorFilter[] Filters { get; } =
  [
    new ReportGeneratorFilter(BuildingCoordinatesReportGenerator.FilterManagementSubjectId, null, "4", null)
  ];
}
