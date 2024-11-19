using RealGimm.Core.Common.TaxConfigAggregate;

namespace RealGimm.Core.Taxes.SubTables;

public record TaxConfigGenericRateSubTableRow(TaxConfig TaxConfig, TaxConfigSubValue SubValue) : TaxConfigRateSubTableRow(SubValue);
