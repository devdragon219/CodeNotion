using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Prop.RegistrationOfficeAggregate;

public class RegistrationOffice : EntityBase, IAggregateRoot
{
  [MaxLength(StrFieldSizes.EXTERNAL_CODE), Required, FuzzySearchable]
  public string? ExternalCode { get; private set; }

  [MaxLength(StrFieldSizes.DESCRIPTION), Required, FuzzySearchable]
  public string? Description { get; private set; }

  public int? CityId {get; private set;}
  public void SetDescription(string? description) => Description = description;

  public void SetExternalCode(string? externalCode) => ExternalCode = externalCode;

  public void SetCity(int? cityId) => CityId = cityId;

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (string.IsNullOrWhiteSpace(ExternalCode))
    {
      yield return ErrorCode.RegistrationOfficeExternalCodeIsNullOrEmptyString.ToValidationError();
    }

    if (string.IsNullOrWhiteSpace(Description))
    {
      yield return ErrorCode.RegistrationOfficeDescriptionIsNullOrEmptyString.ToValidationError();
    }
  }
}
