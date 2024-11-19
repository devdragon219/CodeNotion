using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core;
using RealGimm.Core.Fclt.TicketAggregate;
using RealGimm.Web.Fclt.Queries.Filters;
using RealGimm.Web.Fclt.Queries.Sorting;
using RealGimm.SharedKernel.Interfaces;
using HotChocolate.Resolvers;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Fclt.TicketAggregate.Specifications;
using RealGimm.WebCommons.Extensions;
using RealGimm.WebCommons.Models;
using Microsoft.Extensions.Caching.Distributed;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.Web.Anag.Queries.Sorting;
using RealGimm.Web.Anag.Queries.Filters;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Fclt.ContractAggregate;
using RealGimm.Core.Asst.CatalogueItemAggregate;
using RealGimm.Web.Fclt.Models;
using RealGimm.Core.Fclt.TicketChecklistAggregate;
using RealGimm.Core.Common;
using RealGimm.Core.Fclt.TicketChecklistTemplateAggregate;
using RealGimm.Core.Extensions;
using RealGimm.Core.Fclt.TicketTypeAggregate;
using RealGimm.Core.Shared;
using RealGimm.Core.Shared.Charts;
using RealGimm.Core.Fclt.TicketAggregate.TicketHistory;
using Microsoft.Extensions.Localization;
using RealGimm.Core.Resources;
using System.Net.Sockets;
using RealGimm.Core.Fclt.Services;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;

namespace RealGimm.Web.Fclt.Queries;

public class TicketQueries : QueriesBase
{
  [BackOfficePermission(Features.FCLT_TICKET, Permission.Read)]
  public async Task<Ticket?> Get(
    int id,
    [Service] IReadRepository<Ticket> repository,
    CancellationToken cancellationToken = default)
    => await repository
        .AsQueryable(new GetByIdSpec<Ticket>(id), new TicketIncludeAllSpec())
        .SingleOrDefaultAsync(cancellationToken);

  [BackOfficePermission(Features.FCLT_TICKET, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(TicketFilterType))]
  [UseSorting(typeof(TicketSortInputType))]
  public Task<IQueryable<Ticket>> ListTickets(
    [Service] IReadRepository<Ticket> repository,
    [SchemaService] IResolverContext resolverContext)
    => repository
        .AsQueryable(new TicketIncludeForListSpec())
        .MaterializeIfRequiredAsync(resolverContext);

  [BackOfficePermission(Features.FCLT_TICKET, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(TicketFilterType))]
  [UseSorting(typeof(TicketsPerEstateUnitSortInputType))]
  public async Task<IQueryable<TicketsPerEstateUnit>> ListTicketsPerEstateUnits(
    [Service] IReadRepository<Ticket> repository,
    [SchemaService] IResolverContext resolverContext)
  {
    var query = await repository
      .AsQueryable(new TicketIncludeForListSpec())
      .FilterWithPossibleMaterializationAsync(resolverContext);

    return await query
      .GroupBy(ticket => ticket.LocationEstateUnitId)
      .Select(group => new TicketsPerEstateUnit
      {
        LocationEstateUnitId = group.Key,
        Tickets = group.ToArray()
      })
      .SortWithPossibleMaterializationAsync(resolverContext);
  }

  [BackOfficePermission(Features.FCLT_TICKET, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(TicketFilterType))]
  [UseSorting]
  public async Task<IEnumerable<TicketsPerEstateUnitsPerYear>> ListTicketsPerEstateUnitsPerYears(
    [Service] IReadRepository<Ticket> repository,
    [SchemaService] IResolverContext resolverContext,
    CancellationToken cancellationToken)
  {
    var query = await repository
      .AsQueryable(new TicketIncludeForListSpec())
      .FilterWithPossibleMaterializationAsync(resolverContext);

    var result = await query
      .GroupBy(ticket => ticket.RequestDateTime.Year)
      .Select(grouped => new
      {
        RequestYear = grouped.Key,
        Tickets = grouped.ToArray()
      })
      .ToListAsync(cancellationToken);

    return result
      .Select(groupedByYear => new TicketsPerEstateUnitsPerYear
      {
        RequestYear = groupedByYear.RequestYear,

        Tickets = groupedByYear.Tickets
          .GroupBy(ticket => ticket.LocationEstateUnitId)
          .Select(groupedByEstate => new TicketsPerEstateUnit
          {
            LocationEstateUnitId = groupedByEstate.Key,
            Tickets = groupedByEstate.ToArray()
          })
          .ToArray()
      });
  }

