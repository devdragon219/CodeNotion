using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Asst.CatalogueItemAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Fclt.ContractAggregate;
using RealGimm.Core.Fclt.ContractAggregate.Specifications;
using RealGimm.Core.Fclt.TicketAggregate;
using RealGimm.Core.Fclt.TicketChecklistAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mapping;

public class AddOnTriggerChecklistTicketMapper : IMapper<AddOnTriggerChecklistTicketInput, Ticket>
{
  private readonly IReadRepository<Contract> _contractRepository;
  private readonly IReadRepository<CatalogueType> _catalogueTypeRepository;
  private readonly IReadRepository<CatalogueItem> _catalogueItemRepository;

  public AddOnTriggerChecklistTicketMapper(
    IReadRepository<CatalogueType> catalogueTypeRepository,
    IReadRepository<Contract> contractRepository,
    IReadRepository<CatalogueItem> catalogueItemRepository)
  {
    _catalogueTypeRepository = catalogueTypeRepository;
    _contractRepository = contractRepository;
    _catalogueItemRepository = catalogueItemRepository;
  }

  public async Task<Ticket?> MapAsync(AddOnTriggerChecklistTicketInput? from, Ticket? into, CancellationToken cancellationToken)
  {
    if (from is null)
    {
      return null;
    }

    if (into is not null)
    {
      throw new NotSupportedException();
    }

    var ticket = into ?? new Ticket();

    var contract = await LoadContractAsync(from.ContractId, cancellationToken);
    ticket.SetContract(contract);
    ticket.SetSupplierSubjectId(contract.ProviderSubjectId);

    var checklist = LoadTicketChecklistAsync(contract, from.TicketChecklistId);
    ticket.SetChecklist(checklist);
    ticket.SetDescription(checklist.Name);
    ticket.SetCatalogueTypeId(checklist.CatalogueTypeId);
    ticket.SetLocationEstateUnitId(checklist.EstateUnitId);

    await EnsureCatalogueItemExistsAsync(checklist.CatalogueTypeId, from.CatalogueItemId, cancellationToken);
    ticket.SetCatalogueItemIds([from.CatalogueItemId]);

    var activities = await LoadActivitiesAsync(checklist.OnTriggerActivityIds!, cancellationToken);
    
    var performedActivities = activities.Select((activity, index) =>
    {
      var performedActivity = new PerformedActivity();
      performedActivity.SetName(activity.Name!);
      performedActivity.SetOrdering(index + 1);
      performedActivity.SetStatus(PerformedActivityStatus.ToBePerformed);
      performedActivity.SetIsMandatoryByLaw(activity.IsMandatoryByLaw);

      return performedActivity;
    });

    ticket.PerformedActivities.AddRange(performedActivities);

    return ticket;
  }

  private async Task<Contract> LoadContractAsync(int contractId, CancellationToken cancellationToken)
  {
    var contract = await _contractRepository
      .AsQueryable(new GetByIdSpec<Contract>(contractId), new ContractIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken)
      ?? throw new MappingException(ErrorCode.ContractNotFound.ToValidationError());

    foreach (var sla in contract.SLAs)
    {
      await _contractRepository.LoadNavigationsAsync(sla.IfCondition, cancellationToken);
      await _contractRepository.LoadNavigationsAsync(sla.ThenCondition, cancellationToken);
    }

    foreach (var penalty in contract.Penalties)
    {
      await _contractRepository.LoadNavigationsAsync(penalty.IfCondition, cancellationToken);
    }

    return contract;
  }

  private async Task EnsureCatalogueItemExistsAsync(
    int catalogueTypeId,
    int catalogueItemId,
    CancellationToken cancellationToken)
  {
    var exists = await _catalogueItemRepository
      .AsQueryable(new GetByIdSpec<CatalogueItem>(catalogueItemId))
      .Where(catalogueItem => catalogueItem.CatalogueType.Id == catalogueTypeId)
      .AnyAsync(cancellationToken);

    if (!exists)
    {
      throw new MappingException(ErrorCode.CatalogueItemNotFound.ToValidationError());
    }
  }

  private static TicketChecklist LoadTicketChecklistAsync(Contract contract, int checklistId)
    => contract.TicketChecklists.SingleOrDefault(checklist => checklist.Id == checklistId)
        ?? throw new MappingException(ErrorCode.TicketChecklistNotFound.ToValidationError());

  private async Task<IEnumerable<CatalogueTypeActivity>> LoadActivitiesAsync(int[] activityIds, CancellationToken cancellationToken)
  {
    var activities = await _catalogueTypeRepository
      .AsQueryable()
      .AsNoTracking()
      .SelectMany(catalogueType => catalogueType.Activities)
      .Where(activity => activityIds.Contains(activity.Id))
      .ToListAsync(cancellationToken);

    if (activities.Count != activityIds.Length)
    {
      throw new MappingException(ErrorCode.CatalogueTypeActivityNotFound.ToValidationError());
    }

    return activities;
  }
}
