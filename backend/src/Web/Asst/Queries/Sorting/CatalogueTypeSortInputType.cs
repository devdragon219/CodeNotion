using HotChocolate.Data.Sorting;
using RealGimm.Core.Asst.CatalogueTypeAggregate;

namespace RealGimm.Web.Asst.Queries.Sorting;

public class CatalogueTypeSortInputType : SortInputType<CatalogueType>
{
  protected override void Configure(ISortInputTypeDescriptor<CatalogueType> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
