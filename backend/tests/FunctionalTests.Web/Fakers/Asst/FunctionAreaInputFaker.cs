using RealGimm.Core.Asst;
using RealGimm.Infrastructure;
using RealGimm.Web.Asst.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Asst;

public sealed class FunctionAreaInputFaker : BaseSeededFaker<FunctionAreaInput>
{
  public FunctionAreaInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var functionArea = new FunctionAreaInput()
      {
        Name = faker.Lorem.Word(),
        InternalCode = faker.Random.AlphaNumeric(10),
        SurfaceType = faker.PickRandom<SurfaceType>()
      };

      return functionArea;
    });
  }
}
