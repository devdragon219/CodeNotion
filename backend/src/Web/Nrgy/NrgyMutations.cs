using RealGimm.Web.Nrgy.Mutations;

namespace RealGimm.Web.Nrgy;

[ExtendObjectType(typeof(Mutation))]
public class NrgyMutations
{
  public UtilityTypeMutations UtilityType { get; } = new();
  public UtilityServiceMutations UtilityService { get; } = new();
  public ReadingMutations Reading { get; } = new();
  public CostChargeMutations CostCharge { get; } = new();
}
