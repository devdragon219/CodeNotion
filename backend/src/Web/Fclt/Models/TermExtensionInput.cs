using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Fclt.Models;

public record TermExtensionInput : IMaybeIdentifiable
{
  public int? Id { get; set; }
  public int DaysCount { get; set; }
  public decimal? FeeDifference { get; set; }
  public string? Notes { get; set; }
}
