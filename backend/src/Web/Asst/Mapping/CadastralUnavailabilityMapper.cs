using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Web.Asst.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Asst.Mapping;

public class CadastralUnavailabilityMapper : IMapper<CadastralUnavailabilityInput, CadastralUnavailability>
{
  public Task<CadastralUnavailability?> MapAsync(
    CadastralUnavailabilityInput? from,
    CadastralUnavailability? into,
    CancellationToken cancellationToken = default)
    => Task.FromResult(Map(from, into));

  private static CadastralUnavailability? Map(CadastralUnavailabilityInput? from, CadastralUnavailability? into)
  {
    if (from is null)
    {
      return null;
    }

    var unavailability = into ?? new CadastralUnavailability();
    unavailability.Id = from.Id.GetValueOrDefault();

    unavailability.SetData(from.Since, from.Until, from.Notes);

    return unavailability;
  }
}
