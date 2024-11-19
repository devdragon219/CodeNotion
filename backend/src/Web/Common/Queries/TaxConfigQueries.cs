using System.Collections;
using HotChocolate.Resolvers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Localization;
using RealGimm.Core;
using RealGimm.Core.Asst.AssetTaxCalculationAggregate;
using RealGimm.Core.Common.TaxConfigAggregate;
using RealGimm.Core.Common.TaxConfigAggregate.Specifications;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.Core.Taxes;
using RealGimm.Core.Taxes.Interfaces;
using RealGimm.Core.Taxes.SubTables;
using RealGimm.Core.Taxes.Tables;
using RealGimm.Web.Common.DataLoaders;
using RealGimm.Web.Common.Models;
using RealGimm.Web.Common.Queries.Filters;
using RealGimm.Web.Common.Queries.Sorting;
using RealGimm.WebCommons.Models;

namespace RealGimm.Web.Common.Queries;

public sealed class TaxConfigQueries : QueriesBase
{
  [BackOfficePermission(Features.COMMON_TAX_RATES, Permission.Read)]
  public async Task<IEnumerable<TaxCalculator>> GetAvailableCalculators(
    [Service] IServiceProvider serviceProvider)
  {
    return await Task.WhenAll(serviceProvider
      .GetServices<ITaxCalculator>()
      .Select(async tc => new TaxCalculator(tc.Identifier, tc.Description, await tc.GetConfigurationAsync()))
      .ToArray());
  }

  [BackOfficePermission(Features.COMMON_TAX_RATES, Permission.Read)]
  public async Task<IEnumerable<TaxCalculatorName>> GetHistoryAvailableCalculators(
    [Service] IReadRepository<AssetTaxCalculation> assetTaxCalculationRepo,
    [Service] IServiceProvider serviceProvider,
    CancellationToken cancellationToken)
  {
    //Get any historycal calculator that has taxes on this database
    var usedCalculatorIds = await assetTaxCalculationRepo
      .AsQueryable()
      .Select(t => t.TaxCalculatorId)
      .Distinct()
      .ToListAsync(cancellationToken);

    var currentCalculators = serviceProvider
      .GetServices<ITaxCalculator>()
      .Select(tc => new TaxCalculatorName(tc.Identifier, tc.Description))
      .ToArray();

    return currentCalculators.Concat(
      usedCalculatorIds.Except(currentCalculators.Select(t => t.Id))
        .Select(id => new TaxCalculatorName(id, DismissedTaxCalculators.Names[id]))
    );
  }

  [BackOfficePermission(Features.COMMON_TAX_RATES, Permission.Read)]
  public async Task<ITaxConfigMainTableRow?> GetTableValue(
    Guid calculatorId,
    string tableCode,
    int tableValueId,
    [Service] TaxCalculatorService tcService,
    [Service] CityByAnyGuidDataLoader dataLoader,
    CancellationToken ct
  )
  {
    var tc = tcService.GetTaxCalculator(calculatorId)
      ?? throw new InvalidOperationException("Unable to retrieve calculator");

    var config = await tc.GetConfigurationAsync();

    var tableDef = config.AvailableMainTables.FirstOrDefault(t => t.Code == tableCode);

    if (tableDef is null)
    {
      return null;
    }

    var values = await config.GetTableValues(tableCode, ct);

    var value = values.FirstOrDefault(v => v.Id == tableValueId);

    if (value is null)
    {
      return null;
    }

    var grouping = tableDef.Grouping;

    if (grouping == RateAreaType.NoGrouping)
    {
      return new TaxConfigGenericRow(
          value.Id,
          value.Year,
          value.SubValues.Select(sv => new TaxConfigColumn(sv)).ToArray()
        );
    }
    else
    {
      var city = await dataLoader.LoadAsync(value.GroupingReference!.Value, ct);

      return new TaxConfigGroupedRow(
          value.Id,
          value.Year,
          grouping,
          value.GroupingReference,
          city,
          value.GroupingName,
          value.SubValues.Select(sv => new TaxConfigColumn(sv)).ToArray()
        );
    }
  }

