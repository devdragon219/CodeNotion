using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Web.Prop.Models;

namespace RealGimm.FunctionalTests.Web;

internal static partial class AssertHelper
{
  public static partial class Prop
  {
    public static class Contract
    {
      public static void Equal(ContractInput input, Core.Prop.ContractAggregate.Contract contract)
      {
        if (input.Id is not null)
        {
          Assert.Equal(input.Id, contract.Id);
        }

        Assert.Equal(input.Status, contract.Status);
        Assert.Equal(input.InternalCode, contract.InternalCode);
        Assert.Equal(input.ExternalCode, contract.ExternalCode);
        Assert.Equal(input.PreviousCode, contract.PreviousCode);
        Assert.Equal(input.ManagementSubjectId, contract.ManagementSubjectId);
        Assert.Equal(input.TypeId, contract.Type.Id);
        Assert.Equal(input.Reason, contract.Reason);
        Assert.Equal(input.AgreementDate, contract.AgreementDate);
        Assert.Equal(input.EffectStartDate, contract.EffectStartDate);
        Assert.Equal(input.LastRenewalStartDate, contract.LastRenewalStartDate);
        Assert.Equal(input.FirstTermDurationMonths, contract.FirstTermDurationMonths);
        Assert.Equal(input.SecondTermDurationMonths, contract.SecondTermDurationMonths);
        Assert.Equal(input.FirstTermExpirationDate, contract.FirstTermExpirationDate);
        Assert.Equal(input.SecondTermExpirationDate, contract.SecondTermExpirationDate);
        Assert.Equal(input.AnytimeTerminationWarningMonths, contract.AnytimeTerminationWarningMonths);
        Assert.Equal(input.NonRenewalWarningMonths, contract.NonRenewalWarningMonths);
        Assert.Equal(input.BillingStartDate, contract.BillingStartDate);
        Assert.Equal(input.BillingAfterTerm, contract.BillingAfterTerm);
        Assert.Equal(input.RecoverBillsAfterSuspension, contract.RecoverBillsAfterSuspension);
        Assert.Equal(input.BillingAlignedToCalendarYear, contract.BillingAlignedToCalendarYear);
        Assert.Equal(input.BillingAppliesBaseFee, contract.BillingAppliesBaseFee);
        Assert.Equal(input.BillingBaseFee, contract.BillingBaseFee);
        if (input.BillingBaseFeeBillItemTypeId is not null)
        {
          Assert.Equal(input.BillingBaseFeeBillItemTypeId, contract.BillingBaseFeeBillItemType!.Id);
        }
        else
        {
          Assert.Null(contract.BillingBaseFeeBillItemType);
        }
        Assert.Equal(input.BillingVATRateType, contract.BillingVATRateType);
        Assert.Equal(input.BillingPeriod, contract.BillingPeriod);
        Assert.Equal(input.BillingWithSplitPayment, contract.BillingWithSplitPayment);
        Assert.Equal(input.Notes, contract.Notes);
        Assert.Equal(input.BillingNotes, contract.BillingNotes);
        Assert.Equal(input.TerminationDate, contract.TerminationDate);
        Assert.Equal(input.Terminator, contract.Terminator);
        Assert.Equal(input.BillingEndDate, contract.BillingEndDate);
        AssertHelper.Equal(input.SublocatedContract, contract.SublocatedContract, SublocatedContractEqual);
        AssertHelper.Equal(input.RegistrationTaxData, contract.RegistrationTaxData, RegistrationTaxEqual);
        AssertHelper.Equal(input.RevaluationData, contract.RevaluationData, RevaluationEqual);
        CollectionsEqual(input.LocatedUnits, contract.LocatedUnits, LocatedUnitEqual);
        CollectionsEqual(input.Counterparts, contract.Counterparts, CounterpartEqual);
        CollectionsEqual(input.Transactors, contract.Transactors, TransactorEqual);
        CollectionsEqual(input.SecurityDeposits, contract.SecurityDeposits, SecurityDepositEqual);
        CollectionsEqual(input.RatePlans, contract.RatePlans, RatePlanEqual);
        CollectionsEqual(input.OneshotAdditions, contract.OneshotAdditions, OneshotAdditionEqual);
        CollectionsEqual(input.RecurringAdditions, contract.RecurringAdditions, RecurringAdditionEqual);
      }

      private static void SublocatedContractEqual(SublocatedContractInput input, Core.Prop.ContractAggregate.Contract sublocatedContract)
      {
        Assert.Equal(input.FirstTermDurationMonths, sublocatedContract.FirstTermDurationMonths);
        Assert.Equal(input.SecondTermDurationMonths, sublocatedContract.SecondTermDurationMonths);
        Assert.Equal(input.FirstTermExpirationDate, sublocatedContract.FirstTermExpirationDate);
        Assert.Equal(input.SecondTermExpirationDate, sublocatedContract.SecondTermExpirationDate);
        Assert.Equal(input.AnytimeTerminationWarningMonths, sublocatedContract.AnytimeTerminationWarningMonths);
        Assert.Equal(input.TerminationDate, sublocatedContract.TerminationDate);
        Assert.Equal(input.Terminator, sublocatedContract.Terminator);
      }

