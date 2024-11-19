using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Fclt.ContractAggregate;
using RealGimm.Core.Fclt.ContractTemplateAggregate;
using RealGimm.Core.Fclt.PriceListArticleAggregate;
using RealGimm.Core.Fclt.TicketAggregate;
using RealGimm.Core.Fclt.TicketChecklistAggregate;
using RealGimm.Core.Fclt.TicketChecklistTemplateAggregate;
using RealGimm.Core.Shared.Interfaces;

namespace RealGimm.Core.Asst.Services;

public class CatalogueTypeDeleteRestrictionChecker : IDeleteRestrictionChecker<CatalogueType>
{
  private readonly IReadRepository<TicketChecklistTemplate> _ticketChecklistTemplateRepository;
  private readonly IReadRepository<TicketChecklist> _ticketChecklistRepository;
  private readonly IReadRepository<Ticket> _ticketRepository;
  private readonly IReadRepository<PriceListArticle> _priceListArticleRepository;
  private readonly IReadRepository<Contract> _contractRepository;
  private readonly IReadRepository<ContractTemplate> _contractTemplateRepository;

  public CatalogueTypeDeleteRestrictionChecker(
    IReadRepository<TicketChecklistTemplate> ticketChecklistTemplateRepository,
    IReadRepository<TicketChecklist> ticketChecklistRepository,
    IReadRepository<Ticket> ticketRepository,
    IReadRepository<PriceListArticle> priceListArticleRepository,
    IReadRepository<Contract> contractRepository,
    IReadRepository<ContractTemplate> contractTemplateRepository)
  {
    _ticketChecklistTemplateRepository = ticketChecklistTemplateRepository;
    _ticketChecklistRepository = ticketChecklistRepository;
    _ticketRepository = ticketRepository;
    _priceListArticleRepository = priceListArticleRepository;
    _contractRepository = contractRepository;
    _contractTemplateRepository = contractTemplateRepository;
  }

  public async Task<bool> HasRestrictionsAsync(int entityId, CancellationToken cancellationToken = default)
  {
    return
      await IsUsedInAnyTicketChecklistTemplate(entityId, cancellationToken) ||
      await IsUsedInAnyTicketChecklist(entityId, cancellationToken) ||
      await IsUsedInAnyTicket(entityId, cancellationToken) ||
      await IsUsedInAnyPriceListArticle(entityId, cancellationToken) ||
      await IsUsedInAnyContract(entityId, cancellationToken) ||
      await IsUsedInAnyContractTemplate(entityId, cancellationToken);
  }

  private Task<bool> IsUsedInAnyTicketChecklistTemplate(int catalogueTypeId, CancellationToken cancellationToken)
    => _ticketChecklistTemplateRepository
        .AsQueryable()
        .Where(template => template.CatalogueTypeId == catalogueTypeId)
        .AnyAsync(cancellationToken);

  private Task<bool> IsUsedInAnyTicketChecklist(int catalogueTypeId, CancellationToken cancellationToken)
    => _ticketChecklistRepository
        .AsQueryable()
        .Where(checklist => checklist.CatalogueTypeId == catalogueTypeId)
        .AnyAsync(cancellationToken);

  private Task<bool> IsUsedInAnyTicket(int catalogueTypeId, CancellationToken cancellationToken)
    => _ticketRepository
        .AsQueryable()
        .Where(ticket => ticket.CatalogueTypeId == catalogueTypeId)
        .AnyAsync(cancellationToken);

  private Task<bool> IsUsedInAnyPriceListArticle(int catalogueTypeId, CancellationToken cancellationToken)
    => _priceListArticleRepository
        .AsQueryable()
        .Where(article => article.CatalogueTypeIds.Contains(catalogueTypeId))
        .AnyAsync(cancellationToken);

  private Task<bool> IsUsedInAnyContract(int catalogueTypeId, CancellationToken cancellationToken)
    => _contractRepository
        .AsQueryable()
        .Where(contract => contract.CatalogueTypeIds.Contains(catalogueTypeId))
        .AnyAsync(cancellationToken);

  private Task<bool> IsUsedInAnyContractTemplate(int catalogueTypeId, CancellationToken cancellationToken)
    => _contractTemplateRepository
        .AsQueryable()
        .Where(template => template.CatalogueTypeIds.Contains(catalogueTypeId))
        .AnyAsync(cancellationToken);
}
