using System.Reflection;
using RealGimm.Core.Common.RevaluationDataAggregate;
using RealGimm.Web.Common.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Common.RevaluationDataTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ExportToExcelTests : BaseGenericExportToExcelTests<RevaluationData>
{
  protected override MethodInfo Method => typeof(RevaluationDataQueries).GetMethod(nameof(RevaluationDataQueries.ExportToExcel))!;

  public ExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
