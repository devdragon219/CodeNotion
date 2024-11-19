using RealGimm.Core.Fclt.PenaltyAggregate;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Fclt.Models;

public record PenaltyValueInput : IMaybeIdentifiable
{
  public int? Id { get; set; }
  public PenaltyType Type { get; set; }
  public decimal Amount { get; set; }
}