  [BackOfficePermission(Features.FCLT_TICKET, Permission.Read)]
  [UseFiltering(typeof(CalendarTicketOutputFilterType))]
  public async Task<IEnumerable<CalendarTicketOutput>> ListTicketsForCalendar(
    DateOnly startDate,
    DateOnly endDate,
    [Service] IReadRepository<Ticket> ticketRepository,
    [Service] IReadRepository<TicketChecklist> ticketChecklistRepository,
    [Service] IReadRepository<CatalogueItem> catalogueItemRepository,
    [SchemaService] IResolverContext resolverContext,
    CancellationToken cancellationToken)
  {
    var startDateTime = startDate.ToDateTime(TimeOnly.MinValue, DateTimeKind.Utc);
    var endDateTime = endDate.ToDateTime(TimeOnly.MaxValue, DateTimeKind.Utc);

    var realTickets = await ticketRepository
      .AsQueryable()
      .Where(ticket => 
        (ticket.MainType == TicketMainType.Issue || ticket.MainType == TicketMainType.IssueParent)
          ? ticket.DueDate >= startDate
          : ticket.RequestDateTime >= startDateTime) // filtering by endDate will be performed later
      .Select(ticket => new
      {
        ticket.Id,
        ticket.MainType,
        ticket.RequestDateTime,
        ticket.DueDate,
        ChecklistId = (int?)ticket.Checklist!.Id,
        ticket.CatalogueItemIds,
        ticket.InternalCode,
        ticket.WorkOrderReference,
        ticket.Description,
        ticket.MasterStatus,
        ticket.SupplierSubjectId,
        ticket.Requestor,
        ticket.IsExcludedFromMaintenanceContract
      })
      .ToListAsync(cancellationToken);

    var onTriggerChecklists = await ticketChecklistRepository
      .AsQueryable()
      .Include(checklist => checklist.Contract)
      .Where(checklist =>
        checklist.Type == TicketChecklistTemplateType.Preventative ||
        checklist.Type == TicketChecklistTemplateType.PreventativeAndOnTriggerCondition)
      .Where(checklist =>
        checklist.Contract.EntryStatus == EntryStatus.Working &&
        checklist.Contract.EffectiveDate <= endDate &&
        (checklist.Contract.ExpirationDate.AddDays(
          checklist.Contract.TermExtensions.Any()
            ? checklist.Contract.TermExtensions.Sum(extension => extension.DaysCount)
            : 0)
        >= startDate))
      .Select(checklist => new
      {
        checklist.Id,
        checklist.Name,
        checklist.EstateUnitId,
        checklist.CatalogueTypeId,
        checklist.PreventativePlannedPeriod,
        checklist.PreventativeDaysOfWeek,
        Contract = new
        {
          checklist.Contract.Id,
          checklist.Contract.EstateUnitIds,
          checklist.Contract.EffectiveDate,
          checklist.Contract.ProviderSubjectId,
          RealExpirationDate = checklist.Contract.ExpirationDate.AddDays(
            checklist.Contract.TermExtensions.Any()
              ? checklist.Contract.TermExtensions.Sum(extension => extension.DaysCount)
              : 0)
        }
      })
      .ToListAsync(cancellationToken);

    var catalogueItems = await catalogueItemRepository
      .AsQueryable()
      .Select(catalogueItem => new
      {
        catalogueItem.Id,
        CatalogueTypeId = catalogueItem.CatalogueType.Id,
        EstateUnitIds = catalogueItem.Estate.EstateUnits.Select(estateUnit => estateUnit.Id).ToArray()
      })
      .ToListAsync(cancellationToken);

    var plannedTicketOutputs = onTriggerChecklists.SelectMany(checklist =>
    {
      var checklistCatalogueItems = catalogueItems
        .Where(catalogueItem =>
          catalogueItem.CatalogueTypeId == checklist.CatalogueTypeId &&
          catalogueItem.EstateUnitIds.Contains(checklist.EstateUnitId))
        .ToList();

      return checklistCatalogueItems.SelectMany(catalogueItem =>
      {
        var lastTicketRequestDate = realTickets
          .Where(ticket =>
            ticket.MainType == TicketMainType.ChecklistPreventative &&
            ticket.ChecklistId == checklist.Id &&
            ticket.CatalogueItemIds.Contains(catalogueItem.Id))
          .OrderByDescending(ticket => ticket.RequestDateTime)
          .Select(ticket => (DateOnly?)ticket.RequestDateTime.ToDateOnly())
          .FirstOrDefault();

        var ticketOutputs = new List<CalendarTicketOutput>();

        while (true)
        {
          DateOnly requestDate;

          if (lastTicketRequestDate.HasValue)
          {
            requestDate = lastTicketRequestDate.Value.GetNextPlannedDate(
              plannedPeriod: checklist.PreventativePlannedPeriod!.Value,
              daysOfWeek: checklist.PreventativeDaysOfWeek);
          }
          else
          {
            requestDate = checklist.Contract.EffectiveDate;
          }

          if (requestDate > checklist.Contract.RealExpirationDate || requestDate > endDate)
          {
            break;
          }

          // due date = one day before the next planned date or contract expiration date
          var dueDate = requestDate.GetNextPlannedDate(
            plannedPeriod: checklist.PreventativePlannedPeriod!.Value,
            daysOfWeek: checklist.PreventativeDaysOfWeek)
            .AddDays(-1);

          if (dueDate > checklist.Contract.RealExpirationDate)
          {
            dueDate = checklist.Contract.RealExpirationDate;
          }

          if (requestDate >= startDate)
          {
            ticketOutputs.Add(new()
            {
              Id = null,
              MainType = TicketMainType.ChecklistPreventative,
              RequestDateTime = requestDate.ToDateTime(TimeOnly.MinValue, DateTimeKind.Utc),
              DueDate = dueDate,
              InternalCode = null,
              WorkOrderReference = null,
              Description = checklist.Name,
              MasterStatus = null,
              SupplierSubjectId = checklist.Contract.ProviderSubjectId,
              Requestor = null,
              IsExcludedFromMaintenanceContract = false
            });
          }

          lastTicketRequestDate = requestDate;
        }

        return ticketOutputs;
      });
    });

    var realTicketOutputs = realTickets
      .Where(ticket => 
        (ticket.MainType == TicketMainType.Issue || ticket.MainType == TicketMainType.IssueParent)
          ? ticket.DueDate <= endDate
          : ticket.RequestDateTime <= endDateTime)
      .Select(ticket => new CalendarTicketOutput
      {
        Id = ticket.Id,
        MainType = ticket.MainType,
        RequestDateTime = ticket.RequestDateTime,
        DueDate = ticket.DueDate,
        InternalCode = ticket.InternalCode,
        WorkOrderReference = ticket.WorkOrderReference,
        Description = ticket.Description,
        MasterStatus = ticket.MasterStatus,
        SupplierSubjectId = ticket.SupplierSubjectId,
        Requestor = ticket.Requestor,
        IsExcludedFromMaintenanceContract = ticket.IsExcludedFromMaintenanceContract
      });

    return realTicketOutputs
      .Concat(plannedTicketOutputs)
      .Filter(resolverContext);
  }

  [BackOfficePermission(Features.FCLT_TICKET, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(SubjectFilterType))]
  [UseSorting(typeof(SubjectSortInputType))]
  public async Task<IQueryable<ISubject>> ListAvailableProviderSubjects(
    int estateUnitId,
    int[] catalogueItemIds,
    [Service] IReadRepository<Subject> subjectRepository,
    [Service] IReadRepository<Contract> contractRepository,
    [Service] IReadRepository<CatalogueItem> catalogueItemRepository,
    [SchemaService] IResolverContext resolverContext,
    CancellationToken cancellationToken = default)
  {
    var catalogueTypeIds = await catalogueItemRepository
      .AsQueryable()
      .Where(catalogueItem => catalogueItemIds.Contains(catalogueItem.CatalogueType.Id))
      .GroupBy(catalogueItem => catalogueItem.CatalogueType.Id)
      .Select(group => group.Key)
      .ToListAsync(cancellationToken);

    var providerSubjectIds = await contractRepository
      .AsQueryable()
      .Where(contract =>
        contract.EstateUnitIds.Contains(estateUnitId) &&
        catalogueTypeIds.All(catalogueTypeId => contract.CatalogueTypeIds.Contains(catalogueTypeId)))
      .GroupBy(contract => contract.ProviderSubjectId)
      .Select(group => group.Key)
      .ToListAsync(cancellationToken);

    return await subjectRepository
      .AsQueryable(new GetByIdsSpec<Subject>(providerSubjectIds), new EntityNonDeletedSpec<Subject>())
      .MaterializeIfRequiredAsync(resolverContext);
  }

  [BackOfficePermission(Features.FCLT_TICKET, Permission.Read)]
  public async Task<IssuesCountByStatusStatistics> GetIssuesCountByStatusStatistics(
    DateOnly startDate,
    DateOnly endDate,
    [Service] IReadRepository<Ticket> repository,
    CancellationToken cancellationToken)
  {
    var startDateTime = startDate.ToDateTime(TimeOnly.MinValue, DateTimeKind.Utc);
    var endDateTime = endDate.ToDateTime(TimeOnly.MaxValue, DateTimeKind.Utc);

    var issuesCountPerStatus = await repository
      .AsQueryable()
      .Where(ticket =>
        ticket.MainType == TicketMainType.Issue ||
        ticket.MainType == TicketMainType.IssueParent)
      .Where(ticket =>
        ticket.RequestDateTime >= startDateTime &&
        ticket.RequestDateTime <= endDateTime)
      .GroupBy(ticket => ticket.MasterStatus)
      .Select(group => new
      {
        Status = group.Key,
        Count = group.Count()
      })
      .ToDictionaryAsync(group => group.Status, group => group.Count, cancellationToken);

    return new IssuesCountByStatusStatistics
    {
      NewStatusCount = issuesCountPerStatus.GetValueOrDefault(TicketMasterStatus.New, defaultValue: 0),
      AssignedStatusCount = issuesCountPerStatus.GetValueOrDefault(TicketMasterStatus.Assigned, defaultValue: 0),
      InProgressStatusCount = issuesCountPerStatus.GetValueOrDefault(TicketMasterStatus.InProgress, defaultValue: 0),
      ResolvedStatusCount = issuesCountPerStatus.GetValueOrDefault(TicketMasterStatus.Resolved, defaultValue: 0),
      CompletedStatusCount = issuesCountPerStatus.GetValueOrDefault(TicketMasterStatus.Completed, defaultValue: 0)
    };
  }

