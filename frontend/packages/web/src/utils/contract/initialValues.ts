import {
  AddressType,
  CounterpartType,
  RegistrationTaxIncomeTypeRli,
  SecurityDepositType,
} from '@realgimm5/frontend-common/gql/types';

import { EstateSubUnitFragment } from '../../gql/RealGimm.Web.EstateSubUnit.fragment';
import { EstateUnitFragment } from '../../gql/RealGimm.Web.EstateUnit.fragment';
import { SubjectFragment } from '../../gql/RealGimm.Web.Subject.fragment';
import {
  ContractBillingFormInput,
  ContractCounterpartFormInput,
  ContractFormInput,
  ContractLocatedUnitFormInput,
  ContractOneshotAdditionFormInput,
  ContractRatePlanFormInput,
  ContractRecurringAdditionFormInput,
  ContractRegistrationTaxFormInput,
  ContractRevaluationFormInput,
  ContractSecurityDepositFormInput,
  ContractTransactorFormInput,
  SublocatedContractFormInput,
} from '../../interfaces/FormInputs/Contract';

export const getEmptyContractBillingFormInput = (
  appliesBaseFee = false,
  billing?: ContractBillingFormInput,
): ContractBillingFormInput => ({
  afterTerm: billing?.afterTerm ?? false,
  alignedToCalendarYear: billing?.alignedToCalendarYear ?? false,
  appliesBaseFee,
  baseFee: null,
  baseFeeBillItemType: null,
  endDate: billing?.endDate ?? null,
  notes: billing?.notes ?? '',
  pauses: billing?.pauses ?? [],
  period: billing?.period ?? null,
  startDate: billing?.startDate ?? null,
  vatRateType: billing?.vatRateType ?? null,
  withSplitPayment: billing?.withSplitPayment ?? false,
  withStampTax: billing?.withStampTax ?? null,
});

export const getEmptyContractCounterpartFormInput = (subject?: SubjectFragment): ContractCounterpartFormInput => ({
  contractSharePercent: null,
  counterpartId: null,
  counterpartType: CounterpartType.Regular,
  isMainCounterpart: false,
  since: null,
  subject: subject ?? null,
  until: null,
});

export const getEmptyContractLocatedUnitFormInput = (estate?: {
  estateUnit?: EstateUnitFragment;
  estateSubUnit?: EstateSubUnitFragment;
}): ContractLocatedUnitFormInput => ({
  estateSubUnit: estate?.estateSubUnit ?? null,
  estateUnit: estate?.estateUnit ?? null,
  isAncillaryUnit:
    estate?.estateUnit?.currentCadastralUnit?.isAncillaryUnit ??
    estate?.estateSubUnit?.estateUnit.currentCadastralUnit?.isAncillaryUnit ??
    false,
  isCadastralRegistrationInProgress:
    estate?.estateUnit?.currentCadastralUnit?.isCadastralRegistrationInProgress ??
    estate?.estateSubUnit?.estateUnit.currentCadastralUnit?.isCadastralRegistrationInProgress ??
    false,
  isMainUnit: false,
  isPartialLocation: false,
  isRegistryUpdateEnabled: false,
  locatedUnitId: null,
  surfaceSqM: null,
});

export const getEmptyContractOneshotAdditionFormInput = (): ContractOneshotAdditionFormInput => ({
  accountingItem: null,
  amount: null,
  billItemType: null,
  installments: null,
  isBoundToTermDay: false,
  isRentalRateVariation: false,
  notes: '',
  oneShotAdditionId: null,
  startDate: null,
  termStartDate: null,
  termEndDate: null,
  vatRate: null,
});

export const getEmptyContractRatePlanFormInput = (): ContractRatePlanFormInput => ({
  isDeclarationExpected: false,
  isDeclared: false,
  newYearlyRate: null,
  ratePlanId: null,
  since: null,
});

export const getEmptyContractRecurringAdditionFormInput = (): ContractRecurringAdditionFormInput => ({
  accountingItem: null,
  amountPerInstallment: null,
  billItemType: null,
  excludeEndMonth: null,
  excludeStartMonth: null,
  notes: '',
  recurringAdditionId: null,
  vatRate: null,
});

