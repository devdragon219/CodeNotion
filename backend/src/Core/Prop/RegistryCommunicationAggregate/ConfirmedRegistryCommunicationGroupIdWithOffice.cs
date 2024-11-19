namespace RealGimm.Core.Prop.RegistryCommunicationAggregate;

public record ConfirmedRegistryCommunicationGroupIdWithOffice
{
  public required int ManagementSubjectId { get; init; }
  public required bool IsActiveContract { get; init; }
  public required CommunicationType CommunicationType { get; init; }
  public required DateOnly? EndDate { get; init; }
  public required DateOnly Date { get; init; }
  public required int RequestingSubjectLegalRepresentativeId { get; init; }
  public required int DebtBankAccountId { get; init; }
  public required string? OfficeExternalCode { get; init; }
}
