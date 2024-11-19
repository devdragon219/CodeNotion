using Ardalis.Specification;

namespace RealGimm.Core.Common.InterestRateAggregate.Specification;

public class InterestRateByCountrySpec : Specification<InterestRate>
{
  public InterestRateByCountrySpec(string countryIso3)
  {
    Query.Where(ir => ir.CountryISO3 == countryIso3);
  }
}
