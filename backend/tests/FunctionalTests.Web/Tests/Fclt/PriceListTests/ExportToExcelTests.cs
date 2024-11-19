using System.Reflection;
using RealGimm.Core.Fclt.PriceListAggregate;
using RealGimm.Web.Fclt.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.PriceListTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ExportToExcelTests : BaseGenericExportToExcelTests<PriceList>
{
  protected override MethodInfo Method => typeof(PriceListQueries).GetMethod(nameof(PriceListQueries.ExportToExcel))!;

  public ExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
