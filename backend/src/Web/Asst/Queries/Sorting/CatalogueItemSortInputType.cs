using HotChocolate.Data.Sorting;
using RealGimm.Core.Asst.CatalogueItemAggregate;

namespace RealGimm.Web.Asst.Queries.Sorting;

public class CatalogueItemSortInputType : SortInputType<CatalogueItem>
{
  protected override void Configure(ISortInputTypeDescriptor<CatalogueItem> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
