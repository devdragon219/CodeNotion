using System.Reflection;
using RealGimm.Core.Nrgy.UtilityTypeAggregate;
using RealGimm.Web.Nrgy.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Nrgy.UtilityTypeTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ExportToExcelTests : BaseGenericExportToExcelTests<UtilityType>
{
  protected override MethodInfo Method => typeof(UtilityTypeQueries).GetMethod(nameof(UtilityTypeQueries.ExportToExcel))!;

  public ExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
