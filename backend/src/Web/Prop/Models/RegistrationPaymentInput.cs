using RealGimm.Core.Prop.RegistrationPaymentAggregate;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Prop.Models;

public sealed record RegistrationPaymentInput
{
  public int? Id { get; init; }
  public int ContractId { get; set; }
  public int PaymentYear { get; set; }
  public string PaymentCode { get; set; } = default!;
  public DateOnly ValueDate { get; set; }
  public decimal TaxAmount { get; set; }
  public decimal SanctionAmount { get; set; }
  public decimal TotalAmount { get; set; }
  public List<RegistrationPaymentRowInput> Rows { get; set; } = new();

}