  [BackOfficePermission(Features.COMMON_TAX_RATES, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(TaxConfigMainTableFilterType))]
  [UseSorting(typeof(TaxConfigMainTableSortInputType))]
  public async Task<IQueryable<ITaxConfigMainTableRow>> ListTableValues(
    Guid calculatorId,
    string tableCode,
    [Service] TaxCalculatorService tcService,
    [Service] CityByAnyGuidDataLoader dataLoader,
    CancellationToken ct)
  {
    var tc = tcService.GetTaxCalculator(calculatorId)
      ?? throw new InvalidOperationException("Unable to retrieve calculator");

    var config = await tc.GetConfigurationAsync();

    var tableDef = config.AvailableMainTables.FirstOrDefault(t => t.Code == tableCode);

    if (tableDef is null)
    {
      return Array.Empty<ITaxConfigMainTableRow>().AsQueryable();
    }

    var values = await config.GetTableValues(tableCode, ct);

    var grouping = tableDef.Grouping;

    if (grouping == RateAreaType.NoGrouping)
    {
      return values
        .Select(v => new TaxConfigGenericRow(
          v.Id,
          v.Year,
          v.SubValues.Select(sv => new TaxConfigColumn(sv)).ToArray()
        ))
        .AsQueryable();
    }
    else
    {
      var cities = await dataLoader.LoadAsync(
        values
          .Select(v => v.GroupingReference!.Value)
          .Distinct()
          .ToList()
          .AsReadOnly(),
        ct);

      return values
        .Select(v => new TaxConfigGroupedRow(
          v.Id,
          v.Year,
          grouping,
          v.GroupingReference,
          cities.FirstOrDefault(
            ct => ct.Guid == v.GroupingReference
              || (ct.CountyGuid.HasValue && ct.CountyGuid.Value == v.GroupingReference)
              || (ct.RegionGuid.HasValue && ct.RegionGuid.Value == v.GroupingReference)
          ),
          v.GroupingName,
          v.SubValues.Select(sv => new TaxConfigColumn(sv)).ToArray()
        ))
        .AsQueryable();
    }
  }

  [BackOfficePermission(Features.COMMON_TAX_RATES, Permission.Read)]
  public async Task<bool> CheckTableValueExists(
    Guid calculatorId,
    string tableCode,
    int year,
    Guid? groupingReference,
    [Service] TaxCalculatorService tcService,
    [Service] CityByAnyGuidDataLoader dataLoader,
    CancellationToken cancellationToken)
  {
    var taxCalculator = tcService.GetTaxCalculator(calculatorId);
    if (taxCalculator is null)
    {
      throw new InvalidOperationException("Unable to retrieve calculator");
    }

    var config = await taxCalculator.GetConfigurationAsync();
    var tableDefinition = config.AvailableMainTables.FirstOrDefault(table => table.Code == tableCode);

    if (tableDefinition is null)
    {
      return false;
    }

    var values = await config.GetTableValues(tableCode, cancellationToken);

    return values.Any(taxConfig => taxConfig.Year == year && taxConfig.GroupingReference == groupingReference);
  }

  [BackOfficePermission(Features.COMMON_TAX_RATES, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(TaxConfigMainTableFilterType))]
  [UseSorting(typeof(TaxConfigMainTableSortInputType))]
  public async Task<IQueryable<ITaxConfigSubTableRow>> ListSubTableValue(
    Guid calculatorId,
    string tableCode,
    int year,
    Guid? groupReference,
    string subTable,
    [Service] TaxCalculatorService tcService,
    CancellationToken ct)
  {
    var tc = tcService.GetTaxCalculator(calculatorId)
      ?? throw new InvalidOperationException("Unable to retrieve calculator");

    var config = await tc.GetConfigurationAsync();

    var tableDef = config.AvailableMainTables.FirstOrDefault(t => t.Code == tableCode);

    if (tableDef is null || !config.AvailableSubTables[tableCode].Any(t => t.Code == subTable))
    {
      return Array.Empty<ITaxConfigSubTableRow>().AsQueryable();
    }

    var values = await config.GetSubTableValues(tableCode,
      year,
      groupReference,
      subTable,
      ct);

    return subTable switch
    {
      TaxConfigurationBase.SUBTBL_COEFFICIENTS
        => values
          .Select(v => new TaxConfigCoefficientSubTableRow(v))
          .OrderByDescending(v => v.ReferenceYear)
          .AsQueryable(),
      TaxConfigurationBase.SUBTBL_RATES
        => values
          .Select(v => new TaxConfigRateSubTableRow(v))
          .OrderBy(v => v.Code)
          .ThenBy(v => v.Description)
          .AsQueryable(),
      _ => Array.Empty<ITaxConfigSubTableRow>().AsQueryable()
    };
  }

