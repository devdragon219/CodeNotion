using RealGimm.Web.Nrgy.Queries;

namespace RealGimm.Web.Nrgy;

[ExtendObjectType(typeof(Query))]
public class NrgyQueries
{
  public UtilityTypeQueries UtilityType { get; } = new();
  public UtilityServiceQueries UtilityService { get; } = new();
  public ReadingQueries Reading { get; } = new();
  public CostChargeQueries CostCharge { get; } = new();
}
