using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.Core.Fclt.ServiceCategoryAggregate;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Fclt.ServiceAggregate;

public class Service : EntityBase, IAggregateRoot, IInternallyCoded
{
  [Required, FuzzySearchable, MaxLength(StrFieldSizes.NAME)]
  public string? Name { get; private set; }

  [Required, FuzzySearchable, MaxLength(StrFieldSizes.INTERNAL_CODE)]
  public string InternalCode { get; private set; } = default!;


  public ServiceCategory Category { get; private set; } = default!;
  public ServiceSubCategory SubCategory { get; private set; } = default!;
  public NullSafeCollection<ServiceActivity> Activities { get; private set; } = [];

  public void SetCategory(ServiceCategory category, ServiceSubCategory subCategory)
  {
    Category = category;
    SubCategory = subCategory;
  }

  public void SetName(string? name) => Name = name;

  public void SetInternalCode(string internalCode) => InternalCode = internalCode;

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (string.IsNullOrWhiteSpace(Name))
    {
      yield return ErrorCode.ServiceNameIsNullOrEmptyString.ToValidationError();
    }

    if (string.IsNullOrWhiteSpace(InternalCode))
    {
      yield return ErrorCode.ServiceInternalCodeIsNullOrEmptyString.ToValidationError();
    }

    if (Category is null)
    {
      yield return ErrorCode.ServiceCategoryIsNull.ToValidationError();
    }

    if (Category is not null && SubCategory is not null && !Category.SubCategories.Contains(SubCategory))
    {
      yield return ErrorCode.ServiceInvalidSubCategory.ToValidationError();
    }
  }
}
