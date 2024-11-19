using HotChocolate.Execution.Configuration;
using RealGimm.Core.Common.NotificationAggregate;

namespace RealGimm.WebFrontOffice.Common;

public class CommonConfiguration
{
  public static void AddGqlConfig(IRequestExecutorBuilder services)
  {
    services
      .AddType<PasswordExpirationNotification>()
      .AddTypeExtension<CommonSubscriptions>();
  }
}
