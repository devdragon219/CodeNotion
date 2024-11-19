using HotChocolate.Data.Filters;
using RealGimm.Web.Econ.Models;

namespace RealGimm.Web.Econ.Queries.Filters;

public class OperationGroupOutputFilterType : FilterInputType<OperationGroupOutput>
{
  protected override void Configure(IFilterInputTypeDescriptor<OperationGroupOutput> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
