using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Asst.Services;
using RealGimm.Core.Extensions;
using RealGimm.Core.Nrgy.CostChargeAggregate;
using RealGimm.Core.Nrgy.CostChargeAggregate.Specifications;
using RealGimm.Core.Nrgy.CostChargeAnalysisAggregate;
using RealGimm.Core.Nrgy.UtilityServiceAggregate;
using RealGimm.Core.Nrgy.UtilityTypeAggregate;
using RealGimm.Core.Shared.Specifications;

namespace RealGimm.Core.Nrgy.Services;

public sealed class CostChargeAnalysisService
{
  private readonly IRepository<CostCharge> _costChargeRepository;
  private readonly IRepository<Estate> _estateRepository;
  private readonly IRepository<EstateUnit> _estateUnitRepository;
  private readonly IRepository<UtilityService> _utilityServiceRepository;
  private readonly IRepository<UtilityType> _utilityTypeRepository;
  private readonly EstateUnitHistoryService _estateUnitHistoryService;

  public CostChargeAnalysisService(
    IRepository<CostCharge> costChargeRepository,
    IRepository<Estate> estateRepository,
    IRepository<EstateUnit> estateUnitRepository,
    IRepository<UtilityService> utilityServiceRepository,
    IRepository<UtilityType> utilityTypeRepository,
    EstateUnitHistoryService estateUnitRestoringService)
  {
    _costChargeRepository = costChargeRepository;
    _estateRepository = estateRepository;
    _estateUnitRepository = estateUnitRepository;
    _utilityServiceRepository = utilityServiceRepository;
    _utilityTypeRepository = utilityTypeRepository;
    _estateUnitHistoryService = estateUnitRestoringService;
  }

  private async Task<(IQueryable<UtilityService> UtilityServices, IQueryable<Estate> Estates, IEnumerable<int> estateIds)> InnerEstateQuery(
    CostChargeAnalysisFilters? filters, CancellationToken cancellationToken
  )
  {
    var utilityServices = _utilityServiceRepository.AsQueryable()
                          .Where(e => filters != null && filters.UtilityTypesIds != null ? filters.UtilityTypesIds.Contains(e.UtilityType.Id) : true)
                          .Where(e => filters != null && filters.UtilityContractCodes != null ? filters.UtilityContractCodes.Contains(e.UtilityContractCode) : true);


    var estateIds = (await utilityServices.ToListAsync(cancellationToken)).SelectMany(e => e.EstateIds).Distinct();
    var estates = _estateRepository.AsQueryable(new GetByIdsSpec<Estate>(estateIds)).Include(e => e.Addresses)
                  .Where(e => filters != null && filters.EstateIds != null ? filters.EstateIds.Contains(e.Id) : true)
                  .Where(e => filters != null && !string.IsNullOrEmpty(filters.CityName) && e.Addresses.Any() ? e.Addresses.Select(e => e.CityName).Contains(filters.CityName) : true)
                  .Where(e => filters != null && !string.IsNullOrEmpty(filters.CountyName) && e.Addresses.Any() ? e.Addresses.Select(e => e.CountyName).Contains(filters.CountyName) : true)
                  .Where(e => filters != null && !string.IsNullOrEmpty(filters.Toponymy) && e.Addresses.Any() ? e.Addresses.Select(e => e.Toponymy).Contains(filters.Toponymy) : true);

    return (utilityServices, estates, estateIds);
  }

  public async Task<IQueryable<Estate>> GetFilteredEstates(CostChargeAnalysisFilters? filters, CancellationToken cancellationToken)
    => (await InnerEstateQuery(filters, cancellationToken)).Estates;

  public async Task<IEnumerable<Address>> GetFilteredAddresses(CostChargeAnalysisFilters? filters, CancellationToken cancellationToken)
    => (await InnerEstateQuery(filters, cancellationToken)).Estates.SelectMany(e => e.Addresses);

