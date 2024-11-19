using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Web.Asst.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Asst.Mapping;

public sealed class CatalogueSubCategoryMapper : IMapper<CatalogueSubCategoryInput, CatalogueSubCategory>
{
  public CatalogueSubCategory? Map(CatalogueSubCategoryInput? from, CatalogueSubCategory? into)
  {
    if (from is null)
    {
      return null;
    }

    var subCategory = into ?? new CatalogueSubCategory();
    subCategory.SetName(from.Name);
    subCategory.SetInternalCode(from.InternalCode);

    subCategory.Id = from.Id.GetValueOrDefault();

    return subCategory;
  }

  Task<CatalogueSubCategory?> IMapper<CatalogueSubCategoryInput, CatalogueSubCategory>.MapAsync(
    CatalogueSubCategoryInput? from,
    CatalogueSubCategory? into,
    CancellationToken cancellationToken)
    => Task.FromResult(Map(from, into));
}
