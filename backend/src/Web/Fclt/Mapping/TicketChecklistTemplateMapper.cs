using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate.Specifications;
using RealGimm.Core.Fclt.CraftAggregate;
using RealGimm.Core.Fclt.InterventionTypeAggregate;
using RealGimm.Core.Fclt.TicketChecklistTemplateAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mapping;

public class TicketChecklistTemplateMapper : IMapper<TicketChecklistTemplateInput, TicketChecklistTemplate>
{
  private readonly IReadRepository<CatalogueType> _catalogueTypeRepository;
  private readonly IReadRepository<InterventionType> _interventionTypeRepository;
  private readonly IReadRepository<Craft> _craftRepository;

  public TicketChecklistTemplateMapper(
    IReadRepository<CatalogueType> catalogueTypeRepository,
    IReadRepository<InterventionType> interventionTypeRepository,
    IReadRepository<Craft> craftRepository)
  {
    _catalogueTypeRepository = catalogueTypeRepository;
    _interventionTypeRepository = interventionTypeRepository;
    _craftRepository = craftRepository;
  }

  public async Task<TicketChecklistTemplate?> MapAsync(
    TicketChecklistTemplateInput? from,
    TicketChecklistTemplate? into = null,
    CancellationToken cancellationToken = default)
  {
    if (from is null)
    {
      return null;
    }

    var catalogueType = await _catalogueTypeRepository
      .AsQueryable(new GetByIdSpec<CatalogueType>(from.CatalogueTypeId), new CatalogueTypeIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken)
      ?? throw new MappingException(ErrorCode.CatalogueTypeNotFound.ToValidationError());

    if (catalogueType.SubCategory is null)
    {
      throw new MappingException(ErrorCode.CatalogueTypeHasNoSubCategory.ToValidationError());
    }

    var template = into ?? new TicketChecklistTemplate();
    template.SetBaseData(from.Type, from.Name, from.InternalCode);
    template.SetCatalogueTypeId(from.CatalogueTypeId);
    template.SetCosts(from.RawWorkCost, from.SafetyCost, from.CostBaseFactor);
    
    template.SetPreventativeSpecifics(
      from.PreventativePlannedPeriod,
      from.PreventativeDaysOfWeek,
      from.PreventativeToleranceDays,
      await LoadInterventionTypeAsync(from.PreventativeInterventionTypeId, cancellationToken),
      await LoadCraftAsync(from.PreventativeCraftId, cancellationToken),
      from.PreventativeActivityIds);

    template.SetOnTriggerSpecifics(
      await LoadInterventionTypeAsync(from.OnTriggerInterventionTypeId, cancellationToken),
      await LoadCraftAsync(from.OnTriggerCraftId, cancellationToken),
      from.OnTriggerActivityIds);

    return template;
  }

  private async Task<InterventionType?> LoadInterventionTypeAsync(int? interventionTypeId, CancellationToken cancellationToken)
  {
    if (interventionTypeId is null)
    {
      return null;
    }

    return await _interventionTypeRepository
      .AsQueryable(new GetByIdSpec<InterventionType>(interventionTypeId.Value))
      .SingleOrDefaultAsync(cancellationToken)
      ?? throw new MappingException(ErrorCode.InterventionTypeNotFound.ToValidationError());
  }

  private async Task<Craft?> LoadCraftAsync(int? craftId, CancellationToken cancellationToken)
  {
    if (craftId is null)
    {
      return null;
    }

    return await _craftRepository
      .AsQueryable(new GetByIdSpec<Craft>(craftId.Value))
      .SingleOrDefaultAsync(cancellationToken)
      ?? throw new MappingException(ErrorCode.CraftNotFound.ToValidationError());
  }
}
