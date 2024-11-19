namespace RealGimm.Web.Nrgy.Models;

public record CostChargeInput
{
  public int ServiceId { get; set; }
  public DateOnly PeriodStart { get; set; } = default!;
  public DateOnly PeriodEnd { get; set; } = default!;
  public decimal TotalAmount { get; set; }
  public DateOnly ReferenceDate { get; set; }
  public DateOnly DueDate { get; set; }
  public string InvoiceNumber { get; set; } = default!;
  public decimal TotalVATAmount { get; set; }
  public decimal InvoicedConsumptionAmount { get; set; }
  public CostChargeConsumptionInput? ActualConsumption { get; set; } = default!;
  public CostChargeConsumptionInput? ExpectedConsumption { get; set; } = default!;
  public CostChargeFieldInput[] Fields { get; set; } = Array.Empty<CostChargeFieldInput>();
}