      private static void RegistrationTaxEqual(RegistrationTaxInput input, RegistrationTax registrationTax)
      {
        Assert.Equal(input.IsTakeoverFromPreviousSubject, registrationTax.IsTakeoverFromPreviousSubject);
        Assert.Equal(input.TakeoverOriginalSubjectIds, registrationTax.TakeoverOriginalSubjectIds);
        Assert.Equal(input.TakeoverType, registrationTax.TakeoverType);
        Assert.Equal(input.TakeoverLegalRepresentativeSubjectId, registrationTax.TakeoverLegalRepresentativeSubjectId);
        Assert.Equal(input.TakeoverDate, registrationTax.TakeoverDate);
        Assert.Equal(input.PaymentType, registrationTax.PaymentType);
        Assert.Equal(input.IsRLIModeEnabled, registrationTax.IsRLIModeEnabled);
        Assert.Equal(input.IsAccountingManaged, registrationTax.IsAccountingManaged);
        Assert.Equal(input.IncomeTypeRLI, registrationTax.IncomeTypeRLI);
        Assert.Equal(input.IncomeType, registrationTax.IncomeType);
        Assert.Equal(input.RegistrationSerialNumber, registrationTax.RegistrationSerialNumber);
        Assert.Equal(input.RegistrationNumber, registrationTax.RegistrationNumber);
        Assert.Equal(input.RegistrationYear, registrationTax.RegistrationYear);
        Assert.Equal(input.ContractRegistrationCode, registrationTax.ContractRegistrationCode);
        Assert.Equal(input.RegistrationOfficeId, registrationTax.RegistrationOffice!.Id);
        Assert.Equal(input.TaxableRateRatioPercent, registrationTax.TaxableRateRatioPercent);
        Assert.Equal(input.TenantTaxSharePercent, registrationTax.TenantTaxSharePercent);
        Assert.Equal(input.FirstRegistrationPeriod, registrationTax.FirstRegistrationPeriod);
        Assert.Equal(input.FirstRegistrationDate, registrationTax.FirstRegistrationDate);
        Assert.Equal(input.FirstOnlineRegistrationDate, registrationTax.FirstOnlineRegistrationDate);
        Assert.Equal(input.LastPaymentDate, registrationTax.LastPaymentDate);
        Assert.Equal(input.Exemptions, registrationTax.Exemptions);

        Assert.Equal(
          input.TransferResolutionAmount is null
            ? (decimal?)null
            : decimal.Round(input.TransferResolutionAmount.Value),
          registrationTax.TransferResolutionAmount is null
            ? null
            : decimal.Round(registrationTax.TransferResolutionAmount.Value));

        Assert.Equal(input.SpecialCase, registrationTax.SpecialCase);
        Assert.Equal(input.NumberOfPages, registrationTax.NumberOfPages);
        Assert.Equal(input.NumberOfCopies, registrationTax.NumberOfCopies);

        Assert.Equal(
          decimal.Round(input.TenantShareOfStampTaxPercent, 2),
          decimal.Round(registrationTax.TenantShareOfStampTaxPercent, 2));

        Assert.Equal(input.IsVoluntarySanctionApplied, registrationTax.IsVoluntarySanctionApplied);
      }

      private static void RevaluationEqual(RevaluationInput input, Revaluation revaluation)
      {
        Assert.Equal(input.RevaluationPeriodMonths, revaluation.RevaluationPeriodMonths);
        Assert.Equal(input.IsAbsoluteRevaluationApplied, revaluation.IsAbsoluteRevaluationApplied);
        Assert.Equal(input.IsRevaluationCalculated, revaluation.IsRevaluationCalculated);
        Assert.Equal(input.ReferencePeriodStart, revaluation.ReferencePeriodStart);
        Assert.Equal(input.ReferencePeriodEnd, revaluation.ReferencePeriodEnd);
        Assert.Equal(input.RevaluationSharePercent, revaluation.RevaluationSharePercent);
        Assert.Equal(input.RateType, revaluation.RateType);
        Assert.Equal(input.BaseRevaluationRate, revaluation.BaseRevaluationRate);
        Assert.Equal(input.NextApplicationDate, revaluation.NextApplicationDate);
        Assert.Equal(input.IsBackHistoryEnabled, revaluation.IsBackHistoryEnabled);
      }

      private static void LocatedUnitEqual(LocatedUnitInput input, LocatedUnit locatedUnit)
      {
        if (input.Id is not null)
        {
          Assert.Equal(input.Id, locatedUnit.Id);
        }

        Assert.Equal(input.EstateSubUnitId, locatedUnit.EstateSubUnitId);
        Assert.Equal(input.EstateUnitId, locatedUnit.EstateUnitId);
        Assert.Equal(input.IsMainUnit, locatedUnit.IsMainUnit);
        Assert.Equal(input.IsRegistryUpdateEnabled, locatedUnit.IsRegistryUpdateEnabled);
        Assert.Equal(input.IsPartialLocation, locatedUnit.IsPartialLocation);
        Assert.Equal(input.SurfaceSqM, locatedUnit.SurfaceSqM);
      }

