using RealGimm.Core;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;
using RealGimm.Core.Fclt.SLAAggregate;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;

namespace RealGimm.Web.Fclt.Mapping;

public class TicketCatalogueCategoryEqualityConditionMapper : IMapper<TicketCatalogueCategoryEqualityConditionInput, TicketCatalogueCategoryEqualityCondition>
{
  private readonly IRepository<CatalogueCategory> _catalogueCategoryRepository;

  public TicketCatalogueCategoryEqualityConditionMapper(IRepository<CatalogueCategory> cataloguerCategoryRepository)
  {
    _catalogueCategoryRepository = cataloguerCategoryRepository;
  }

  public async Task<TicketCatalogueCategoryEqualityCondition?> MapAsync(
    TicketCatalogueCategoryEqualityConditionInput? from,
    TicketCatalogueCategoryEqualityCondition? into = null,
    CancellationToken cancellationToken = default)
  {
    if (from is null)
    {
      return null;
    }

    var condition = into ?? new TicketCatalogueCategoryEqualityCondition() { Id = from.Id.GetValueOrDefault() };
    condition.SetOperator(from.Operator);

    await EnsureCatalogueCategoryExistsAsync(from.TargetCatalogueCategoryId);
    condition.SetTargetCatalogueCategoryId(from.TargetCatalogueCategoryId);

    return condition;
  }

  private async Task EnsureCatalogueCategoryExistsAsync(int catalogueCategoryId)
  {
    var exists = await _catalogueCategoryRepository.AnyAsync(new GetByIdSpec<CatalogueCategory>(catalogueCategoryId));

    if (!exists)
    {
      throw new MappingException(ErrorCode.CatalogueCategoryNotFound.ToValidationError());
    }
  }
}
