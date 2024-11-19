using HotChocolate.Data.Filters;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Nrgy.CostChargeAggregate;
using RealGimm.Core.Nrgy.UtilityServiceAggregate;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Nrgy.Queries.Filters;

public class CostChargeFilterType : FilterInputType<CostCharge>
{
  protected override void Configure(IFilterInputTypeDescriptor<CostCharge> descriptor)
  {
    descriptor.BindFieldsImplicitly();
    descriptor.Field(cc => cc.Service).Type<UtilityServiceFilterType>();

    descriptor.BindExtensionStringField<CostCharge, Estate>("estateInternalCode",
      str => es => es.InternalCode!.Contains(str),
      idArray => costCharge => idArray.Any(e => costCharge.Service.EstateIds.Contains(e))
    );
  }
}
