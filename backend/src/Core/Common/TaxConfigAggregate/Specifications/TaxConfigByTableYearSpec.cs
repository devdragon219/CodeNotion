using Ardalis.Specification;

namespace RealGimm.Core.Common.TaxConfigAggregate.Specifications;

public class TaxConfigByTableYearSpec : Specification<TaxConfig>
{
  public TaxConfigByTableYearSpec(string table, int? year)
  {
    Query.Where(config => config.Table == table);

    if (year.HasValue)
    {
      Query.Where(config => config.Year == year.Value);
    }
  }
}
