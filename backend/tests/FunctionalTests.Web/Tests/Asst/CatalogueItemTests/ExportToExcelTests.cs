using System.Reflection;
using RealGimm.Core.Asst.CatalogueItemAggregate;
using RealGimm.Web.Asst.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.CatalogueItemTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class ExportToExcelTests : BaseGenericExportToExcelTests<CatalogueItem>
{
  public ExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }

  protected override MethodInfo Method => typeof(CatalogueItemQueries).GetMethod(nameof(CatalogueItemQueries.ExportToExcel))!;

  protected override IDictionary<string, object>? Where
    => new Dictionary<string, object>
    {
      ["catalogueType"] = new Dictionary<string, object>
      {
        ["id"] = new Dictionary<string, object>
        {
          ["eq"] = 16
        }
      }
    };
}
