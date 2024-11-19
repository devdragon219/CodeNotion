using System.ComponentModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Quartz;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Common;
using RealGimm.Core.Extensions;
using RealGimm.Core.Fclt.ContractAggregate;
using RealGimm.Core.Fclt.ContractAggregate.Specifications;
using RealGimm.Core.Fclt.TicketAggregate.TicketHistory;
using RealGimm.Core.Fclt.TicketChecklistAggregate;
using RealGimm.Core.Fclt.TicketChecklistTemplateAggregate;
using RealGimm.Core.Mtnt.TenantAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Fclt.TicketAggregate.Tasks;

[DisallowConcurrentExecution]
[DefaultCronSchedule("0 30 0 * * ?")]
[Description("Mark old tickets as expired and generate next scheduled tickets")]
public sealed class TicketJob : AnyTenantJob
{
  private readonly ILogger<TicketJob> _logger;

  public TicketJob(
    IReadRepository<Tenant> tenantsRepository,
    IServiceProvider serviceProvider,
    ILogger<TicketJob> logger)
    : base(tenantsRepository, serviceProvider)
  {
    _logger = logger;
  }

  public override async Task ExecuteTenant(IJobExecutionContext context, IServiceProvider scopedProvider, Guid tenantId)
  {
    var contractRepository = scopedProvider.GetRequiredService<IRepository<Contract>>();
    var catalogueTypeRepository = scopedProvider.GetRequiredService<IRepository<CatalogueType>>();
    var ticketRepository = scopedProvider.GetRequiredService<IRepository<Ticket>>();
    var ticketCodeSuggestor = scopedProvider.GetRequiredService<ICodeSuggestor<Ticket>>();

    _logger.LogInformation("Marking overdue tickets (MPP) for tenant {tenantId}", tenantId);
    
    var (Total, MarkedOverdue) = await MarkOverduePlannedPeriodTicketsAsync(ticketRepository, context.CancellationToken);
    _logger.LogInformation("Overdue tickets (MPP) for tenant {tenantId} are marked ({marked}/{total})",
      tenantId,
      MarkedOverdue,
      Total);

    _logger.LogInformation("Generating tickets (MPP) for tenant {tenantId}", tenantId);
    
    var generated = await GeneratePlannedTickets(
      contractRepository,
      ticketRepository,
      ticketCodeSuggestor,
      catalogueTypeRepository,
      context.CancellationToken);
    
    _logger.LogInformation("Tickets (MPP) for tenant {tenantId} are generated ({generated})",
      tenantId,
      generated);
  }

  private static async Task<(int Total, int MarkedOverdue)> MarkOverduePlannedPeriodTicketsAsync(
    IRepository<Ticket> ticketRepository,
    CancellationToken cancellationToken)
  {
    var tickets = await ticketRepository
      .AsQueryable()
      .Where(ticket =>
        ticket.MainType == TicketMainType.ChecklistPreventative &&
        ticket.MasterStatus == TicketMasterStatus.New)
      .ToListAsync(cancellationToken);

    int marked = 0;

    foreach (var ticket in tickets)
    {
      var maxDateToStartWorkingOnTicket = ticket.RequestDateTime.AddDays(ticket.Checklist?.PreventativeToleranceDays ?? 0);

      if (DateTime.Now > maxDateToStartWorkingOnTicket
        && !ticket.IsOverduePlannedPeriod)
      {
        ticket.SetIsOverduePlannedPeriod(true);
        marked++;
      }
    }

    await ticketRepository.SaveChangesAsync(cancellationToken);

    return (tickets.Count, marked);
  }

  private static async Task<int> GeneratePlannedTickets(
    IRepository<Contract> contractRepository,
    IRepository<Ticket> ticketRepository,
    ICodeSuggestor<Ticket> ticketCodeSuggestor,
    IRepository<CatalogueType> catalogueTypeRepository,
    CancellationToken cancellationToken)
  {
    var activeContracts = await contractRepository
      .AsQueryable(new ContractIncludeAllSpec())
      .Where(contract => contract.EntryStatus == EntryStatus.Working)
      .ToListAsync(cancellationToken);

    int generated = 0;

    foreach (var contract in activeContracts)
    {
      var contractExpirationDate = contract.ExpirationDate.AddDays(
        contract.TermExtensions.Select(extension => extension.DaysCount).DefaultIfEmpty(0).Sum());

      foreach (var checklist in contract.TicketChecklists)
      {
        if (checklist.Type is not TicketChecklistTemplateType.Preventative &&
          checklist.Type is not TicketChecklistTemplateType.PreventativeAndOnTriggerCondition)
        {
          // skipping non-preventive checklist
          continue;
        }

        var catalogueItemIds = await LoadCatalogueItemIdsAsync(
          checklist.CatalogueTypeId,
          checklist.EstateUnitId,
          catalogueTypeRepository,
          cancellationToken);

        foreach (var catalogueItemId in catalogueItemIds)
        {
          var lastTicket = await ticketRepository
            .AsQueryable()
            .Where(ticket =>
              ticket.MainType == TicketMainType.ChecklistPreventative &&
              ticket.Checklist!.Id == checklist.Id &&
              ticket.CatalogueItemIds.Contains(catalogueItemId))
            .OrderByDescending(ticket => ticket.RequestDateTime)
            .FirstOrDefaultAsync(cancellationToken);

          if (lastTicket is not null && !lastTicket.IsOverduePlannedPeriod)
          {
            // skipping creating ticket in case of the same one already exist and not overdue
            continue;
          }

          var requestDate = GetNearestPlannedDate(
            referenceDate: lastTicket?.RequestDateTime.ToDateOnly() ?? contract.EffectiveDate,
            minNearestDate: DateTime.Now.ToDateOnly(),
            checklist.PreventativePlannedPeriod!.Value,
            checklist.PreventativeDaysOfWeek);

          if (requestDate > contractExpirationDate)
          {
            // skipping creating ticket in case of the request date is after the contract expiration date
            continue;
          }

          // due date = one day before the next planned date or contract expiration date
          var dueDate = GetNearestPlannedDate(
            requestDate,
            minNearestDate: requestDate.AddDays(1),
            checklist.PreventativePlannedPeriod!.Value,
            checklist.PreventativeDaysOfWeek)
            .AddDays(-1);

          if (dueDate > contractExpirationDate)
          {
            dueDate = contractExpirationDate;
          }

          var ticket = await CreatePreventiveTicketCheklistAsync(
            checklist,
            requestDate,
            dueDate,
            checklist.EstateUnitId,
            catalogueItemId,
            contract,
            ticketCodeSuggestor,
            catalogueTypeRepository,
            cancellationToken);

          ticketRepository.AddSuspend(ticket);

          generated++;
        }
      }
    }

    await ticketRepository.SaveChangesAsync(cancellationToken);

    return generated;
  }

