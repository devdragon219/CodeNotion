using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Nrgy.Models;

public record ReadingValueInput : IMaybeIdentifiable
{
  public int? Id { get; set; }
  public int TOURateIndex { get; set; }
  public decimal? Value { get; set; }
}
