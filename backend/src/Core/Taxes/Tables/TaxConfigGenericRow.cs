using HotChocolate;
using RealGimm.Core.Taxes.SubTables;

namespace RealGimm.Core.Taxes.Tables;

public record TaxConfigGenericRow(int Id, int Year, TaxConfigColumn[] OtherColumns) : ITaxConfigMainTableRow;

public record TaxConfigGenericRow<TSubRow>(int Id, int Year, TaxConfigColumn[] OtherColumns, TSubRow[] SubRows) : TaxConfigGenericRow(Id, Year, OtherColumns)
  where TSubRow : ITaxConfigSubTableRow;
