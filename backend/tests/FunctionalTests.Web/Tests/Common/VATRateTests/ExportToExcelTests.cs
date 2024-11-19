using System.Reflection;
using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.Web.Common.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Common.VATRateTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ExportToExcelTests : BaseGenericExportToExcelTests<VATRate>
{
  protected override MethodInfo Method => typeof(VATRateQueries).GetMethod(nameof(VATRateQueries.ExportToExcel))!;

  public ExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
