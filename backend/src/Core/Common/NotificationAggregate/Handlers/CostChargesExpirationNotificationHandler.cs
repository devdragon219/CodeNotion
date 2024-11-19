using RealGimm.Core.Common.NotificationAggregate.Events;

namespace RealGimm.Core.Common.NotificationAggregate.Handlers;

public class CostChargesExpirationNotificationHandler : NotificationHandler<CostChargesExpirationNotificationEvent, CostChargesExpirationNotification, CostChargesExpirationNotificationHandler>
{
  protected override void MapNotification(CostChargesExpirationNotificationEvent from, CostChargesExpirationNotification into)
  {
    into.SetCostChargeIds(from.CostChargeIds);
    into.SetDaysToExpiration(from.DaysToExpiration);
  }
}
