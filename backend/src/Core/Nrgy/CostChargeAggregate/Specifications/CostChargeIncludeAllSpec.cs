using Ardalis.Specification;

namespace RealGimm.Core.Nrgy.CostChargeAggregate.Specifications;
public class CostChargeIncludeAllSpec : Specification<CostCharge>
{
  public CostChargeIncludeAllSpec()
    => Query
        .Include(cc => cc.ExpectedConsumption)
          .ThenInclude(consumption => consumption!.Values.OrderBy(v => v.Id))
        .Include(cc => cc.ActualConsumption)
          .ThenInclude(consumption => consumption!.Values.OrderBy(v => v.Id))
        .Include(costCharge => costCharge.Service)
          .ThenInclude(service => service.UtilityType);
}
