using HotChocolate.Data.Filters;
using RealGimm.Core.Fclt.InterventionTypeAggregate;

namespace RealGimm.Web.Fclt.Queries.Filters;

public class InterventionTypeFilterType : FilterInputType<InterventionType>
{
  protected override void Configure(IFilterInputTypeDescriptor<InterventionType> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
