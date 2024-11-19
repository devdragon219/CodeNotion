using HotChocolate.Data.Sorting;
using RealGimm.Core.Common.InterestRateAggregate;

namespace RealGimm.Web.Common.Queries.Sorting;

public class InterestRateSortInputType : SortInputType<InterestRate>
{
  protected override void Configure(ISortInputTypeDescriptor<InterestRate> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
