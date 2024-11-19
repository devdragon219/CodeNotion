using System.Reflection;
using RealGimm.Core.Fclt.CraftAggregate;
using RealGimm.Web.Fclt.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.CraftTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ExportToExcelTests : BaseGenericExportToExcelTests<Craft>
{
  protected override MethodInfo Method => typeof(CraftQueries).GetMethod(nameof(CraftQueries.ExportToExcel))!;

  public ExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
