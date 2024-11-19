using Ardalis.Specification;

namespace RealGimm.Core.Common.TaxConfigAggregate.Specifications;

public class TaxConfigIncludeAllSpec : Specification<TaxConfig>
{
  public TaxConfigIncludeAllSpec()
  {
    Query.Include(config => config.SubValues);
  }
}
