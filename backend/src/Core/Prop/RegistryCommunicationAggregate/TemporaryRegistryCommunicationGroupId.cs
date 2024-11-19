namespace RealGimm.Core.Prop.RegistryCommunicationAggregate;

public record TemporaryRegistryCommunicationGroupId
{
  public required int ManagementSubjectId { get; init; }
  public required bool IsActiveContract { get; init; }
  public required CommunicationType CommunicationType { get; init; }
  public required DateOnly? EndDate { get; init; }
}
