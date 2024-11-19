using Ardalis.Result;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Common.TaxConfigAggregate;
using RealGimm.Core.Common.TaxConfigAggregate.Specifications;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core.Taxes;
using RealGimm.Web.Common.Models;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Common.Mutations;

public sealed class TaxConfigMutations : MutationsBase
{
  [BackOfficePermission(Features.COMMON_TAX_RATES, Permission.Create)]
  public async Task<Result> AddTableValue(
    Guid calculatorId,
    string tableCode,
    TaxConfigInput input,
    [Service] TaxCalculatorService tcService,
    [Service] IRepository<TaxConfig> taxConfigRepo,
    [Service] IMapper mapper,
    CancellationToken cancellationToken)
  {
    var tc = tcService.GetTaxCalculator(calculatorId);

    if (tc is null)
    {
      return Result.NotFound();
    }

    var config = await tc.GetConfigurationAsync();

    try
    {
      var year = input.ColumnValues
        ?.FirstOrDefault(sv => sv.Code == TaxConfigurationBase.SOURCE_YEAR)
        ?.NumberValue;

      var mainTableDef = config.AvailableMainTables
        .First(t => t.Code == tableCode);

      var groupColumnName = mainTableDef.Columns
        .FirstOrDefault(c => c.WritebackKey == TaxConfigurationBase.SOURCE_GROUPING_REFERENCE);

      var groupReference = groupColumnName is null
        ? null
        : input.ColumnValues?.FirstOrDefault(sv => sv.Code == groupColumnName.Code)
          ?.StringValue;

      if (year is null
        || (mainTableDef.Grouping != RateAreaType.NoGrouping
          && string.IsNullOrEmpty(groupReference)))
      {
        return Result.NotFound();
      }

      var newTc = new TaxConfig();
      newTc.SetReferenceData(calculatorId, (int)year.Value, tableCode);

      if(!string.IsNullOrEmpty(groupReference))
      {
        newTc.SetGroupingData(null, Guid.Parse(groupReference));
      }

      //add any column values to the subvalues if valid fields
      var subValues = (input.SubValues ?? []).ToList();
      var values = new List<TaxConfigSubValue>();

      if (input.ColumnValues is not null)
      {
        values.AddRange(
          input.ColumnValues
              .Where(cv => mainTableDef.Parameters.Contains(cv.Code))
              .Select(cv =>
              {
                var newTcsv = new TaxConfigSubValue();
                newTcsv.SetReferenceData(cv.Code, cv.Code, null);
                newTcsv.SetValues(
                  cv.ValueType,
                  cv.BooleanValue,
                  cv.StringValue,
                  cv.NumberValue,
                  cv.DateValue);
                return newTcsv;
              })
        );
      }

      if (subValues.Count > 0)
      {
        foreach (var svGroup in subValues.GroupBy(sv => sv.SubTable!))
        {
          var colMap = await (await tc.GetConfigurationAsync()).GetSubTableMappings(
                tableCode,
                svGroup.Key);

          foreach (var ninput in svGroup)
          {
            var newinput = ninput with
            {
              ColumnMappings = colMap
            };

            var subValue = await mapper.MapAsync<TaxConfigSubValueRowInput, TaxConfigSubValue>(
              newinput, null, cancellationToken);

            if (subValue is null)
            {
              return Result.Invalid(ErrorCode.UnableToMapTaxConfigSubValues.ToValidationError());
            }

            values.Add(subValue!);
          }
        }
      }

      newTc.SubValues.AddRange(values);

      await taxConfigRepo.AddAsync(newTc, cancellationToken);

      return Result.Success();
    }
    catch (InvalidOperationException)
    {
      return Result.Invalid(ErrorCode.TaxConfigGroupAlreadyExists.ToValidationError());
    }
  }

