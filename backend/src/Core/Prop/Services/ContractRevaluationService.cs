using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Prop.ContractAggregate.Specifications;
using RealGimm.Core.Shared.RevaluationCalculation;
using RealGimm.Core.Shared.Specifications;

namespace RealGimm.Core.Prop.Services;

public class ContractRevaluationService
{
  public required IRepository<Contract> Contracts { protected get; init; }
  public required IRevaluationCalculator Calculator { protected get; init; }
  public required ILogger<ContractRevaluationService> Logger { protected get; init; }

  public async Task RevaluateContract(int contractId)
  {
    var contract = await Contracts
      .AsQueryable(
        new ContractIncludeAllSpec(),
        new GetByIdSpec<Contract>(contractId))
      .FirstOrDefaultAsync();

    if (contract is null)
    {
      Logger.LogInformation("Unable to get contract {contractId} for revaluation update",
        contractId);

      return;
    }

    //Also calculate revaluation for contracts near termination
    var minTerminationDate = DateOnly.FromDateTime(DateTime.UtcNow.AddMonths(2));

    // If status is incompatible with updates (e.g. contract is terminated)
    // don't update anything
    if (contract.Status != Common.EntryStatus.Working
      || (contract.ReleaseDate is not null
        && contract.ReleaseDate.Value < minTerminationDate)
      || (contract.TerminationDate is not null
        && contract.TerminationDate.Value < minTerminationDate))
    {
      Logger.LogInformation("Contract {contractId} revaluations cannot be updated - contract is released, terminated or deleted.",
        contractId);

      return;
    }

    // Calculate revaluations for the current contract, if applicable
    contract.RevaluationHistories.Clear();

    if (contract.RevaluationData is null
      || !contract.RevaluationData.IsRevaluationCalculated)
    {
      Logger.LogInformation("Could not calculate revaluations for contract {contractId} because it is disabled",
        contract.Id);

      // Leave an empty RevaluationHistories collection for update
    }
    else
    {
      var maxDate = DateOnly.FromDateTime(DateTime.Today) > contract.RevaluationData.ReferencePeriodEnd
        ? contract.RevaluationData.ReferencePeriodEnd
        : DateOnly.FromDateTime(DateTime.Today);

      //Prepare rates including rate plans
      var ratePlanSource = new[] {
            new {
              Since = contract.EffectStartDate,
              NewYearlyRate = contract.RevaluationData.BaseRevaluationRate ?? 0
            }
          };

      if (contract.RevaluationData.RateType != RevaluationRateType.BaseRate)
      {
        ratePlanSource = ratePlanSource.Concat(contract.RatePlans
          .Select(rp => new
          {
            rp.Since,
            rp.NewYearlyRate
          }))
          .ToArray();
      }

      var ratePlan = ratePlanSource
        .GroupBy(o => o.Since)
        .ToDictionary(grp => grp.Key, grp => grp.First().NewYearlyRate);

      try
      {
        contract.RevaluationHistories.AddRange(
          (await Calculator.CalculateRevaluations(
            ratePlan,
            contract.RevaluationData.ReferencePeriodStart,
            maxDate,
            contract.RevaluationData.RevaluationSharePercent / 100,
            contract.RevaluationData.IsAbsoluteRevaluationApplied,
            contract.RevaluationData.RevaluationPeriodMonths,
            CountryISO3.ITA))
          .Select(revaluationStep =>
          {
            var rrow = new RevaluationHistory();

            rrow.SetBaseYearlyRate(revaluationStep.ReferenceAmount);
            rrow.SetSince(revaluationStep.ReferenceDate);
            rrow.SetIndexPercent(revaluationStep.AppliedRate);
            rrow.SetRevaluationAmount(revaluationStep.CalculatedAmount);
            rrow.SetYearlyRateWithRevaluation(revaluationStep.ReferenceAmount + revaluationStep.CalculatedAmount);

            return rrow;
          }));

        //Update next revaluation date
        var lastReval = contract.RevaluationHistories
          .OrderBy(rh => rh.Since)
          .LastOrDefault();

        contract.RevaluationData.SetNextApplicationDate(
          lastReval is null
            ? contract.RevaluationData.NextApplicationDate
            : lastReval.Since.AddMonths(contract.RevaluationData.RevaluationPeriodMonths)
        );
      }
      catch (InvalidOperationException ex)
      {
        Logger.LogError(ex, "Unable to update revaluations for contract {contractId}", contractId);
      }
    }

    await Contracts.UpdateAsync(contract);
  }

}
