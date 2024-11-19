using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.Core.Fclt.ContractAggregate;
using RealGimm.Core.Fclt.ContractTemplateAggregate;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Fclt.ContractTypeAggregate;

[GraphQLName($"{nameof(Fclt)}{nameof(ContractType)}")]
public class ContractType : EntityBase, IAggregateRoot, IInternallyCoded
{
  [FuzzySearchable, MaxLength(StrFieldSizes.NAME), Required]
  public string Name { get; private set; } = default!;

  [FuzzySearchable, MaxLength(StrFieldSizes.INTERNAL_CODE), Required]
  public string InternalCode { get; private set; } = default!;

  public int Ordering { get; private set; }

  public NullSafeCollection<Contract> Contracts { get; private set; } = [];
  public NullSafeCollection<ContractTemplate> ContractTemplates { get; private set; } = [];

  public void SetData(string name, string internalCode, int ordering)
  {
    Name = name;
    InternalCode = internalCode;
    Ordering = ordering;
  }

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