      private static void CounterpartEqual(CounterpartInput input, Counterpart counterpart)
      {
        if (input.Id is not null)
        {
          Assert.Equal(input.Id, counterpart.Id);
        }

        Assert.Equal(input.SubjectId, counterpart.SubjectId);
        Assert.Equal(input.IsMainCounterpart, counterpart.IsMainCounterpart);
        Assert.Equal(input.ContractSharePercent, counterpart.ContractSharePercent);
        Assert.Equal(input.Since, counterpart.Since);
        Assert.Equal(input.Until, counterpart.Until);
        Assert.Equal(input.Type, counterpart.Type);
      }

      private static void TransactorEqual(TransactorInput input, Transactor transactor)
      {
        if (input.Id is not null)
        {
          Assert.Equal(input.Id, transactor.Id);
        }

        Assert.Equal(input.SubjectId, transactor.SubjectId);
        Assert.Equal(input.AddressId, transactor.AddressId);
        Assert.Equal(input.InvoiceAddressId, transactor.InvoiceAddressId);
        Assert.Equal(input.TransactionSharePercent, transactor.TransactionSharePercent);
        Assert.Equal(input.IsInvoiced, transactor.IsInvoiced);
        Assert.Equal(input.Since, transactor.Since);
        Assert.Equal(input.Until, transactor.Until);
        Assert.Equal(input.Type, transactor.Type);
      }

      private static void SecurityDepositEqual(SecurityDepositInput input, SecurityDeposit securityDeposit)
      {
        if (input.Id is not null)
        {
          Assert.Equal(input.Id, securityDeposit.Id);
        }

        Assert.Equal(input.SubjectId, securityDeposit.SubjectId);
        Assert.Equal(input.Type, securityDeposit.Type);
        Assert.Equal(input.Since, securityDeposit.Since);
        Assert.Equal(input.Until, securityDeposit.Until);
        Assert.Equal(input.BaseAmount, securityDeposit.BaseAmount);
        Assert.Equal(input.IsInterestCalculated, securityDeposit.IsInterestCalculated);
        Assert.Equal(input.InterestCalculationStartDate, securityDeposit.InterestCalculationStartDate);
        Assert.Equal(input.TakeoverDate, securityDeposit.TakeoverDate);
        Assert.Equal(input.SuretySubjectId, securityDeposit.SuretySubjectId);
        Assert.Equal(input.IsSuretyRenewable, securityDeposit.IsSuretyRenewable);
        Assert.Equal(input.BankAccountId, securityDeposit.BankAccountId);
        Assert.Equal(input.Notes, securityDeposit.Notes);
      }

      public static void RatePlanEqual(RatePlanInput input, RatePlan ratePlan)
      {
        if (input.Id is not null)
        {
          Assert.Equal(input.Id, ratePlan.Id);
        }

        Assert.Equal(input.Since, ratePlan.Since);
        Assert.Equal(input.NewYearlyRate, ratePlan.NewYearlyRate);
        Assert.Equal(input.IsDeclarationExpected, ratePlan.IsDeclarationExpected);
      }

      public static void OneshotAdditionEqual(OneshotAdditionInput input, OneshotAddition oneshotAddition)
      {
        if (input.Id is not null)
        {
          Assert.Equal(input.Id, oneshotAddition.Id);
        }

        Assert.Equal(input.BillItemTypeId, oneshotAddition.BillItemType.Id);
        Assert.Equal(input.StartDate, oneshotAddition.StartDate);
        Assert.Equal(input.AccountingItemId, oneshotAddition.AccountingItemId);
        Assert.Equal(input.VATRateId, oneshotAddition.VATRateId);
        Assert.Equal(input.IsRentalRateVariation, oneshotAddition.IsRentalRateVariation);
        Assert.Equal(input.Amount, oneshotAddition.Amount);
        Assert.Equal(input.Installments, oneshotAddition.Installments);
        Assert.Equal(input.IsBoundToTermDay, oneshotAddition.IsBoundToTermDay);
        Assert.Equal(input.TermStartDate, oneshotAddition.TermStartDate);
        Assert.Equal(input.TermEndDate, oneshotAddition.TermEndDate);
        Assert.Equal(input.Notes, oneshotAddition.Notes);
      }

      public static void RecurringAdditionEqual(RecurringAdditionInput input, RecurringAddition recurringAddition)
      {
        if (input.Id is not null)
        {
          Assert.Equal(input.Id, recurringAddition.Id);
        }

        Assert.Equal(input.BillItemTypeId, recurringAddition.BillItemType.Id);
        Assert.Equal(input.AccountingItemId, recurringAddition.AccountingItemId);
        Assert.Equal(input.VATRateId, recurringAddition.VATRateId);
        Assert.Equal(input.AmountPerInstallment, recurringAddition.AmountPerInstallment);
        Assert.Equal(input.ExcludeStartMonth, recurringAddition.ExcludeStartMonth);
        Assert.Equal(input.ExcludeEndMonth, recurringAddition.ExcludeEndMonth);
        Assert.Equal(input.Notes, recurringAddition.Notes);
      }
    }
  }
}