  [BackOfficePermission(Features.FCLT_TICKET, Permission.Read)]
  public async Task<TicketAmountPercentageByIsExcludedFromMaintenanceContractStatistics?> GetTicketAmountPercentageByIsExcludedFromMaintenanceContractStatistics(
    DateOnly startDate,
    DateOnly endDate,
    [Service] IReadRepository<Ticket> ticketRepository,
    [Service] IReadRepository<Contract> contractRepository,
    CancellationToken cancellationToken)
  {
    var startDateTime = startDate.ToDateTime(TimeOnly.MinValue, DateTimeKind.Utc);
    var endDateTime = endDate.ToDateTime(TimeOnly.MaxValue, DateTimeKind.Utc);

    var excludedAmount = await ticketRepository
      .AsQueryable()
      .Where(ticket =>
        ticket.IsExcludedFromMaintenanceContract &&
        ticket.Quote != null &&
        ticket.Quote.Articles.Any(article => !article.IsExcluded))
      .Where(ticket =>
        ticket.RequestDateTime >= startDateTime &&
        ticket.RequestDateTime <= endDateTime)
      .SumAsync(ticket =>
        (decimal?)ticket.Quote!.Articles.Sum(article => article.Quantity * article.UnitPrice),
        cancellationToken)
      ?? 0;

    var contracts = await contractRepository
      .AsQueryable()
      .Where(contract =>
        contract.EntryStatus != EntryStatus.IncompleteDraft &&
        contract.EffectiveDate <= endDate &&
        contract.ExpirationDate >= startDate)
      .Select(contract => new
      {
        contract.EffectiveDate,
        contract.ExpirationDate,
        Amount = (contract.BillingInfo.FixedRateFee ?? 0) + (contract.BillingInfo.PurchaseFeeWithoutVAT ?? 0),
        TotalDays = contract.ExpirationDate.DayNumber - contract.EffectiveDate.DayNumber + 1,
      })
      .ToListAsync(cancellationToken);
    
    var nonExcludedAmount = contracts
      .Select(contract => new
      {
        contract.TotalDays,
        contract.Amount,

        CoveredDays =
          (contract.ExpirationDate < endDate ? contract.ExpirationDate : endDate).DayNumber
          - (contract.EffectiveDate > startDate ? contract.EffectiveDate : startDate).DayNumber
          + 1
      })
      .Where(contract => contract.CoveredDays > 0)
      .Sum(contract => (decimal?)contract.CoveredDays / contract.TotalDays * contract.Amount)
      ?? 0;
    
    var totalAmount = excludedAmount + nonExcludedAmount;
    if (totalAmount == 0)
    {
      return null;
    }

    var excludedPercentage = excludedAmount.ToPercentage(totalAmount).Round2();
    var nonExcludedPercentage = nonExcludedAmount.ToPercentage(totalAmount).Round2();

    return new TicketAmountPercentageByIsExcludedFromMaintenanceContractStatistics
    {
      ExcludedAmountPercentage = excludedPercentage,
      NonExcludedAmountPercentage = nonExcludedPercentage
    };
  }


  [BackOfficePermission(Features.FCLT_TICKET, Permission.Read)]
  public async Task<YearlyTicketAmountStatistics> GetYearlyTicketAmountStatistics(
    [Service] IReadRepository<Ticket> ticketRepository,
    [Service] IReadRepository<Contract> contractRepository,
    CancellationToken cancellationToken)
  {
    var today = DateTime.UtcNow.ToDateOnly();
    var currentYearStartDate = new DateOnly(today.Year, 01, 01);
    var currentYearEndDate = new DateOnly(today.Year + 1, 01, 01).AddDays(-1);
    var previousYearStartDate = new DateOnly(today.Year - 1, 01, 01);
    var previousYearEndDate = new DateOnly(today.Year, 01, 01).AddDays(-1);

    var currentYearAmounts = await GetAmountsAsync(currentYearStartDate, currentYearEndDate);
    var previousYearAmounts = await GetAmountsAsync(previousYearStartDate, previousYearEndDate);

    return new YearlyTicketAmountStatistics
    {
      TotalAmount = currentYearAmounts.Total.Round2(),
      TotalAmountTrend = currentYearAmounts.Total.TrendRelativeTo(previousYearAmounts.Total),
      ExcludedAmount = currentYearAmounts.Excluded.Round2(),
      ExcludedAmountTrend = currentYearAmounts.Excluded.TrendRelativeTo(previousYearAmounts.Excluded),
      NonExcludedAmount = currentYearAmounts.NonExcluded.Round2(),
      NonExcludedAmountTrend = currentYearAmounts.NonExcluded.TrendRelativeTo(previousYearAmounts.NonExcluded)
    };

    async Task<(decimal Total, decimal Excluded, decimal NonExcluded)> GetAmountsAsync(DateOnly startDate, DateOnly endDate)
    {
      var startDateTime = startDate.ToDateTime(TimeOnly.MinValue, DateTimeKind.Utc);
      var endDateTime = endDate.ToDateTime(TimeOnly.MaxValue, DateTimeKind.Utc);

      var excludedAmount = await ticketRepository
        .AsQueryable()
        .Where(ticket =>
          ticket.IsExcludedFromMaintenanceContract &&
          ticket.Quote != null &&
          ticket.Quote.Articles.Any(article => !article.IsExcluded))
        .Where(ticket =>
          ticket.RequestDateTime >= startDateTime &&
          ticket.RequestDateTime <= endDateTime)
        .SumAsync(ticket =>
          (decimal?)ticket.Quote!.Articles.Sum(article => article.Quantity * article.UnitPrice),
          cancellationToken)
        ?? 0;

      var contracts = await contractRepository
        .AsQueryable()
        .Where(contract =>
          contract.EntryStatus != EntryStatus.IncompleteDraft &&
          contract.EffectiveDate <= endDate &&
          contract.ExpirationDate >= startDate)
        .Select(contract => new
        {
          contract.EffectiveDate,
          contract.ExpirationDate,
          Amount = (contract.BillingInfo.FixedRateFee ?? 0) + (contract.BillingInfo.PurchaseFeeWithoutVAT ?? 0),
          TotalDays = contract.ExpirationDate.DayNumber - contract.EffectiveDate.DayNumber + 1,
        })
        .ToListAsync(cancellationToken);

      var nonExcludedAmount = contracts
        .Select(contract => new
        {
          contract.TotalDays,
          contract.Amount,

          CoveredDays =
            (contract.ExpirationDate < endDate ? contract.ExpirationDate : endDate).DayNumber
            - (contract.EffectiveDate > startDate ? contract.EffectiveDate : startDate).DayNumber
            + 1
        })
        .Where(contract => contract.CoveredDays > 0)
        .Sum(contract => (decimal?)contract.CoveredDays / contract.TotalDays * contract.Amount)
        ?? 0;

      var totalAmount = excludedAmount + nonExcludedAmount;

      return (totalAmount, excludedAmount, nonExcludedAmount);
    }
  }

