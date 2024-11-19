using HotChocolate.Execution.Configuration;
using RealGimm.Core.IAM.UserAggregate;
using RealGimm.Web.Admin.Extensions;

namespace RealGimm.Web.Admin;

public class AdminConfiguration
{
  public static void AddGqlConfig(IRequestExecutorBuilder services)
  {
    services
      .AddTypeExtension<AdminQueries>()
      .AddTypeExtension<AdminMutations>()
      .AddTypeExtension<GroupExtension>();
  }
}
