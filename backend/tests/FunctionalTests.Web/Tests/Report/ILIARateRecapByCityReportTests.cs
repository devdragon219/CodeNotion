using RealGimm.Core.Reports;
using RealGimm.Core.Reports.Generators;

namespace RealGimm.FunctionalTests.Web.Tests.Report.ReportTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class ILIARateRecapByCityReportTests(SeededDbWebFactory factory) : BaseReportTests(factory)
{
  public override Guid ReportId => ILIARateRecapByCityReportGenerator.StaticId;
  public override ReportGeneratorFilter[] Filters { get; } =
  [
    new ReportGeneratorFilter(ILIARateRecapByCityReportGenerator.FilterManagementSubjectId, null, "9", null),
  ];
}
