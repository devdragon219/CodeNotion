using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate.Specifications;
using RealGimm.Core.Shared.Specifications;

namespace RealGimm.Core.Asst.Services;

public sealed class EstateUnitHistoryService
{
  private readonly IReadRepository<EstateUnit> _estateUnitRepository;

  public EstateUnitHistoryService(IReadRepository<EstateUnit> estateUnitRepository)
  {
    _estateUnitRepository = estateUnitRepository;
  }

  public async Task<int?> GetHistoricalIdAsync(int estateUnitId, DateOnly restoringDate, CancellationToken cancellationToken)
    => (await GetHistoricalIdsPerEstateUnitAsync([estateUnitId], restoringDate, cancellationToken))[estateUnitId];

  public async Task<Dictionary<int, int?>> GetHistoricalIdsPerEstateUnitAsync(
    IEnumerable<int> estateUnitIds,
    DateOnly restoringDate,
    CancellationToken cancellationToken)
  {
    var estateUnits = await _estateUnitRepository
      .AsQueryable(new GetByIdsSpec<EstateUnit>(estateUnitIds))
      .Select(estateUnit => new { estateUnit.Id, estateUnit.HistoryTags })
      .ToListAsync(cancellationToken);

    var allHistoryTags = estateUnits.SelectMany(estateUnit => estateUnit.HistoryTags).Distinct();

    var historicalEstateUnits = await _estateUnitRepository
      .AsQueryable(new EstateUnitsByHistoryTagsSpec(allHistoryTags))
      .Where(estateUnit => estateUnit.OwnershipStartDate >= restoringDate)
      .Where(estateUnit => !estateUnit.DisusedDate.HasValue || restoringDate < estateUnit.DisusedDate)
      .Select(estateUnit => new { estateUnit.Id, estateUnit.HistoryTags, estateUnit.DisusedDate })
      .ToListAsync(cancellationToken);

    var restoredEstateUnitsIds = estateUnits
      .ToDictionary(
        estateUnit => estateUnit.Id,
        estateUnit => historicalEstateUnits
          .SingleOrDefault(historicalEstateUnit => historicalEstateUnit.HistoryTags.Intersect(estateUnit.HistoryTags).Any())
          ?.Id);

    return restoredEstateUnitsIds;
  }

  public async Task<Dictionary<int, int[]>> GetHistoricalIdsPerEstateUnitAsync(
    IEnumerable<int> estateUnitIds,
    DateOnly startDate,
    DateOnly endDate,
    CancellationToken cancellationToken)
  {
    var estateUnits = await _estateUnitRepository
      .AsQueryable(new GetByIdsSpec<EstateUnit>(estateUnitIds))
      .Select(estateUnit => new { estateUnit.Id, estateUnit.HistoryTags })
      .ToListAsync(cancellationToken);

    var allHistoryTags = estateUnits.SelectMany(estateUnit => estateUnit.HistoryTags).Distinct();

    var historicalEstateUnits = await _estateUnitRepository
      .AsQueryable(new EstateUnitsByHistoryTagsSpec(allHistoryTags))
      .Where(estateUnit => estateUnit.OwnershipStartDate >= startDate)
      .Where(estateUnit => !estateUnit.DisusedDate.HasValue || endDate < estateUnit.DisusedDate)
      .Select(estateUnit => new { estateUnit.Id, estateUnit.HistoryTags, estateUnit.DisusedDate })
      .ToListAsync(cancellationToken);

    var restoredEstateUnitsIds = estateUnits
      .ToDictionary(
        estateUnit => estateUnit.Id,
        estateUnit => historicalEstateUnits
          .Where(historicalEstateUnit => historicalEstateUnit.HistoryTags.Intersect(estateUnit.HistoryTags).Any())
          .Select(historicalEstateUnit => historicalEstateUnit.Id)
          .ToArray());

    return restoredEstateUnitsIds;
  }
}
