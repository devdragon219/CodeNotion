using Ardalis.Specification;

namespace RealGimm.Core.Prop.RegistryCommunicationAggregate.Specifications;

public class TemporaryRegistryCommunicationByGroupIdSpec : Specification<RegistryCommunication>
{
  public TemporaryRegistryCommunicationByGroupIdSpec(TemporaryRegistryCommunicationGroupId groupId)
  {
    Query
      .Where(communication => !communication.IsSent)
      .Where(communication =>
        communication.Contract!.ManagementSubjectId == groupId.ManagementSubjectId &&
        communication.Contract.Type.IsActive == groupId.IsActiveContract &&
        communication.Type == groupId.CommunicationType &&
        communication.EndDate == groupId.EndDate);
  }
}
