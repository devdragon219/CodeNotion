using RealGimm.Core.Common;

namespace RealGimm.Core.Prop.ContractAggregate.Models;

public sealed record ContractListOutput
{
  public required int Id { get; set; }
  public required bool IsActive { get; set; }
  public required string InternalCode { get; set; } = default!;
  public required string? ExternalCode { get; set; }
  public required string? CounterpartName { get; set; }
  public required string? TypeDescription { get; set; }
  public required bool IsSublocated { get; set; }
  public required EntryStatus Status { get; set; }
  public required DateOnly EffectStartDate { get; set; }
  public required DateOnly? ExpirationDate { get; set; }
  public int? DaysToExpiration => ExpirationDate?.DayNumber - DateOnly.FromDateTime(DateTime.Today).DayNumber;
  public required ContractListLocatedUnitOutput[] LocatedUnits { get; set; } = Array.Empty<ContractListLocatedUnitOutput>();
  public required string? ManagementSubjectName { get; set; }
  public required ReleaseReason? ReleaseReason { get; set; }
  public required DateOnly? ReleaseDate { get; set; }
  public required bool? IsOccupiedWithoutRight { get; set; }
  public required DateOnly? TerminationDate { get; set; }
  public required ContractTerminator? Terminator { get; set; }
  public required int? FirstTermDurationMonths { get; set; }
  public required int? SecondTermDurationMonths { get; set; }
  public required DateOnly? FirstTermExpirationDate { get; set; }
  public required DateOnly? SecondTermExpirationDate { get; set; }
  public required int? AnytimeTerminationWarningMonths { get; set; }
  public required int? NonRenewalWarningMonths { get; set; }
  public required Reason Reason { get; set; }
  public required DateOnly AgreementDate { get; set; }
  public required DateOnly LastRenewalStartDate { get; set; }
}
