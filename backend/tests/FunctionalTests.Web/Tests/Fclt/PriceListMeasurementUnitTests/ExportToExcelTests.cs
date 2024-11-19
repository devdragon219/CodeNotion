using System.Reflection;
using RealGimm.Core.Fclt.PriceListMeasurementUnitAggregate;
using RealGimm.Web.Fclt.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.PriceListMeasurementUnitTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ExportToExcelTests : BaseGenericExportToExcelTests<PriceListMeasurementUnit>
{
  protected override MethodInfo Method => typeof(PriceListMeasurementUnitQueries).GetMethod(nameof(PriceListMeasurementUnitQueries.ExportToExcel))!;

  public ExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
