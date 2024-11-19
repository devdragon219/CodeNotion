using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Fclt.TicketTypeAggregate;

public class TicketType : EntityBase, IAggregateRoot, IInternallyCoded
{
  [FuzzySearchable, MaxLength(StrFieldSizes.INTERNAL_CODE), Required]
  public string InternalCode { get; private set; } = default!;
  
  [FuzzySearchable, MaxLength(StrFieldSizes.DESCRIPTION), Required]
  public string Description { get; private set; } = default!;

  public int Ordering { get; private set; }

  public void SetInternalCode(string internalCode) => InternalCode = internalCode;

  public void SetDescription(string name) => Description = name;
  
  public void SetOrdering(int ordering) => Ordering = ordering;

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (string.IsNullOrWhiteSpace(Description))
    {
      yield return ErrorCode.NameIsNullOrEmptyString.ToValidationError();
    }

    if (string.IsNullOrWhiteSpace(InternalCode))
    {
      yield return ErrorCode.InternalCodeIsNullOrEmptyString.ToValidationError();
    }
  }
}
