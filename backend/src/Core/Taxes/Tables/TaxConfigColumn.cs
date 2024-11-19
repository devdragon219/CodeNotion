using RealGimm.Core.Common.TaxConfigAggregate;

namespace RealGimm.Core.Taxes.Tables;

public record TaxConfigColumn(string Key, SubValueType Type, decimal? NumberValue, string? StringValue, bool? BooleanValue, DateOnly? DateValue)
{
  public TaxConfigColumn(TaxConfigSubValue sv)
    : this(sv.Code, sv.ValueType, sv.NumberValue, sv.StringValue, sv.BooleanValue, sv.DateValue) { }
}