  [BackOfficePermission(Features.COMMON_TAX_RATES, Permission.Update)]
  public async Task<Result> UpdateTableValue(
    Guid calculatorId,
    string tableCode,
    int tableValueId,
    TaxConfigInput input,
    [Service] TaxCalculatorService tcService,
    [Service] IRepository<TaxConfig> taxConfigRepo,
    [Service] IMapper mapper,
    CancellationToken cancellationToken)
  {
    var tc = tcService.GetTaxCalculator(calculatorId);

    if (tc is null)
    {
      return Result.NotFound();
    }

    var config = await tc.GetConfigurationAsync();

    var tableValue = await taxConfigRepo
        .AsQueryable(
          new TaxConfigByCalculatorSpec(calculatorId),
          new TaxConfigIncludeAllSpec(),
          new GetByIdSpec<TaxConfig>(tableValueId))
        .FirstOrDefaultAsync(cancellationToken);

    if (tableValue is null)
    {
      return Result.NotFound();
    }

    try
    {
      var year = input.ColumnValues
        ?.FirstOrDefault(sv => sv.Code == TaxConfigurationBase.SOURCE_YEAR)
        ?.NumberValue;

      var mainTableDef = config.AvailableMainTables
        .First(t => t.Code == tableCode);

      var groupColumnName = mainTableDef.Columns
        .FirstOrDefault(c => c.WritebackKey == TaxConfigurationBase.SOURCE_GROUPING_REFERENCE);

      var groupReference = groupColumnName is null
        ? null
        : input.ColumnValues?.FirstOrDefault(sv => sv.Code == groupColumnName.Code)
          ?.StringValue;

      if (year is null
        || (mainTableDef.Grouping != RateAreaType.NoGrouping
          && string.IsNullOrEmpty(groupReference)))
      {
        return Result.NotFound();
      }

      tableValue.SetReferenceData(calculatorId, (int)year!, tableValue.Table);

      //add any column values to the subvalues if valid fields
      var subValues = (input.SubValues ?? []).ToList();
      var values = new List<TaxConfigSubValue>();

      if (input.ColumnValues is not null)
      {
        values.AddRange(
          input.ColumnValues
              .Where(cv => mainTableDef.Parameters.Contains(cv.Code))
              .Select(cv =>
              {
                var newTcsv = new TaxConfigSubValue();
                newTcsv.SetReferenceData(cv.Code, cv.Code, null);
                newTcsv.SetValues(
                  cv.ValueType,
                  cv.BooleanValue,
                  cv.StringValue,
                  cv.NumberValue,
                  cv.DateValue);
                return newTcsv;
              })
        );
      }

      if (subValues.Count > 0)
      {
        foreach (var svGroup in subValues.GroupBy(sv => sv.SubTable!))
        {
          var colMap = await (await tc.GetConfigurationAsync()).GetSubTableMappings(
                tableValue.Table,
                svGroup.Key);

          foreach (var ninput in svGroup)
          {
            var newinput = ninput with
            {
              ColumnMappings = colMap
            };

            var subValue = await mapper.MapAsync<TaxConfigSubValueRowInput, TaxConfigSubValue>(
              newinput, null, cancellationToken);

            if (subValue is null)
            {
              return Result.Invalid(ErrorCode.UnableToMapTaxConfigSubValues.ToValidationError());
            }

            values.Add(subValue!);
          }
        }
      }

      tableValue.SubValues.Clear();
      tableValue.SubValues.AddRange(values);

      await taxConfigRepo.UpdateAsync(tableValue, cancellationToken);

      return Result.Success();
    }
    catch (InvalidOperationException)
    {
      return Result.Invalid(ErrorCode.TaxConfigGroupAlreadyExists.ToValidationError());
    }
  }

  [BackOfficePermission(Features.COMMON_TAX_RATES, Permission.Delete)]
  public async Task<Result> DeleteTableValue(
    Guid calculatorId,
    int tableValueId,
    [Service] TaxCalculatorService tcService,
    CancellationToken cancellationToken)
  {
    var tc = tcService.GetTaxCalculator(calculatorId);

    if (tc is null)
    {
      return Result.NotFound();
    }

    var config = await tc.GetConfigurationAsync();

    try
    {
      await config.RemoveGroup(tableValueId, cancellationToken);

      return Result.Success();
    }
    catch (InvalidOperationException)
    {
      return Result.NotFound();
    }
  }

  [BackOfficePermission(Features.COMMON_TAX_RATES, Permission.Delete)]
  public async Task<Result> DeleteTableValueRange(
    Guid calculatorId,
    int[] tableValueIds,
    [Service] TaxCalculatorService tcService,
    CancellationToken cancellationToken)
  {
    var tc = tcService.GetTaxCalculator(calculatorId);

    if (tc is null)
    {
      return Result.NotFound();
    }

    var config = await tc.GetConfigurationAsync();

    try
    {
      foreach (var id in tableValueIds)
      {
        await config.RemoveGroup(id, cancellationToken);
      }

      return Result.Success();
    }
    catch (InvalidOperationException)
    {
      return Result.NotFound();
    }
  }

  [BackOfficePermission(Features.COMMON_TAX_RATES, Permission.Create)]
  public async Task<Result> AddSubTableValue(
    Guid calculatorId,
    string tableCode,
    int year,
    Guid? groupReference,
    TaxConfigSubValueRowInput input,
    [Service] TaxCalculatorService tcService,
    [Service] IRepository<TaxConfig> taxConfigRepo,
    [Service] IMapper mapper,
    CancellationToken cancellationToken)
  {
    var tc = tcService.GetTaxCalculator(calculatorId);

    if (tc is null)
    {
      return Result.NotFound();
    }

    if (input.SubTable is null)
    {
      return Result.Invalid();
    }

    var tableValue = await taxConfigRepo
        .AsQueryable(
          new TaxConfigByCalculatorSpec(calculatorId),
          new TaxConfigIncludeAllSpec(),
          new TaxConfigByTableYearGroupSpec(tableCode, year, groupReference))
        .FirstOrDefaultAsync(cancellationToken);

    if (tableValue is null)
    {
      return Result.NotFound();
    }

    input = input with
    {
      ColumnMappings = await (await tc.GetConfigurationAsync()).GetSubTableMappings(
        tableValue.Table,
        input.SubTable)
    };

    //Create the relevant subitem
    var subValue = await mapper.MapAsync<TaxConfigSubValueRowInput, TaxConfigSubValue>(
      input, null, cancellationToken);

    if (subValue is null)
    {
      return Result.Invalid(ErrorCode.UnableToMapTaxConfigSubValues.ToValidationError());
    }

    tableValue.SubValues.Add(subValue);

    await taxConfigRepo.UpdateAsync(tableValue, cancellationToken);

    return Result.Success();
  }

