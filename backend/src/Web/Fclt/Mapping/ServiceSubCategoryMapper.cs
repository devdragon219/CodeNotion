using RealGimm.Core.Fclt.ServiceCategoryAggregate;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mapping;

public sealed class ServiceSubCategoryMapper : IMapper<ServiceSubCategoryInput, ServiceSubCategory>
{
  public Task<ServiceSubCategory?> MapAsync(
    ServiceSubCategoryInput? from,
    ServiceSubCategory? into,
    CancellationToken cancellationToken = default)
  {
    if (from is null)
    {
      return Task.FromResult<ServiceSubCategory?>(null);
    }

    var item = into ?? new ServiceSubCategory();
    item.SetInternalCode(from.InternalCode);
    item.SetName(from.Name);

    return Task.FromResult<ServiceSubCategory?>(item);
  }
}
