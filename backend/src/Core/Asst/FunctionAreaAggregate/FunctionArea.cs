using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Asst.FunctionAreaAggregate;

public class FunctionArea : EntityBase, IAggregateRoot, IInternallyCoded
{
  [Required, FuzzySearchable, MaxLength(StrFieldSizes.NAME)]
  public string? Name { get; private set; }

  [Required, FuzzySearchable, MaxLength(StrFieldSizes.INTERNAL_CODE)]
  public string InternalCode { get; private set; } = default!;

  public SurfaceType SurfaceType { get; private set; }

  public FunctionArea()
  {
  }

  public FunctionArea(string? name, SurfaceType surfaceType, string internalCode)
  {
    Name = name;
    SurfaceType = surfaceType;
    InternalCode = internalCode;
  }

  public void SetName(string? name) => Name = name;
  
  public void SetInternalCode(string internalCode) => InternalCode = internalCode;

  public void SetSurfaceType(SurfaceType surfaceType) => SurfaceType = surfaceType;

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (string.IsNullOrWhiteSpace(Name))
    {
      yield return ErrorCode.FunctionAreaNameIsNullOrEmptyString.ToValidationError();
    }

    if (string.IsNullOrWhiteSpace(InternalCode))
    {
      yield return ErrorCode.FunctionAreaInternalCodeIsNullOrEmptyString.ToValidationError();
    }
  }
}
