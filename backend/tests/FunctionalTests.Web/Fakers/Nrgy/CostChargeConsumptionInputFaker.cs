using RealGimm.Infrastructure;
using RealGimm.Web.Nrgy.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Nrgy;

public sealed class CostChargeConsumptionInputFaker : BaseSeededFaker<CostChargeConsumptionInput>
{
  public required DateOnly Since { get; init; }
  public required DateOnly Until { get; init; }
  public required int TOURateCount { get; init; }

  public CostChargeConsumptionInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var values = new List<ReadingValueInput>();

      for (int i = 0; i < TOURateCount; i++)
      {
        var rval = new ReadingValueInput
        {
          Value = decimal.Round(faker.Random.Decimal(100, 200), 2),
          TOURateIndex = i
        };

        values.Add(rval);
      }

      var input = new CostChargeConsumptionInput
      {
        Since = Since,
        Until = Until,
        Values = values.ToArray()
      };

      return input;
    });
  }
}