  [BackOfficePermission(Features.FCLT_TICKET, Permission.Read)]
  public async Task<LineChart<TicketsAmountChartDataPoint>> GetTicketsAmountLineChart(
    DateOnly startDate,
    DateOnly endDate,
    LineChartType chartType,
    [Service] IReadRepository<Ticket> ticketRepository,
    [Service] IReadRepository<Contract> contractRepository,
    CancellationToken cancellationToken)
  {
    var startDateTime = startDate.ToDateTime(TimeOnly.MinValue, DateTimeKind.Utc);
    var endDateTime = endDate.ToDateTime(TimeOnly.MaxValue, DateTimeKind.Utc);

    var excludedAmountPoints = (await ticketRepository
      .AsQueryable()
      .Where(ticket =>
        ticket.IsExcludedFromMaintenanceContract &&
        ticket.Quote != null &&
        ticket.Quote.Articles.Any(article => !article.IsExcluded))
      .Where(ticket =>
        ticket.RequestDateTime >= startDateTime &&
        ticket.RequestDateTime <= endDateTime)
      .Select(ticket => new
      {
        RequestDate = DateOnly.FromDateTime(ticket.RequestDateTime),
        Amount = ticket.Quote!.Articles.Sum(article => article.Quantity * article.UnitPrice)
      })
      .ToListAsync(cancellationToken))
      .GroupBy(ticket => ticket.RequestDate)
      .ToDictionary(
        group => group.Key,
        group => new TicketsAmountChartDataPoint
        {
          ExcludedAmount = group.Sum(ticket => ticket.Amount),
          NonExcludedAmount = 0
        });

    var nonExcludedAmountPoints = (await contractRepository
      .AsQueryable()
      .Where(contract =>
        contract.EntryStatus != EntryStatus.IncompleteDraft &&
        contract.EffectiveDate <= endDate &&
        contract.ExpirationDate >= startDate)
      .Select(contract => new
      {
        contract.EffectiveDate,
        contract.ExpirationDate,
        Amount = (contract.BillingInfo.FixedRateFee ?? 0) + (contract.BillingInfo.PurchaseFeeWithoutVAT ?? 0),
        TotalDays = contract.ExpirationDate.DayNumber - contract.EffectiveDate.DayNumber + 1
      })
      .ToListAsync(cancellationToken))
      .Select(contract =>
      {
        var coveredDaysStart = contract.EffectiveDate > startDate ? contract.EffectiveDate : startDate;
        var coveredDaysEnd = contract.ExpirationDate < endDate ? contract.ExpirationDate : endDate;

        return new
        {
          contract.TotalDays,
          contract.Amount,
          CoveredDaysStart = coveredDaysStart,
          CoveredDaysEnd = coveredDaysEnd,
          CoveredDays = coveredDaysEnd.DayNumber - coveredDaysStart.DayNumber + 1
        };
      })
      .Where(contract => contract.CoveredDays > 0)
      .Select(contract => new
      {
        contract.CoveredDaysStart,
        contract.CoveredDaysEnd,
        contract.CoveredDays,
        CoveredDaysAmount = (contract.CoveredDays / contract.TotalDays) * contract.Amount
      })
      .SelectMany(contract => Enumerable
        .Range(0, contract.CoveredDays)
        .Select(offset => new
        {
          Date = contract.CoveredDaysStart.AddDays(offset),
          Amount = contract.CoveredDaysAmount / contract.CoveredDays
        }))
      .GroupBy(day => day.Date)
      .ToDictionary(
        group => group.Key,
        group => new TicketsAmountChartDataPoint
        {
          ExcludedAmount = 0,
          NonExcludedAmount = group.Sum(ticket => ticket.Amount)
        });

    return excludedAmountPoints
      .Concat(nonExcludedAmountPoints)
      .GroupBy(pair => pair.Key)
      .ToDictionary(
        group => group.Key,
        group => group.Select(pair => pair.Value).Sum())
      .ToLineChart(startDate, endDate, chartType);
  }

  [BackOfficePermission(Features.FCLT_TICKET, Permission.Read)]
  public async Task<LineChart<TicketsTypeLineChartDataPoint>> GetTicketsTypeLineChart(
    DateOnly startDate,
    DateOnly endDate,
    LineChartType chartType,
    [Service] IReadRepository<Ticket> repository,
    CancellationToken cancellationToken)
  {
    var startDateTime = startDate.ToDateTime(TimeOnly.MinValue, DateTimeKind.Utc);
    var endDateTime = endDate.ToDateTime(TimeOnly.MaxValue, DateTimeKind.Utc);

    var tickets = await repository
      .AsQueryable()
      .Select(ticket => new
      {
        RequestDate = DateOnly.FromDateTime(ticket.RequestDateTime),
        Type = ticket.MainType
      })
      .Where(ticket =>
        ticket.RequestDate >= startDate &&
        ticket.RequestDate <= endDate)
      .ToListAsync(cancellationToken);

    return tickets
      .GroupBy(ticket => ticket.RequestDate)
      .ToDictionary(
        group => group.Key,
        group => new TicketsTypeLineChartDataPoint
        {
          IssuesCount = group.Count(ticket => ticket.Type is TicketMainType.Issue),
          OnTriggerConditionCount = group.Count(ticket => ticket.Type is TicketMainType.ChecklistOnTriggerCondition),
          PreventiveCount = group.Count(ticket => ticket.Type is TicketMainType.ChecklistPreventative)
        })
      .ToLineChart(startDate, endDate, chartType);
  }

  [BackOfficePermission(Features.FCLT_TICKET, Permission.Read)]
  public async Task<LineChartMonthlySeries<TicketsCountLineChartDataPoint>[]> GetTicketsCountMonthlyChart(
    int[] years,
    [Service] IReadRepository<Ticket> repository,
    CancellationToken cancellationToken)
  {
    var tickets = await repository
      .AsQueryable()
      .Select(ticket => new
      {
        RequestDate = DateOnly.FromDateTime(ticket.RequestDateTime)
      })
      .Where(ticket => years.Contains(ticket.RequestDate.Year))
      .ToListAsync(cancellationToken);

    var allMonths = years.SelectMany(year => Enumerable.Range(1, 12).Select(month => (Year: year, Month: month)));

    return tickets
      .GroupByMonth(ticket => ticket.RequestDate)
      .ToDictionary(
        group => (group.Key.Year, group.Key.Month),
        group => new TicketsCountLineChartDataPoint { TicketsCount = group.Count() })
      .FillMissingKeys(allMonths, TicketsCountLineChartDataPoint.Zero)
      .Select(pair => new LineChartMonthlySeries<TicketsCountLineChartDataPoint>
      {
        Year = pair.Key.Year,
        Month = pair.Key.Month,
        DataPoint = pair.Value
      })
      .OrderBy(series => series.Year)
      .ThenBy(series => series.Month)
      .ToArray();
  }

