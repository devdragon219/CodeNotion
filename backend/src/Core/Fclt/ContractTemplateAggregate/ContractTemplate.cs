using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.Core.Fclt.ContractTypeAggregate;
using RealGimm.Core.Fclt.PenaltyAggregate;
using RealGimm.Core.Fclt.SLAAggregate;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Fclt.ContractTemplateAggregate;

public class ContractTemplate : EntityBase, IAggregateRoot, IInternallyCoded
{
  [FuzzySearchable, MaxLength(StrFieldSizes.DESCRIPTION), Required]
  public string Description { get; private set; } = default!;

  [FuzzySearchable, MaxLength(StrFieldSizes.INTERNAL_CODE), Required]
  public string InternalCode { get; private set; } = default!;

  public ContractType ContractType { get; private set; } = default!;
  public int[] CatalogueTypeIds { get; private set; } = [];
  
  [GraphQLName("slas")]
  public NullSafeCollection<SLA> SLAs { get; private set; } = [];

  public NullSafeCollection<Penalty> Penalties { get; private set; } = [];

  public void SetData(string description, string internalCode, ContractType contractType)
  {
    Description = description;
    InternalCode = internalCode;
    ContractType = contractType;
  }

  public void SetCatalogueTypeIds(int[] catalogueTypeIds)
    => CatalogueTypeIds = catalogueTypeIds.Distinct().ToArray();

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
