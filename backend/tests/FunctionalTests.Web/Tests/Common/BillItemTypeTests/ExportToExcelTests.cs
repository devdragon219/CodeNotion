using System.Reflection;
using RealGimm.Core.Prop.BillItemTypeAggregate;
using RealGimm.Web.Common.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Common.BillItemTypeTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ExportToExcelTests : BaseGenericExportToExcelTests<BillItemType>
{
  protected override MethodInfo Method => typeof(BillItemTypeQueries).GetMethod(nameof(BillItemTypeQueries.ExportToExcel))!;

  public ExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