  [BackOfficePermission(Features.FCLT_TICKET, Permission.Read)]
  public async Task<LineChartMonthlySeries<TicketsTotalAmountChartDataPoint>[]> GetTicketsTotalAmountMonthlyChart(
    int[] years,
    [Service] IReadRepository<Ticket> ticketRepository,
    [Service] IReadRepository<Contract> contractRepository,
    CancellationToken cancellationToken)
  {
    var minYear = years.Min();
    var maxYear = years.Max();
    var allMonths = years.SelectMany(year => Enumerable.Range(1, 12).Select(month => (Year: year, Month: month)));

    var excludedAmountPoints = (await ticketRepository
      .AsQueryable()
      .Where(ticket =>
        ticket.IsExcludedFromMaintenanceContract &&
        ticket.Quote != null &&
        ticket.Quote.Articles.Any(article => !article.IsExcluded))
      .Select(ticket => new
      {
        RequestDate = DateOnly.FromDateTime(ticket.RequestDateTime),
        Amount = ticket.Quote!.Articles.Sum(article => article.Quantity * article.UnitPrice)
      })
      .Where(ticket => years.Contains(ticket.RequestDate.Year))
      .ToListAsync(cancellationToken))
      .GroupByMonth(ticket => ticket.RequestDate)
      .ToDictionary(
        group => group.Key,
        group => new TicketsTotalAmountChartDataPoint
        {
          TotalAmount = group.Sum(ticket => ticket.Amount)
        });

    var nonExcludedAmountPoints = (await contractRepository
      .AsQueryable()
      .Where(contract =>
        contract.EntryStatus != EntryStatus.IncompleteDraft &&
        contract.EffectiveDate.Year <= maxYear &&
        contract.ExpirationDate.Year >= minYear)
      .Select(contract => new
      {
        contract.EffectiveDate,
        contract.ExpirationDate,
        Amount = (contract.BillingInfo.FixedRateFee ?? 0) + (contract.BillingInfo.PurchaseFeeWithoutVAT ?? 0),
        TotalDays = contract.ExpirationDate.DayNumber - contract.EffectiveDate.DayNumber + 1
      })
      .ToListAsync(cancellationToken))
      .SelectMany(contract => Enumerable
        .Range(0, contract.TotalDays)
        .Select(offset => new
        {
          Date = contract.EffectiveDate.AddDays(offset),
          Amount = contract.Amount / contract.TotalDays
        }))
      .GroupByMonth(day => day.Date)
      .ToDictionary(
        group => group.Key,
        group => new TicketsTotalAmountChartDataPoint
        {
          TotalAmount = group.Sum(ticket => ticket.Amount)
        });

    return excludedAmountPoints
      .Concat(nonExcludedAmountPoints)
      .GroupBy(pair => pair.Key)
      .ToDictionary(
        group => group.Key,
        group => group.Select(pair => pair.Value).Sum())
      .FillMissingKeys(allMonths, TicketsTotalAmountChartDataPoint.Zero)
      .Select(pair => new LineChartMonthlySeries<TicketsTotalAmountChartDataPoint>
      {
        Year = pair.Key.Year,
        Month = pair.Key.Month,
        DataPoint = pair.Value
      })
      .OrderBy(series => series.Year)
      .ThenBy(series => series.Month)
      .ToArray();
  }

  [BackOfficePermission(Features.FCLT_TICKET, Permission.Read)]
  public async Task<IssuesAverageResolutionDurationByStatusStatistics> GetIssuesAverageResolutionDurationByStatusStatistics(
    DateOnly startDate,
    DateOnly endDate,
    [Service] IReadRepository<Ticket> repository,
    CancellationToken cancellationToken)
  {
    var startDateTime = startDate.ToDateTime(TimeOnly.MinValue, DateTimeKind.Utc);
    var endDateTime = endDate.ToDateTime(TimeOnly.MaxValue, DateTimeKind.Utc);

    var issues = await repository
      .AsQueryable()
      .AsNoTracking()
      .Where(ticket =>
        ticket.MainType == TicketMainType.Issue ||
        ticket.MainType == TicketMainType.IssueParent)
      .Where(ticket =>
        ticket.RequestDateTime >= startDateTime &&
        ticket.RequestDateTime <= endDateTime)
      .Select(ticket => new
      {
        ticket.Id,
        
        StatusHistory = ticket.History
          .OfType<MasterStatusUpdatedTicketHistoryEntry>()
          .OrderBy(entry => entry.Timestamp)
          .ToArray(),
      })
      .ToListAsync(cancellationToken);

    var durationsByStatus = issues
      .SelectMany(issue =>
      {
        var statusDurations = issue.StatusHistory
          .Zip(issue.StatusHistory.Skip(1), (previous, current) => new
          {
            Status = previous.NewMasterStatus,
            TimeInStatus = current.Timestamp - previous.Timestamp
          })
          .ToList();

        var lastEntry = issue.StatusHistory.LastOrDefault();
        if (lastEntry != null)
        {
          statusDurations.Add(new
          {
            Status = lastEntry.NewMasterStatus,
            TimeInStatus = DateTime.UtcNow - lastEntry.Timestamp
          });
        }

        return statusDurations;
      })
      .GroupBy(entry => entry.Status)
      .ToDictionary(
          group => group.Key,
          group => (TimeSpan?)TimeSpan.FromTicks((long)group.Average(entry => entry.TimeInStatus.Ticks)));

    return new IssuesAverageResolutionDurationByStatusStatistics
    {
      NewDuration = durationsByStatus.GetValueOrDefault(TicketMasterStatus.New),
      AssignedDuration = durationsByStatus.GetValueOrDefault(TicketMasterStatus.Assigned),
      InProgressDuration = durationsByStatus.GetValueOrDefault(TicketMasterStatus.InProgress),
      ResolvedDuration = durationsByStatus.GetValueOrDefault(TicketMasterStatus.Resolved),
      CompletedDuration = durationsByStatus.GetValueOrDefault(TicketMasterStatus.Completed)
    };
  }

