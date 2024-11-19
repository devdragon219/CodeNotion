using HotChocolate.Data.Sorting;
using RealGimm.Core.Nrgy.ReadingAggregate;

namespace RealGimm.Web.Nrgy.Queries.Sorting;

public class ReadingSortInputType : SortInputType<Reading>
{
  protected override void Configure(ISortInputTypeDescriptor<Reading> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}

