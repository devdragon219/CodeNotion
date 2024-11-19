using HotChocolate.Data.Sorting;
using RealGimm.Core.Common.RevaluationDataAggregate;

namespace RealGimm.Web.Common.Queries.Sorting;

public class RevaluationDataSortInputType : SortInputType<RevaluationData>
{
  protected override void Configure(ISortInputTypeDescriptor<RevaluationData> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