  [BackOfficePermission(Features.FCLT_TICKET, Permission.Read)]
  public async Task<IssuesPercentageByStatusStatistics?> GetIssuesPercentageByStatusStatistics(
    DateOnly startDate,
    DateOnly endDate,
    [Service] IReadRepository<Ticket> repository,
    CancellationToken cancellationToken)
  {
    var startDateTime = startDate.ToDateTime(TimeOnly.MinValue, DateTimeKind.Utc);
    var endDateTime = endDate.ToDateTime(TimeOnly.MaxValue, DateTimeKind.Utc);

    var allStatuses = new[]
    {
      TicketMasterStatus.New,
      TicketMasterStatus.Assigned,
      TicketMasterStatus.InProgress,
      TicketMasterStatus.Resolved,
      TicketMasterStatus.Completed
    };

    var issuesCountPerStatus = await repository
      .AsQueryable()
      .Where(ticket =>
        ticket.MainType == TicketMainType.Issue ||
        ticket.MainType == TicketMainType.IssueParent)
      .Where(ticket =>
        ticket.RequestDateTime >= startDateTime &&
        ticket.RequestDateTime <= endDateTime)
      .GroupBy(ticket => ticket.MasterStatus)
      .Select(group => new
      {
        Status = group.Key,
        Count = group.Count()
      })
      .ToDictionaryAsync(group => group.Status, group => group.Count, cancellationToken);

    var issuesStatusPercentageDistribution = issuesCountPerStatus
      .FillMissingKeys(allStatuses, 0)
      .ToPercentageDistribution();

    if (issuesStatusPercentageDistribution == null)
    {
      return null;
    }

    return new IssuesPercentageByStatusStatistics
    {
      NewStatusPercentage = issuesStatusPercentageDistribution[TicketMasterStatus.New],
      AssignedStatusPercentage = issuesStatusPercentageDistribution[TicketMasterStatus.Assigned],
      InProgressStatusPercentage = issuesStatusPercentageDistribution[TicketMasterStatus.InProgress],
      ResolvedStatusPercentage = issuesStatusPercentageDistribution[TicketMasterStatus.Resolved],
      CompletedStatusPercentage = issuesStatusPercentageDistribution[TicketMasterStatus.Completed]
    };
  }

  [BackOfficePermission(Features.FCLT_TICKET, Permission.Read)]
  public async Task<IssuesSLARespectingPercentageStatistics?> GetIssuesSLARespectingPercentageStatistics(
    DateOnly startDate,
    DateOnly endDate,
    [Service] IReadRepository<Ticket> ticketRepository,
    [Service] IReadRepository<Contract> contractRepository,
    [Service] IReadRepository<CatalogueType> catalogueTypeRepository,
    [Service] TicketConditionChecker ticketConditionChecker,
    CancellationToken cancellationToken)
  {
    var startDateTime = startDate.ToDateTime(TimeOnly.MinValue, DateTimeKind.Utc);
    var endDateTime = endDate.ToDateTime(TimeOnly.MaxValue, DateTimeKind.Utc);

    var issuesPerComplexContractId = await ticketRepository
      .AsQueryable()
      .Where(ticket =>
        ticket.MainType == TicketMainType.Issue ||
        ticket.MainType == TicketMainType.IssueParent)
      .Where(ticket =>
        ticket.RequestDateTime >= startDateTime &&
        ticket.RequestDateTime <= endDateTime)
      .GroupBy(ticket => new
      {
        ticket.LocationEstateUnitId,
        ticket.CatalogueTypeId,
        ticket.SupplierSubjectId
      })
      .Select(group => new
      {
        group.Key,
        Issues = group
          .Select(issue => new
          {
            CustomTypeId = issue.CustomType == null ? (int?)null : issue.CustomType.Id,
            issue.CatalogueTypeId,
            issue.MasterStatus,
            issue.Priority,
            issue.RequestDateTime,
            History = issue.History.ToArray()
          })
          .ToArray()
      })
      .ToDictionaryAsync(group => group.Key, group => group.Issues, cancellationToken);

    var contracts = await contractRepository
      .AsQueryable()
      .Select(contract => new
      {
        contract.Id,
        contract.EstateUnitIds,
        contract.CatalogueTypeIds,
        contract.ProviderSubjectId,
        SLAs = contract.SLAs
          .Select(sla => new
          {
            sla.IfCondition,
            sla.ThenCondition
          })
          .ToArray()
      })
      .ToListAsync(cancellationToken);

    var issuesPerContrat = issuesPerComplexContractId.ToDictionary(
      pair => contracts.First(contract => contract.SLAs.Any()),
      pair => pair.Value);

    foreach (var contract in issuesPerContrat.Keys)
    {
      foreach (var sla in contract.SLAs)
      {
        await contractRepository.LoadNavigationsAsync(sla.IfCondition, cancellationToken);
        await contractRepository.LoadNavigationsAsync(sla.ThenCondition, cancellationToken);
      }
    }
    
    var catalogueTypes = await catalogueTypeRepository
      .AsQueryable(
        new GetByIdsSpec<CatalogueType>(
          issuesPerContrat.Values.SelectMany(issues => issues).Select(issue => issue.CatalogueTypeId).Distinct()))
      .Select(catalogueType => new
      {
        catalogueType.Id,
        CategoryId = catalogueType.Category.Id,
        SubCategoryId = catalogueType.SubCategory!.Id
      })
      .ToDictionaryAsync(catalogueType => catalogueType.Id, cancellationToken);

    var percentageDistribution = issuesPerContrat
      .SelectMany(pair => pair.Value.Select(issue =>
      {
        var ticketData = new TicketConditionChecker.TicketData()
        {
          CustomTypeId = issue.CustomTypeId,
          CatalogueTypeId = issue.CatalogueTypeId,
          CatalogueCategoryId = catalogueTypes[issue.CatalogueTypeId].CategoryId,
          CatalogueSubCategoryId = catalogueTypes[issue.CatalogueTypeId].SubCategoryId,
          MasterStatus = issue.MasterStatus,
          Priority = issue.Priority,
          RequestDateTime = issue.RequestDateTime,
          History = issue.History
        };

        return (TicketData: ticketData, Contract: pair.Key);
      }))
      .Select(pair =>
      {
        foreach (var sla in pair.Contract.SLAs)
        {
          if (ticketConditionChecker.IsMacth(pair.TicketData, sla.IfCondition) &&
            !ticketConditionChecker.IsMacth(pair.TicketData, sla.ThenCondition))
          {
            return false;
          }
        }

        return true;
      })
      .GroupBy(isRespectingSla => isRespectingSla)
      .ToDictionary(group => group.Key, group => group.Count())
      .FillMissingKeys([true, false], 0)
      .ToPercentageDistribution();

    if (percentageDistribution == null)
    {
      return null;
    }

    return new IssuesSLARespectingPercentageStatistics
    {
      RespectingPercentage = percentageDistribution[true],
      NotRespectingPercentage = percentageDistribution[false]
    };
  }

  [BackOfficePermission(Features.FCLT_TICKET, Permission.Read)]
  public async Task<IssuesPercentageByPriorityStatistics?> GetIssuesPercentageByPriorityStatistics(
    DateOnly startDate,
    DateOnly endDate,
    [Service] IReadRepository<Ticket> repository,
    CancellationToken cancellationToken)
  {
    var startDateTime = startDate.ToDateTime(TimeOnly.MinValue, DateTimeKind.Utc);
    var endDateTime = endDate.ToDateTime(TimeOnly.MaxValue, DateTimeKind.Utc);

    var allPriorities = new[]
    {
      Priority.Minor,
      Priority.Normal,
      Priority.Major,
      Priority.Critical
    };

    var issuesCountPerPriority = await repository
      .AsQueryable()
      .Where(ticket =>
        ticket.MainType == TicketMainType.Issue ||
        ticket.MainType == TicketMainType.IssueParent)
      .Where(ticket =>
        ticket.RequestDateTime >= startDateTime &&
        ticket.RequestDateTime <= endDateTime)
      .GroupBy(ticket => ticket.Priority)
      .Select(group => new
      {
        Priority = group.Key,
        Count = group.Count()
      })
      .ToDictionaryAsync(group => group.Priority, group => group.Count, cancellationToken);

    var issuesPriorityPercentageDistribution = issuesCountPerPriority
      .FillMissingKeys(allPriorities, 0)
      .ToPercentageDistribution();

    if (issuesPriorityPercentageDistribution == null)
    {
      return null;
    }

    return new IssuesPercentageByPriorityStatistics
    {
      MinorStatusPercentage = issuesPriorityPercentageDistribution[Priority.Minor],
      NormalStatusPercentage = issuesPriorityPercentageDistribution[Priority.Normal],
      MajorStatusPercentage = issuesPriorityPercentageDistribution[Priority.Major],
      CriticalStatusPercentage = issuesPriorityPercentageDistribution[Priority.Critical]
    };
  }

