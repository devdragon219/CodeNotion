using HotChocolate.Data.Sorting;
using RealGimm.Core.Fclt.ServiceCategoryAggregate;

namespace RealGimm.Web.Fclt.Queries.Sorting;

public class ServiceCategorySortInputType : SortInputType<ServiceCategory>
{
  protected override void Configure(ISortInputTypeDescriptor<ServiceCategory> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
