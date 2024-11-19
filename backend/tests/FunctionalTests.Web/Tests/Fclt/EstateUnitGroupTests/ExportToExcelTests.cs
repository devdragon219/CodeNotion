using System.Reflection;
using RealGimm.Core.Fclt.EstateUnitGroupAggregate;
using RealGimm.Web.Fclt.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.EstateUnitGroupTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ExportToExcelTests : BaseGenericExportToExcelTests<EstateUnitGroup>
{
  protected override MethodInfo Method => typeof(EstateUnitGroupQueries).GetMethod(nameof(EstateUnitGroupQueries.ExportToExcel))!;
  protected override IDictionary<string, object>? Where => new Dictionary<string, object>
  {
    ["id"] = new Dictionary<string, object>
    {
      ["lt"] = 5
    }
  };

  public ExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
