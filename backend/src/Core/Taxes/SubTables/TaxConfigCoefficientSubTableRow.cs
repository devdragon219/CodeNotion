using RealGimm.Core.Common.TaxConfigAggregate;

namespace RealGimm.Core.Taxes.SubTables;

public record TaxConfigCoefficientSubTableRow(int Id, string ReferenceYear, decimal? Coefficient) : ITaxConfigSubTableRow
{
  public TaxConfigCoefficientSubTableRow(TaxConfigSubValue sv)
    : this(sv.Id, sv.Label, sv.NumberValue) { }
}
