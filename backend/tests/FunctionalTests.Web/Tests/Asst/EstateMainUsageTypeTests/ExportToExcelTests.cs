using System.Reflection;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Web.Asst.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.EstateMainUsageTypeTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ExportToExcelTests : BaseGenericExportToExcelTests<EstateMainUsageType>
{
  protected override MethodInfo Method => typeof(EstateMainUsageTypeQueries).GetMethod(nameof(EstateMainUsageTypeQueries.ExportToExcel))!;

  public ExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
