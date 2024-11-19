using HotChocolate.Data.Sorting;
using RealGimm.Web.Asst.Models;

namespace RealGimm.Web.Asst.Queries.Sorting;

public class UsageTypeDistributionSortInputType : SortInputType<UsageTypeDistribution>
{
  protected override void Configure(ISortInputTypeDescriptor<UsageTypeDistribution> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}

