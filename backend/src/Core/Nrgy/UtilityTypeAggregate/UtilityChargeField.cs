using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Ardalis.Result;
using HotChocolate;
using RealGimm.Core.CrossModule;
using RealGimm.SharedKernel.Attributes;

namespace RealGimm.Core.Nrgy.UtilityTypeAggregate;

public class UtilityChargeField
{
  [FuzzySearchable, MaxLength(StrFieldSizes.NAME), JsonInclude]
  public string Name { get; private set; } = default!;

  [JsonInclude]
  public bool IsMandatory { get; private set; }

  [JsonInclude]
  public Guid Id { get; set; } = Guid.NewGuid();

  [JsonInclude]
  public CustomFieldType Type { get; private set; }

  [JsonInclude]
  public string[]? ValidValues { get; private set; }

  public void SetName(string name) => Name = name;

  public void SetMandatory(bool isMandatory) => IsMandatory = isMandatory;

  public void SetType(CustomFieldType type) => Type = type;

  public void SetValidValues(string[]? values) => ValidValues = values;

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (string.IsNullOrWhiteSpace(Name))
    {
      yield return ErrorCode.CatalogueTypeFieldNameIsNullOrEmptyString.ToValidationError();
    }

    if (ValidValues is not null && ValidValues.Any(value => value is null))
    {
      yield return ErrorCode.CatalogueTypeFieldInvalidValidValues.ToValidationError();
    }

    if (Type != CustomFieldType.SingleItemFromList && ValidValues is not null)
    {
      yield return ErrorCode.CatalogueTypeFieldInvalidValidValues.ToValidationError();
    }

    if (Type == CustomFieldType.SingleItemFromList && (ValidValues is null || ValidValues.Length < 1))
    {
      yield return ErrorCode.CatalogueTypeFieldInvalidValidValues.ToValidationError();
    }
  }
}
