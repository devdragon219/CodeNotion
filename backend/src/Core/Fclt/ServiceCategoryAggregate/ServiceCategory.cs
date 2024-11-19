using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.Core.Fclt.ServiceAggregate;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Fclt.ServiceCategoryAggregate;

public class ServiceCategory : EntityBase, IAggregateRoot, IInternallyCoded
{
  [Required, FuzzySearchable, MaxLength(StrFieldSizes.NAME)]
  public string? Name { get; private set; }

  [Required, FuzzySearchable, MaxLength(StrFieldSizes.INTERNAL_CODE)]
  public string InternalCode { get; private set; } = default!;

  public NullSafeCollection<ServiceSubCategory> SubCategories { get; } = [];
  public NullSafeCollection<Service> Services { get; } = [];

  public void SetName(string? name) => Name = name;

  public void SetInternalCode(string internalCode) => InternalCode = internalCode;

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (string.IsNullOrWhiteSpace(Name))
    {
      yield return ErrorCode.ServiceCategoryNameIsNullOrEmptyString.ToValidationError();
    }

    if (string.IsNullOrWhiteSpace(InternalCode))
    {
      yield return ErrorCode.ServiceCategoryInternalCodeIsNullOrEmptyString.ToValidationError();
    }

    foreach (var subCategory in SubCategories)
    {
      var validationErrors = subCategory.Validate().ToList();
      foreach (var validationError in validationErrors)
      {
        yield return validationError;
      }
    }
  }
}
