using HotChocolate.Data.Filters;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;

namespace RealGimm.Web.Asst.Queries.Filters;

public class EstateUsageTypeFilterType : FilterInputType<EstateUsageType>
{
  protected override void Configure(IFilterInputTypeDescriptor<EstateUsageType> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
