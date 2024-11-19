using RealGimm.Core.Common.NotificationAggregate.Events;

namespace RealGimm.Core.Common.NotificationAggregate.Handlers;

public class ContractsExpirationNotificationHandler : NotificationHandler<ContractsExpirationNotificationEvent, ContractsExpirationNotification, ContractsExpirationNotificationHandler>
{
  protected override void MapNotification(ContractsExpirationNotificationEvent from, ContractsExpirationNotification into)
  {
    into.SetContractIds(from.ContractIds);
    into.SetIsActiveContracts(from.IsActiveContracts);
    into.SetDaysToExpiration(from.DaysToExpiration);
  }
}
