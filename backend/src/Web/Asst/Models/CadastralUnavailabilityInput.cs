using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Asst.Models;

public record CadastralUnavailabilityInput : IMaybeIdentifiable
{
  public int? Id { get; init; }
  public DateOnly? Since { get; init; }
  public DateOnly? Until { get; init; }
  public string? Notes { get; init; }

}