  public async Task<IEnumerable<UtilityType>> GetFilteredUtilityTypes(CostChargeAnalysisFilters? filters, CancellationToken cancellationToken)
  {
    var (utilityServicesQuery, estatesQuery, estateIds) = await InnerEstateQuery(filters, cancellationToken);
    
    var untilityTypeIds = await utilityServicesQuery
      .Where(utilityType => utilityType.EstateIds.Any(esateId => estateIds.Contains(esateId)))
      .Select(utilityType => utilityType.UtilityType.Id)
      .ToListAsync(cancellationToken);

    return _utilityTypeRepository.AsQueryable(new GetByIdsSpec<UtilityType>(untilityTypeIds.Distinct()));
  }

  public async Task<IEnumerable<UtilityService>?> GetFilteredUtilityServices(CostChargeAnalysisFilters? filters, CancellationToken cancellationToken)
  {
    (IQueryable<UtilityService>? utilityServices, IQueryable<Estate> estates, IEnumerable<int> estateIds) = await InnerEstateQuery(filters, cancellationToken);
    return utilityServices?.Where(e => e.EstateIds.Any(x => estateIds.Contains(x)));
  }

  public async Task<Dictionary<CostChargeAnalysisCategory, CostChargeAnalysis>> GetAnalysisAsync(
    CostChargeAnalysisFilters filters,
    CancellationToken cancellationToken)
  {
    var costCharges = await ListCostChargesAsync(filters, cancellationToken);

    var availableYears = costCharges
      .SelectMany(costCharge => new int[] { costCharge.PeriodStart.Year, costCharge.PeriodEnd.Year })
      .Distinct()
      .ToArray();

    // restoring all estate units from history that were active during the available years
    var estateUnitsHistoricalIds = await _estateUnitHistoryService.GetHistoricalIdsPerEstateUnitAsync(
      costCharges.SelectMany(costCharge => costCharge.Service.EstateUnitIds).Distinct(),
      new DateOnly(availableYears.Min(), 01, 01),
      new DateOnly(Math.Max(availableYears.Max() - 1, 1), 12, 31),
      cancellationToken);

    // historical estate units ids -> historical estate units data
    var flatHistoricalEstateUnits = await _estateUnitRepository
      .AsQueryable(new GetByIdsSpec<EstateUnit>(estateUnitsHistoricalIds.Values.SelectMany(ids => ids).Distinct()))
      .Select(estateUnit => new
      {
        estateUnit.Id,
        estateUnit.OwnershipStartDate,
        estateUnit.DisusedDate,
        GrossSurface = estateUnit.Surfaces
          .Where(surface => surface.Metric == SurfaceMeasurementMetric.SquareMetreGrossNormal)
          .Sum(surface => surface.SurfaceSqMTotal),
        HeatingCoolingSurface = estateUnit.Surfaces
          .Where(surface => surface.Metric == SurfaceMeasurementMetric.SquareMetreHeatingCooling)
          .Sum(surface => surface.SurfaceSqMTotal),
        estateUnit.HistoryTags
      })
      .ToListAsync(cancellationToken);

    // flat historical estate units data -> historical estate units per actual estate unit
    var historicalEstateUnits = estateUnitsHistoricalIds
      .ToDictionary(
        pair => pair.Key,
        pair => flatHistoricalEstateUnits
          .Where(estateUnit => pair.Value.Contains(estateUnit.Id))
          .Select(estateUnit => new HistoricalEstateUnitData(
            estateUnit.Id,
            estateUnit.OwnershipStartDate,
            estateUnit.DisusedDate,
            estateUnit.GrossSurface,
            estateUnit.HeatingCoolingSurface))
          .ToArray());

    return costCharges
      .GroupBy(costCharge => costCharge.Service.UtilityType.Category switch
      {
        UtilityCategory.WaterSupply => CostChargeAnalysisCategory.Water,
        UtilityCategory.Electrical => CostChargeAnalysisCategory.Electricity,
        UtilityCategory.NaturalGas or UtilityCategory.LiquidFossilFuels => CostChargeAnalysisCategory.Gas,
        _ => CostChargeAnalysisCategory.Other
      })
      .OrderBy(group => group.Key switch
      {
        CostChargeAnalysisCategory.Water => 0,
        CostChargeAnalysisCategory.Electricity => 1,
        CostChargeAnalysisCategory.Gas => 2,
        CostChargeAnalysisCategory.Other or _ => 3
      })
      .ToDictionary(
        group => group.Key,
        group => GetGroupAnalysis(group, availableYears, historicalEstateUnits));
  }

