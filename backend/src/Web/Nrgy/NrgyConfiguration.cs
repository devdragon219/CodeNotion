using HotChocolate.Execution.Configuration;
using RealGimm.Web.Nrgy.Extensions;

namespace RealGimm.Web.Nrgy;

public class NrgyConfiguration
{
  public static void AddGqlConfig(IRequestExecutorBuilder services)
  {
    services
      .AddTypeExtension<NrgyQueries>()
      .AddTypeExtension<NrgyMutations>()
      .AddTypeExtension<UtilityServiceExtensions>();
  }
}
