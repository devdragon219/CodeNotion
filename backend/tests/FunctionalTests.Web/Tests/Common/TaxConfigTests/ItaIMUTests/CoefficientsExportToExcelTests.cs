using System.Reflection;
using RealGimm.Core.Taxes.ItaIMU;
using RealGimm.Core.Taxes.SubTables;
using RealGimm.Core.Taxes.Tables;
using RealGimm.Web.Common.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Common.TaxConfigTests.ItaIMUTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class CoefficientsExportToExcelTests : BaseGenericExportToExcelTests<TaxConfigGenericCoefficientSubTableRow>
{
  protected override MethodInfo Method => typeof(TaxConfigQueries).GetMethod(nameof(TaxConfigQueries.ExportToExcelMainTable))!;
  protected override Dictionary<string, string> AdditionalArguments => new()
  {
    ["calculatorId"] = @$"""{ItaIMU.CalculatorGuid}""",
    ["tableCode"] = @$"""{ItaIMUConfiguration.TBL_REVALUATION_COEFF_D}"""
  };
  protected override string FilterInputName => $"{nameof(ITaxConfigMainTableRow)}FilterInput";
  protected override string ClassName => "taxConfiguration";

  public CoefficientsExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
