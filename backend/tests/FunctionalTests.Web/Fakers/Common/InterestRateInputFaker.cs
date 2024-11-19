using RealGimm.Infrastructure;
using RealGimm.Infrastructure.Common.Data.Fakers;
using RealGimm.Web.Common.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Common;

public sealed class InterestRateInputFaker : BaseSeededFaker<InterestRateInput>
{
  public InterestRateInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var interestRate = new InterestRateInput()
      {
        Rate = InterestRateFaker.GenerateRate(faker),
        Since = InterestRateFaker.GenerateSince(faker),
        Until = InterestRateFaker.GenerateUntil(faker),
      };

      return interestRate;
    });
  }
}
