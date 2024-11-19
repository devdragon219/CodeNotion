using Bogus;
using RealGimm.Core.Prop.ContractAggregate;

namespace RealGimm.Infrastructure.Prop.Data.Fakers;

public sealed class RatePlanFaker : BaseSeededFaker<RatePlan>
{
  public RatePlanFaker()
  {
    CustomInstantiator(faker =>
    {
      var ratePlan = new RatePlan();
      ratePlan.SetSince(GenerateSince(faker));
      ratePlan.SetNewYearlyRate(GenerateNewYearlyRate(faker));
      ratePlan.SetIsDeclarationExpected(GenerateIsDeclarationExpected(faker));
      ratePlan.SetIsDeclared(GenerateIsDeclared(faker));
      
      return ratePlan;
    });
  }

  public static DateOnly GenerateSince(Faker faker)
    => faker.Date.PastDateOnly(refDate: new DateOnly(2024, 01, 01));
  
  public static decimal GenerateNewYearlyRate(Faker faker)
    => decimal.Round(faker.Random.Decimal(1000m, 10000m), 2);
  
  public static bool GenerateIsDeclarationExpected(Faker faker) => faker.Random.Bool();
  
  public static bool  GenerateIsDeclared(Faker faker) => faker.Random.Bool();
}
