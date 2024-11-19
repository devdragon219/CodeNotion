using Ardalis.Specification;

namespace RealGimm.Core.Common.ConfigAggregate.Specifications;

public class ConfigByFunctionNameSpec : Specification<Config>, ISingleResultSpecification<Config>
{
  public ConfigByFunctionNameSpec(ConfigFunction function, string name)
  {
    Query.Where(config => config.Function == function && config.Name == name);
  }
}
