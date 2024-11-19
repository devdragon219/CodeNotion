using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.SharedKernel.Attributes;

namespace RealGimm.Core.Fclt.ServiceAggregate;

public class ServiceActivity : EntityBase
{
  [Required, FuzzySearchable, MaxLength(StrFieldSizes.NAME)]
  public string? Name { get; private set; }

  public ServiceActivityType ActivityType { get; private set; }
  public bool IsMandatoryByLaw { get; private set; } = default!;
  public Service Type { get; private set; } = default!;

  public void SetName(string? name) => Name = name;

  public void SetActivityType(ServiceActivityType type) => ActivityType = type;

  public void SetIsMandatoryByLaw(bool isMandatoryByLaw) => IsMandatoryByLaw = isMandatoryByLaw;

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (string.IsNullOrWhiteSpace(Name))
    {
      yield return ErrorCode.ServiceActivityNameIsNullOrEmptyString.ToValidationError();
    }
  }
}