  private static DateOnly GetNearestPlannedDate(
    DateOnly referenceDate,
    DateOnly minNearestDate,
    PlannedPeriod plannedPeriod,
    DayOfWeek[]? daysOfWeek)
  {
    if (referenceDate >= minNearestDate)
    {
      return referenceDate;
    }

    var newReferenceDate = referenceDate.GetNextPlannedDate(plannedPeriod, daysOfWeek);

    return GetNearestPlannedDate(newReferenceDate, minNearestDate, plannedPeriod, daysOfWeek);
  }

  private static async Task<Ticket> CreatePreventiveTicketCheklistAsync(
    TicketChecklist checklist,
    DateOnly requestDate,
    DateOnly dueDate,
    int estateUnitId,
    int catalogueItemId,
    Contract contract,
    ICodeSuggestor<Ticket> codeSuggestor,
    IRepository<CatalogueType> catalogueTypeRepository,
    CancellationToken cancellationToken)
  {
    var ticket = new Ticket();
    ticket.SetMainType(TicketMainType.ChecklistPreventative);
    ticket.SetMasterStatus(TicketMasterStatus.New);
    ticket.SetRequestDateTime(requestDate.ToDateTime(TimeOnly.MinValue, DateTimeKind.Utc));
    ticket.SetDueDate(dueDate);
    ticket.SetPriority(Priority.Normal);
    ticket.SetContract(contract);
    ticket.SetSupplierSubjectId(contract.ProviderSubjectId);
    ticket.SetLocationEstateUnitId(estateUnitId);
    ticket.SetChecklist(checklist);
    ticket.SetDescription(checklist.Name);
    ticket.SetCatalogueTypeId(checklist.CatalogueTypeId);
    ticket.SetCatalogueItemIds([catalogueItemId]);

    var performedActivities = await CreatePerformedActivitiesAsync(
      checklist.PreventativeActivityIds!,
      catalogueTypeRepository,
      cancellationToken);

    ticket.PerformedActivities.AddRange(performedActivities);

    ticket.SetInternalCode((await codeSuggestor.SuggestNextCode(partialEntity: ticket))!);

    var initialStatusHistoryEntry = CreateInitialStatusHistoryEntry(ticket);
    ticket.History.Add(initialStatusHistoryEntry);

    return ticket;
  }

  private static async Task<int[]> LoadCatalogueItemIdsAsync(
    int catalogueTypeId,
    int estateUnitId,
    IRepository<CatalogueType> catalogueTypeRepository,
    CancellationToken cancellationToken)
  {
    var catalogueItemIds = await catalogueTypeRepository
      .AsQueryable(new GetByIdSpec<CatalogueType>(catalogueTypeId))
      .SelectMany(catalogueType => catalogueType.Items)
      .Where(catalogueItem => catalogueItem.Estate.EstateUnits.Any(estateUnit => estateUnit.Id == estateUnitId))
      .Select(catalogueItem => catalogueItem.Id)
      .ToArrayAsync(cancellationToken);

    return catalogueItemIds;
  }

  private static async Task<PerformedActivity[]> CreatePerformedActivitiesAsync(
    int[] activityIds,
    IRepository<CatalogueType> catalogueTypeRepository,
    CancellationToken cancellationToken)
  {
    var activities = await catalogueTypeRepository
      .AsQueryable()
      .AsNoTracking()
      .SelectMany(catalogueType => catalogueType.Activities)
      .Where(activity => activityIds.Contains(activity.Id))
      .ToListAsync(cancellationToken);

    var performedActivities = activities
      .Select((activity, index) =>
      {
        var performedActivity = new PerformedActivity();
        performedActivity.SetName(activity.Name!);
        performedActivity.SetOrdering(index + 1);
        performedActivity.SetStatus(PerformedActivityStatus.ToBePerformed);
        performedActivity.SetIsMandatoryByLaw(activity.IsMandatoryByLaw);

        return performedActivity;
      })
      .ToArray();

    return performedActivities;
  }

  private static MasterStatusUpdatedTicketHistoryEntry CreateInitialStatusHistoryEntry(Ticket ticket)
  {
    var initialStatusHistoryEntry = new MasterStatusUpdatedTicketHistoryEntry();
    initialStatusHistoryEntry.SetTimestamp(DateTime.UtcNow);
    initialStatusHistoryEntry.SetNewMasterStatus(ticket.MasterStatus);

    return initialStatusHistoryEntry;
  }
}
