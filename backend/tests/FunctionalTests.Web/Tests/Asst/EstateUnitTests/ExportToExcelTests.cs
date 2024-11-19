using System.Reflection;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Web.Asst.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.EstateUnitTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class ExportToExcelTests : BaseGenericExportToExcelTests<EstateUnit>
{
  public ExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }

  protected override MethodInfo Method => typeof(EstateUnitQueries).GetMethod(nameof(EstateUnitQueries.ExportToExcel))!;
}
