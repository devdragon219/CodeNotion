using Bogus;
using RealGimm.Core.Nrgy.UtilityTypeAggregate;

namespace RealGimm.Infrastructure.Nrgy.Data.Fakers;

public sealed class UtilityTypeFaker : BaseSeededFaker<UtilityType>
{
  public Faker<UtilityChargeField> ChargeFieldFaker { get; init; } = new UtilityChargeFieldFaker();

  public UtilityTypeFaker()
  {
    CustomInstantiator(faker =>
    {
      var utilityType = new UtilityType();
      utilityType.SetExternalCode(GenerateExternalCode(faker));

      utilityType.SetData(
        PickRandomUtilityCategory(faker),
        GenerateDescription(faker),
        GenerateCode(faker),
        GenerateExpenseClass(faker));

      utilityType.SetMeasurement(
        GenerateUnit(faker),
        GenerateUnitDescription(faker),
        GenerateTimeOfUseRateCount(faker),
        PickRandomMeteringType(faker),
        GenerateHasHeatingAccountingSystem(faker));

      var fields = Enumerable.Range(1, 3).Select(row => ChargeFieldFaker.GenerateBetween(1, 4).ToArray()).ToArray();
      utilityType.SetFields(fields);

      return utilityType;
    });

    FinishWith((faker, administration) =>
    {
      var validationErrors = administration.Validate().ToList();
      if (validationErrors.Count > 0)
      {
        var errorMessages = string.Join(", ", validationErrors.Select(error => error.ErrorMessage));
        throw new InvalidOperationException($"Invalid {nameof(UtilityType)} entity! Errors: {errorMessages}");
      }
    });
  }
  
  public static int GenerateTimeOfUseRateCount(Faker faker) => faker.Random.Int(1, 6);
  
  public static bool GenerateHasHeatingAccountingSystem(Faker faker) => faker.Random.Bool();
  
  public static MeteringType PickRandomMeteringType(Faker faker) => faker.PickRandom<MeteringType>();
  
  public static UtilityCategory PickRandomUtilityCategory(Faker faker) => faker.PickRandom<UtilityCategory>();
  
  public static string GenerateDescription(Faker faker) => faker.Lorem.Word();
  
  public static string GenerateCode(Faker faker) => faker.Random.AlphaNumeric(5);
  
  public static string GenerateUnit(Faker faker) => faker.Random.AlphaNumeric(3);
  
  public static string GenerateUnitDescription(Faker faker) => faker.Random.Word();
  
  public static string GenerateExpenseClass(Faker faker) => faker.Random.AlphaNumeric(10);
  
  public static string GenerateExternalCode(Faker faker) => faker.Random.AlphaNumeric(10);
}
