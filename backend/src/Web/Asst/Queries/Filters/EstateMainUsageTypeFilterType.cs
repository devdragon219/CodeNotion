using HotChocolate.Data.Filters;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;

namespace RealGimm.Web.Asst.Queries.Filters;

public class EstateMainUsageTypeFilterType : FilterInputType<EstateMainUsageType>
{
  protected override void Configure(IFilterInputTypeDescriptor<EstateMainUsageType> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
