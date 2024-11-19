using System.Reflection;
using RealGimm.Core.Fclt.ContractTypeAggregate;
using RealGimm.Web.Fclt.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.ContractTypeTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ExportToExcelTests : BaseGenericExportToExcelTests<ContractType>
{
  protected override MethodInfo Method => typeof(ContractTypeQueries).GetMethod(nameof(ContractTypeQueries.ExportToExcel))!;
  protected override string ClassName => "fcltContractType";
  protected override string FilterInputName => "FcltContractTypeFilterInput";

  public ExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
