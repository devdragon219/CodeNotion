using RealGimm.Infrastructure;
using RealGimm.Infrastructure.Prop.Data.Fakers;
using RealGimm.Web.Prop.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Prop.Contract;

public sealed class RevaluationInputFaker : BaseSeededFaker<RevaluationInput>
{
  public RevaluationInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var input = new RevaluationInput();
      input.RevaluationPeriodMonths = RevaluationFaker.GenerateRevaluationPeriodMonths(faker);
      input.IsAbsoluteRevaluationApplied = RevaluationFaker.GenerateIsAbsoluteRevaluationApplied(faker);
      input.IsRevaluationCalculated = RevaluationFaker.GenerateIsRevaluationCalculated(faker);
      
      var (referencePeriodStart, referencePeriodEnd) = RevaluationFaker.GenerateReferencePeriod(faker);
      input.ReferencePeriodStart = referencePeriodStart;
      input.ReferencePeriodEnd = referencePeriodEnd;

      input.RevaluationSharePercent = RevaluationFaker.GenerateRevaluationSharePercent(faker);
      input.RateType = RevaluationFaker.GenerateRateType(faker);
      input.BaseRevaluationRate = RevaluationFaker.GenerateBaseRevaluationRate(faker);
      input.NextApplicationDate = RevaluationFaker.GenerateNextApplicationDate(faker);
      input.IsBackHistoryEnabled = RevaluationFaker.GenerateIsBackHistoryEnabled(faker);

      return input;
    });
  }
}
