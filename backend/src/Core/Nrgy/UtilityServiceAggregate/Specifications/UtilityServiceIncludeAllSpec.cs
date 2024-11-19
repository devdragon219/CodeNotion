using Ardalis.Specification;

namespace RealGimm.Core.Nrgy.UtilityServiceAggregate.Specifications;

public class UtilityServiceIncludeAllSpec : Specification<UtilityService>
{
  public UtilityServiceIncludeAllSpec()
  {
    Query.Include(utilityService => utilityService.UtilityType);
  }
}
