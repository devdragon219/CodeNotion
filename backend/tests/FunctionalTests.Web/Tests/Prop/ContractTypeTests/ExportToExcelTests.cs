using System.Reflection;
using RealGimm.Core.Prop.ContractTypeAggregate;
using RealGimm.Web.Prop.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.ContractTypeTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ExportToExcelTests : BaseGenericExportToExcelTests<ContractType>
{
  protected override MethodInfo Method => typeof(ContractTypeQueries).GetMethod(nameof(ContractTypeQueries.ExportToExcel))!;

  // excluding month columns because they are depend from current culture
  protected override string[] HeadersToExcludeTranslationKeys => new[]
  {
    nameof(ContractType.RevaluationIndexMonth),
    nameof(ContractType.RevaluationCalculationMonth)
  };

  public ExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
