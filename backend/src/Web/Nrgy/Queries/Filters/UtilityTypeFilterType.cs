using HotChocolate.Data.Filters;
using RealGimm.Core.Nrgy.UtilityTypeAggregate;

namespace RealGimm.Web.Nrgy.Queries.Filters;

public class UtilityTypeFilterType : FilterInputType<UtilityType>
{
  protected override void Configure(IFilterInputTypeDescriptor<UtilityType> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
