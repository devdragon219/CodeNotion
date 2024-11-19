using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.Core.CrossModule;

namespace RealGimm.Core.Asst.CadastralUnitAggregate;

public class CadastralUnitTaxConfig : EntityBase
{
  public Guid TaxCalculator { get; private set; }

  [Required, MaxLength(StrFieldSizes.INTERNAL_CODE)]
  public string? Code { get; private set; }

  public bool IsMandatory { get; private set; }
  public Guid TemplateTypeId { get; private set; }
  public CustomFieldType Type { get; private set; }

  [MaxLength(StrFieldSizes.DESCRIPTION)]
  public string? Value { get; private set; }

  public void SetReference(
    string code,
    Guid taxCalculator,
    bool isMandatory,
    Guid templateTypeId,
    CustomFieldType type)
  {
    Code = code;
    TaxCalculator = taxCalculator;
    IsMandatory = isMandatory;
    TemplateTypeId = templateTypeId;
    Type = type;
  }

  public void SetValue(string? value) => Value = value;

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (string.IsNullOrWhiteSpace(Code))
    {
      yield return ErrorCode.CatalogueItemFieldNameIsNullOrEmptyString.ToValidationError();
    }

    if (IsMandatory && string.IsNullOrWhiteSpace(Value))
    {
      yield return ErrorCode.CatalogueItemFieldValueIsNullOrEmptyString.ToValidationError();
    }
  }
}
