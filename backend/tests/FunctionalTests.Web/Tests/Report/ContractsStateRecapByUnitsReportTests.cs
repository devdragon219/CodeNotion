using RealGimm.Core.Reports;
using RealGimm.Core.Reports.Generators;

namespace RealGimm.FunctionalTests.Web.Tests.Report.ReportTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class ContractsStateRecapByUnitsReportTests(SeededDbWebFactory factory) : BaseReportTests(factory)
{
  public override Guid ReportId => ContractsStateRecapByUnitsReportGenerator.StaticId;
  public override ReportGeneratorFilter[] Filters { get; } =
  [
    new ReportGeneratorFilter(ContractsStateRecapByUnitsReportGenerator.FilterNames.ManagementSubjectId, null, "4", null)
  ];
}