  [BackOfficePermission(Features.FCLT_TICKET, Permission.Read)]
  public async Task<IDictionary<TicketType, double>?> GetIssuesPercentageByTypeStatistics(
    DateOnly startDate,
    DateOnly endDate,
    [Service] IReadRepository<Ticket> ticketRepository,
    [Service] IReadRepository<TicketType> ticketTypeRepository,
    CancellationToken cancellationToken)
  {
    var startDateTime = startDate.ToDateTime(TimeOnly.MinValue, DateTimeKind.Utc);
    var endDateTime = endDate.ToDateTime(TimeOnly.MaxValue, DateTimeKind.Utc);

    var issuesCountPerPriority = await ticketRepository
      .AsQueryable()
      .Where(ticket =>
        ticket.MainType == TicketMainType.Issue ||
        ticket.MainType == TicketMainType.IssueParent)
      .Where(ticket =>
        ticket.RequestDateTime >= startDateTime &&
        ticket.RequestDateTime <= endDateTime &&
        ticket.CustomType != null)
      .GroupBy(ticket => ticket.CustomType!)
      .Select(group => new
      {
        Type = group.Key,
        Count = group.Count()
      })
      .ToDictionaryAsync(group => group.Type, group => group.Count, cancellationToken);

    return issuesCountPerPriority
      .ToPercentageDistribution()
      ?.OrderByDescending(pair => pair.Value)
      .ToDictionary();
  }

  [BackOfficePermission(Features.FCLT_TICKET, Permission.Read)]
  public async Task<IDictionary<string, double>?> GetChecklistTicketsMandatoryByLawPerformedActivitiesStatistics(
    DateOnly startDate,
    DateOnly endDate,
    [Service] IReadRepository<Ticket> repository,
    [Service] IStringLocalizer<SharedResources> localizer,
    CancellationToken cancellationToken)
  {
    var startDateTime = startDate.ToDateTime(TimeOnly.MinValue, DateTimeKind.Utc);
    var endDateTime = endDate.ToDateTime(TimeOnly.MaxValue, DateTimeKind.Utc);

    var groupedActivities = await repository
      .AsQueryable()
      .Where(ticket =>
        ticket.MainType == TicketMainType.ChecklistOnTriggerCondition ||
        ticket.MainType == TicketMainType.ChecklistPreventative)
      .Where(ticket =>
        ticket.RequestDateTime >= startDateTime &&
        ticket.RequestDateTime <= endDateTime)
      .SelectMany(ticket => ticket.PerformedActivities)
      .Where(activity => activity.IsMandatoryByLaw)
      .GroupBy(activity => activity.Name)
      .Select(group => new
      {
        Name = group.Key,
        Count = group.Count()
      })
      .ToDictionaryAsync(group => group.Name, group => group.Count, cancellationToken);

    var percentageDistribution = groupedActivities
      .ToPercentageDistribution()
      ?.OrderByDescending(pair => pair.Value)
      .ToDictionary();

    if (percentageDistribution is null)
    {
      return null;
    }

    if (percentageDistribution.Count > 2)
    {
      var otherActivitiesPercentage = percentageDistribution
        .Skip(2)
        .Sum(pair => pair.Value);

      return percentageDistribution
        .Take(2)
        .Append(new KeyValuePair<string, double>(localizer["Other"], otherActivitiesPercentage))
        .ToDictionary();
    }

    return percentageDistribution;
  }

  [BackOfficePermission(Features.FCLT_TICKET, Permission.Read)]
  public async Task<MandatoryByLawChecklistTicketsStatusStatistics?> GetMandatoryByLawChecklistTicketsStatusStatistics(
    DateOnly startDate,
    DateOnly endDate,
    [Service] IReadRepository<Ticket> repository,
    CancellationToken cancellationToken)
  {
    var startDateTime = startDate.ToDateTime(TimeOnly.MinValue, DateTimeKind.Utc);
    var endDateTime = endDate.ToDateTime(TimeOnly.MaxValue, DateTimeKind.Utc);

    var allPriorities = new[]
    {
      Priority.Minor,
      Priority.Normal,
      Priority.Major,
      Priority.Critical
    };

    var baseQuery = repository
      .AsQueryable()
      .Where(ticket =>
        ticket.MainType == TicketMainType.ChecklistPreventative ||
        ticket.MainType == TicketMainType.ChecklistOnTriggerCondition)
      .Where(ticket =>
        ticket.RequestDateTime >= startDateTime &&
        ticket.RequestDateTime <= endDateTime &&
        ticket.PerformedActivities.Any(activity => activity.IsMandatoryByLaw));

    var doneChecklistTicketsCount = await baseQuery
      .Where(ticket => ticket.MasterStatus == TicketMasterStatus.Completed)
      .CountAsync(cancellationToken);

    var expiredChecklistTicketsCount = await baseQuery
      .Where(ticket =>
        ticket.DueDate < DateOnly.FromDateTime(DateTime.UtcNow) &&
        ticket.MasterStatus != TicketMasterStatus.Completed)
      .CountAsync(cancellationToken);

    var scheduledChecklistTicketsCount = await baseQuery
      .Where(ticket =>
        ticket.DueDate >= DateOnly.FromDateTime(DateTime.UtcNow) &&
        ticket.MasterStatus != TicketMasterStatus.Completed)
      .CountAsync(cancellationToken);

    var percentageDistribution = new Dictionary<string, int>
    {
      ["done"] = doneChecklistTicketsCount,
      ["expired"] = expiredChecklistTicketsCount,
      ["scheduled"] = scheduledChecklistTicketsCount
    }.ToPercentageDistribution();

    if (percentageDistribution is null)
    {
      return null;
    }

    return new MandatoryByLawChecklistTicketsStatusStatistics
    {
      DonePercentage = percentageDistribution.GetValueOrDefault("done", defaultValue: 0),
      ExpiredPercentage = percentageDistribution.GetValueOrDefault("expired", defaultValue: 0),
      ScheduledPercentage = percentageDistribution.GetValueOrDefault("scheduled", defaultValue: 0)
    };
  }

