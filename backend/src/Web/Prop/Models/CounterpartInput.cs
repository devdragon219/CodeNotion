using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Prop.Models;

public sealed record CounterpartInput : IMaybeIdentifiable
{
  public int? Id { get; set; }
  public int SubjectId { get; set; }
  public bool IsMainCounterpart { get; set; }
  public double ContractSharePercent { get; set; }
  public DateOnly Since { get; set; }
  public DateOnly? Until { get; set; }
  public CounterpartType Type { get; set; }
}
