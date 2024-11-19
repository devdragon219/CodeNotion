using System.Reflection;
using RealGimm.Core.Fclt.SLAAggregate;
using RealGimm.Web.Fclt.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.SLATests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ExportToExcelTests : BaseGenericExportToExcelTests<SLA>
{
  protected override string ClassName => "sla";
  protected override MethodInfo Method => typeof(SLAQueries).GetMethod(nameof(SLAQueries.ExportToExcel))!;

  public ExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
