using RealGimm.Infrastructure;
using RealGimm.Infrastructure.Common.Data.Fakers;
using RealGimm.Web.Common.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Common;

public sealed class VATRateInputFaker : BaseSeededFaker<VATRateInput>
{
  private int _generatedInputsCount = 0;

  public VATRateInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var vatRate = new VATRateInput()
      {
        InternalCode = VATRateFaker.GenerateInternalCode(faker, number: _generatedInputsCount + 1),
        Description = VATRateFaker.GenerateDescription(faker)
      };

      var (type, ratePercent) = VATRateFaker.GenerateTypeAndRatePercent(faker);
      vatRate.Type = type;
      vatRate.RatePercent = ratePercent;

      return vatRate;
    });

    FinishWith((_, _) => _generatedInputsCount++);
  }
}