export const getEmptyContractRegistrationTaxFormInput = (
  isRegistrationTaxApplied = false,
  isRliModeEnabled = false,
  incomeTypeRli: RegistrationTaxIncomeTypeRli | null = null,
  taxableRateRatioPercent: number | null = null,
  tenantTaxSharePercent: number | null = null,
): ContractRegistrationTaxFormInput => ({
  contractRegistrationCode: '',
  exemption: null,
  firstOnlineRegistrationDate: null,
  firstRegistrationDate: null,
  firstRegistrationPeriod: null,
  incomeType: null,
  incomeTypeRli,
  isAccountingManaged: false,
  isRliModeEnabled,
  isRegistrationTaxApplied,
  isTakeoverFromPreviousSubject: false,
  isVoluntarySanctionApplied: false,
  lastOnlinePaymentDate: null,
  lastPaymentDate: null,
  numberOfCopies: null,
  numberOfPages: null,
  paymentType: null,
  registrationNumber: '',
  registrationOffice: null,
  registrationSerialNumber: '',
  registrationYear: null,
  specialCase: null,
  takeoverDate: null,
  takeoverLegalRepresentativeSubject: null,
  takeoverSubjects: [],
  takeoverType: null,
  taxableRateRatioPercent,
  tenantShareOfStampTaxPercent: 50,
  tenantTaxSharePercent,
  transferResolutionAmount: null,
});

export const getEmptyContractRevaluationFormInput = (
  isRevaluationApplied = false,
  isAbsoluteRevaluationApplied = false,
  revaluationSharePercent: number | null = null,
): ContractRevaluationFormInput => ({
  baseRevaluationRate: null,
  isAbsoluteRevaluationApplied,
  isBackHistoryEnabled: false,
  isRevaluationApplied,
  isRevaluationCalculated: false,
  nextApplicationDate: null,
  rateType: null,
  referencePeriodEnd: null,
  referencePeriodStart: null,
  revaluationPeriodMonths: null,
  revaluationSharePercent,
});

export const getEmptyContractSecurityDepositFormInput = (
  securityDepositType: SecurityDepositType | null = null,
): ContractSecurityDepositFormInput => ({
  baseAmount: null,
  interestCalculationStartDate: null,
  interestRows: [],
  isInterestCalculated: false,
  isSuretyRenewable: false,
  notes: '',
  securityDepositId: null,
  securityDepositType,
  since: null,
  subject: null,
  subjectBankAccount: null,
  suretySubject: null,
  takeoverDate: null,
  until: null,
});

export const getEmptyContractTransactorFormInput = (
  since: Date | null,
  subject?: SubjectFragment,
): ContractTransactorFormInput => {
  const legalResidentialAddress =
    subject?.addresses.find(({ addressType }) => addressType === AddressType.LegalResidential) ?? null;

  return {
    address: legalResidentialAddress,
    invoiceAddress: legalResidentialAddress,
    isInvoiced: false,
    since,
    subject: subject ?? null,
    transactionSharePercent: null,
    transactorId: null,
    transactorType: null,
    until: null,
  };
};

export const getEmptyContractFormInput = (
  sublocatedContract: SublocatedContractFormInput | null = null,
): ContractFormInput => ({
  agreementDate: null,
  anytimeTerminationWarningMonths: null,
  billing: getEmptyContractBillingFormInput(),
  contractId: null,
  contractType: null,
  counterparts: [],
  documents: [],
  effectStartDate: null,
  externalCode: '',
  firstTermDurationMonths: null,
  firstTermExpirationDate: null,
  internalCode: '',
  isOccupiedWithoutRight: false,
  isReleased: false,
  lastRenewalStartDate: null,
  locatedUnits: [],
  managementSubject: null,
  nonRenewalWarningMonths: null,
  notes: '',
  oneshotAdditions: [],
  previousCode: '',
  ratePlans: [],
  reason: null,
  recoverBillsAfterSuspension: false,
  recurringAdditions: [],
  registrationPayments: [],
  registrationTax: getEmptyContractRegistrationTaxFormInput(),
  releaseDate: null,
  releaseReason: null,
  revaluation: getEmptyContractRevaluationFormInput(),
  revaluationHistories: [],
  secondTermDurationMonths: null,
  secondTermExpirationDate: null,
  securityDeposits: [],
  status: null,
  sublocatedContract,
  takeovers: [],
  terminationDate: null,
  terminator: null,
  transactors: [],
});
