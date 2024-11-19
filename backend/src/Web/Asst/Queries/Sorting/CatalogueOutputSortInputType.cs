using HotChocolate.Data.Sorting;
using RealGimm.Core.Asst.CatalogueItemAggregate;

namespace RealGimm.Web.Asst.Queries.Sorting;

public class CatalogueOutputSortInputType : SortInputType<CatalogueOutput>
{
  protected override void Configure(ISortInputTypeDescriptor<CatalogueOutput> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
