using System.Reflection;
using RealGimm.Core.Fclt.ServiceCategoryAggregate;
using RealGimm.Web.Fclt.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.ServiceCategoryTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ExportToExcelTests : BaseGenericExportToExcelTests<ServiceCategory>
{
  protected override MethodInfo Method => typeof(ServiceCategoryQueries).GetMethod(nameof(ServiceCategoryQueries.ExportToExcel))!;

  public ExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
