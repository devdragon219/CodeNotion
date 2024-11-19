using RealGimm.Core;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;
using RealGimm.Core.Fclt.SLAAggregate;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using Microsoft.EntityFrameworkCore;

namespace RealGimm.Web.Fclt.Mapping;

public class TicketCatalogueSubCategoryEqualityConditionMapper : IMapper<TicketCatalogueSubCategoryEqualityConditionInput, TicketCatalogueSubCategoryEqualityCondition>
{
  private readonly IRepository<CatalogueCategory> _catalogueCategoryRepository;

  public TicketCatalogueSubCategoryEqualityConditionMapper(IRepository<CatalogueCategory> cataloguerCategoryRepository)
  {
    _catalogueCategoryRepository = cataloguerCategoryRepository;
  }

  public async Task<TicketCatalogueSubCategoryEqualityCondition?> MapAsync(
    TicketCatalogueSubCategoryEqualityConditionInput? from,
    TicketCatalogueSubCategoryEqualityCondition? into = null,
    CancellationToken cancellationToken = default)
  {
    if (from is null)
    {
      return null;
    }

    var condition = into ?? new TicketCatalogueSubCategoryEqualityCondition() { Id = from.Id.GetValueOrDefault() };
    condition.SetOperator(from.Operator);

    await EnsureCatalogueSubCategoryExistsAsync(from.TargetCatalogueSubCategoryId);
    condition.SetTargetCatalogueSubCategoryId(from.TargetCatalogueSubCategoryId);

    return condition;
  }

  private async Task EnsureCatalogueSubCategoryExistsAsync(int catalogueSubCategoryId)
  {
    var exists = await _catalogueCategoryRepository
      .AsQueryable()
      .SelectMany(catalogueCategory => catalogueCategory.SubCategories)
      .AnyAsync(catalogueSubCategory => catalogueSubCategory.Id == catalogueSubCategoryId);

    if (!exists)
    {
      throw new MappingException(ErrorCode.CatalogueSubCategoryNotFound.ToValidationError());
    }
  }
}
