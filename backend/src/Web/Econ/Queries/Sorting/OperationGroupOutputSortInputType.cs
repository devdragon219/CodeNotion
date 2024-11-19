using HotChocolate.Data.Sorting;
using RealGimm.Web.Econ.Models;

namespace RealGimm.Web.Econ.Queries.Sorting;

public class OperationGroupOutputSortInputType : SortInputType<OperationGroupOutput>
{
  protected override void Configure(ISortInputTypeDescriptor<OperationGroupOutput> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
