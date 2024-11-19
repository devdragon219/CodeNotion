using RealGimm.Core.Fclt.ServiceCategoryAggregate;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Extensions;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mapping;

public sealed class ServiceCategoryMapper : IMapper<ServiceCategoryInput, ServiceCategory>
{
  private readonly IMapper _mapper;

  public ServiceCategoryMapper(IMapper mapper)
  {
    _mapper = mapper;
  }

  public async Task<ServiceCategory?> MapAsync(
    ServiceCategoryInput? from,
    ServiceCategory? into,
    CancellationToken cancellationToken = default)
  {
    if (from is null)
    {
      return null;
    }

    var item = into ?? new ServiceCategory();
    item.SetInternalCode(from.InternalCode);
    item.SetName(from.Name);

    await _mapper.UpdateCollectionAsync(from.SubCategories, item.SubCategories, cancellationToken);

    return item;
  }
}
