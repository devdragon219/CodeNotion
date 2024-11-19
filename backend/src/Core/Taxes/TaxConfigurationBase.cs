using HotChocolate;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Common.TaxConfigAggregate;
using RealGimm.Core.Common.TaxConfigAggregate.Specifications;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core.Taxes.Interfaces;

namespace RealGimm.Core.Taxes;

public abstract class TaxConfigurationBase : ITaxConfiguration
{
  private readonly IRepository<TaxConfig> _taxConfigRepo;
  private readonly Guid _guid;
  public abstract Table[] AvailableMainTables { get; }
  public abstract Dictionary<string, Table[]> AvailableSubTables { get; }
  public const string TBL_GLOBAL = "global";
  public const string SOURCE_CITY = "city";
  public const string SOURCE_YEAR = "year";
  public const string SOURCE_GROUPING_REFERENCE = "groupingReference";
  public const string SOURCE_GROUPING_NAME = "groupingName";
  public const string SOURCE_OTHERCOL = "otherColumns";
  public const string SUBTBL_RATES = "rates";
  public const string SUBTBL_COEFFICIENTS = "coefficients";

  public TaxConfigurationBase(
    IRepository<TaxConfig> taxConfigRepo,
    Guid calculator)
  {
    _taxConfigRepo = taxConfigRepo;
    _guid = calculator;
  }

  [GraphQLIgnore]
  public virtual async Task<IEnumerable<TaxConfig>> GetTableValues(
    string tableReference,
    CancellationToken cancellationToken
  )
  {
    var parameters = await _taxConfigRepo
      .AsQueryable(
        new TaxConfigByCalculatorSpec(_guid),
        new TaxConfigByTableYearSpec(tableReference, null),
        new TaxConfigIncludeAllSpec())
      .ToListAsync(cancellationToken);

    //Integrate any missing ungrouped parameters
    // (they are always available with the NULL sub table)
    var tableConfig = AvailableMainTables
      .FirstOrDefault(t => t.Code == tableReference);

    if (tableConfig is not null)
    {
      //Add the parameters for each available year config
      var ugParams = tableConfig.Parameters;

      foreach (var p in parameters)
      {
        p.SubValues.AddRange(ugParams
          .Where(ugp => !p.SubValues.Any(subValue => subValue.Code == ugp))
          .Select(ugp =>
          {
            var tsp = new TaxConfigSubValue();
            tsp.SetReferenceData(ugp, ugp, null);
            return tsp;
          })
        );
      }
    }

    return parameters.ToArray();
  }

  [GraphQLIgnore]
  public virtual async Task<IEnumerable<TaxConfigSubValue>> GetSubTableValues(
    string tableReference,
    int year,
    Guid? groupReference,
    string subTable,
    CancellationToken cancellationToken)
  {
    //Integrate with per-table parameters (and filter only for these)
    return await _taxConfigRepo
      .AsQueryable(
        new TaxConfigByCalculatorSpec(_guid),
        new TaxConfigIncludeAllSpec(),
        new TaxConfigByTableYearGroupSpec(
          tableReference,
          year,
          groupReference))
      .SelectMany(tc => tc.SubValues)
      .Where(sv => sv.SubTable == subTable)
      .ToListAsync(cancellationToken);
  }

  [GraphQLIgnore]
  public virtual Task<Dictionary<string, string>> GetSubTableMappings(string mainTable, string subTable)
  {
    if (!AvailableSubTables.TryGetValue(mainTable, out var subTables))
    {
      return Task.FromResult(new Dictionary<string, string>());
    }

    var subTableDefinition = subTables.FirstOrDefault(st => st.Code == subTable);

    if (subTableDefinition is null)
    {
      return Task.FromResult(new Dictionary<string, string>());
    }

    return Task.FromResult(
      subTableDefinition.Columns
        .Where(c => c.WritebackKey is not null)
        .ToDictionary(c => c.WritebackKey!, c => c.Code)
    );
  }

  [GraphQLIgnore]
  public virtual async Task UpdateSubTable(
    string tableReference,
    int year,
    Guid? groupReference,
    IEnumerable<TaxConfigSubValue> values,
    CancellationToken cancellationToken)
  {
    var group = await _taxConfigRepo.AsQueryable(
      new TaxConfigByCalculatorSpec(_guid),
      new TaxConfigIncludeAllSpec(),
      new TaxConfigByTableYearSpec(
          tableReference,
          year))
      .FirstOrDefaultAsync(
        tc => tc.GroupingReference == groupReference,
        cancellationToken)
      ?? throw new InvalidOperationException("Unable to find the parent group");

    var subTables = values
      .Select(v => v.SubTable)
      .Distinct()
      .ToArray();

    //Remove any previous entry for the present subtables
    foreach (var toRemove in group.SubValues
      .Where(sv => subTables.Contains(sv.SubTable))
      .ToList())
    {
      group.SubValues.Remove(toRemove);
    }

    group.SubValues.AddRange(values);

    await _taxConfigRepo.UpdateAsync(group, cancellationToken);

  }

  [GraphQLIgnore]
  public virtual async Task AddGroup(
    string tableReference,
    int year,
    Guid? groupReference,
    CancellationToken cancellationToken)
  {
    var group = await _taxConfigRepo.AsQueryable(
      new TaxConfigByCalculatorSpec(_guid),
      new TaxConfigIncludeAllSpec(),
      new TaxConfigByTableYearSpec(
          tableReference,
          year))
      .FirstOrDefaultAsync(
        tc => tc.GroupingReference == groupReference,
        cancellationToken);

    if (group is not null)
    {
      throw new InvalidOperationException("A group with the same data already exists");
    }

    var newTc = new TaxConfig();
    newTc.SetReferenceData(_guid, year, tableReference);
    newTc.SetGroupingData(null, groupReference);

    await _taxConfigRepo.AddAsync(newTc, cancellationToken);
  }

  [GraphQLIgnore]
  public virtual async Task RemoveGroup(int taxConfigId, CancellationToken cancellationToken)
  {
    var group = await _taxConfigRepo.AsQueryable(
      new TaxConfigByCalculatorSpec(_guid),
      new GetByIdSpec<TaxConfig>(taxConfigId)
    ).FirstOrDefaultAsync(cancellationToken);

    if (group is not null)
    {
      await _taxConfigRepo.DeleteAsync(group, cancellationToken);
    }
  }
}
