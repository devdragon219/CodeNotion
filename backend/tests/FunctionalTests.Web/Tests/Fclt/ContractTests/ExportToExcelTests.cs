using System.Reflection;
using RealGimm.Core.Fclt.ContractAggregate;
using RealGimm.Web.Fclt.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.ContractTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ExportToExcelTests : BaseGenericExportToExcelTests<Contract>
{
  protected override string FilterInputName => "FcltContractFilterInput";
  protected override string ClassName => "fcltContract";
  protected override MethodInfo Method => typeof(ContractQueries).GetMethod(nameof(ContractQueries.ExportToExcel))!;

  public ExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
