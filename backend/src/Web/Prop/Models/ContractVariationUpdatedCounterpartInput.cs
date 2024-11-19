using RealGimm.Core.Prop.ContractAggregate;

namespace RealGimm.Web.Prop.Models;

public sealed record ContractVariationUpdatedCounterpartInput
{
  public int Id { get; set; }
  public double ContractSharePercent { get; set; }
  public CounterpartType? Type { get; set; } = CounterpartType.Regular;
  public bool IsMainCounterpart { get; set; }
}
