using System.Reflection;
using RealGimm.Core.Fclt.PenaltyAggregate;
using RealGimm.Web.Fclt.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.PenaltyTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ExportToExcelTests : BaseGenericExportToExcelTests<Penalty>
{
  protected override MethodInfo Method => typeof(PenaltyQueries).GetMethod(nameof(PenaltyQueries.ExportToExcel))!;

  public ExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
