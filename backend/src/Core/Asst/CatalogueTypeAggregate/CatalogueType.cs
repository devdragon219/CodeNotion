using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Core.Asst.CatalogueItemAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Asst.CatalogueTypeAggregate;

public class CatalogueType : EntityBase, IAggregateRoot, IInternallyCoded
{
  private readonly List<CatalogueItem> _items = new();

  [Required, FuzzySearchable, MaxLength(StrFieldSizes.NAME)]
  public string? Name { get; private set; }

  [Required, FuzzySearchable, MaxLength(StrFieldSizes.INTERNAL_CODE)]
  public string InternalCode { get; private set; } = default!;

  [MaxLength(StrFieldSizes.NOTES)]
  public string? Notes { get; private set; }

  public CatalogueCategory Category { get; private set; } = default!;
  public CatalogueSubCategory? SubCategory { get; private set; }
  public IReadOnlyList<CatalogueItem> Items => _items.AsReadOnly();
  public NullSafeCollection<CatalogueTypeActivity> Activities { get; private set; } = new();
  public CatalogueTypeField[][]? Fields { get; private set; }
  
  private readonly List<EstateUsageType> _usageTypes = new();

  public IReadOnlyList<EstateUsageType> UsageTypes => _usageTypes.AsReadOnly();

  public void SetCategory(CatalogueCategory category, CatalogueSubCategory? subCategory = null)
  {
    Category = category;
    SubCategory = subCategory;
  }

  public void SetName(string? name) => Name = name;

  public void SetInternalCode(string internalCode) => InternalCode = internalCode;

  public void SetNotes(string? notes) => Notes = notes;

  public void SetUsageTypes(IEnumerable<EstateUsageType> usageTypes)
  {
    ArgumentNullException.ThrowIfNull(usageTypes);

    _usageTypes.Clear();
    _usageTypes.AddRange(usageTypes);
  }

  public void SetFields(CatalogueTypeField[][]? fields) => Fields = fields;

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (string.IsNullOrWhiteSpace(Name))
    {
      yield return ErrorCode.CatalogueTypeNameIsNullOrEmptyString.ToValidationError();
    }

    if (string.IsNullOrWhiteSpace(InternalCode))
    {
      yield return ErrorCode.CatalogueTypeInternalCodeIsNullOrEmptyString.ToValidationError();
    }

    if (Category is null)
    {
      yield return ErrorCode.CatalogueTypeCategoryIsNull.ToValidationError();
    }

    if (Category is not null && SubCategory is not null && !Category.SubCategories.Contains(SubCategory))
    {
      yield return ErrorCode.CatalogueTypeInvalidSubCategory.ToValidationError();
    }

    if (Fields is null || Fields.Any(row => row is null || row.Length < 1 || row.Length > 4))
    {
      yield return ErrorCode.CatalogueTypeInvalidFields.ToValidationError();
    }
  }
}
