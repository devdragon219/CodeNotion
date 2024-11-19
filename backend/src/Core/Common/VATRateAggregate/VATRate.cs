using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Common.VATRateAggregate;

public class VATRate : EntityBase, IAggregateRoot, IInternallyCoded
{
  [MaxLength(StrFieldSizes.INTERNAL_CODE), Required, FuzzySearchable]
  public string InternalCode { get; private set; } = default!;

  [MaxLength(StrFieldSizes.DESCRIPTION), Required, FuzzySearchable]
  public string? Description { get; private set; }

  public VATRateType Type { get; private set; }
  public double RatePercent { get; private set; }

  public void SetInternalCode(string internalCode) => InternalCode = internalCode;

  public void SetDescription(string? description) => Description = description;
  
  public void SetType(VATRateType type) => Type = type;

  public void SetRatePercent(double ratePercent) => RatePercent = ratePercent;

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (string.IsNullOrWhiteSpace(InternalCode))
    {
      yield return ErrorCode.VATRateInternalCodeIsNullOrEmptyString.ToValidationError();
    }

    if (string.IsNullOrWhiteSpace(Description))
    {
      yield return ErrorCode.VATRateDescriptionIsNullOrEmptyString.ToValidationError();
    }

    if (Type is VATRateType.Exempt or VATRateType.NonTaxable && RatePercent != 0d)
    {
      yield return ErrorCode.VATRatePercentShouldBeZero.ToValidationError();
    }
  }
}
