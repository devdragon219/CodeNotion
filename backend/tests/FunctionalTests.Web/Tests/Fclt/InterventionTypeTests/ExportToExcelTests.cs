using System.Reflection;
using RealGimm.Core.Fclt.InterventionTypeAggregate;
using RealGimm.Web.Fclt.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.InterventionTypeTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ExportToExcelTests : BaseGenericExportToExcelTests<InterventionType>
{
  protected override MethodInfo Method => typeof(InterventionTypeQueries).GetMethod(nameof(InterventionTypeQueries.ExportToExcel))!;

  public ExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
