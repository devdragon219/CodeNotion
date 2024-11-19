using System.Reflection;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Web.Asst.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.CatalogueTypeTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class ExportToExcelTests : BaseGenericExportToExcelTests<CatalogueType>
{
  public ExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }

  protected override MethodInfo Method => typeof(CatalogueTypeQueries).GetMethod(nameof(CatalogueTypeQueries.ExportToExcel))!;
}
