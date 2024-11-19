using RealGimm.Core;
using RealGimm.Core.Fclt.ServiceAggregate;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mapping;

public sealed class ServiceActivityMapper : IMapper<ServiceActivityInput, ServiceActivity>
{
  public ServiceActivity? Map(
    ServiceActivityInput? from,
    ServiceActivity? into)
  {
    if (from is null)
    {
      return null;
    }


    var item = into ?? new ServiceActivity();
    item.SetName(from.Name);
    item.SetActivityType(from.ActivityType);
    item.SetIsMandatoryByLaw(from.IsMandatoryByLaw);

    item.Id = from.Id.GetValueOrDefault();

    return item;
  }

  public Task<ServiceActivity?> MapAsync(
    ServiceActivityInput? from,
    ServiceActivity? into,
    CancellationToken cancellationToken = default)
    => Task.FromResult(Map(from, into));
}
