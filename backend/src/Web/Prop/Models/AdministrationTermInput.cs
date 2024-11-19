using RealGimm.Core.Prop.AdministrationTermAggregate;

namespace RealGimm.Web.Prop.Models;

public record AdministrationTermInput
{
  public TermType TermType { get; set; }
  public string Name { get; set; } = default!;
  public DateOnly Since { get; set; }
  public DateOnly Until { get; set; }
  public decimal ExpectedAmount { get; set; }
  public List<TermInstallmentInput> Installments { get; set; } = new();
  public List<TermGroupedInstallmentPaymentInput> Payments { get; set; } = new();
}
