using HotChocolate;

namespace RealGimm.Core.Prop.RegistryCommunicationAggregate;

public record RegistryCommunicationGroupId
{
  public required int ManagementSubjectId { get; init; }
  public required bool IsActiveContract { get; init; }
  public required CommunicationType CommunicationType { get; init; }
  public required DateOnly? EndDate { get; init; }
  public DateOnly? Date { get; init; }
  public int? RequestingSubjectLegalRepresentativeId { get; init; }
  public int? DebtBankAccountId { get; init; }

  [GraphQLIgnore]
  public bool IsConfirmed => Date.HasValue || RequestingSubjectLegalRepresentativeId.HasValue || DebtBankAccountId.HasValue;

  [GraphQLIgnore]
  public TemporaryRegistryCommunicationGroupId AsTemporaryGroupId()
    => new()
    {
      ManagementSubjectId = ManagementSubjectId,
      IsActiveContract = IsActiveContract,
      CommunicationType = CommunicationType,
      EndDate = EndDate
    };

  [GraphQLIgnore]
  public ConfirmedRegistryCommunicationGroupId AsConfirmedGroupId()
    => new()
    {
      ManagementSubjectId = ManagementSubjectId,
      IsActiveContract = IsActiveContract,
      CommunicationType = CommunicationType,
      EndDate = EndDate,
      Date = Date!.Value,
      RequestingSubjectLegalRepresentativeId = RequestingSubjectLegalRepresentativeId!.Value,
      DebtBankAccountId = DebtBankAccountId!.Value
    };
}
