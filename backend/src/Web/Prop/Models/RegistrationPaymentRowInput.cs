using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Prop.Models;
public sealed record RegistrationPaymentRowInput : IMaybeIdentifiable
{
  public int? Id { get; init; }
  public string PaymentRowCode { get; set; } = default!;
  public string? PaymentRowSection { get; set; }
  public string? PaymentRowReceivingEntity { get; set; }
  public int ReferenceYear { get; set; }
  public int? ReferencePeriod { get; set; }
  public decimal AmountDue { get; set; }
  public decimal? AmountCleared { get; set; }
}