using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Fclt.QualificationLevelAggregate;

public class QualificationLevel : EntityBase, IAggregateRoot, IInternallyCoded
{
  [FuzzySearchable, MaxLength(StrFieldSizes.INTERNAL_CODE), Required]
  public string InternalCode { get; private set; } = default!;
  
  [FuzzySearchable, MaxLength(StrFieldSizes.NAME), Required]
  public string Name { get; private set; } = default!;

  public int Ordering { get; private set; }

  public void SetInternalCode(string internalCode) => InternalCode = internalCode;

  public void SetName(string name) => Name = name;

  public void SetOrdering(int ordering) => Ordering = ordering;

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (string.IsNullOrWhiteSpace(Name))
    {
      yield return ErrorCode.NameIsNullOrEmptyString.ToValidationError();
    }

    if (string.IsNullOrWhiteSpace(InternalCode))
    {
      yield return ErrorCode.InternalCodeIsNullOrEmptyString.ToValidationError();
    }
  }
}
