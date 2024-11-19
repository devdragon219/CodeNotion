using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Web.Asst.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Asst.Mapping;

public class CadastralCoordinatesMapper : IMapper<CadastralCoordinatesInput, CadastralCoordinates>
{
  public Task<CadastralCoordinates?> MapAsync(CadastralCoordinatesInput? from, CadastralCoordinates? into, CancellationToken cancellationToken = default)
    => Task.FromResult(Map(from, into));

  private static CadastralCoordinates? Map(CadastralCoordinatesInput? from, CadastralCoordinates? into)
  {
    if (from is null)
    {
      return null;
    }

    var coordinates = into ?? new CadastralCoordinates();
    coordinates.SetData(from.Type, from.Notes, from.Level1, from.Level2, from.Level3, from.Level4, from.Level5, from.UnmanagedOverride);
    coordinates.SetITTavData(from.ITTavPartita, from.ITTavCorpo, from.ITTavPorzione);

    if (into is null)
    {
      coordinates.Id = from.Id.GetValueOrDefault();
    }

    return coordinates;
  }
}
