using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Attributes;

namespace RealGimm.Core.Asst.CatalogueTypeAggregate;

public class CatalogueTypeActivity : EntityBase
{
  [Required, FuzzySearchable, MaxLength(StrFieldSizes.NAME)]
  public string? Name { get; private set; }

  public CatalogueTypeActivityType ActivityType { get; private set; }
  public bool IsMandatoryByLaw { get; private set; } = default!;
  public CatalogueType Type { get; private set; } = default!;

  public void SetName(string? name) => Name = name;

  public void SetActivityType(CatalogueTypeActivityType type) => ActivityType = type;
  
  public void SetIsMandatoryByLaw(bool isMandatoryByLaw) => IsMandatoryByLaw = isMandatoryByLaw;

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (string.IsNullOrWhiteSpace(Name))
    {
      yield return ErrorCode.CatalogueTypeActivityNameIsNullOrEmptyString.ToValidationError();
    }
  }
}
