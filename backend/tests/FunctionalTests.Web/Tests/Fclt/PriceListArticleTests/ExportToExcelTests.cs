using System.Reflection;
using RealGimm.Core.Fclt.PriceListArticleAggregate;
using RealGimm.Web.Fclt.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.PriceListArticleTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ExportToExcelTests : BaseGenericExportToExcelTests<PriceListArticle>
{
  protected override MethodInfo Method => typeof(PriceListArticleQueries).GetMethod(nameof(PriceListArticleQueries.ExportToExcel))!;

  public ExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
