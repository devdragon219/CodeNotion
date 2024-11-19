using RealGimm.Core.Common.VATRateAggregate;

namespace RealGimm.Web.Common.Models;

public record VATRateInput
{
  public int? Id { get; set; }
  public string InternalCode { get; set; } = default!;
  public string? Description { get; set; }
  public VATRateType Type { get; set; }
  public double RatePercent { get; set; }
}