  [BackOfficePermission(Features.COMMON_TAX_RATES, Permission.Read)]
  public async Task<IQueryable<ITaxConfigSubTableRow>> ListSubTableValueFull(
    Guid calculatorId,
    string tableCode,
    int year,
    Guid? groupReference,
    string subTable,
    [Service] TaxCalculatorService tcService,
    CancellationToken ct)
  {
    var tc = tcService.GetTaxCalculator(calculatorId)
      ?? throw new InvalidOperationException("Unable to retrieve calculator");

    var config = await tc.GetConfigurationAsync();

    var tableDef = config.AvailableMainTables.FirstOrDefault(t => t.Code == tableCode);

    if (tableDef is null || !config.AvailableSubTables[tableCode].Any(t => t.Code == subTable))
    {
      return Array.Empty<ITaxConfigSubTableRow>().AsQueryable();
    }

    var values = await config.GetSubTableValues(tableCode,
      year,
      groupReference,
      subTable,
      ct);

    return subTable switch
    {
      TaxConfigurationBase.SUBTBL_COEFFICIENTS
        => values
          .Select(v => new TaxConfigCoefficientSubTableRow(v))
          .OrderByDescending(v => v.ReferenceYear)
          .AsQueryable(),
      TaxConfigurationBase.SUBTBL_RATES
        => values
          .Select(v => new TaxConfigRateSubTableRow(v))
          .OrderBy(v => v.Code)
          .AsQueryable(),
      _ => Array.Empty<ITaxConfigSubTableRow>().AsQueryable()
    };
  }

  [BackOfficePermission(Features.COMMON_TAX_RATES, Permission.Read)]
  public async Task<TaxConfigValueBundle?> GetTableValueBundle(
    Guid calculatorId,
    string tableCode,
    int tableValueId,
    [Service] TaxCalculatorService tcService,
    [Service] CityByAnyGuidDataLoader dataLoader,
    CancellationToken ct
  )
  {
    var tc = tcService.GetTaxCalculator(calculatorId)
      ?? throw new InvalidOperationException("Unable to retrieve calculator");

    var config = await tc.GetConfigurationAsync();

    var tableDef = config.AvailableMainTables.FirstOrDefault(t => t.Code == tableCode);

    if (tableDef is null)
    {
      return null;
    }

    var values = await config.GetTableValues(tableCode, ct);

    var value = values.FirstOrDefault(v => v.Id == tableValueId);

    if (value is null)
    {
      return null;
    }

    var grouping = tableDef.Grouping;

    ITaxConfigMainTableRow? tableRow = grouping == RateAreaType.NoGrouping
      ? new TaxConfigGenericRow(
            value.Id,
            value.Year,
            value.SubValues.Select(sv => new TaxConfigColumn(sv)).ToArray()
          )
      : null;

    if (tableRow is null)
    {
      var city = await dataLoader.LoadAsync(value.GroupingReference!.Value, ct);

      tableRow = new TaxConfigGroupedRow(
          value.Id,
          value.Year,
          grouping,
          value.GroupingReference,
          city,
          value.GroupingName,
          value.SubValues.Select(sv => new TaxConfigColumn(sv)).ToArray()
        );
    }

    var subTables = (await Task.WhenAll(config
      .AvailableSubTables[tableCode]
      .Select(async st =>
      {
        var values = await config.GetSubTableValues(tableCode,
          value.Year,
          value.GroupingReference,
          st.Code,
          ct);

        return new
        {
          Name = st.Code,
          Data = st.Code switch
          {
            TaxConfigurationBase.SUBTBL_COEFFICIENTS
              => values
                .Select(v => new TaxConfigCoefficientSubTableRow(v))
                .OrderByDescending(v => v.ReferenceYear)
                .ToArray(),
            TaxConfigurationBase.SUBTBL_RATES
              => values
                .Select(v => new TaxConfigRateSubTableRow(v))
                .OrderBy(v => v.Code)
                .ThenBy(v => v.Description)
                .ToArray(),
            _ => Array.Empty<ITaxConfigSubTableRow>()
          }
        };
      })))
      .ToDictionary(o => o.Name, o => o.Data);

    return new TaxConfigValueBundle(
      new TaxCalculator(tc.Identifier, tc.Description, await tc.GetConfigurationAsync()),
      tableRow,
      subTables);
  }

