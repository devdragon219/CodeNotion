using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Web.Prop.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Prop.Mapping;

public sealed class RatePlanMapper : IMapper<RatePlanInput, RatePlan>
{
  public RatePlan? Map(RatePlanInput? from, RatePlan? into)
  {
    if (from is null)
    {
      return null;
    }

    var ratePlan = into ?? new RatePlan();
    ratePlan.SetSince(from.Since);
    ratePlan.SetNewYearlyRate(from.NewYearlyRate);
    if (!ratePlan.IsDeclared)
    {
      //Cannot update declaration expected if the plan has already been declared
      ratePlan.SetIsDeclarationExpected(from.IsDeclarationExpected);
    }

    if (into is null && from.Id.GetValueOrDefault() != default)
    {
      ratePlan.Id = from.Id!.Value;
    }

    return ratePlan;
  }

  Task<RatePlan?> IMapper<RatePlanInput, RatePlan>.MapAsync(
    RatePlanInput? from,
    RatePlan? into,
    CancellationToken cancellationToken)
    => Task.FromResult(Map(from, into));
}
