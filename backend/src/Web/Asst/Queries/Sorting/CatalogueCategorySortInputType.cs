using HotChocolate.Data.Sorting;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;

namespace RealGimm.Web.Asst.Queries.Sorting;

public class CatalogueCategorySortInputType : SortInputType<CatalogueCategory>
{
  protected override void Configure(ISortInputTypeDescriptor<CatalogueCategory> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
