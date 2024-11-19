using RealGimm.Core.Common.NotificationAggregate;
using RealGimm.Core.Common.OfficialActAggregate;
using RealGimm.Infrastructure.Interceptors;

namespace RealGimm.Infrastructure.Common.Data;

public class CommonFilterInterceptor : AccessFilterInterceptor
{
  private static readonly Type[] _handledTypes =
    [
      typeof(Notification),
      typeof(OfficialAct)
    ];

  public CommonFilterInterceptor(
    IServiceProvider serviceProvider) : base(serviceProvider) { }

  protected override Type[] SupportedTypes => _handledTypes;
}
