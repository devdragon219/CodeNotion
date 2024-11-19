using RealGimm.Core.Common.CityAggregate;
using RealGimm.Core.Common.TaxConfigAggregate;

namespace RealGimm.Core.Taxes.SubTables;

public record TaxConfigGroupedCoefficientSubTableRow(TaxConfig TaxConfig, City? City, TaxConfigSubValue SubValue)
  : TaxConfigCoefficientSubTableRow(SubValue);
