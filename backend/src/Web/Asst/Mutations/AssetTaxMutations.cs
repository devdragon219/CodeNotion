using RealGimm.Core;
using RealGimm.Core.IAM;
using RealGimm.Core.Asst.CadastralUnitAggregate.Specifications;
using Microsoft.EntityFrameworkCore;
using Ardalis.Result;
using RealGimm.Core.Asst.AssetTaxCalculationAggregate;

namespace RealGimm.Web.Asst.Mutations;

public class AssetTaxMutations : MutationsBase
{
  [BackOfficePermission(Features.ASST_ASSET_TAX_BASE, Permission.Update)]
  public async Task<Result<IEnumerable<AssetTaxCalculation>>> SetIssueOverridden(
   Guid taxCalculatorId,
   int year,
   int managementSubjectId,
   DateOnly expectedDueDate,
   ICollection<KeyValuePair<int, bool>> inputValues,
   [Service] IRepository<AssetTaxCalculation> repository,
   CancellationToken cancellationToken = default)
  {
    var assetTaxCalculations = await repository.AsQueryable(new AssetTaxCalculationIncludeAllSpec())
                          .Where(e => e.TaxCalculatorId == taxCalculatorId
                                      && e.Year == year
                                      && e.CadastralUnit.EstateUnit!.ManagementSubjectId == managementSubjectId
                                      && e.Installments.Any(inst => inst.ExpectedDueDate == expectedDueDate))
                          .ToListAsync(cancellationToken);

    var assetPayments = new List<AssetTaxPayment>();
    foreach (var taxCalculation in assetTaxCalculations)
    {
      assetPayments.AddRange(taxCalculation.Installments.Where(inst => inst.ExpectedDueDate == expectedDueDate));
    }

    foreach (var inputValue in inputValues)
    {
      var assetTaxPayment = assetPayments.Where(e => e.Id == inputValue.Key).FirstOrDefault();
      if (assetTaxPayment is null)
      {
        throw new Exception($"Not existing AssetTaxPayment {inputValue.Key}");
      }

      assetTaxPayment.SetIssueOverridden(inputValue.Value);
      await repository.UpdateAsync(assetTaxPayment.AssetTaxCalculation!, cancellationToken);
    }

    return assetTaxCalculations;
  }

  [BackOfficePermission(Features.ASST_ASSET_TAX_BASE, Permission.Update)]
  public async Task<Result<IEnumerable<AssetTaxPayment>>> SetDefinitive(
   int[] taxPaymentIds,
   Guid taxCalculatorId,
   [Service] IRepository<AssetTaxCalculation> repository,
   CancellationToken cancellationToken = default)
  {
    var assetPaymentUpdated = new List<AssetTaxPayment>();
    var assetTaxCalculators = await repository.AsQueryable(new AssetTaxCalculationIncludeAllSpec())
                            .Where(e => e.TaxCalculatorId == taxCalculatorId && e.Installments.Any(x => !x.IsDefinitive && taxPaymentIds.Contains(x.Id)))
                            .ToListAsync(cancellationToken);

    if (assetTaxCalculators is null || !assetTaxCalculators.Any())
    {
      throw new Exception($"Not existing non-definitive TaxPayments {string.Join(",", taxPaymentIds)} in TaxCalculator {taxCalculatorId}");
    }

    foreach (var assetTaxCalculator in assetTaxCalculators)
    {
      foreach (var assetPayment in assetTaxCalculator.Installments.Where(e => taxPaymentIds.Contains(e.Id)))
      {
        assetPayment.SetIsDefinitive(true);
        assetPaymentUpdated.Add(assetPayment);
      }

      await repository.UpdateAsync(assetTaxCalculator, cancellationToken);
    }

    return assetPaymentUpdated;
  }
}
