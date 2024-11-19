using System.Reflection;
using RealGimm.Core.Taxes.ItaILIA;
using RealGimm.Core.Taxes.Tables;
using RealGimm.Web.Common.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Common.TaxConfigTests.ItaILIATests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class GlobalExportToExcelTests : BaseGenericExportToExcelTests<TaxConfigGenericRow>
{
  protected override MethodInfo Method => typeof(TaxConfigQueries).GetMethod(nameof(TaxConfigQueries.ExportToExcelMainTable))!;
  protected override Dictionary<string, string> AdditionalArguments => new()
  {
    ["calculatorId"] = $@"""{ItaILIA.CalculatorGuid}""",
    ["tableCode"] = $@"""{ItaILIAConfiguration.TBL_GLOBAL}"""
  };
  protected override string FilterInputName => $"{nameof(ITaxConfigMainTableRow)}FilterInput";
  protected override string ClassName => "taxConfiguration";

  public GlobalExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