  private static CostChargeAnalysis GetGroupAnalysis(
    IEnumerable<CostCharge> costCharges,
    int[] availableYears,
    Dictionary<int, HistoricalEstateUnitData[]> historicalEstateUnits)
  {
    // assuming all the values within the group have the same measurement unit
    var measurementUnit = costCharges.First().Service.UtilityType.MeasurementUnit;

    var currentDate = DateTime.UtcNow.ToDateOnly();
    var currentYear = currentDate.Year;
    var previousYear = currentYear - 1;

    var currentYearCostCharges = costCharges
      .Where(costCharge =>
        costCharge.PeriodStart.Year == currentYear ||
        costCharge.PeriodEnd.Year == currentYear)
      .ToList();
    
    var previousYearCostCharges = costCharges
      .Where(costCharge =>
        costCharge.PeriodStart.Year == previousYear ||
        costCharge.PeriodEnd.Year == previousYear)
      .ToList();

    var surface = new CostChargeAnalysisSurface(
      CalculateSurfaceValue(new[] { new DateOnly(currentYear, 12, 31), currentDate }.Min(), currentYearCostCharges, historicalEstateUnits),
      CalculateSurfaceValue(new DateOnly(previousYear, 12, 31), previousYearCostCharges, historicalEstateUnits));

    var perYear = CalculateAnalysisPerYear(availableYears, costCharges, historicalEstateUnits);

    var consumption = new CostChargeAnalysisConsumption(
      perYear.ContainsKey(currentYear) ? perYear[currentYear].Value.TotalConsumption: 0,
      perYear.ContainsKey(previousYear) ? perYear[previousYear].Value.TotalConsumption : 0);

    var cost = new CostChargeAnalysisCost(
      perYear.ContainsKey(currentYear) ? perYear[currentYear].Value.TotalCost : 0,
      perYear.ContainsKey(previousYear) ? perYear[previousYear].Value.TotalCost : 0);

    return new CostChargeAnalysis(measurementUnit, surface, consumption, cost, perYear);
  }

  private static Dictionary<int, CostChargeYearlyAnalysis> CalculateAnalysisPerYear(
    int[] years,
    IEnumerable<CostCharge> costCharges,
    Dictionary<int, HistoricalEstateUnitData[]> historicalEstateUnits)
    => Enumerable
        .Range(years.Min(), years.Max() - years.Min() + 1)
        .ToDictionary(
          year => year,
          year =>
          {
            var startDate = new DateOnly(year, 01, 01);
            var endDate = new DateOnly(year, 12, 31);
            var value = CalculateAnalysisValue(startDate, endDate, costCharges, historicalEstateUnits);

            var targetYearCostCharges = costCharges
              .Where(costCharge =>
                costCharge.PeriodStart.Year == year ||
                costCharge.PeriodEnd.Year == year)
              .ToList();

            var perMonth = CalculateAnalysisPerMonth(year, targetYearCostCharges, historicalEstateUnits);

            return new CostChargeYearlyAnalysis(value, perMonth);
          });

  private static Dictionary<int, CostChargeAnalysisValue> CalculateAnalysisPerMonth(
    int year,
    IEnumerable<CostCharge> costCharges,
    Dictionary<int, HistoricalEstateUnitData[]> historicalEstateUnits)
    => Enumerable
        .Range(1, 12)
        .ToDictionary(
          month => month,
          month =>
          {
            var startDate = new DateOnly(year, month, 01);
            var endDate = new DateOnly(year, month, DateTime.DaysInMonth(year, month));

            return CalculateAnalysisValue(startDate, endDate, costCharges, historicalEstateUnits);
          });

