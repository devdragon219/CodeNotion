using RealGimm.Infrastructure;
using RealGimm.Infrastructure.Fclt.Data.Fakers;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Fclt;

public sealed class ServiceActivityInputFaker : BaseSeededFaker<ServiceActivityInput>
{
  public ServiceActivityInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var input = new ServiceActivityInput
      {
        Name = ServiceActivityFaker.GenerateName(faker),
        ActivityType = ServiceActivityFaker.PickActivityType(faker),
        IsMandatoryByLaw = ServiceActivityFaker.GenerateIsMandatoryByLaw(faker)
      };

      return input;
    });
  }
}
