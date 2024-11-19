using System.Reflection;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Web.Asst.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.EstateTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class ExportToExcelTests : BaseGenericExportToExcelTests<Estate>
{
  public ExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }

  protected override MethodInfo Method => typeof(EstateQueries).GetMethod(nameof(EstateQueries.ExportToExcel))!;
}
