using RealGimm.Infrastructure;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.Web.Asst.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Asst;
public sealed class EstateMainUsageTypeInputFaker : BaseSeededFaker<EstateMainUsageTypeInput>
{
  public EstateMainUsageTypeInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var input = new EstateMainUsageTypeInput()
      {
        Name = EstateMainUsageTypeFaker.GenerateLongString(faker),
        InternalCode = EstateMainUsageTypeFaker.GenerateLongString(faker),
      };

      return input;
    });
  }
}
