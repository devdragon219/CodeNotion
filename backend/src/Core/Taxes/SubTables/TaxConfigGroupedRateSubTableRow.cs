using RealGimm.Core.Common.CityAggregate;
using RealGimm.Core.Common.TaxConfigAggregate;

namespace RealGimm.Core.Taxes.SubTables;

public record TaxConfigGroupedRateSubTableRow(TaxConfig TaxConfig, City? City, TaxConfigSubValue SubValue)
  : TaxConfigRateSubTableRow(SubValue);
