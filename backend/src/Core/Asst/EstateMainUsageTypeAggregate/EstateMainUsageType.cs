using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Asst.EstateMainUsageTypeAggregate;

public class EstateMainUsageType : EntityBase, IAggregateRoot, IInternallyCoded
{
  [Required, FuzzySearchable, MaxLength(StrFieldSizes.NAME)]
  public string? Name { get; private set; }
  [Required, FuzzySearchable, MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string InternalCode { get; private set; } = default!;
  public int Ordering { get; private set; }

  public void SetName(string name) => Name = name;
  public void SetInternalCode(string internalCode) => InternalCode = internalCode;
  public void SetOrdering(int newValue) => Ordering = newValue;

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (string.IsNullOrWhiteSpace(Name))
    {
      yield return ErrorCode.EstateMainUsageTypeNameIsNullOrEmptyString.ToValidationError();
    }
  }
}
