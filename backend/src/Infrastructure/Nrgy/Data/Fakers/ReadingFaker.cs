using Bogus;
using RealGimm.Core.Nrgy.ReadingAggregate;
using RealGimm.Core.Nrgy.UtilityServiceAggregate;

namespace RealGimm.Infrastructure.Nrgy.Data.Fakers;

public sealed class ReadingFaker : BaseSeededFaker<Reading>
{
  public required IEnumerable<UtilityService> UtilityServices { get; init; }

  public ReadingFaker()
  {
    CustomInstantiator(faker =>
    {
      var utilityService = PickRandomUtilityService(faker, UtilityServices!);

      var reading = new Reading();
      reading.SetService(utilityService);
      reading.SetData(GenerateTimestamp(faker, utilityService), GenerateIsEstimated(faker), GenerateNotes(faker));
      for (int i = 0; i < utilityService.UtilityType.TimeOfUseRateCount; i++)
      {
        var rval = new ReadingValue();
        rval.SetValues(i, faker.Random.Int(0, 10000));
        reading.Values.Add(rval);
      }

      return reading;
    });

    FinishWith((faker, utilityService) =>
    {
      var validationErrors = utilityService.Validate().ToList();
      if (validationErrors.Count > 0)
      {
        var errorMessages = string.Join(", ", validationErrors.Select(error => error.ErrorMessage));
        throw new InvalidOperationException($"Invalid {nameof(Reading)} entity! Errors: {errorMessages}");
      }
    });
  }

  public static UtilityService PickRandomUtilityService(Faker faker, IEnumerable<UtilityService> utilityServices)
    => faker.PickRandom(utilityServices);

  public static DateTime GenerateTimestamp(Faker faker, UtilityService utilityService)
  {
    var activationDateTime = utilityService.ActivationDate.ToDateTime(TimeOnly.MinValue, DateTimeKind.Utc);
    var deactivationDateTime = utilityService.DeactivationDate?.ToDateTime(TimeOnly.MinValue, DateTimeKind.Utc);

    if (deactivationDateTime.HasValue)
    {
      return faker.Date.Between(activationDateTime, deactivationDateTime.Value);
    }

    return faker.Date.Soon(days: 100, refDate: activationDateTime);
  }

  public static bool GenerateIsEstimated(Faker faker) => faker.Random.Bool();

  public static string? GenerateNotes(Faker faker)
    => faker.Random.Bool()
      ? null
      : faker.Lorem.Sentence();
}
