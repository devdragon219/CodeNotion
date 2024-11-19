using Bogus;
using RealGimm.Core.Nrgy.UtilityServiceAggregate;
using RealGimm.Infrastructure;
using RealGimm.Infrastructure.Nrgy.Data.Fakers;
using RealGimm.Web.Nrgy.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Nrgy;

public sealed class ReadingInputFaker : BaseSeededFaker<ReadingInput>
{
  public required IEnumerable<UtilityService> UtilityServices { get; init; }

  public ReadingInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var utilityService = ReadingFaker.PickRandomUtilityService(faker, UtilityServices!);

      var values = new List<ReadingValueInput>();

      for (int i = 0; i < utilityService.UtilityType.TimeOfUseRateCount; i++)
      {
        var rval = new ReadingValueInput
        {
          Value = faker.Random.Int(0, 10000),
          TOURateIndex = i
        };

        values.Add(rval);
      }

      var input = new ReadingInput
      {
        UtilityServiceId = utilityService.Id,
        ReadingTimestamp = ReadingFaker.GenerateTimestamp(faker, utilityService),
        IsEstimated = ReadingFaker.GenerateIsEstimated(faker),
        Notes = ReadingFaker.GenerateNotes(faker),
        Values = values.ToArray()
      };

      return input;
    });
  }
}
