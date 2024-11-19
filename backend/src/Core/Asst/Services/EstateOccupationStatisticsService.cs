using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateAggregate.Models;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Shared.Interfaces;

namespace RealGimm.Core.Asst.Services;

public class EstateOccupationStatisticsService
{
  public required IReadRepository<EstateUnit> EstateUnitRepository {protected get; init;}
  public required IContractStatisticsService ContractStatistics {protected get; init;}

  public async Task<EstateOccupationStatisticsOutput> GetCurrentStatisticsAsync(
    CancellationToken cancellationToken)
  {
    var (daily, monthly) = await ContractStatistics.GetCommittedEstateUnitsAsync(cancellationToken);
    
    //Sum up all unit ids
    var allEUIds = daily.Values
      .SelectMany(idArray => idArray)
      .Concat(monthly.Values.SelectMany(idArray => idArray))
      .Distinct();

    //Get all estate ids by unit ids
    var estateMap = await EstateUnitRepository
      .AsQueryable()
      .Where(eu => allEUIds.Contains(eu.Id))
      .Select(eu => new {
        eu.Id,
        EstateId = eu.Estate.Id
      })
      .ToDictionaryAsync(eu => eu.Id, eu => eu.EstateId, cancellationToken);

    //Translate all statistics and count
    var maxDate = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(1));
    var maxDateYearly = DateOnly.FromDateTime(DateTime.UtcNow);

    return new EstateOccupationStatisticsOutput(
      daily
        .OrderByDescending(kvp => kvp.Key)
        .Select(kvp => new EstateOccupationMonthlyStatisticsOutput(
          maxDate.AddDays(-kvp.Key),
          kvp.Value.Select(euId => estateMap[euId]).Distinct().Count(),
          0
        ))
        .ToArray(),
      monthly
        .OrderBy(kvp => kvp.Key)
        .Select(kvp => new EstateOccupationYearlyStatisticsOutput(
          maxDateYearly.AddMonths(kvp.Key - 1).Month,
          kvp.Value.Select(euId => estateMap[euId]).Distinct().Count(),
          0
        ))
        .ToArray(),
      null,
      null
    );
  }
}
