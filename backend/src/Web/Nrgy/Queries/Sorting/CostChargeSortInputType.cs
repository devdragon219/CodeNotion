using HotChocolate.Data.Sorting;
using RealGimm.Core.Nrgy.CostChargeAggregate;
using RealGimm.Core.Nrgy.UtilityServiceAggregate;

namespace RealGimm.Web.Nrgy.Queries.Sorting;

public class CostChargeSortInputType : SortInputType<CostCharge>
{
  protected override void Configure(ISortInputTypeDescriptor<CostCharge> descriptor)
  { 
    descriptor.BindFieldsImplicitly();
    descriptor.Field(cc => cc.Service).Type<UtilityServiceSortInputType>();
  }
}
