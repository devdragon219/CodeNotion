using System.Reflection;
using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Web.Asst.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.CadastralUnitTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class ExportToExcelTests : BaseGenericExportToExcelTests<CadastralUnit>
{
  public ExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }

  protected override MethodInfo Method => typeof(CadastralUnitQueries).GetMethod(nameof(CadastralUnitQueries.ExportToExcel))!;
}
