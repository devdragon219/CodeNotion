namespace RealGimm.Core.Common.NotificationAggregate;

public class ContractsExpirationNotification : Notification
{
  public int[] ContractIds { get; private set; } = [];
  public bool IsActiveContracts { get; private set; }
  public int DaysToExpiration { get; private set; }

  public void SetContractIds(int[] contractIds) => ContractIds = contractIds;

  public void SetIsActiveContracts(bool isActiveContracts) => IsActiveContracts = isActiveContracts;

  public void SetDaysToExpiration(int daysToExpiration) => DaysToExpiration = daysToExpiration;
}
