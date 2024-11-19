using Microsoft.Extensions.Logging;
using RealGimm.SharedKernel.Attributes;
using RealGimm.Core.EventSystem;
using RealGimm.Core.Common.NotificationAggregate.Events;
using HotChocolate.Subscriptions;
using RealGimm.SharedKernel;

namespace RealGimm.Core.Common.NotificationAggregate.Handlers;

[WebEventHandler]
public abstract class NotificationHandler<TNotificationEvent, TNotification, TSelf> : TenantMessageHandler<TNotificationEvent>
  where TNotificationEvent : NotificationEvent
  where TNotification : Notification, new()
  where TSelf : NotificationHandler<TNotificationEvent, TNotification, TSelf>
{
  public required IRepository<Notification> Notifications { protected get; init; }
  public required ILogger<TSelf> Logger { protected get; init; }
  public required ITopicEventSender TopicEventSender { protected get; init; }

  protected override async Task HandlePerTenant(TNotificationEvent message)
  {
    var newNotification = new TNotification();
    newNotification.SetData(message.UserName, message.Timestamp);
    
    MapNotification(message, newNotification);

    await Notifications.AddAsync(newNotification);

    var topic = Constants.NOTIFICATION_PREFIX + message.UserName;
    await TopicEventSender.SendAsync<Notification>(topic, newNotification);
  }

  protected abstract void MapNotification(TNotificationEvent from, TNotification into);
}
