using System.Reflection;
using RealGimm.Core.Asst.FunctionAreaAggregate;
using RealGimm.Web.Asst.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.FunctionAreaTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ExportToExcelTests : BaseGenericExportToExcelTests<FunctionArea>
{
  protected override MethodInfo Method => typeof(FunctionAreaQueries).GetMethod(nameof(FunctionAreaQueries.ExportToExcel))!;

  public ExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
