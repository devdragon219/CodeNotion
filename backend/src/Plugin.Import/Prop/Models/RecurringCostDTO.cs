namespace RealGimm.Plugin.Import.Prop.Models;

public class RecurringCostDTO
{
  public string Id { get; set; } = default!;
  public string ContractId { get; set; } = default!;
  public string BillingItemId { get; set; } = default!;
  public string? VatRateId { get; set; }
  public string? ExcludeStartMonth { get; set; }
  public string? ExcludeEndMonth { get; set; }
  public decimal? Amount { get; set; }
}
