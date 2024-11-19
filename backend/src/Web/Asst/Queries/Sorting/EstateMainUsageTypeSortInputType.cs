using HotChocolate.Data.Sorting;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;

namespace RealGimm.Web.Asst.Queries.Sorting;

public class EstateMainUsageTypeSortInputType : SortInputType<EstateMainUsageType>
{
  protected override void Configure(ISortInputTypeDescriptor<EstateMainUsageType> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}

