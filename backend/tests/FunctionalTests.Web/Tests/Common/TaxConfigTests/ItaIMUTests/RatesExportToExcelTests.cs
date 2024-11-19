using System.Reflection;
using RealGimm.Core.Taxes.ItaIMU;
using RealGimm.Core.Taxes.SubTables;
using RealGimm.Core.Taxes.Tables;
using RealGimm.Web.Common.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Common.TaxConfigTests.ItaIMUTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class RatesExportToExcelTests : BaseGenericExportToExcelTests<TaxConfigGroupedRateSubTableRow>
{
  protected override MethodInfo Method => typeof(TaxConfigQueries).GetMethod(nameof(TaxConfigQueries.ExportToExcelMainTable))!;
  protected override Dictionary<string, string> AdditionalArguments => new()
  {
    ["calculatorId"] = $@"""{ItaIMU.CalculatorGuid}""",
    ["tableCode"] = $@"""{ItaIMUConfiguration.TBL_RATES_BY_CITY}"""
  };
  protected override string FilterInputName => $"{nameof(ITaxConfigMainTableRow)}FilterInput";
  protected override string ClassName => "taxConfiguration";

  public RatesExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
