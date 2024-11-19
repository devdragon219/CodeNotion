using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Fclt.EstateUnitGroupAggregate;

public class EstateUnitGroup : EntityBase, IAggregateRoot, IInternallyCoded
{
  [FuzzySearchable, MaxLength(StrFieldSizes.NAME), Required]
  public string Name { get; private set; } = default!;

  [FuzzySearchable, MaxLength(StrFieldSizes.INTERNAL_CODE), Required]
  public string InternalCode { get; private set; } = default!;

  public int ManagementSubjectId { get; private set; }

  public int[] EstateUnitIds { get; private set; } = default!;

  public void SetData(string name, string internalCode, int managementSubjectId)
  {
    Name = name;
    InternalCode = internalCode;
    ManagementSubjectId = managementSubjectId;
  }

  public void SetEstateUnitIds(int[] estateUnitIds)
  {
    EstateUnitIds = estateUnitIds.Distinct().ToArray();
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
