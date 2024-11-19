using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.Core.Fclt.ContractAggregate;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Fclt.SLAAggregate;

public class SLA : EntityBase, IAggregateRoot, IInternallyCoded
{
  [FuzzySearchable, MaxLength(StrFieldSizes.INTERNAL_CODE), Required]
  public string InternalCode { get; private set; } = default!;

  [FuzzySearchable, MaxLength(StrFieldSizes.DESCRIPTION), Required]
  public string Description { get; private set; } = default!;

  public ComplexTicketCondition IfCondition { get; private set; } = default!;
  public ComplexTicketCondition ThenCondition { get; private set; } = default!;
  public Contract? Contract { get; private set; }

  public void SetDescription(string description) => Description = description;
  
  public void SetInternalCode(string internalCode) => InternalCode = internalCode;

  public void SetIfCondition(ComplexTicketCondition ifCondition) => IfCondition = ifCondition;

  public void SetThenCondition(ComplexTicketCondition thenCondition) => ThenCondition = thenCondition;
  
  public void SetContract(Contract? contract) => Contract = contract;

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

    foreach (var validationError in IfCondition.Validate())
    {
      yield return validationError;
    }

    foreach (var validationError in ThenCondition.Validate())
    {
      yield return validationError;
    }
  }
}
