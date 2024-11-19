using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Web.Asst.Models;
using RealGimm.WebCommons.Extensions;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Asst.Mapping;

public sealed class CatalogueCategoryMapper : IMapper<CatalogueCategoryInput, CatalogueCategory>
{
  private readonly IMapper _mapper;

  public CatalogueCategoryMapper(IMapper mapper)
  {
    _mapper = mapper;
  }

  public async Task<CatalogueCategory?> MapAsync(
    CatalogueCategoryInput? from,
    CatalogueCategory? into,
    CancellationToken cancellationToken = default)
  {
    if (from is null)
    {
      return null;
    }

    var category = into ?? new CatalogueCategory();
    category.SetName(from.Name);
    category.SetInternalCode(from.InternalCode);

    await _mapper.UpdateCollectionAsync(from.SubCategories, category.SubCategories, cancellationToken);

    return category;
  }
}
