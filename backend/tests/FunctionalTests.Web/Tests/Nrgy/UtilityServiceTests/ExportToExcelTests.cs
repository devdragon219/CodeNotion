using System.Reflection;
using RealGimm.Core.Nrgy.UtilityServiceAggregate;
using RealGimm.Web.Nrgy.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Nrgy.UtilityServiceTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ExportToExcelTests : BaseGenericExportToExcelTests<UtilityService>
{
  protected override MethodInfo Method => typeof(UtilityServiceQueries).GetMethod(nameof(UtilityServiceQueries.ExportToExcel))!;

  public ExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
