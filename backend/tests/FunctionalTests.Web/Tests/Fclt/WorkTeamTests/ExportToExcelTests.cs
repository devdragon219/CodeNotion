using System.Reflection;
using RealGimm.Core.Fclt.WorkTeamAggregate;
using RealGimm.Web.Fclt.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.WorkTeamTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ExportToExcelTests : BaseGenericExportToExcelTests<WorkTeam>
{
  protected override MethodInfo Method => typeof(WorkTeamQueries).GetMethod(nameof(WorkTeamQueries.ExportToExcel))!;

  public ExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
