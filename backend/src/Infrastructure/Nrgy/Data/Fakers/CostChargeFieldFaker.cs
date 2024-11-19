using Bogus;
using RealGimm.Core.CrossModule;
using RealGimm.Core.Nrgy.CostChargeAggregate;
using RealGimm.Core.Nrgy.UtilityTypeAggregate;

namespace RealGimm.Infrastructure.Nrgy.Data.Fakers;

public sealed class CostChargeFieldFaker : BaseSeededFaker<CostChargeField>
{
  public required UtilityChargeField UtilityChargeField { get; init; }

  public CostChargeFieldFaker()
  {
    CustomInstantiator(faker =>
    {
      var field = new CostChargeField();
      field.SetTemplateTypeId(GenerateTemplateTypeId(UtilityChargeField!));
      field.SetType(GenerateType(UtilityChargeField!));
      field.SetName(GenerateName(UtilityChargeField!));
      field.SetIsMandatory(GenerateIsMandatory(UtilityChargeField!));
      field.SetValue(GenerateValue(faker, UtilityChargeField!));

      return field;
    });

    FinishWith((faker, field) =>
    {
      var validationErrors = field.Validate().ToList();
      if (validationErrors.Count > 0)
      {
        var errorMessages = string.Join(", ", validationErrors.Select(error => error.ErrorMessage));
        throw new InvalidOperationException($"Invalid {nameof(CostChargeField)} entity! Errors: {errorMessages}");
      }
    });
  }

  public static Guid GenerateTemplateTypeId(UtilityChargeField utilityChargeField) => utilityChargeField.Id;
  
  public static CustomFieldType GenerateType(UtilityChargeField utilityChargeField) => utilityChargeField.Type;

  public static string GenerateName(UtilityChargeField utilityChargeField) => utilityChargeField.Name;

  public static bool GenerateIsMandatory(UtilityChargeField utilityChargeField) => utilityChargeField.IsMandatory;

  public static string GenerateValue(Faker faker, UtilityChargeField utilityChargeField)
    => utilityChargeField.Type switch
    {
      CustomFieldType.SingleItemFromList => faker.PickRandom(utilityChargeField.ValidValues!),
      CustomFieldType.SimpleText => faker.Lorem.Word(),
      CustomFieldType.SimpleNumber => faker.Random.Int(0, 1000).ToString(),
      CustomFieldType.Date => faker.Date.BetweenDateOnly(new DateOnly(2020, 01, 01), new DateOnly(2024, 01, 01)).ToString(),

      _ => throw new NotImplementedException()
    };
}
