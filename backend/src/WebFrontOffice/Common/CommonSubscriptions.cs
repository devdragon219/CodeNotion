using HotChocolate.Execution;
using HotChocolate.Subscriptions;
using RealGimm.Core.Common.NotificationAggregate;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.WebFrontOffice.Common;

[ExtendObjectType(typeof(Subscription))]
public class CommonSubscriptions
{
  [Subscribe(With = nameof(SubscribeToNotifyUser))]
  [Topic($"{Constants.NOTIFICATION_PREFIX}{{username}}")]
  public Notification NotifyUser([EventMessage] Notification value) => value;

  public ValueTask<ISourceStream<Notification>> SubscribeToNotifyUser(
    [Service] IUserDataProvider userData,
    [Service] ITopicEventReceiver receiver,
    CancellationToken cancellationToken)
  {
    var topic = Constants.NOTIFICATION_PREFIX + userData.Username;
    
    return receiver.SubscribeAsync<Notification>(topic, cancellationToken);
  }
}
