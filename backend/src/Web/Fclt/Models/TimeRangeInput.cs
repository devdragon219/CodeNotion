using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Fclt.Models;

public record TimeRangeInput
{
  public TimeOnly Since { get; set; }
  public TimeOnly Until { get; set; }
}
