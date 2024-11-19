namespace RealGimm.Plugin.Import.Anag.Models;

public class BankAccountDTO
{
  public string Id { get; set; } = default!;
  public string? AccountType { get; set; }
  public string? SubjectInternalCode { get; set; }
  public DateTime? SubjectLastUpdated { get; set; }
  public DateTime? AccountLastUpdated { get; set; }
  public string? AccountHolder { get; set; }
  public string? AccountDescription { get; set; }
  public string? IBAN { get; set; }
  public bool IsClosed { get; set; }
}
