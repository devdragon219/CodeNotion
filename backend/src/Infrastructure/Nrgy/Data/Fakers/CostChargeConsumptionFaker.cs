using RealGimm.Core.Nrgy.CostChargeAggregate;
using RealGimm.Core.Nrgy.ReadingAggregate;

namespace RealGimm.Infrastructure.Nrgy.Data.Fakers;

public sealed class CostChargeConsumptionFaker : BaseSeededFaker<CostChargeConsumption>
{
  public required DateOnly Since { get; init; }
  public required DateOnly Until { get; init; }
  public required int TOURateCount { get; init; }

  public CostChargeConsumptionFaker()
  {
    CustomInstantiator(faker =>
    {
      var consumption = new CostChargeConsumption();
      consumption.SetSince(Since);
      consumption.SetUntil(Until);

      for (int i = 0; i < TOURateCount; i++)
      {
        var rval = new ReadingValue();
        rval.SetValues(i, decimal.Round(faker.Random.Decimal(100, 200), 2));

        consumption.Values.Add(rval);
      }

      return consumption;
    });
  }
}
