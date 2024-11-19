using RealGimm.Infrastructure;
using RealGimm.Infrastructure.Prop.Data.Fakers;
using RealGimm.Web.Prop.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Prop.Contract;

public sealed class RatePlanInputFaker : BaseSeededFaker<RatePlanInput>
{
  public RatePlanInputFaker()
  {
    CustomInstantiator(faker =>
    {
      var input = new RatePlanInput
      {
        Since = RatePlanFaker.GenerateSince(faker),
        NewYearlyRate = RatePlanFaker.GenerateNewYearlyRate(faker),
        IsDeclarationExpected = RatePlanFaker.GenerateIsDeclarationExpected(faker)
      };

      return input;
    });
  }
}
