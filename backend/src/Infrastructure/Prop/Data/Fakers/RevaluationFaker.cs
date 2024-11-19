using Bogus;
using RealGimm.Core.Prop.ContractAggregate;

namespace RealGimm.Infrastructure.Prop.Data.Fakers;

public sealed class RevaluationFaker : BaseSeededFaker<Revaluation>
{
  public RevaluationFaker()
  {
    CustomInstantiator(faker =>
    {
      var revaluation = new Revaluation();
      revaluation.SetRevaluationPeriodMonths(GenerateRevaluationPeriodMonths(faker));
      revaluation.SetIsAbsoluteRevaluationApplied(GenerateIsAbsoluteRevaluationApplied(faker));
      revaluation.SetIsRevaluationCalculated(GenerateIsRevaluationCalculated(faker));

      var (referencePeriodStart, referencePeriodEnd) = GenerateReferencePeriod(faker);
      revaluation.SetReferencePeriodStart(referencePeriodStart);
      revaluation.SetReferencePeriodEnd(referencePeriodEnd);
      
      revaluation.SetRevaluationSharePercent(GenerateRevaluationSharePercent(faker));
      revaluation.SetRateType(GenerateRateType(faker));
      revaluation.SetBaseRevaluationRate(GenerateBaseRevaluationRate(faker));
      revaluation.SetNextApplicationDate(GenerateNextApplicationDate(faker));
      revaluation.SetIsBackHistoryEnabled(GenerateIsBackHistoryEnabled(faker));

      return revaluation;
    });
  }

  public static int GenerateRevaluationPeriodMonths(Faker faker) => faker.Random.Int(1, 12);

  public static bool GenerateIsAbsoluteRevaluationApplied(Faker faker) => faker.Random.Bool();

  public static bool GenerateIsRevaluationCalculated(Faker faker) => faker.Random.Bool();

  public static (DateOnly StartDate, DateOnly EndDate) GenerateReferencePeriod(Faker faker)
  {
    var startDate = faker.Date.PastDateOnly(refDate: new DateOnly(2024, 01, 01));
    var endDate = faker.Date.FutureDateOnly(refDate: startDate);

    return (startDate, endDate);
  }

  public static decimal GenerateRevaluationSharePercent(Faker faker)
    => decimal.Round(faker.Random.Decimal(0.01m, 20m), 2);

  public static RevaluationRateType GenerateRateType(Faker faker) => faker.PickRandom<RevaluationRateType>();

  public static decimal GenerateBaseRevaluationRate(Faker faker)
    => decimal.Round(faker.Random.Decimal(0.01m, 20m), 2);

  public static DateOnly GenerateNextApplicationDate(Faker faker)
    => faker.Date.PastDateOnly(refDate: new DateOnly(2024, 01, 01));

  public static bool GenerateIsBackHistoryEnabled(Faker faker) => faker.Random.Bool();
}
