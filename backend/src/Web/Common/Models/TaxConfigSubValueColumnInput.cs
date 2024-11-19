using RealGimm.Core.Common.TaxConfigAggregate;

namespace RealGimm.Web.Common.Models;

public record TaxConfigSubValueColumnInput
{
  public string Code { get; init; } = default!;
  public decimal? NumberValue { get; init; }
  public string? StringValue { get; init; }
  public DateOnly? DateValue { get; init; }
  public bool? BooleanValue { get; init; }
  public SubValueType ValueType { get; init; }
}
