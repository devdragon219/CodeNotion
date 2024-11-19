using Bogus;
using RealGimm.Core;
using RealGimm.Core.Common.InterestRateAggregate;

namespace RealGimm.Infrastructure.Common.Data.Fakers;

public sealed class InterestRateFaker : BaseSeededFaker<InterestRate>
{
  private int _generatedInterestRatesCount = 0;

  public InterestRateFaker()
  {
    CustomInstantiator(faker =>
    {
      var InterestRate = new InterestRate();

      InterestRate.SetDates(GenerateSince(faker), GenerateUntil(faker));
      InterestRate.SetCountry(CountryISO3.ITA);
      InterestRate.SetRate(GenerateRate(faker));

      return InterestRate;
    });

    FinishWith((_, InterestRate) =>
    {
      var validationErrors = InterestRate.Validate().ToList();
      if (validationErrors.Count > 0)
      {
        var errorMessages = string.Join(", ", validationErrors.Select(error => error.ErrorMessage));
        throw new InvalidOperationException($"Invalid {nameof(InterestRate)} entity! Errors: {errorMessages}");
      }

      _generatedInterestRatesCount++;
    });
  }

  public static decimal GenerateRate(Faker faker) => decimal.Round(faker.Random.Decimal(), 2);
  public static DateOnly GenerateSince(Faker faker) => faker.Date.BetweenDateOnly(new DateOnly(2023, 01, 01), new DateOnly(2023, 06, 01));
  public static DateOnly GenerateUntil(Faker faker) => faker.Date.BetweenDateOnly(new DateOnly(2023, 06, 15), new DateOnly(2023, 12, 31));
}
