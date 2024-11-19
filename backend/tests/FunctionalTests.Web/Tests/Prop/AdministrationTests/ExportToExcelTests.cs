using System.Reflection;
using RealGimm.Core.Prop.AdministrationAggregate;
using RealGimm.Web.Prop.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.AdministrationTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class ExportToExcelTests : BaseGenericExportToExcelTests<Administration>
{
  public ExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }

  protected override MethodInfo Method => typeof(AdministrationQueries).GetMethod(nameof(AdministrationQueries.ExportToExcel))!;
}
