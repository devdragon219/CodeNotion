namespace RealGimm.Plugin.Import.Common.Models;

public class OfficialActDTO
{
    public string Id { get; set; } = default!;
    public string EstateUnitId { get; set; } = default!;
    public DateTime? CreationDate { get; set; }
    public string? ProtocolNumber { get; set; }
    public string? RegistrationNumber { get; set; }
    public string? IssuerName { get; set; }
    public string? IssuerCode { get; set; }
    public string? IssuerExternalCode { get; set; }
    public DateTime? IssueDate { get; set; }
    public DateTime? TranscriptDate { get; set; }
    public DateTime? RegistrationDate { get; set; }
    public string? RepertoireNumber { get; set; }
    public string? CollectionNumber { get; set; } 
    public string? TranscriptNumber { get; set; }
    public string? TranscriptCity { get; set; }
    public string? WrittenAtCity { get; set; }
}
