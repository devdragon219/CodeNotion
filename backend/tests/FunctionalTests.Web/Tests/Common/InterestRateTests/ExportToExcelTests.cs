using System.Reflection;
using RealGimm.Core.Common.InterestRateAggregate;
using RealGimm.Web.Common.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Common.InterestRateTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ExportToExcelTests : BaseGenericExportToExcelTests<InterestRate>
{
  protected override MethodInfo Method => typeof(InterestRateQueries).GetMethod(nameof(InterestRateQueries.ExportToExcel))!;

  public ExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
