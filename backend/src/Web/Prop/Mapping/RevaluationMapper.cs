using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Web.Prop.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Prop.Mapping;

public sealed class RevaluationMapper : IMapper<RevaluationInput, Revaluation>
{
  public Revaluation? Map(RevaluationInput? from, Revaluation? into)
  {
    if (from is null)
    {
      return null;
    }

    var revaluation = into ?? new Revaluation();
    revaluation.SetRevaluationPeriodMonths(from.RevaluationPeriodMonths);
    revaluation.SetIsAbsoluteRevaluationApplied(from.IsAbsoluteRevaluationApplied);
    revaluation.SetIsRevaluationCalculated(from.IsRevaluationCalculated);
    revaluation.SetReferencePeriodStart(from.ReferencePeriodStart);
    revaluation.SetReferencePeriodEnd(from.ReferencePeriodEnd);
    revaluation.SetRevaluationSharePercent(from.RevaluationSharePercent);
    revaluation.SetRateType(from.RateType);
    revaluation.SetBaseRevaluationRate(from.BaseRevaluationRate);
    revaluation.SetNextApplicationDate(from.NextApplicationDate);
    revaluation.SetIsBackHistoryEnabled(from.IsBackHistoryEnabled);

    return revaluation;
  }

  Task<Revaluation?> IMapper<RevaluationInput, Revaluation>.MapAsync(
    RevaluationInput? from,
    Revaluation? into,
    CancellationToken cancellationToken)
    => Task.FromResult(Map(from, into));
}
