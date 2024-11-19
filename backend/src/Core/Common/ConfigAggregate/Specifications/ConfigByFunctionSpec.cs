using Ardalis.Specification;

namespace RealGimm.Core.Common.ConfigAggregate.Specifications;

public class ConfigByFunctionSpec : Specification<Config>
{
  public ConfigByFunctionSpec(ConfigFunction function)
  {
    Query.Where(config => config.Function == function);
  }
}
