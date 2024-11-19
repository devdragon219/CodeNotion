using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.WebCommons.GraphQL.User.Extensions;

namespace RealGimm.WebCommons.GraphQL.User;

internal class UserConfiguration
{
  public static void AddGqlConfig(IRequestExecutorBuilder services)
  {
    services
      .AddTypeExtension<UserQueries>()
      .AddTypeExtension<UserMutations>()
      .AddTypeExtension<UserExtensions>()
      .UseField<JwtCookieInjector>();
  }
}
