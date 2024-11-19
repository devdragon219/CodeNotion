using Ardalis.Specification;

namespace RealGimm.Core.Econ.TaxCreditAggregate.Specifications;

public class TaxCreditIncludeAllSpec : Specification<TaxCredit>
{
  public TaxCreditIncludeAllSpec()
  {
    Query.Include(taxCredit => taxCredit.Operations);
  }
}
