using RealGimm.Core.Fclt.ContractAggregate;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mapping;

public class BillingInfoMapper : IMapper<BillingInfoInput, BillingInfo>
{
  public BillingInfo? MapAsync(BillingInfoInput? from, BillingInfo? into = null)
  {
    if (from is null)
    {
      return null;
    }

    var billingInfo = into ?? new BillingInfo();
    billingInfo.SetBillingPeriod(from.BillingPeriod);
    billingInfo.SetVATPercentage(from.VATPercentage);
    billingInfo.SetPurchaseFeeWithoutVAT(from.PurchaseFeeWithoutVAT);
    billingInfo.SetFixedRateFee(from.FixedRateFee);
    billingInfo.SetDiscountPercentage(from.DiscountPercentage);

    return billingInfo;
  }

  Task<BillingInfo?> IMapper<BillingInfoInput, BillingInfo>.MapAsync(
    BillingInfoInput? from,
    BillingInfo? into,
    CancellationToken cancellationToken)
    => Task.FromResult(MapAsync(from, into));
}
