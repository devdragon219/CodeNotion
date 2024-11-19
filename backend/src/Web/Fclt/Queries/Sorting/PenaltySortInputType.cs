using HotChocolate.Data.Sorting;
using RealGimm.Core.Fclt.PenaltyAggregate;

namespace RealGimm.Web.Fclt.Queries.Sorting;

public class PenaltySortInputType : SortInputType<Penalty>
{
  protected override void Configure(ISortInputTypeDescriptor<Penalty> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
