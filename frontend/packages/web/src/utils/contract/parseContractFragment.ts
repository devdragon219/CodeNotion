import { parseMonthIndexToMonth, parseStringToDate } from '@realgimm5/frontend-common/utils';

import { ContractDetailFragment } from '../../gql/RealGimm.Web.Contract.fragment';
import { ContractFormInput, ContractSecurityDepositFormInput } from '../../interfaces/FormInputs/Contract';
import { getEmptyContractRegistrationTaxFormInput, getEmptyContractRevaluationFormInput } from './initialValues';
import { parseSublocatedContractToSublocatedContractFormInput } from './sublocatedContractUtils';

export const parseContractToContractFormInput = (contract: ContractDetailFragment): ContractFormInput => ({
  agreementDate: parseStringToDate(contract.agreementDate),
  anytimeTerminationWarningMonths: contract.anytimeTerminationWarningMonths ?? null,
  billing: {
    afterTerm: contract.billingAfterTerm,
    alignedToCalendarYear: contract.billingAlignedToCalendarYear,
    appliesBaseFee: contract.billingAppliesBaseFee,
    baseFee: contract.billingBaseFee ?? null,
    baseFeeBillItemType: contract.billingBaseFeeBillItemType ?? null,
    endDate: parseStringToDate(contract.billingEndDate),
    notes: contract.billingNotes ?? '',
    pauses: contract.billingPauses,
    period: contract.billingPeriod ?? null,
    startDate: parseStringToDate(contract.billingStartDate),
    vatRateType: contract.billingVATRateType ?? null,
    withSplitPayment: contract.billingWithSplitPayment,
    withStampTax: contract.billingWithStampTax ?? null,
  },
  contractId: contract.id,
  contractType: contract.type,
  counterparts: contract.counterparts.map((counterpart) => ({
    contractSharePercent: counterpart.contractSharePercent,
    counterpartId: counterpart.id,
    counterpartType: counterpart.type,
    isMainCounterpart: counterpart.isMainCounterpart,
    since: parseStringToDate(counterpart.since),
    subject: counterpart.subject,
    until: parseStringToDate(counterpart.until),
  })),
  documents: [],
  effectStartDate: parseStringToDate(contract.effectStartDate),
  externalCode: contract.externalCode ?? '',
  firstTermDurationMonths: contract.firstTermDurationMonths ?? null,
  firstTermExpirationDate: parseStringToDate(contract.firstTermExpirationDate),
  internalCode: contract.internalCode,
  isOccupiedWithoutRight: contract.isOccupiedWithoutRight ?? false,
  isReleased: contract.isReleased,
  lastRenewalStartDate: parseStringToDate(contract.lastRenewalStartDate),
  locatedUnits: contract.locatedUnits.map((locatedUnit) => ({
    estateSubUnit: locatedUnit.estateSubUnit ?? null,
    estateUnit: locatedUnit.estateUnit,
    isAncillaryUnit: locatedUnit.estateUnit.currentCadastralUnit?.isAncillaryUnit ?? false,
    isCadastralRegistrationInProgress:
      locatedUnit.estateUnit.currentCadastralUnit?.isCadastralRegistrationInProgress ?? false,
    isMainUnit: locatedUnit.isMainUnit,
    isPartialLocation: locatedUnit.isPartialLocation,
    isRegistryUpdateEnabled: locatedUnit.isRegistryUpdateEnabled,
    locatedUnitId: locatedUnit.id,
    surfaceSqM: locatedUnit.surfaceSqM ?? null,
  })),
  managementSubject: {
    id: contract.managementSubject.id,
    name: contract.managementSubject.name,
    officers: contract.managementSubject.officers.map(({ subordinate }) => ({
      id: subordinate.id,
      name: subordinate.name,
    })),
  },
  nonRenewalWarningMonths: contract.nonRenewalWarningMonths ?? null,
  notes: contract.notes ?? '',
  oneshotAdditions: contract.oneshotAdditions.map((oneshotAddition) => ({
    accountingItem: oneshotAddition.accountingItem,
    amount: oneshotAddition.amount,
    billItemType: oneshotAddition.billItemType,
    installments: oneshotAddition.installments ?? null,
    isBoundToTermDay: oneshotAddition.isBoundToTermDay,
    isRentalRateVariation: oneshotAddition.isRentalRateVariation,
    notes: oneshotAddition.notes ?? '',
    oneShotAdditionId: oneshotAddition.id,
    startDate: parseStringToDate(oneshotAddition.startDate),
    termStartDate: parseStringToDate(oneshotAddition.termStartDate),
    termEndDate: parseStringToDate(oneshotAddition.termEndDate),
    vatRate: oneshotAddition.vatRate,
  })),
  previousCode: contract.previousCode ?? '',
  ratePlans: contract.ratePlans.map((ratePlan) => ({
    isDeclarationExpected: ratePlan.isDeclarationExpected,
    isDeclared: ratePlan.isDeclared,
    newYearlyRate: ratePlan.newYearlyRate,
    ratePlanId: ratePlan.id,
    since: parseStringToDate(ratePlan.since),
  })),
  reason: contract.reason,
  recoverBillsAfterSuspension: contract.recoverBillsAfterSuspension,
  recurringAdditions: contract.recurringAdditions.map((recurringAddition) => ({
    accountingItem: recurringAddition.accountingItem,
    amountPerInstallment: recurringAddition.amountPerInstallment,
    billItemType: recurringAddition.billItemType,
    excludeEndMonth: parseMonthIndexToMonth(recurringAddition.excludeEndMonth),
    excludeStartMonth: parseMonthIndexToMonth(recurringAddition.excludeStartMonth),
    notes: recurringAddition.notes ?? '',
    recurringAdditionId: recurringAddition.id,
    vatRate: recurringAddition.vatRate,
  })),
  registrationPayments: contract.registrationPayments,
  registrationTax: contract.registrationTaxData
    ? {
        contractRegistrationCode: contract.registrationTaxData.contractRegistrationCode ?? '',
        exemption: contract.registrationTaxData.exemptions ?? null,
        firstOnlineRegistrationDate: parseStringToDate(contract.registrationTaxData.firstOnlineRegistrationDate),
        firstRegistrationDate: parseStringToDate(contract.registrationTaxData.firstRegistrationDate),
        firstRegistrationPeriod: contract.registrationTaxData.firstRegistrationPeriod,
        incomeType: contract.registrationTaxData.incomeType ?? null,
        incomeTypeRli: contract.registrationTaxData.incomeTypeRLI ?? null,
        isAccountingManaged: contract.registrationTaxData.isAccountingManaged,
        isRliModeEnabled: contract.registrationTaxData.isRLIModeEnabled,
        isRegistrationTaxApplied: true,
        isTakeoverFromPreviousSubject: contract.registrationTaxData.isTakeoverFromPreviousSubject,
        isVoluntarySanctionApplied: contract.registrationTaxData.isVoluntarySanctionApplied,
        lastOnlinePaymentDate: parseStringToDate(contract.registrationTaxData.lastOnlinePaymentDate),
        lastPaymentDate: parseStringToDate(contract.registrationTaxData.lastPaymentDate),
        numberOfCopies: contract.registrationTaxData.numberOfCopies,
        numberOfPages: contract.registrationTaxData.numberOfPages,
        paymentType: contract.registrationTaxData.paymentType,
        registrationNumber: contract.registrationTaxData.registrationNumber ?? '',
        registrationSerialNumber: contract.registrationTaxData.registrationSerialNumber ?? '',
        registrationYear: contract.registrationTaxData.registrationYear ?? null,
        specialCase: contract.registrationTaxData.specialCase ?? null,
        takeoverDate: parseStringToDate(contract.registrationTaxData.takeoverDate),
        takeoverLegalRepresentativeSubject: contract.registrationTaxData.legalRepresentativeSubject
          ? {
              id: contract.registrationTaxData.legalRepresentativeSubject.id,
              name: contract.registrationTaxData.legalRepresentativeSubject.name,
            }
          : null,
        takeoverSubjects: contract.registrationTaxData.originalSubjects,
        takeoverType: contract.registrationTaxData.takeoverType ?? null,
        registrationOffice: contract.registrationTaxData.registrationOffice
          ? {
              description: contract.registrationTaxData.registrationOffice.description,
              externalCode: contract.registrationTaxData.registrationOffice.externalCode,
              id: contract.registrationTaxData.registrationOffice.id,
              countyName: contract.registrationTaxData.registrationOffice.city?.countyName ?? '',
            }
          : null,
        taxableRateRatioPercent: contract.registrationTaxData.taxableRateRatioPercent,
        tenantShareOfStampTaxPercent: contract.registrationTaxData.tenantShareOfStampTaxPercent,
        tenantTaxSharePercent: contract.registrationTaxData.tenantTaxSharePercent,
        transferResolutionAmount: contract.registrationTaxData.transferResolutionAmount ?? null,
      }
    : getEmptyContractRegistrationTaxFormInput(),
  releaseDate: parseStringToDate(contract.releaseDate),
  releaseReason: contract.releaseReason ?? null,
  revaluation: contract.revaluationData
    ? {
        baseRevaluationRate: contract.revaluationData.baseRevaluationRate ?? null,
        isAbsoluteRevaluationApplied: contract.revaluationData.isAbsoluteRevaluationApplied,
        isBackHistoryEnabled: contract.revaluationData.isBackHistoryEnabled,
        isRevaluationApplied: true,
        isRevaluationCalculated: contract.revaluationData.isRevaluationCalculated,
        nextApplicationDate: parseStringToDate(contract.revaluationData.nextApplicationDate),
        rateType: contract.revaluationData.rateType,
        referencePeriodEnd: parseStringToDate(contract.revaluationData.referencePeriodEnd),
        referencePeriodStart: parseStringToDate(contract.revaluationData.referencePeriodStart),
        revaluationPeriodMonths: contract.revaluationData.revaluationPeriodMonths,
        revaluationSharePercent: contract.revaluationData.revaluationSharePercent,
      }
    : getEmptyContractRevaluationFormInput(),
  revaluationHistories: contract.revaluationHistories,
  secondTermDurationMonths: contract.secondTermDurationMonths ?? null,
  secondTermExpirationDate: parseStringToDate(contract.secondTermExpirationDate),
  securityDeposits: contract.securityDeposits.map((securityDeposit) => ({
    baseAmount: securityDeposit.baseAmount,
    interestCalculationStartDate: parseStringToDate(securityDeposit.interestCalculationStartDate),
    interestRows: securityDeposit.interestRows,
    isInterestCalculated: securityDeposit.isInterestCalculated,
    isSuretyRenewable: securityDeposit.isSuretyRenewable,
    notes: securityDeposit.notes ?? '',
    securityDepositId: securityDeposit.id,
    securityDepositType: securityDeposit.type,
    since: parseStringToDate(securityDeposit.since),
    subject: securityDeposit.subject
      ? {
          id: securityDeposit.subject.id,
          name: securityDeposit.subject.name,
          bankAccounts: securityDeposit.subject.bankAccounts,
        }
      : null,
    subjectBankAccount: securityDeposit.subject
      ? securityDeposit.subject.bankAccounts.reduce<ContractSecurityDepositFormInput['subjectBankAccount']>(
          (_, bankAccount) => {
            if (bankAccount.id === securityDeposit.bankAccountId) {
              return bankAccount;
            }
            return null;
          },
          null,
        )
      : null,
    suretySubject: securityDeposit.suretySubject
      ? {
          id: securityDeposit.suretySubject.id,
          name: securityDeposit.suretySubject.name,
        }
      : null,
    takeoverDate: parseStringToDate(securityDeposit.takeoverDate),
    until: parseStringToDate(securityDeposit.until),
  })),
  status: contract.status,
  sublocatedContract: contract.sublocatedContract
    ? parseSublocatedContractToSublocatedContractFormInput(contract.sublocatedContract)
    : null,
  takeovers: contract.takeovers,
  terminationDate: parseStringToDate(contract.terminationDate),
  terminator: contract.terminator ?? null,
  transactors: contract.transactors.map((transactor) => ({
    address: transactor.subject.addresses.find(({ id }) => id === transactor.addressId) ?? null,
    invoiceAddress: transactor.subject.addresses.find(({ id }) => id === transactor.invoiceAddressId) ?? null,
    isInvoiced: transactor.isInvoiced,
    since: parseStringToDate(transactor.since),
    subject: transactor.subject,
    transactionSharePercent: transactor.transactionSharePercent,
    transactorId: transactor.id,
    transactorType: transactor.type,
    until: parseStringToDate(transactor.until),
  })),
});
