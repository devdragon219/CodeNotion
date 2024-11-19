using RealGimm.Core.Asst;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.FunctionAreaAggregate;
using RealGimm.Infrastructure;

namespace RealGimm.FunctionalTests.Web.Fakers.Asst;

public sealed class FunctionAreaFaker : BaseSeededFaker<FunctionArea>
{
  private int _internalCodeNumber = 1;

  public int StartInternalCodeNumber
  {
    init => _internalCodeNumber = value;
  }

  public FunctionAreaFaker()
  {
    CustomInstantiator(faker =>
    {
      var functionArea = new FunctionArea();
      functionArea.SetInternalCode($"FA{_internalCodeNumber.ToString().PadLeft(3, '0')}");
      functionArea.SetName(faker.Lorem.Word());
      functionArea.SetSurfaceType(faker.PickRandom<SurfaceType>());

      return functionArea;
    });

    FinishWith((_, functionArea) =>
    {
      EnsureValid(functionArea);
      _internalCodeNumber++;
    });
  }
}
