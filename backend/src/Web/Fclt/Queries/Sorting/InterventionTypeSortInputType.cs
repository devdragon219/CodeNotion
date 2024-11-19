using HotChocolate.Data.Sorting;
using RealGimm.Core.Fclt.InterventionTypeAggregate;

namespace RealGimm.Web.Fclt.Queries.Sorting;

public class InterventionTypeSortInputType : SortInputType<InterventionType>
{
  protected override void Configure(ISortInputTypeDescriptor<InterventionType> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
