using HotChocolate.Data.Sorting;
using RealGimm.Core.Asst.FunctionAreaAggregate;

namespace RealGimm.Web.Asst.Queries.Sorting;

public class FunctionAreaSortInputType : SortInputType<FunctionArea>
{
  protected override void Configure(ISortInputTypeDescriptor<FunctionArea> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
