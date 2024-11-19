using HotChocolate.Data.Sorting;
using RealGimm.Web.Asst.Models;

namespace RealGimm.Web.Asst.Queries.Sorting;

public class EstateUnitTypeDistributionSortInputType : SortInputType<EstateUnitTypeDistribution>
{
  protected override void Configure(ISortInputTypeDescriptor<EstateUnitTypeDistribution> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}

