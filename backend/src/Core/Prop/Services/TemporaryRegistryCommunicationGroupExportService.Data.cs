using RealGimm.Core.Prop.RegistryCommunicationAggregate;

namespace RealGimm.Core.Prop.Services;

public sealed partial class TemporaryRegistryCommunicationGroupExportService
{
  public record Data
  {
    public required string ManagementSubjectName { get; init; }
    public required bool IsActiveContract { get; init; }
    public required CommunicationType CommunicationType { get; init; }
    public required DateOnly? EndDate { get; init; }
    public required decimal? DebtAmount { get; init; }
    public required bool HasAnomalies { get; init; }
  }
}
