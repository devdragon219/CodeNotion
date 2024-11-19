using Ardalis.Result;
using HotChocolate;
using RealGimm.Core.Shared;

namespace RealGimm.Core.Fclt.ContractAggregate;

public class BillingInfo
{
  public BillingPeriod? BillingPeriod { get; private set; }
  public decimal? VATPercentage { get; private set; }
  public decimal? PurchaseFeeWithoutVAT { get; private set; }
  public decimal? FixedRateFee { get; private set; }
  public decimal? DiscountPercentage { get; private set; }

  public void SetBillingPeriod(BillingPeriod? billingPeriod) => BillingPeriod = billingPeriod;

  public void SetVATPercentage(decimal? vatPercentage) => VATPercentage = vatPercentage;

  public void SetPurchaseFeeWithoutVAT(decimal? purchaseFeeWithoutVAT) => PurchaseFeeWithoutVAT = purchaseFeeWithoutVAT;

  public void SetFixedRateFee(decimal? fixedRateFee) => FixedRateFee = fixedRateFee;

  public void SetDiscountPercentage(decimal? discountPercentage) => DiscountPercentage = discountPercentage;

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (VATPercentage is not null && VATPercentage is < 0 or > 100)
    {
      yield return ErrorCode.InvlaidVATPercentage.ToValidationError();
    }

    if (PurchaseFeeWithoutVAT is not null && PurchaseFeeWithoutVAT < 0)
    {
      yield return ErrorCode.InvlaidPurchaseFeeWithoutVAT.ToValidationError();
    }

    if (FixedRateFee is not null && FixedRateFee < 0)
    {
      yield return ErrorCode.InvlaidFixedRateFee.ToValidationError();
    }

    if (DiscountPercentage is not null && DiscountPercentage is < 0 or > 100)
    {
      yield return ErrorCode.InvlaidDiscountPercentage.ToValidationError();
    }
  }
}
