using RealGimm.Core.Shared;

namespace RealGimm.Web.Fclt.Models;

public record BillingInfoInput
{
  public BillingPeriod? BillingPeriod { get; set; }
  public decimal? VATPercentage { get; set; }
  public decimal? PurchaseFeeWithoutVAT { get; set; }
  public decimal? FixedRateFee { get; set; }
  public decimal? DiscountPercentage { get; set; }
}
