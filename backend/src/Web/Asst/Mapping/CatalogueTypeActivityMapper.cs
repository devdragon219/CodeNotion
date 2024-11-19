using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Web.Asst.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Asst.Mapping;

public sealed class CatalogueTypeActivityMapper : IMapper<CatalogueTypeActivityInput, CatalogueTypeActivity>
{
  public CatalogueTypeActivity? Map(CatalogueTypeActivityInput? from, CatalogueTypeActivity? into = null)
  {
    if (from is null)
    {
      return null;
    }

    var type = into ?? new CatalogueTypeActivity();
    type.SetName(from.Name);
    type.SetActivityType(from.ActivityType);
    type.SetIsMandatoryByLaw(from.IsMandatoryByLaw);

    type.Id = from.Id.GetValueOrDefault();

    return type;
  }

  Task<CatalogueTypeActivity?> IMapper<CatalogueTypeActivityInput, CatalogueTypeActivity>.MapAsync(
    CatalogueTypeActivityInput? from,
    CatalogueTypeActivity? into,
    CancellationToken cancellationToken)
    => Task.FromResult(Map(from, into));
}
