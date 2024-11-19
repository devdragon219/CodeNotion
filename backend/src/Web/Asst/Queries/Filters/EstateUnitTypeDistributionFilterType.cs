using HotChocolate.Data.Filters;
using RealGimm.Web.Asst.Models;

namespace RealGimm.Web.Asst.Queries.Filters;

public class EstateUnitTypeDistributionFilterType : FilterInputType<EstateUnitTypeDistribution>
{
  protected override void Configure(IFilterInputTypeDescriptor<EstateUnitTypeDistribution> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
