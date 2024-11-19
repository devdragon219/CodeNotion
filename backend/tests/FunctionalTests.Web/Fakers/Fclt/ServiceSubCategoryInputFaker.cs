using RealGimm.Infrastructure;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Fclt;

public sealed class ServiceSubCategoryInputFaker : BaseSeededFaker<ServiceSubCategoryInput>
{
  private int _generatedInputsCount;

  public ServiceSubCategoryInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var service = new ServiceSubCategoryInput
      {
        Name = $"ServiceSubCategory {_generatedInputsCount}", 
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
