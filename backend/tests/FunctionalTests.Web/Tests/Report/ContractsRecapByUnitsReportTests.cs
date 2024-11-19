using RealGimm.Core.Reports;
using RealGimm.Core.Reports.Generators;

namespace RealGimm.FunctionalTests.Web.Tests.Report.ReportTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class ContractsRecapByUnitsReportTests(SeededDbWebFactory factory) : BaseReportTests(factory)
{
  public override Guid ReportId => ContractsRecapByUnitsReportGenerator.StaticId;
  public override ReportGeneratorFilter[] Filters { get; } =
  [
    new ReportGeneratorFilter(ContractsRecapByUnitsReportGenerator.FilterNames.ManagementSubjectId, null, "4", null)
  ];
}
