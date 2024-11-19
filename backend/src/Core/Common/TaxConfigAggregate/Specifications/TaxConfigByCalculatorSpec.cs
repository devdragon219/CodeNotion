using Ardalis.Specification;

namespace RealGimm.Core.Common.TaxConfigAggregate.Specifications;

public class TaxConfigByCalculatorSpec : Specification<TaxConfig>
{
  public TaxConfigByCalculatorSpec(Guid calculator)
  {
    Query.Where(config => config.TaxCalculator == calculator);
  }
}
