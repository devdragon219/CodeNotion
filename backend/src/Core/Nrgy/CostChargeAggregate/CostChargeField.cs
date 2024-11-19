using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Ardalis.Result;
using HotChocolate;
using RealGimm.Core.CrossModule;
using RealGimm.SharedKernel.Attributes;

namespace RealGimm.Core.Nrgy.CostChargeAggregate;

public class CostChargeField
{
  [JsonInclude, FuzzySearchable, MaxLength(StrFieldSizes.NAME)]
  public string Name { get; private set; } = default!;

  [JsonInclude]
  public bool IsMandatory { get; private set; }

  [JsonInclude]
  public Guid TemplateTypeId { get; private set; }

  [JsonInclude]
  public CustomFieldType Type { get; private set; }

  [JsonInclude, MaxLength(StrFieldSizes.DESCRIPTION)]
  public string? Value { get; private set; }

  public void SetName(string name)
    => Name = name ?? throw new ArgumentNullException(nameof(name));

  public void SetTemplateTypeId(Guid templateTypeId) => TemplateTypeId = templateTypeId;

  public void SetIsMandatory(bool isMandatory) => IsMandatory = isMandatory;

  public void SetType(CustomFieldType type) => Type = type;

  public void SetValue(string? value) => Value = value;

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (string.IsNullOrWhiteSpace(Name))
    {
      yield return ErrorCode.CatalogueItemFieldNameIsNullOrEmptyString.ToValidationError();
    }

    if (IsMandatory && string.IsNullOrWhiteSpace(Value))
    {
      yield return ErrorCode.CatalogueItemFieldValueIsNullOrEmptyString.ToValidationError();
    }
  }
}
