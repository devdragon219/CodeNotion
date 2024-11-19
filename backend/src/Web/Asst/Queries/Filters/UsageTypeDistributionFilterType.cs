using HotChocolate.Data.Filters;
using RealGimm.Web.Asst.Models;

namespace RealGimm.Web.Asst.Queries.Filters;

public class UsageTypeDistributionFilterType : FilterInputType<UsageTypeDistribution>
{
  protected override void Configure(IFilterInputTypeDescriptor<UsageTypeDistribution> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
