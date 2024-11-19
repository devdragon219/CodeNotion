namespace RealGimm.Web.Asst.Models;

public record EstateUnitOfficialActInput
{
  public string ProtocolNumber { get; init; } = default!;
  public string? RepertoireNumber { get; init; }
  public string? RegistrationNumber { get; init; }
  public DateOnly? RegistrationDate { get; init; }
  public string? WrittenAtCity { get; init; }
  public string? TranscriptionNumber { get; init; }
  public DateOnly? TranscriptionDate { get; init; }
  public string? TranscriptionCity { get; init; }
  public DateOnly NotaryActDate { get; init; }
  public string? CollectionNumber { get; init; }
  public string? NotaryName { get; init; }
}
