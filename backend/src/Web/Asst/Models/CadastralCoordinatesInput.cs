using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Asst.Models;

public record CadastralCoordinatesInput : IMaybeIdentifiable
{
  public int? Id { get; init; }
  public string? Notes { get; init; }
  public string? Level1 { get; init; }
  public string? Level2 { get; init; }
  public string? Level3 { get; init; }
  public string? Level4 { get; init; }
  public string? Level5 { get; init; }
  public string? ITTavPartita { get; init; }
  public string? ITTavCorpo { get; init; }
  public string? ITTavPorzione { get; init; }
  public CoordinateType Type { get; init; }
  public string? UnmanagedOverride { get; init; }
}
