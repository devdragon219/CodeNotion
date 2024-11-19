using RealGimm.Core.Common.CityAggregate;

namespace RealGimm.Core.Taxes.Tables;

public record TaxConfigGroupedRow(
  int Id,
  int Year,
  RateAreaType Grouping,
  Guid? GroupingReference,
  City? City,
  string? GroupingName,
  TaxConfigColumn[] OtherColumns) : ITaxConfigMainTableRow;

public record TaxConfigGroupedRow<TSubRow>(
  int Id,
  int Year,
  RateAreaType Grouping,
  Guid? GroupingReference,
  City? City,
  string? GroupingName,
  TaxConfigColumn[] OtherColumns,
  TSubRow[] SubRows) : TaxConfigGroupedRow(Id, Year, Grouping, GroupingReference, City, GroupingName, OtherColumns);
