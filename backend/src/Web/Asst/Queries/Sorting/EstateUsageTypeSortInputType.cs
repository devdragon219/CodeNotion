using HotChocolate.Data.Sorting;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;

namespace RealGimm.Web.Asst.Queries.Sorting;

public class EstateUsageTypeSortInputType : SortInputType<EstateUsageType>
{
  protected override void Configure(ISortInputTypeDescriptor<EstateUsageType> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}

