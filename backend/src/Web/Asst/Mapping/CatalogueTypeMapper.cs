using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Core.Asst.CatalogueCategoryAggregate.Specifications;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Web.Asst.Models;
using RealGimm.WebCommons.Extensions;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Asst.Mapping;

public sealed class CatalogueTypeMapper : IMapper<CatalogueTypeInput, CatalogueType>
{
  private readonly IMapper _mapper;
  private readonly IReadRepository<CatalogueCategory> _categoryRepository;
  private readonly IReadRepository<EstateUsageType> _usageTypes;

  public CatalogueTypeMapper(IMapper mapper,
    IReadRepository<CatalogueCategory> categoryRepository,
    IReadRepository<EstateUsageType> usageTypes)
  {
    _mapper = mapper;
    _categoryRepository = categoryRepository;
    _usageTypes = usageTypes;
  }

  public async Task<CatalogueType?> MapAsync(
    CatalogueTypeInput? from,
    CatalogueType? into,
    CancellationToken cancellationToken = default)
  {
    if (from is null)
    {
      return null;
    }

    var type = into ?? new CatalogueType();
    type.SetName(from.Name);
    type.SetInternalCode(from.InternalCode);
    type.SetNotes(from.Notes);
    type.SetUsageTypes(
      await _usageTypes
        .AsQueryable(new GetByIdsSpec<EstateUsageType>(from.UsageTypeIds))
        .ToListAsync(cancellationToken: cancellationToken)
    );
    type.SetFields(await MapFieldsAsync(from.Fields, cancellationToken));

    await _mapper.UpdateCollectionAsync(from.Activities, type.Activities, cancellationToken);

    var category = await _categoryRepository
      .AsQueryable(new GetByIdSpec<CatalogueCategory>(from.CategoryId), new CatalogueCategoryIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);
    
    MappingException.ThrowIfNull(category, ErrorCode.CatalogueTypeNonExistingCategory.ToValidationError());

    if (from.SubCategoryId.HasValue)
    {
      var subCategory = category.SubCategories.SingleOrDefault(subCategory => subCategory.Id == from.SubCategoryId);
      MappingException.ThrowIfNull(subCategory, ErrorCode.CatalogueTypeNonExistingSubCategory.ToValidationError());
      
      type.SetCategory(category, subCategory);
    }
    else
    {
      type.SetCategory(category);
    }
    
    return type;
  }

  private async Task<CatalogueTypeField[][]> MapFieldsAsync(
    CatalogueTypeFieldInput[][]? from,
    CancellationToken cancellationToken)
  {
    if (from is null)
    {
      return Array.Empty<CatalogueTypeField[]>();
    }

    var fields = new CatalogueTypeField[from.Length][];

    for (int i = 0; i < from.Length; i++)
    {
      var row = await _mapper.MapAsync<CatalogueTypeFieldInput, CatalogueTypeField>(from[i], cancellationToken);
      fields[i] = row!.ToArray()!;
    }

    return fields;
  }
}
