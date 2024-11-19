using RealGimm.Core;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;
using RealGimm.Core.Fclt.SLAAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate;

namespace RealGimm.Web.Fclt.Mapping;

public class TicketCatalogueTypeEqualityConditionMapper : IMapper<TicketCatalogueTypeEqualityConditionInput, TicketCatalogueTypeEqualityCondition>
{
  private readonly IRepository<CatalogueType> _catalogueTypeRepository;

  public TicketCatalogueTypeEqualityConditionMapper(IRepository<CatalogueType> cataloguerTypeRepository)
  {
    _catalogueTypeRepository = cataloguerTypeRepository;
  }

  public async Task<TicketCatalogueTypeEqualityCondition?> MapAsync(
    TicketCatalogueTypeEqualityConditionInput? from,
    TicketCatalogueTypeEqualityCondition? into = null,
    CancellationToken cancellationToken = default)
  {
    if (from is null)
    {
      return null;
    }

    var condition = into ?? new TicketCatalogueTypeEqualityCondition() { Id = from.Id.GetValueOrDefault() };
    condition.SetOperator(from.Operator);

    await EnsureCatalogueTypeExistsAsync(from.TargetCatalogueTypeId);
    condition.SetTargetCatalogueTypeId(from.TargetCatalogueTypeId);

    return condition;
  }

  private async Task EnsureCatalogueTypeExistsAsync(int catalogueTypeId)
  {
    var exists = await _catalogueTypeRepository.AnyAsync(new GetByIdSpec<CatalogueType>(catalogueTypeId));

    if (!exists)
    {
      throw new MappingException(ErrorCode.CatalogueTypeNotFound.ToValidationError());
    }
  }
}
