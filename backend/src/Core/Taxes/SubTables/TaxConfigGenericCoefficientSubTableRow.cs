using RealGimm.Core.Common.TaxConfigAggregate;

namespace RealGimm.Core.Taxes.SubTables;

public record TaxConfigGenericCoefficientSubTableRow(TaxConfig TaxConfig, TaxConfigSubValue SubValue)
  : TaxConfigCoefficientSubTableRow(SubValue);
