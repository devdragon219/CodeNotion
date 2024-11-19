using RealGimm.Infrastructure;
using RealGimm.Infrastructure.Nrgy.Data.Fakers;
using RealGimm.Web.Nrgy.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Nrgy;

public class UtilityChargeFieldInputFaker : BaseSeededFaker<UtilityChargeFieldInput>
{
  public UtilityChargeFieldInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var input = new UtilityChargeFieldInput()
      {
        Name = UtilityChargeFieldFaker.GenerateName(faker),
        IsMandatory = UtilityChargeFieldFaker.GenerateIsMandatory(faker)
      };

      (input.Type, input.ValidValues) = UtilityChargeFieldFaker.GenerateTypeAndValidValues(faker);

      return input;
    });
  }
}
