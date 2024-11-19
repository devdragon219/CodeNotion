using System.Reflection;
using RealGimm.Core.Asst.CadastralLandCategoryAggregate;
using RealGimm.Web.Asst.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.CadastralLandCategoryTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ExportToExcelTests : BaseGenericExportToExcelTests<CadastralLandCategory>
{
  protected override MethodInfo Method => typeof(CadastralLandCategoryQueries).GetMethod(nameof(CadastralLandCategoryQueries.ExportToExcel))!;

  public ExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
