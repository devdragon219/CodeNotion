using Ardalis.Result;
using HotChocolate;
using RealGimm.Core.Fclt.ContractAggregate;
using RealGimm.Core.Fclt.ContractTemplateAggregate;
using RealGimm.Core.Fclt.SLAAggregate;
using RealGimm.Core.Shared;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace RealGimm.Core.Fclt.PenaltyAggregate;

public class Penalty : EntityBase, IAggregateRoot, IInternallyCoded
{
  [FuzzySearchable, MaxLength(StrFieldSizes.INTERNAL_CODE), Required]
  public string InternalCode { get; private set; } = default!;

  [FuzzySearchable, MaxLength(StrFieldSizes.DESCRIPTION), Required]
  public string Description { get; private set; } = default!;

  public ComplexTicketCondition IfCondition { get; private set; } = default!;
  public BooleanOperator ThenOperator { get; private set; }
  public NullSafeCollection<PenaltyValue> ThenPenalties { get; private set; } = [];
  public Contract? Contract { get; private set; }

  public void SetDescription(string name) => Description = name;

  public void SetInternalCode(string internalCode) => InternalCode = internalCode;

  public void SetIfCondition(ComplexTicketCondition ifCondition) => IfCondition = ifCondition;

  public void SetThenOperator(BooleanOperator @operator) => ThenOperator = @operator;
  
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
  }
}
