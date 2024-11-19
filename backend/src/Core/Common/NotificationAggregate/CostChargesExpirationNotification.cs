namespace RealGimm.Core.Common.NotificationAggregate;

public class CostChargesExpirationNotification : Notification
{
  public int[] CostChargeIds { get; private set; } = [];
  public int DaysToExpiration { get; private set; }

  public void SetCostChargeIds(int[] costChargeIds) => CostChargeIds = costChargeIds;

  public void SetDaysToExpiration(int daysToExpiration) => DaysToExpiration = daysToExpiration;
}
