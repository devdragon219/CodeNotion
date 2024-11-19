using System.ComponentModel.DataAnnotations;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Common.AccountingItemAggregate;

public class AccountingItem : EntityBase, IAggregateRoot, IInternallyCoded
{
  [MaxLength(StrFieldSizes.DESCRIPTION), Required, FuzzySearchable]
  public string Description { get; private set; } = default!;

  [MaxLength(StrFieldSizes.INTERNAL_CODE), Required, FuzzySearchable]
  public string InternalCode { get; private set; } = default!;

  [MaxLength(StrFieldSizes.EXTERNAL_CODE), FuzzySearchable]
  public string ExternalCode { get; private set; } = default!;

  public void SetCodes(string internalCode, string externalCode)
  {
    InternalCode = internalCode;
    ExternalCode = externalCode;
  }

  public void SetDescription(string description)
  {
    Description = description;
  }
}
