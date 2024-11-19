using RealGimm.Infrastructure;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.Web.Asst.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Asst;
public sealed class EstateUsageTypeInputFaker : BaseSeededFaker<EstateUsageTypeInput>
{
  public EstateUsageTypeInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var input = new EstateUsageTypeInput()
      {
        Name = EstateUsageTypeFaker.GenerateLongString(faker),
        InternalCode = EstateUsageTypeFaker.GenerateLongString(faker),
      };

      (input.IsForEstate, input.IsForEstateUnit, input.IsForEstateSubUnit, input.IsForContracts) = EstateUsageTypeFaker.GenerateUsage();

      return input;
    });
  }
}
