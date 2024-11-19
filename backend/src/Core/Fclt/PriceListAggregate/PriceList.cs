using Ardalis.Result;
using HotChocolate;
using RealGimm.Core.Fclt.PriceListArticleAggregate;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace RealGimm.Core.Fclt.PriceListAggregate;

public class PriceList : EntityBase, IAggregateRoot, IInternallyCoded
{
  [FuzzySearchable, MaxLength(StrFieldSizes.INTERNAL_CODE), Required]
  public string InternalCode { get; private set; } = default!;

  [FuzzySearchable, MaxLength(StrFieldSizes.NAME), Required]
  public string Name { get; private set; } = default!;

  public int Ordering { get; private set; }
  public bool IsDefault { get; private set; }
  public NullSafeCollection<PriceListArticle> Articles { get; private set; } = [];

  public void SetInternalCode(string internalCode) => InternalCode = internalCode;

  public void SetName(string name) => Name = name;

  public void SetOrdering(int ordering) => Ordering = ordering;

  public void SetIsDefault(bool isDefault) => IsDefault = isDefault;

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate() => [];
}