  [BackOfficePermission(Features.COMMON_TAX_RATES, Permission.Read)]
  [UseFiltering(typeof(TaxConfigMainTableFilterType))]
  [UseSorting(typeof(TaxConfigMainTableSortInputType))]
  public async Task<FileUrlOutput> ExportToExcelMainTable(
    Guid calculatorId,
    string tableCode,
    [Service] TaxCalculatorService taxCalculatorService,
    [Service] IServiceProvider serviceProvider,
    [Service] CityByAnyGuidDataLoader dataLoader,
    [Service] IDistributedCache distributedCache,
    [SchemaService] IResolverContext resolverContext,
    CancellationToken cancellationToken = default)
  {
    var taxCalculator = taxCalculatorService.GetTaxCalculator(calculatorId)
      ?? throw new InvalidOperationException("Unable to retrieve calculator");

    var config = await taxCalculator.GetConfigurationAsync();
    
    var tableDefinition = config.AvailableMainTables.FirstOrDefault(table => table.Code == tableCode)
      ?? throw new InvalidOperationException("Not existing data");
    
    var subTableCode = config.AvailableSubTables.ContainsKey(tableDefinition.Code)
      ? config.AvailableSubTables[tableDefinition.Code].SingleOrDefault()?.Code
      : null;

    var values = (await config.GetTableValues(tableCode, cancellationToken))
      .Select(value => (Value: value, FilteredSubValues: value.SubValues.Where(subValue => subValue.SubTable == subTableCode)));

    IEnumerable results;

    if (tableDefinition.Grouping == RateAreaType.NoGrouping)
    {
      results = subTableCode switch
      {
        null => values
          .Select(value => new TaxConfigGenericRow(
            value.Value.Id,
            value.Value.Year,
            value.FilteredSubValues.Select(subValue => new TaxConfigColumn(subValue)).ToArray()))
          .Cast<ITaxConfigMainTableRow>()
          .Filter(resolverContext)
          .Sort(resolverContext)
          .Cast<TaxConfigGenericRow>()
          .ToList(),

        TaxConfigurationBase.SUBTBL_COEFFICIENTS => values
          .Select(value => new TaxConfigGenericRow<TaxConfigGenericCoefficientSubTableRow>(
            value.Value.Id,
            value.Value.Year,
            value.Value.SubValues.Select(subValue => new TaxConfigColumn(subValue)).ToArray(),
            value.FilteredSubValues
              .Where(subValue => subValue.SubTable == subTableCode)
              .Select(subValue => new TaxConfigGenericCoefficientSubTableRow(value.Value, subValue))
              .OrderByDescending(row => row.ReferenceYear)
              .ToArray()))
          .Cast<ITaxConfigMainTableRow>()
          .Filter(resolverContext)
          .Sort(resolverContext)
          .Cast<TaxConfigGenericRow<TaxConfigGenericCoefficientSubTableRow>>()
          .SelectMany(row => row.SubRows)
          .ToList(),

        TaxConfigurationBase.SUBTBL_RATES => values
          .Select(value => new TaxConfigGenericRow<TaxConfigGenericRateSubTableRow>(
            value.Value.Id,
            value.Value.Year,
            value.Value.SubValues.Select(subValue => new TaxConfigColumn(subValue)).ToArray(),
            value.FilteredSubValues
              .Where(subValue => subValue.SubTable == subTableCode)
              .Select(subValue => new TaxConfigGenericRateSubTableRow(value.Value, subValue))
              .OrderBy(row => row.Code)
              .ThenBy(row => row.Description)
              .ToArray()))
          .Cast<ITaxConfigMainTableRow>()
          .Filter(resolverContext)
          .Sort(resolverContext)
          .Cast<TaxConfigGenericRow<TaxConfigGenericRateSubTableRow>>()
          .SelectMany(row => row.SubRows)
          .ToList(),

        _ => throw new NotSupportedException()
      };
    }
    else
    {
      var cities = await dataLoader.LoadAsync(
        values.Select(value => value.Value.GroupingReference!.Value).Distinct().ToList(),
        cancellationToken);

      var getCity = (Guid? groupingReference) =>
      {
        if (groupingReference is null)
        {
          return null;
        }

        return cities.FirstOrDefault(
          city => city.Guid == groupingReference ||
          city.CountyGuid == groupingReference ||
          city.RegionGuid == groupingReference);
      };

      results = subTableCode switch
      {
        null => values
          .Select(value => new TaxConfigGroupedRow(
            value.Value.Id,
            value.Value.Year,
            tableDefinition.Grouping,
            value.Value.GroupingReference,
            getCity(value.Value.GroupingReference),
            value.Value.GroupingName,
            value.FilteredSubValues.Select(subValue => new TaxConfigColumn(subValue)).ToArray()))
          .Cast<ITaxConfigMainTableRow>()
          .Filter(resolverContext)
          .Sort(resolverContext)
          .Cast<TaxConfigGroupedRow>()
          .ToList(),

        TaxConfigurationBase.SUBTBL_COEFFICIENTS => values
          .Select(value => new TaxConfigGroupedRow<TaxConfigGroupedCoefficientSubTableRow>(
            value.Value.Id,
            value.Value.Year,
            tableDefinition.Grouping,
            value.Value.GroupingReference,
            getCity(value.Value.GroupingReference),
            value.Value.GroupingName,
            value.Value.SubValues.Select(subValue => new TaxConfigColumn(subValue)).ToArray(),
            value.FilteredSubValues
              .Where(subValue => subValue.SubTable == subTableCode)
              .Select(subValue => new TaxConfigGroupedCoefficientSubTableRow(
                value.Value,
                getCity(value.Value.GroupingReference),
                subValue))
              .OrderByDescending(row => row.ReferenceYear)
              .ToArray()))
          .Cast<ITaxConfigMainTableRow>()
          .Filter(resolverContext)
          .Sort(resolverContext)
          .Cast<TaxConfigGroupedRow<TaxConfigGroupedCoefficientSubTableRow>>()
          .SelectMany(row => row.SubRows)
          .ToList(),

        TaxConfigurationBase.SUBTBL_RATES => values
          .Select(value => new TaxConfigGroupedRow<TaxConfigGroupedRateSubTableRow>(
            value.Value.Id,
            value.Value.Year,
            tableDefinition.Grouping,
            value.Value.GroupingReference,
            getCity(value.Value.GroupingReference),
            value.Value.GroupingName,
            value.Value.SubValues.Select(subValue => new TaxConfigColumn(subValue)).ToArray(),
            value.FilteredSubValues
              .Where(subValue => subValue.SubTable == subTableCode)
              .Select(subValue => new TaxConfigGroupedRateSubTableRow(
                value.Value,
                getCity(value.Value.GroupingReference),
                subValue))
              .OrderBy(row => row.Code)
              .ThenBy(row => row.Description)
              .ToArray()))
          .Cast<ITaxConfigMainTableRow>()
          .Filter(resolverContext)
          .Sort(resolverContext)
          .Cast<TaxConfigGroupedRow<TaxConfigGroupedRateSubTableRow>>()
          .SelectMany(row => row.SubRows)
          .ToList(),

        _ => throw new NotSupportedException()
      };
    }

    var exportServiceType = typeof(IExportService<>).MakeGenericType(results.GetType().GetGenericArguments().Single());
    var exportService = (IExportService)serviceProvider.GetRequiredService(exportServiceType);

    var exportServiceLocalizer = (IStringLocalizer)serviceProvider.GetRequiredService(
      typeof(IStringLocalizer<>).MakeGenericType(exportService.GetType()));

    return await ExportToExcelAsync(
      results,
      worksheetName: exportServiceLocalizer[$"{calculatorId}.{tableCode}.WorksheetName"].Value,
      downloadFileName: exportServiceLocalizer[$"{calculatorId}.{tableCode}.DownloadFileName"].Value,
      distributedCache,
      exportService,
      cancellationToken);
  }

