using System.Reflection;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Web.Prop.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.ContractTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ExportToExcelTests : BaseGenericExportToExcelTests<Contract>
{
  protected override MethodInfo Method => typeof(ContractQueries).GetMethod(nameof(ContractQueries.ExportToExcel))!;

  protected override string[] HeadersToExcludeTranslationKeys => new string[] { "ExpiringDays" };

  public ExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
