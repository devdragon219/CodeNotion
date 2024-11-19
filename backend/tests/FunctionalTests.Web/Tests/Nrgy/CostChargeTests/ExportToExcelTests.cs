using System.Reflection;
using RealGimm.Core.Nrgy.CostChargeAggregate;
using RealGimm.Web.Nrgy.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Nrgy.CostChargeTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ExportToExcelTests : BaseGenericExportToExcelTests<CostCharge>
{
  protected override MethodInfo Method => typeof(CostChargeQueries).GetMethod(nameof(CostChargeQueries.ExportToExcel))!;

  public ExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