  [BackOfficePermission(Features.FCLT_TICKET, Permission.Read)]
  public async Task<IssuesExcludedFromMaintenanceContractStatistics?> GetIssuesExcludedFromMaintenanceContractStatistics(
    DateOnly startDate,
    DateOnly endDate,
    [Service] IReadRepository<Ticket> repository,
    CancellationToken cancellationToken)
  {
    var startDateTime = startDate.ToDateTime(TimeOnly.MinValue, DateTimeKind.Utc);
    var endDateTime = endDate.ToDateTime(TimeOnly.MaxValue, DateTimeKind.Utc);

    var groupedIssues = await repository
      .AsQueryable()
      .Where(ticket =>
        ticket.MainType == TicketMainType.Issue ||
        ticket.MainType == TicketMainType.IssueParent)
      .Where(ticket =>
        ticket.RequestDateTime >= startDateTime &&
        ticket.RequestDateTime <= endDateTime)
      .GroupBy(ticket => ticket.IsExcludedFromMaintenanceContract)
      .Select(group => new
      {
        IsExcluded = group.Key,
        Count = group.Count()
      })
      .ToListAsync(cancellationToken);

    var totalIssuesCount = groupedIssues.Sum(group => group.Count);
    if (totalIssuesCount == 0)
    {
      return null;
    }

    var excludedIssuesCount = groupedIssues
      .Where(group => group.IsExcluded)
      .Sum(group => group.Count);

    return new IssuesExcludedFromMaintenanceContractStatistics
    {
      ExcludedPercentage = excludedIssuesCount.ToPercentage(total: totalIssuesCount).Round2(),
    };
  }

  [BackOfficePermission(Features.FCLT_TICKET, Permission.Read)]
  public async Task<LineChart<IssuesExcludedFromMaintenanceContractLineChartDataPoint>> GetIssuesExcludedFromMaintenanceContractLineChart(
    DateOnly startDate,
    DateOnly endDate,
    LineChartType chartType,
    [Service] IReadRepository<Ticket> repository,
    CancellationToken cancellationToken)
  {
    var issues = await repository
      .AsQueryable()
      .Where(ticket =>
        ticket.MainType == TicketMainType.Issue ||
        ticket.MainType == TicketMainType.IssueParent)
      .Select(ticket => new
      {
        RequestDate = DateOnly.FromDateTime(ticket.RequestDateTime),
        IsExcluded = ticket.IsExcludedFromMaintenanceContract
      })
      .Where(ticket =>
        ticket.RequestDate >= startDate &&
        ticket.RequestDate <= endDate)
      .ToListAsync(cancellationToken);

    return issues
      .GroupBy(ticket => ticket.RequestDate)
      .ToDictionary(
        group => group.Key,
        group => new IssuesExcludedFromMaintenanceContractLineChartDataPoint
        {
          ExcludedCount = group.Count(ticket => ticket.IsExcluded),
          NonExcludedCount = group.Count(ticket => !ticket.IsExcluded)
        })
      .ToLineChart(startDate, endDate, chartType);
  }

  [BackOfficePermission(Features.FCLT_TICKET, Permission.Read)]
  public async Task<LineChart<IssuesStatusLineChartDataPoint>> GetIssuesStatusLineChart(
    DateOnly startDate,
    DateOnly endDate,
    LineChartType chartType,
    [Service] IReadRepository<Ticket> repository,
    CancellationToken cancellationToken)
  {
    var issues = await repository
      .AsQueryable()
      .Where(ticket =>
        ticket.MainType == TicketMainType.Issue ||
        ticket.MainType == TicketMainType.IssueParent)
      .Select(ticket => new
      {
        RequestDate = DateOnly.FromDateTime(ticket.RequestDateTime),
        ticket.MasterStatus
      })
      .Where(ticket =>
        ticket.RequestDate >= startDate &&
        ticket.RequestDate <= endDate)
      .ToListAsync(cancellationToken);

    return issues
      .GroupBy(ticket => ticket.RequestDate)
      .ToDictionary(
        group => group.Key,
        group => new IssuesStatusLineChartDataPoint
        {
          NewCount = group.Count(ticket => ticket.MasterStatus is TicketMasterStatus.New),
          AssignedCount = group.Count(ticket => ticket.MasterStatus is TicketMasterStatus.Assigned),
          InProgressCount = group.Count(ticket => ticket.MasterStatus is TicketMasterStatus.InProgress),
          ResolvedCount = group.Count(ticket => ticket.MasterStatus is TicketMasterStatus.Resolved),
          CompletedCount = group.Count(ticket => ticket.MasterStatus is TicketMasterStatus.Completed)
        })
      .ToLineChart(startDate, endDate, chartType);
  }

  [BackOfficePermission(Features.FCLT_TICKET, Permission.Read)]
  public async Task<LineChart<ChecklistTicketsCountLineChartDataPoint>> GetChecklistTicketsCountLineChart(
    DateOnly startDate,
    DateOnly endDate,
    LineChartType chartType,
    [Service] IReadRepository<Ticket> repository,
    CancellationToken cancellationToken)
  {
    var issues = await repository
      .AsQueryable()
      .Where(ticket => ticket.MasterStatus == TicketMasterStatus.Completed)
      .Where(ticket =>
        ticket.MainType == TicketMainType.ChecklistPreventative ||
        ticket.MainType == TicketMainType.ChecklistOnTriggerCondition)
      .Select(ticket => new
      {
        RequestDate = DateOnly.FromDateTime(ticket.RequestDateTime),
        ticket.MainType
      })
      .Where(ticket =>
        ticket.RequestDate >= startDate &&
        ticket.RequestDate <= endDate)
      .ToListAsync(cancellationToken);

    return issues
      .GroupBy(ticket => ticket.RequestDate)
      .ToDictionary(
        group => group.Key,
        group => new ChecklistTicketsCountLineChartDataPoint
        {
          PreventiveCount = group.Count(ticket => ticket.MainType is TicketMainType.ChecklistPreventative),
          OnTriggerConditionCount = group.Count(ticket => ticket.MainType is TicketMainType.ChecklistOnTriggerCondition)
        })
      .ToLineChart(startDate, endDate, chartType);
  }

  [BackOfficePermission(Features.FCLT_TICKET, Permission.Read)]
  public Task<string?> ProposeNewInternalCode(
    TicketMainType mainType,
    [Service] ICodeSuggestor<Ticket> codeSuggestor)
  {
    var partialEntity = new Ticket();
    partialEntity.SetMainType(mainType);

    return codeSuggestor.SuggestNextCode(partialEntity: partialEntity);
  }

  [BackOfficePermission(Features.FCLT_TICKET, Permission.Read)]
  public Task<bool> CanUseInternalCode(
    string internalCode,
    int? currentTicketId,
    [Service] IReadRepository<Ticket> repository,
    CancellationToken cancellationToken = default)
    => CanUseInternalCode<Ticket>(internalCode, currentTicketId, repository, cancellationToken);

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Read)]
  [UseFiltering(typeof(TicketFilterType))]
  [UseSorting(typeof(TicketSortInputType))]
  public async Task<FileUrlOutput> ExportToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] IDistributedCache distributedCache,
    [Service] IReadRepository<Ticket> repository,
    [Service] IExportService<Ticket> exportService,
    CancellationToken cancellationToken = default)
  {
    var query = await repository
      .AsQueryable(new TicketIncludeForExportToExcelSpec())
      .MaterializeIfRequiredAsync(resolverContext);

    var tickets = await query.ToArrayAsync(cancellationToken);

    return await ExportToExcelAsync(tickets, distributedCache, exportService, cancellationToken);
  }
}
