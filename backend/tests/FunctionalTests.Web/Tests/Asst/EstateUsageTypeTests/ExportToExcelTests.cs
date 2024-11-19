using System.Reflection;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Web.Asst.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.EstateUsageTypeTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ExportToExcelTests : BaseGenericExportToExcelTests<EstateUsageType>
{
  protected override MethodInfo Method => typeof(EstateUsageTypeQueries).GetMethod(nameof(EstateUsageTypeQueries.ExportToExcel))!;

  public ExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
