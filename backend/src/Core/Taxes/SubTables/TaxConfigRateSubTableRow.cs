using RealGimm.Core.Common.TaxConfigAggregate;

namespace RealGimm.Core.Taxes.SubTables;

public record TaxConfigRateSubTableRow(int Id, string Code, string Description, decimal? Rate) : ITaxConfigSubTableRow
{
  public TaxConfigRateSubTableRow(TaxConfigSubValue sv)
    : this(sv.Id, sv.Code, sv.Label, sv.NumberValue) { }
}
