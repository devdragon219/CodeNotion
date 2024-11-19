using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;
using RealGimm.Core.Fclt.SLAAggregate;

namespace RealGimm.Web.Fclt.Mapping;

public class TicketConditionMapper : IMapper<TicketConditionInput, TicketCondition>
{
  private readonly IMapper _mapper;

  public TicketConditionMapper(IMapper mapper)
  {
    _mapper = mapper;
  }

  public async Task<TicketCondition?> MapAsync(
    TicketConditionInput? from,
    TicketCondition? into = null,
    CancellationToken cancellationToken = default)
  {
    if (from is null)
    {
      return null;
    }

    if (from is ComplexTicketConditionInput complexConditionInput)
    {
      return await _mapper.MapAsync(complexConditionInput, (ComplexTicketCondition?)into, cancellationToken);
    }

    if (from is TicketTypeEqualityConditionInput ticketTypeEqualityConditionInput)
    {
      return await _mapper.MapAsync(ticketTypeEqualityConditionInput, (TicketTypeEqualityCondition?)into, cancellationToken);
    }

    if (from is TicketMasterStatusConditionInput masterStatusConditionInput)
    {
      return await _mapper.MapAsync(masterStatusConditionInput, (TicketMasterStatusCondition?)into, cancellationToken);
    }

    if (from is TicketCatalogueCategoryEqualityConditionInput catalogueCategoryEqualityConditionInput)
    {
      return await _mapper.MapAsync(catalogueCategoryEqualityConditionInput, (TicketCatalogueCategoryEqualityCondition?)into, cancellationToken);
    }

    if (from is TicketCatalogueSubCategoryEqualityConditionInput catalogueSubCategoryEqualityConditionInput)
    {
      return await _mapper.MapAsync(catalogueSubCategoryEqualityConditionInput, (TicketCatalogueSubCategoryEqualityCondition?)into, cancellationToken);
    }

    if (from is TicketCatalogueTypeEqualityConditionInput catalogueTypeEqualityConditionInput)
    {
      return await _mapper.MapAsync(catalogueTypeEqualityConditionInput, (TicketCatalogueTypeEqualityCondition?)into, cancellationToken);
    }

    if (from is TicketPriorityEqualityConditionInput priorityEqualityConditionInput)
    {
      return await _mapper.MapAsync(priorityEqualityConditionInput, (TicketPriorityEqualityCondition?)into, cancellationToken);
    }

    throw new NotImplementedException();
  }
}
