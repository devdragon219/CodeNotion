using Bogus;
using RealGimm.Core.CrossModule;
using RealGimm.Core.Nrgy.UtilityTypeAggregate;

namespace RealGimm.Infrastructure.Nrgy.Data.Fakers;

public sealed class UtilityChargeFieldFaker : BaseSeededFaker<UtilityChargeField>
{
  public UtilityChargeFieldFaker()
  {
    CustomInstantiator(faker =>
    {
      var utilityChargeField = new UtilityChargeField();
      utilityChargeField.SetName(GenerateName(faker));
      utilityChargeField.SetMandatory(GenerateIsMandatory(faker));

      var (type, validValues) = GenerateTypeAndValidValues(faker);
      utilityChargeField.SetType(type);
      utilityChargeField.SetValidValues(validValues);

      return utilityChargeField;
    });

    FinishWith((faker, administration) =>
    {
      var validationErrors = administration.Validate().ToList();
      if (validationErrors.Count > 0)
      {
        var errorMessages = string.Join(", ", validationErrors.Select(error => error.ErrorMessage));
        throw new InvalidOperationException($"Invalid {nameof(UtilityChargeField)} entity! Errors: {errorMessages}");
      }
    });
  }

  public static string GenerateName(Faker faker) => faker.Lorem.Word();

  public static bool GenerateIsMandatory(Faker faker) => faker.Random.Bool();

  public static (CustomFieldType Type, string[]? ValidValues) GenerateTypeAndValidValues(Faker faker)
  {
    var type = faker.PickRandom<CustomFieldType>();
    if (type != CustomFieldType.SingleItemFromList)
    {
      return (type, null);
    }

    return (type, faker.Lorem.Words(faker.Random.Int(1, 5)));
  }
}
