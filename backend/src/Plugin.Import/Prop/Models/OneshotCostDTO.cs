namespace RealGimm.Plugin.Import.Prop.Models;

public class OneshotCostDTO
{
  public string Id { get; set; } = default!;
  public string ContractId { get; set; } = default!;
  public string BillingItemId { get; set; } = default!;
  public string? VatRateId { get; set; }
  public DateTime? StartDate { get; set; }
  public DateTime? EndDate { get; set; }
  public DateTime? EffectStartDate { get; set; }
  public string? Notes { get; set; }
  public decimal? Amount { get; set; }
  public int? Installments { get; set; }
  public int? InstallmentsToBill { get; set; }
  public DateTime? LastBillingDate { get; set; }
  public decimal? BilledAmount { get; set; }
  public string? RegistryCommunicationId { get; set; }
}
