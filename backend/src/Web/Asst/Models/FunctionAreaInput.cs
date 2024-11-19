using RealGimm.Core.Asst;

namespace RealGimm.Web.Asst.Models;

public record FunctionAreaInput
{
  public string? Name { get; init; }
  public string InternalCode { get; init; } = default!;
  public SurfaceType SurfaceType { get; init; }
}
