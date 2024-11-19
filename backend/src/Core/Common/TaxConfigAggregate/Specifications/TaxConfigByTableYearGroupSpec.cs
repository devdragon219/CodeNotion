using Ardalis.Specification;

namespace RealGimm.Core.Common.TaxConfigAggregate.Specifications;

public class TaxConfigByTableYearGroupSpec : Specification<TaxConfig>
{
  public TaxConfigByTableYearGroupSpec(string table, int year, Guid? group)
  {
    Query
      .Where(config => config.Table == table)
      .Where(config => config.Year == year);
    
    if (group.HasValue)
    {
      Query.Where(config => config.GroupingReference == group);
    }
  }
}
