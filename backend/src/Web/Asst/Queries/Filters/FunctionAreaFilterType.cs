using HotChocolate.Data.Filters;
using RealGimm.Core.Asst.FunctionAreaAggregate;

namespace RealGimm.Web.Asst.Queries.Filters;

public class FunctionAreaFilterType : FilterInputType<FunctionArea>
{
  protected override void Configure(IFilterInputTypeDescriptor<FunctionArea> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