  private static CostChargeAnalysisValue CalculateAnalysisValue(
    DateOnly StartDate,
    DateOnly EndDate,
    IEnumerable<CostCharge> costCharges,
    Dictionary<int, HistoricalEstateUnitData[]> historicalEstateUnits)
  {
    var estateUnitsIds = costCharges
      .Where(costCharge => costCharge.PeriodStart >= StartDate)
      .Where(costCharge => costCharge.PeriodEnd <= EndDate)
      .SelectMany(costCharge => costCharge.Service.EstateUnitIds)
      .Distinct()
      .ToList();

    var estateUnits = historicalEstateUnits
      .Where(pair => estateUnitsIds.Contains(pair.Key))
      .SelectMany(pair => pair.Value)
      .Where(estateUnit => estateUnit.OwnershipStartDate <= EndDate)
      .Where(estateUnit => !estateUnit.DisusedDate.HasValue || StartDate <= estateUnit.DisusedDate)
      .ToList();

    var surfaceModificationDates = estateUnits
      .GroupBy(estateUnit => estateUnit.DisusedDate)
      .Where(group => group.Key.HasValue)
      .Select(group => group.Key!.Value)
      .Concat([StartDate, EndDate])
      .Order()
      .ToList();

    // the ranges are needed because calculation of consumption and cost should perform per surfaces
    var ranges = surfaceModificationDates
      .Zip(surfaceModificationDates.Skip(1), (start, end) => new
      {
        Start = start,
        End = end.AddDays(-1),
        EstateUnits = estateUnits
          .Where(estateUnit => estateUnit.OwnershipStartDate <= end)
          .Where(estateUnit => !estateUnit.DisusedDate.HasValue || start <= estateUnit.DisusedDate)
          .ToList(),
        CostCharges = costCharges
          .Select(costCharge =>
          {
            // calculating percentage, which is reflecting how much of the cost
            // and consumption should be considered for the period
            var intersectionStart = start > costCharge.PeriodStart ? start : costCharge.PeriodStart;
            var intersectionEnd = end < costCharge.PeriodEnd ? end : costCharge.PeriodEnd;
            
            if (intersectionStart > intersectionEnd)
            {
              return (Value: costCharge, Percentage: 0m);
            }
            
            var intersectionDays = (intersectionEnd.DayNumber - intersectionStart.DayNumber) + 1;
            var costChargeDays = (costCharge.PeriodEnd.DayNumber - costCharge.PeriodStart.DayNumber) + 1;

            return (Value: costCharge, Percentage: (decimal)intersectionDays / costChargeDays);
          })
          .Where(costCharge => costCharge.Percentage != 0)
          .Select(costCharge => new
          {
              Amount = costCharge.Value.TotalAmount * costCharge.Percentage,
              Consumption = costCharge.Value.InvoicedConsumptionAmount * costCharge.Percentage
          })
          .ToList()
      })
      .ToList();
    
    var totalConsumption = ranges.Sum(range => range.CostCharges.Sum(costCharge => costCharge.Consumption));

    var consumptionPerGrossSurface = ranges.SumOrNull(range =>
    {
      var consumption = range.CostCharges.Sum(costCharge => costCharge.Consumption);
      var surface = range.EstateUnits.SumOrNull(estateUnit => estateUnit.GrossSurface);

      return surface == 0 ? null : (consumption / surface);
    });

    var consumptionPerHeatingCoolingSurface = ranges.SumOrNull(range =>
    {
      var consumption = range.CostCharges.Sum(costCharge => costCharge.Consumption);
      var surface = range.EstateUnits.SumOrNull(estateUnit => estateUnit.HeatingCoolingSurface);

      return surface == 0 ? null : (consumption / surface);
    });

    var totalCost = ranges.Sum(range => range.CostCharges.Sum(costCharge => costCharge.Amount));

    var costPerGrossSurface = ranges.SumOrNull(range =>
    {
      var cost = range.CostCharges.Sum(costCharge => costCharge.Amount);
      var surface = range.EstateUnits.SumOrNull(estateUnit => estateUnit.GrossSurface);

      return surface == 0 ? null : (cost / surface);
    });

    var costPerHeatingCoolingSurface = ranges.SumOrNull(range =>
    {
      var cost = range.CostCharges.Sum(costCharge => costCharge.Amount);
      var surface = range.EstateUnits.SumOrNull(estateUnit => estateUnit.HeatingCoolingSurface);

      return surface == 0 ? null : (cost / surface);
    });

    return new CostChargeAnalysisValue
    {
      TotalConsumption = totalConsumption.Round2(),
      ConsumptionPerGrossSurface = consumptionPerGrossSurface.Round2(),
      ConsumptionPerHeatingCoolingSurface = consumptionPerHeatingCoolingSurface.Round2(),
      TotalCost = totalCost.Round2(),
      CostPerGrossSurface = costPerGrossSurface.Round2(),
      CostPerHeatingCoolingSurface = costPerHeatingCoolingSurface.Round2()
    };
  }

