namespace RealGimm.Plugin.Import.Prop.Models;

public class AdministrationDTO
{
  public string Id { get; set; } = default!;
  public string? EstateId { get; set; }
  public string? SubjectId { get; set; }
  public string? Notes { get; set; }
  public string? AdministrationTypeId { get; set; }
  public string? VatRateId { get; set; }
  public string? SubjectContactId { get; set; }
  public string? SubjectAddressId { get; set; }
  public string? SubjectBankAccountReference { get; set; }
  public DateTime? StartDate { get; set; }
  public DateTime? EndDate { get; set; }
  public string? PaymentTypeCode { get; set; }
  public bool IsAutomated { get; set; }
  public bool IsInvoiced { get; set; }
  public bool IsSuspended { get; set; }
  public string? ExpenseCode1 { get; set; }
  public string? ExpenseCode2 { get; set; }
  public string? ExpenseCode3 { get; set; }
  public AdminTermDTO[]? Terms { get; set; }
}
