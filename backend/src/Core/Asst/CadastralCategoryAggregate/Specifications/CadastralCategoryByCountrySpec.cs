using Ardalis.Specification;

namespace RealGimm.Core.Asst.CadastralCategoryAggregate.Specifications;

public class CadastralCategoryByCountrySpec : Specification<CadastralCategory>
{
  public CadastralCategoryByCountrySpec(string countryISO)
  {
    Query.Where(category => category.CountryISO == countryISO);
  }
}
