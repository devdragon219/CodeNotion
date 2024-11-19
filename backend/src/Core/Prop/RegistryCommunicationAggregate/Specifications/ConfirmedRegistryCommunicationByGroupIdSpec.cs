using Ardalis.Specification;

namespace RealGimm.Core.Prop.RegistryCommunicationAggregate.Specifications;

public class ConfirmedRegistryCommunicationByGroupIdSpec : Specification<RegistryCommunication>
{
  public ConfirmedRegistryCommunicationByGroupIdSpec(ConfirmedRegistryCommunicationGroupId groupId)
  {
    Query
      .Where(communication => communication.IsSent)
      .Where(communication =>
        communication.Contract!.ManagementSubjectId == groupId.ManagementSubjectId &&
        communication.Contract.Type.IsActive == groupId.IsActiveContract &&
        communication.Type == groupId.CommunicationType &&
        communication.EndDate == groupId.EndDate &&
        communication.Date == groupId.Date &&
        communication.RequestingSubjectLegalRepresentativeId == groupId.RequestingSubjectLegalRepresentativeId &&
        communication.DebtBankAccountId.HasValue &&
        communication.DebtBankAccountId == groupId.DebtBankAccountId);
  }
}
