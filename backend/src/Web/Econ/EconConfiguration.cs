using HotChocolate.Execution.Configuration;

namespace RealGimm.Web.Econ;

public class EconConfiguration
{
  public static void AddGqlConfig(IRequestExecutorBuilder services)
  {
    services
      .AddTypeExtension<EconQueries>()
      .AddTypeExtension<EconMutations>();
  }
}
