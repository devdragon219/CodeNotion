using RealGimm.Infrastructure;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Fclt;

public sealed class ServiceCategoryInputFaker : BaseSeededFaker<ServiceCategoryInput>
{
  private int _generatedInputsCount;

  public ServiceCategoryInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var service = new ServiceCategoryInput
      {
        Name = $"ServiceCategory {_generatedInputsCount}", 
        InternalCode = faker.Random.AlphaNumeric(10),
      };

      return service;
    });

    FinishWith((_, service) =>
    {
      EnsureValid(service);
      _generatedInputsCount++;
    });
  }
}
