namespace RealGimm.Core.Prop.RegistryCommunicationAggregate;

public record RegistryCommunicationGroup
{
  public required RegistryCommunicationGroupId Id { get; init; }
  public required decimal? DebtAmount { get; init; }
  public required int AnomaliesCount { get; init; }
  public bool HasAnomalies => AnomaliesCount > 0;
}
