using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Asst.EstateUsageTypeAggregate;

public class EstateUsageType : EntityBase, IAggregateRoot, IInternallyCoded
{
  [Required, FuzzySearchable, MaxLength(StrFieldSizes.NAME)]
  public string? Name { get; private set; }

  [Required, FuzzySearchable, MaxLength(StrFieldSizes.INTERNAL_CODE)]
  public string InternalCode { get; private set; } = default!;
  public int Ordering { get; private set; }
  public bool IsForEstate { get; private set; }
  public bool IsForEstateUnit { get; private set; }
  public bool IsForEstateSubUnit { get; private set; }
  public bool IsForContracts { get; private set; }

  public void SetName(string name) => Name = name;

  public void SetInternalCode(string internalCode) => InternalCode = internalCode;

  public void SetOrdering(int newValue) => Ordering = newValue;
  public void SetUsage(
    bool isForEstate,
    bool isForEstateUnit,
    bool isForEstateSubUnit,
    bool isForContracts)
  {
    IsForContracts = isForContracts;
    IsForEstate = isForEstate;
    IsForEstateUnit = isForEstateUnit;
    IsForEstateSubUnit = isForEstateSubUnit;
  }

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (string.IsNullOrWhiteSpace(Name))
    {
      yield return ErrorCode.EstateUsageTypeNameIsNullOrEmptyString.ToValidationError();
    }
  }
}
