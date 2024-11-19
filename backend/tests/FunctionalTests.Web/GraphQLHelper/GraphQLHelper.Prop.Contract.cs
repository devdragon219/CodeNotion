using RealGimm.FunctionalTests.Web.Extensions;

namespace RealGimm.FunctionalTests.Web;

internal static partial class GraphQLHelper
{
  public static partial class Prop
  {
    public static class Contract
    {
      public static string Fragment(bool includeSublocatedContract = false, bool includeSubLocations = false)
        => $$"""
            id
            status
            internalCode
            externalCode
            previousCode
            managementSubjectId
            type {
              {{ContractTypeFragment()}}
            }
            reason
            agreementDate
            effectStartDate
            lastRenewalStartDate
            firstTermDurationMonths
            secondTermDurationMonths
            firstTermExpirationDate
            secondTermExpirationDate
            anytimeTerminationWarningMonths
            nonRenewalWarningMonths
            billingStartDate
            billingAfterTerm
            recoverBillsAfterSuspension
            billingAlignedToCalendarYear
            billingAppliesBaseFee
            billingBaseFee
            billingBaseFeeBillItemType {
              id
            }
            billingVATRateType
            billingPeriod
            billingWithSplitPayment
            billingWithStampTax
            notes
            billingNotes
            releaseReason
            releaseDate
            isOccupiedWithoutRight
            terminationDate
            terminator
            billingEndDate
            registrationTaxData {
              {{RegistrationTaxFragment()}}
            }
            revaluationData {
              {{RevaluationFragment()}}
            }
            locatedUnits {
              {{LocatedUnitFragment()}}
            }
            counterparts {
              {{CounterpartFragment()}}
            }
            transactors {
              {{TransactorFragment()}}
            }
            securityDeposits {
              {{SecurityDepositFragment()}}
            }
            takeovers {
              {{TakeoverFragment()}}
            }
            registrationPayments {
              {{RegistrationPaymentFragment()}}
            }
            billingPauses {
              {{BillingPauseFragment()}}
            }
            ratePlans {
              {{RatePlanFragment()}}
            }
            revaluationHistories {
              {{RevaluationHistoryFragment()}}
            }
            oneshotAdditions {
              {{OneshotAdditionFragment()}}
            }
            recurringAdditions {
              {{RecurringAdditionFragment()}}
            }
            """
          .AppendLineIfTrue(includeSublocatedContract, new(() => $$"""
            sublocatedContract {
              {{Fragment()}}
            }
            """))
          .AppendLineIfTrue(includeSubLocations, new(() => $$"""
            subLocations {
              {{Fragment()}}
            }
            """));

      public static string ListFragment() => $$"""
        id
        internalCode
        counterpartName
        typeDescription
        isSublocated
        status
        effectStartDate
        expirationDate
        locatedUnits {
          {{ListLocatedUnitFragment()}}
        }
        managementSubjectName
        releaseReason
        releaseDate
        isOccupiedWithoutRight
        terminationDate
        terminator
        firstTermDurationMonths
        secondTermDurationMonths
        firstTermExpirationDate
        secondTermExpirationDate
        anytimeTerminationWarningMonths
        nonRenewalWarningMonths
        reason
        agreementDate
        lastRenewalStartDate
        """;

      public static string BillingPauseFragment() => """
        id
        since
        until
        isRecoveryArrears
        notes
        """;

      private static string ListLocatedUnitFragment() => $$"""
        estateUnitOrSubUnitInternalCode
        estateUnitName
        estateUnitAddress {
          {{Asst.AddressFragment()}}
        }
        isMainUnit
        isRegistryUpdateEnabled
        isPartialLocation
        surfaceSqM
        """;

      private static string RegistrationTaxFragment() => $$"""
        isTakeoverFromPreviousSubject
        takeoverOriginalSubjectIds
        takeoverType
        takeoverLegalRepresentativeSubjectId
        takeoverDate
        paymentType
        isRLIModeEnabled
        isAccountingManaged
        incomeTypeRLI
        incomeType
        registrationSerialNumber
        registrationNumber
        registrationYear
        contractRegistrationCode
        registrationOffice {
          {{Prop.RegistrationOfficeFragment()}}
        }
        taxableRateRatioPercent
        tenantTaxSharePercent
        firstRegistrationPeriod
        firstRegistrationDate
        firstOnlineRegistrationDate
        lastPaymentDate
        lastOnlinePaymentDate
        exemptions
        transferResolutionAmount
        specialCase
        numberOfPages
        numberOfCopies
        tenantShareOfStampTaxPercent
        isVoluntarySanctionApplied
        """;

      private static string RevaluationFragment() => """
        revaluationPeriodMonths
        isAbsoluteRevaluationApplied
        isRevaluationCalculated
        referencePeriodStart
        referencePeriodEnd
        revaluationSharePercent
        rateType
        baseRevaluationRate
        nextApplicationDate
        isBackHistoryEnabled
        """;
      
      private static string LocatedUnitFragment() => """
        id
        estateSubUnitId
        estateUnitId
        isMainUnit
        isRegistryUpdateEnabled
        isPartialLocation
        surfaceSqM
        """;
      
      private static string CounterpartFragment() => """
        id
        subjectId
        isMainCounterpart
        contractSharePercent
        since
        until
        type
        """;
      
      private static string TransactorFragment() => """
        id
        subjectId
        addressId
        invoiceAddressId
        transactionSharePercent
        isInvoiced
        since
        until
        type
        """;
      
      private static string SecurityDepositFragment() => $$"""
        id
        subjectId
        type
        since
        until
        baseAmount
        isInterestCalculated
        interestCalculationStartDate
        takeoverDate
        suretySubjectId
        isSuretyRenewable
        bankAccountId
        notes
        interestRows {
          {{SecurityDepositInterestRowFragment()}}
        }
        """;

      private static string SecurityDepositInterestRowFragment() => $$"""
        id
        since
        until
        baseAmount
        calculationDate
        interestAmount
        appliedInterestRate
        """;

      private static string TakeoverFragment() => """
        id
        originalSubjectId
        newSubjectId
        legalRepresentativeSubjectId
        takeoverDate
        effectiveDate
        type
        """;
      
      private static string RatePlanFragment() => """
        id
        since
        newYearlyRate
        isDeclarationExpected
        isDeclared
        """;
      
      private static string RevaluationHistoryFragment() => """
        id
        since
        baseYearlyRate
        indexPercent
        revaluationAmount
        yearlyRateWithRevaluation        
        """;
      
      private static string OneshotAdditionFragment() => """
        id
        billItemType {
          id
        }
        startDate
        accountingItemId
        vatRateId
        isRentalRateVariation
        amount
        installments
        isBoundToTermDay
        termStartDate
        termEndDate
        notes
        """;
      
      private static string RecurringAdditionFragment() => """
        id
        billItemType {
          id
        }
        accountingItemId
        vatRateId
        amountPerInstallment
        excludeStartMonth
        excludeEndMonth
        notes
        """;
    }
  }
    
}
