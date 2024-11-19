using Ardalis.Specification;

namespace RealGimm.Core.Asst.CadastralUnitAggregate.Specifications;

public class CadastralUnitByAssetTaxCalculatorConfigSpec : Specification<CadastralUnit>
{
  public CadastralUnitByAssetTaxCalculatorConfigSpec(Guid calculatorId)
  {
    Query
      .Where(cadastralUnit => cadastralUnit.TaxConfig
        .Any(tc => tc.TaxCalculator == calculatorId));
  }
}
