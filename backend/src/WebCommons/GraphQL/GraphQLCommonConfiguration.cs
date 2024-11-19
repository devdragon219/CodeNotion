using HotChocolate.Execution.Configuration;
using RealGimm.WebCommons.GraphQL.Anag;
using RealGimm.WebCommons.GraphQL.User;

namespace RealGimm.WebCommons.GraphQL;

public class GraphQLCommonConfiguration
{
  public static void AddGqlConfig(IRequestExecutorBuilder services)
  {
    UserConfiguration.AddGqlConfig(services);
    AnagConfiguration.AddGqlConfig(services);
  }
}
