using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Common;
using RealGimm.Core.Common.Interfaces;
using RealGimm.Core.IAM;
using RealGimm.Web.Asst.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Asst.Queries;

public class GeocodingQueries
{
  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Read)]
  public async Task<GeocodingResult?> GetPosition(
    AddressInput address,
    [Service] IGeocodingResolver resolver,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var addr = await mapper.MapAsync<AddressInput, Address>(address, null, cancellationToken);

    if (addr is null) return null;

    var resolved = await resolver.ResolveAddress(addr, cancellationToken);

    if((resolved is null || resolved.BoundingBox.Length == 0)
      && !string.IsNullOrEmpty(addr.Toponymy)) {
        //If no match was found, and toponymy was set, try again without it
        addr.SetToponymy(null);
        addr.SetNumbering(null);
        resolved = await resolver.ResolveAddress(addr, cancellationToken);
    }

    return resolved;
  }
}
