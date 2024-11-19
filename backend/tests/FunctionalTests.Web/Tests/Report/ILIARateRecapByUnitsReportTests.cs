using RealGimm.Core.Reports;
using RealGimm.Core.Reports.Generators;

namespace RealGimm.FunctionalTests.Web.Tests.Report.ReportTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class ILIARateRecapByUnitsReportTests(SeededDbWebFactory factory) : BaseReportTests(factory)
{
  public override Guid ReportId => ILIARateRecapByUnitsReportGenerator.StaticId;
  public override ReportGeneratorFilter[] Filters { get; } =
  [
    new ReportGeneratorFilter(ILIARateRecapByUnitsReportGenerator.FilterManagementSubjectId, null, "9", null),
  ];
}