  private static CostChargeAnalysisSurfaceValue? CalculateSurfaceValue(
    DateOnly date,
    List<CostCharge> costCharges,
    Dictionary<int, HistoricalEstateUnitData[]> historicalEstateUnits)
  {
    var costChargesEstateUnitsIds = costCharges
      .SelectMany(costCharge => costCharge.Service.EstateUnitIds)
      .Distinct()
      .ToArray();

    var amount = historicalEstateUnits
      .Where(pair => costChargesEstateUnitsIds.Contains(pair.Key))
      .Select(pair => pair.Value)
      .Select(estateUnits => estateUnits
        .Where(estateUnit => estateUnit.OwnershipStartDate <= date)
        .Where(estateUnit => !estateUnit.DisusedDate.HasValue || date < estateUnit.DisusedDate)
        .OrderBy(estateUnit => estateUnit.DisusedDate ?? DateOnly.MaxValue) // null last
        .FirstOrDefault())
      .SumOrNull(estateUnit => estateUnit?.HeatingCoolingSurface);

    if (amount is null)
    {
      return null;
    }

    return new CostChargeAnalysisSurfaceValue(amount.Value, date);
  }

  private async Task<List<CostCharge>> ListCostChargesAsync(CostChargeAnalysisFilters filters, CancellationToken cancellationToken)
  {
    var query = _costChargeRepository.AsQueryable(new CostChargeIncludeAllSpec());

    if (filters.EstateIds is not null)
    {
      query = query.Where(costCharge => filters.EstateIds.Any(estateId => costCharge.Service.EstateIds.Contains(estateId)));
    }

    if (filters.UtilityTypesIds is not null)
    {
      query = query.Where(costCharge => filters.UtilityTypesIds.Contains(costCharge.Service.UtilityType.Id));
    }

    if (filters.UtilityContractCodes is not null)
    {
      query = query.Where(costCharge => filters.UtilityContractCodes.Contains(costCharge.Service.UtilityContractCode));
    }

    if (filters.CityName != null || filters.CountyName != null || filters.Toponymy != null)
    {
      var estatesIdsMatchingAddress = await _estateRepository
        .AsQueryable()
        .Select(estate => new
        {
          estate.Id,
          Address = estate.Addresses.FirstOrDefault(address => address.AddressType == AddressType.Primary)
        })
        .Where(estate => filters.CityName == null ? true : estate.Address!.CityName == filters.CityName)
        .Where(estate => filters.CountyName == null ? true : estate.Address!.CountyName == filters.CountyName)
        .Where(estate => filters.Toponymy == null ? true : estate.Address!.Toponymy == filters.Toponymy)
        .Select(estate => estate.Id)
        .ToListAsync(cancellationToken);

      var estateUnitsIdsMatchingAddress = await _estateUnitRepository
        .AsQueryable()
        .Where(estateUnit => filters.CityName == null ? true : estateUnit.Address!.CityName == filters.CityName)
        .Where(estateUnit => filters.CountyName == null ? true : estateUnit.Address!.CountyName == filters.CountyName)
        .Where(estateUnit => filters.Toponymy == null ? true : estateUnit.Address!.Toponymy == filters.Toponymy)
        .Select(estateUnit => estateUnit.Id)
        .ToListAsync(cancellationToken);

      query = query.Where(costCharge =>
        estatesIdsMatchingAddress.Any(estateId => costCharge.Service.EstateIds.Contains(estateId)) ||
        estateUnitsIdsMatchingAddress.Any(estateUnitId => costCharge.Service.EstateUnitIds.Contains(estateUnitId)));
    }

    return await query.ToListAsync(cancellationToken);
  }

  private record HistoricalEstateUnitData(
    int Id,
    DateOnly OwnershipStartDate,
    DateOnly? DisusedDate,
    int? GrossSurface,
    int? HeatingCoolingSurface);
}