  [BackOfficePermission(Features.COMMON_TAX_RATES, Permission.Read)]
  [UseFiltering<ITaxConfigSubTableRow>]
  [UseSorting<ITaxConfigSubTableRow>]
  public async Task<FileUrlOutput> ExportToExcelSubTables(
    Guid calculatorId,
    string tableCode,
    string subTable,
    int year,
    Guid? groupReference,
    [Service] IRepository<TaxConfig> taxConfigRepository,
    [Service] TaxCalculatorService taxCalculatorService,
    [Service] IServiceProvider serviceProvider,
    [Service] CityByAnyGuidDataLoader dataLoader,
    [Service] IDistributedCache distributedCache,
    [SchemaService] IResolverContext resolverContext,
    CancellationToken cancellationToken = default)
  {
    var taxCalculator = taxCalculatorService.GetTaxCalculator(calculatorId)
      ?? throw new InvalidOperationException("Unable to retrieve calculator");

    var config = await taxCalculator.GetConfigurationAsync();

    var tableDefinition = config.AvailableMainTables.FirstOrDefault(table => table.Code == tableCode)
      ?? throw new InvalidOperationException("Not existing data");

    var subValues = (await taxConfigRepository
      .AsQueryable(
        new TaxConfigByCalculatorSpec(calculatorId),
        new TaxConfigIncludeAllSpec(),
        new TaxConfigByTableYearGroupSpec(tableCode, year, groupReference))
      .ToListAsync(cancellationToken))
      .SelectMany(value => value.SubValues.Select(subValue => (Value: value, SubValue: subValue)))
      .ToList();

    IEnumerable results;

    if (tableDefinition.Grouping == RateAreaType.NoGrouping)
    {
      results = subTable switch
      {
        TaxConfigurationBase.SUBTBL_COEFFICIENTS
          => subValues
              .Select(pair => new TaxConfigGenericCoefficientSubTableRow(pair.Value, pair.SubValue))
              .OrderByDescending(row => row.ReferenceYear)
              .Cast<ITaxConfigSubTableRow>()
              .Filter(resolverContext)
              .Sort(resolverContext)
              .Cast<TaxConfigGenericCoefficientSubTableRow>()
              .ToList(),

        TaxConfigurationBase.SUBTBL_RATES
          => subValues
              .Select(pair => new TaxConfigGenericRateSubTableRow(pair.Value, pair.SubValue))
              .OrderBy(row => row.Code)
              .ThenBy(row => row.Description)
              .Cast<ITaxConfigSubTableRow>()
              .Filter(resolverContext)
              .Sort(resolverContext)
              .Cast<TaxConfigGenericCoefficientSubTableRow>()
              .ToList(),

        _ => throw new NotSupportedException()
      };
    }
    else
    {
      var cities = await dataLoader.LoadAsync(
        subValues
          .Where(pair => pair.Value.GroupingReference.HasValue)
          .Select(pair => pair.Value.GroupingReference!.Value)
          .Distinct()
          .ToArray(),
        cancellationToken);

      var getCity = (Guid? groupingReference) =>
      {
        if (groupingReference is null)
        {
          return null;
        }

        return cities.FirstOrDefault(
          city => city.Guid == groupingReference ||
          city.CountyGuid == groupingReference ||
          city.RegionGuid == groupingReference);
      };

      results = subTable switch
      {
        TaxConfigurationBase.SUBTBL_COEFFICIENTS
          => subValues
              .Select(pair => new TaxConfigGroupedCoefficientSubTableRow(
                pair.Value,
                getCity(pair.Value.GroupingReference),
                pair.SubValue))
              .OrderByDescending(row => row.TaxConfig.Year)
              .ThenBy(row => row.TaxConfig.GroupingName)
              .ThenBy(row => row.ReferenceYear)
              .Cast<ITaxConfigSubTableRow>()
              .Filter(resolverContext)
              .Sort(resolverContext)
              .Cast<TaxConfigGroupedCoefficientSubTableRow>()
              .ToList(),

        TaxConfigurationBase.SUBTBL_RATES
          => subValues
              .Select(pair => new TaxConfigGroupedRateSubTableRow(
                pair.Value,
                getCity(pair.Value.GroupingReference),
                pair.SubValue))
              .OrderByDescending(row => row.TaxConfig.Year)
              .ThenBy(row => row.TaxConfig.GroupingName)
              .ThenBy(row => row.Code)
              .Cast<ITaxConfigSubTableRow>()
              .Filter(resolverContext)
              .Sort(resolverContext)
              .Cast<TaxConfigGroupedRateSubTableRow>()
              .ToList(),

        _ => throw new NotSupportedException()
      };
    }

    var exportServiceType = typeof(IExportService<>).MakeGenericType(results.GetType().GetGenericArguments().Single());
    var exportService = (IExportService)serviceProvider.GetRequiredService(exportServiceType);

    var exportServiceLocalizer = (IStringLocalizer)serviceProvider.GetRequiredService(
      typeof(IStringLocalizer<>).MakeGenericType(exportService.GetType()));

    return await ExportToExcelAsync(
      results,
      worksheetName: exportServiceLocalizer[$"{calculatorId}.{tableCode}.WorksheetName"].Value,
      downloadFileName: exportServiceLocalizer[$"{calculatorId}.{tableCode}.DownloadFileName"].Value,
      distributedCache,
      exportService,
      cancellationToken);
  }
}
