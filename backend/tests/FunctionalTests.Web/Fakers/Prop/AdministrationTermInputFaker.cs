using RealGimm.Infrastructure;
using RealGimm.Infrastructure.Prop.Data.Fakers;
using RealGimm.Web.Prop.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Prop;

public sealed class AdministrationTermInputFaker : BaseSeededFaker<AdministrationTermInput>
{
  public AdministrationTermInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var input = new AdministrationTermInput
      {
        TermType = AdministrationTermFaker.PickTermType(faker),
        Name = AdministrationTermFaker.GenerateName(faker),
        ExpectedAmount = AdministrationTermFaker.GenerateExpectedAmount(faker)
      };

      (input.Since, input.Until) = AdministrationTermFaker.GenerateDateRange(faker);

      return input;
    });
  }
}
