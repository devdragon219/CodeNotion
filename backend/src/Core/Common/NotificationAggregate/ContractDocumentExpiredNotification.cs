namespace RealGimm.Core.Common.NotificationAggregate;

public class ContractDocumentExpiredNotification : DocumentExpiredNotification
{
  public bool IsContractActive { get; private set; }
  public bool IsContractSublocated { get; private set; }

  public void SetIsContractActive(bool isContractActive) => IsContractActive = isContractActive;

  public void SetIsContractSublocated(bool isContractSublocated) => IsContractSublocated = isContractSublocated;
}
