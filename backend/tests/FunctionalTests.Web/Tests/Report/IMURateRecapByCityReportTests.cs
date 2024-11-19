using RealGimm.Core.Reports;
using RealGimm.Core.Reports.Generators;

namespace RealGimm.FunctionalTests.Web.Tests.Report.ReportTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class IMURateRecapByCityReportTests(SeededDbWebFactory factory) : BaseReportTests(factory)
{
  public override Guid ReportId => IMURateRecapByCityReportGenerator.StaticId;
  public override ReportGeneratorFilter[] Filters { get; } =
  [
    new ReportGeneratorFilter(IMURateRecapByCityReportGenerator.FilterManagementSubjectId, null, "9", null),
  ];
}
