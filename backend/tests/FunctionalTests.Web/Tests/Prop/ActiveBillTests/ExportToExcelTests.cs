using System.Reflection;
using RealGimm.Core.Prop.BillAggregate;
using RealGimm.Core.Prop.Services;
using RealGimm.Web.Prop.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.ActiveBillTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class ExportToExcelTests : BaseExportToExcelTests<Bill, ActiveBillExportService>
{
  public ExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }

  protected override MethodInfo Method => typeof(BillQueries).GetMethod(nameof(BillQueries.ExportActiveToExcel))!;
}