  [BackOfficePermission(Features.COMMON_TAX_RATES, Permission.Update)]
  public async Task<Result> UpdateSubTableValue(
    Guid calculatorId,
    string tableCode,
    int year,
    Guid? groupReference,
    int subTableValueId,
    TaxConfigSubValueRowInput input,
    [Service] TaxCalculatorService tcService,
    [Service] IMapper mapper,
    [Service] IRepository<TaxConfig> taxConfigRepo,
    CancellationToken cancellationToken)
  {
    var tc = tcService.GetTaxCalculator(calculatorId);

    if (tc is null)
    {
      return Result.NotFound();
    }

    if (input.SubTable is null)
    {
      return Result.Invalid();
    }

    var tableValue = await taxConfigRepo
        .AsQueryable(
          new TaxConfigByCalculatorSpec(calculatorId),
          new TaxConfigIncludeAllSpec(),
          new TaxConfigByTableYearGroupSpec(tableCode, year, groupReference))
        .FirstOrDefaultAsync(cancellationToken);

    if (tableValue is null)
    {
      return Result.NotFound();
    }

    input = input with
    {
      ColumnMappings = await (await tc.GetConfigurationAsync()).GetSubTableMappings(
        tableValue.Table,
        input.SubTable)
    };

    var updatedValue = await mapper.MapAsync<TaxConfigSubValueRowInput, TaxConfigSubValue>(
        input, null, cancellationToken);

    if (updatedValue is null)
    {
      return Result.Invalid(ErrorCode.UnableToMapTaxConfigSubValues.ToValidationError());
    }

    //Update the relevant subitem
    var subValue = tableValue.SubValues.FirstOrDefault(
      sv => sv.Id == subTableValueId
    );

    if (subValue is null)
    {
      return Result.NotFound();
    }

    subValue.SetValues(updatedValue.ValueType,
      updatedValue.BooleanValue,
      updatedValue.StringValue,
      updatedValue.NumberValue,
      updatedValue.DateValue);

    await taxConfigRepo.UpdateAsync(tableValue, cancellationToken);

    return Result.Success();
  }

  [BackOfficePermission(Features.COMMON_TAX_RATES, Permission.Delete)]
  public async Task<Result> DeleteSubTableValue(
    Guid calculatorId,
    string tableCode,
    int year,
    Guid? groupReference,
    int subTableValueId,
    [Service] IRepository<TaxConfig> taxConfigRepo,
    [Service] TaxCalculatorService tcService,
    CancellationToken cancellationToken)
  {
    var tc = tcService.GetTaxCalculator(calculatorId);

    if (tc is null)
    {
      return Result.NotFound();
    }

    var tableValue = await taxConfigRepo
        .AsQueryable(
          new TaxConfigByCalculatorSpec(calculatorId),
          new TaxConfigIncludeAllSpec(),
          new TaxConfigByTableYearGroupSpec(tableCode, year, groupReference))
        .FirstOrDefaultAsync(cancellationToken);

    if (tableValue is null)
    {
      return Result.NotFound();
    }

    //Remove the relevant subitem and update
    var subValue = tableValue.SubValues.FirstOrDefault(
      sv => sv.Id == subTableValueId
    );

    if (subValue is null)
    {
      return Result.NotFound();
    }

    tableValue.SubValues.Remove(subValue);

    await taxConfigRepo.UpdateAsync(tableValue, cancellationToken);

    return Result.Success();
  }

  [BackOfficePermission(Features.COMMON_TAX_RATES, Permission.Delete)]
  public async Task<Result> DeleteSubTableValueRange(
    Guid calculatorId,
    string tableCode,
    int year,
    Guid? groupReference,
    int[] subTableValueIds,
    [Service] IRepository<TaxConfig> taxConfigRepo,
    [Service] TaxCalculatorService tcService,
    CancellationToken cancellationToken)
  {
    var tc = tcService.GetTaxCalculator(calculatorId);

    if (tc is null)
    {
      return Result.NotFound();
    }

    var tableValue = await taxConfigRepo
        .AsQueryable(
          new TaxConfigByCalculatorSpec(calculatorId),
          new TaxConfigIncludeAllSpec(),
          new TaxConfigByTableYearGroupSpec(tableCode, year, groupReference))
        .FirstOrDefaultAsync(cancellationToken);

    if (tableValue is null)
    {
      return Result.NotFound();
    }

    //Remove the relevant subitem and update
    var subValues = tableValue.SubValues
      .Where(sv => subTableValueIds.Contains(sv.Id))
      .ToList();

    if (subValues.Count == 0)
    {
      return Result.NotFound();
    }

    foreach (var sv in subValues)
    {
      tableValue.SubValues.Remove(sv);
    }

    await taxConfigRepo.UpdateAsync(tableValue, cancellationToken);

    return Result.Success();
  }
}
