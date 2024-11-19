import { Month } from '@realgimm5/frontend-common/enums';
import {
  AutomaticBoolean,
  BillingPeriod,
  ContractTerminator,
  CounterpartType,
  EntryStatus,
  PaymentType,
  Reason,
  RegistrationTaxExemption,
  RegistrationTaxIncomeType,
  RegistrationTaxIncomeTypeRli,
  RegistrationTaxPaymentType,
  RegistrationTaxPeriod,
  RegistrationTaxSpecialCase,
  ReleaseReason,
  RevaluationRateType,
  SecurityDepositType,
  TakeoverType,
  VatRateType,
} from '@realgimm5/frontend-common/gql/types';
import { DocumentFormInput } from '@realgimm5/frontend-common/interfaces';

import { AccountingItemFragment } from '../../gql/RealGimm.Web.AccountingItem.fragment';
import { AddressFragment } from '../../gql/RealGimm.Web.Address.fragment';
import { BankAccountFragment } from '../../gql/RealGimm.Web.BankAccount.fragment';
import { BillingPauseFragment } from '../../gql/RealGimm.Web.BillingPause.fragment';
import { ContractTypeFragment } from '../../gql/RealGimm.Web.ContractType.fragment';
import { EstateSubUnitFragment } from '../../gql/RealGimm.Web.EstateSubUnit.fragment';
import { EstateUnitFragment } from '../../gql/RealGimm.Web.EstateUnit.fragment';
import { ContractRegistrationPaymentFragment } from '../../gql/RealGimm.Web.RegistrationPayment.fragment';
import { RevaluationHistoryFragment } from '../../gql/RealGimm.Web.RevaluationHistory.fragment';
import { SecurityDepositInterestRowFragment } from '../../gql/RealGimm.Web.SecurityDepositInterestRow.fragment';
import { SubjectFragment } from '../../gql/RealGimm.Web.Subject.fragment';
import { TakeoverFragment } from '../../gql/RealGimm.Web.Takeover.fragment';
import { VatRateFragment } from '../../gql/RealGimm.Web.VatRate.fragment';
import { BillItemTypeFieldValue } from '../FieldValues/BillIemType';
import { SubjectFieldValue } from '../FieldValues/Subject';

export interface ContractBillingFormInput {
  afterTerm: boolean;
  alignedToCalendarYear: boolean;
  appliesBaseFee: boolean;
  baseFee: number | null;
  baseFeeBillItemType: BillItemTypeFieldValue | null;
  endDate: Date | null;
  notes: string;
  pauses: BillingPauseFragment[];
  period: BillingPeriod | null;
  startDate: Date | null;
  vatRateType: VatRateType | null;
  withSplitPayment: boolean;
  withStampTax: AutomaticBoolean | null;
}

export interface ContractCounterpartFormInput {
  contractSharePercent: number | null;
  counterpartId: number | null;
  counterpartType: CounterpartType | null;
  isMainCounterpart: boolean;
  since: Date | null;
  subject: SubjectFragment | null;
  until: Date | null;
}

export interface ContractLocatedUnitFormInput {
  estateSubUnit: EstateSubUnitFragment | null;
  estateUnit: EstateUnitFragment | null;
  isAncillaryUnit: boolean;
  isCadastralRegistrationInProgress: boolean;
  isMainUnit: boolean;
  isPartialLocation: boolean;
  isRegistryUpdateEnabled: boolean;
  locatedUnitId: number | null;
  surfaceSqM: number | null;
}

export interface ContractOneshotAdditionFormInput {
  accountingItem: AccountingItemFragment | null;
  amount: number | null;
  billItemType: BillItemTypeFieldValue | null;
  installments: number | null;
  isBoundToTermDay: boolean;
  isRentalRateVariation: boolean;
  notes: string;
  oneShotAdditionId: number | null;
  startDate: Date | null;
  termStartDate: Date | null;
  termEndDate: Date | null;
  vatRate: VatRateFragment | null;
}

export interface ContractRatePlanFormInput {
  isDeclarationExpected: boolean;
  isDeclared: boolean;
  newYearlyRate: number | null;
  ratePlanId: number | null;
  since: Date | null;
}

export interface ContractRecurringAdditionFormInput {
  accountingItem: AccountingItemFragment | null;
  amountPerInstallment: number | null;
  billItemType: BillItemTypeFieldValue | null;
  excludeEndMonth: Month | null;
  excludeStartMonth: Month | null;
  notes: string;
  recurringAdditionId: number | null;
  vatRate: VatRateFragment | null;
}

export interface ContractRegistrationTaxFormInput {
  contractRegistrationCode: string;
  exemption: RegistrationTaxExemption | null;
  firstOnlineRegistrationDate: Date | null;
  firstRegistrationDate: Date | null;
  firstRegistrationPeriod: RegistrationTaxPeriod | null;
  incomeType: RegistrationTaxIncomeType | null;
  incomeTypeRli: RegistrationTaxIncomeTypeRli | null;
  isAccountingManaged: boolean;
  isRliModeEnabled: boolean;
  isRegistrationTaxApplied: boolean;
  isTakeoverFromPreviousSubject: boolean;
  isVoluntarySanctionApplied: boolean;
  lastOnlinePaymentDate: Date | null;
  lastPaymentDate: Date | null;
  numberOfCopies: number | null;
  numberOfPages: number | null;
  paymentType: RegistrationTaxPaymentType | null;
  registrationNumber: string;
  registrationOffice: {
    description: string;
    externalCode: string;
    id: number;
    countyName: string;
  } | null;
  registrationSerialNumber: string;
  registrationYear: number | null;
  specialCase: RegistrationTaxSpecialCase | null;
  takeoverDate: Date | null;
  takeoverLegalRepresentativeSubject: SubjectFieldValue | null;
  takeoverSubjects: SubjectFragment[];
  takeoverType: TakeoverType | null;
  taxableRateRatioPercent: number | null;
  tenantShareOfStampTaxPercent: number | null;
  tenantTaxSharePercent: number | null;
  transferResolutionAmount: number | null;
}

export interface ContractRevaluationFormInput {
  baseRevaluationRate: number | null;
  isAbsoluteRevaluationApplied: boolean;
  isBackHistoryEnabled: boolean;
  isRevaluationApplied: boolean;
  isRevaluationCalculated: boolean;
  nextApplicationDate: Date | null;
  rateType: RevaluationRateType | null;
  referencePeriodEnd: Date | null;
  referencePeriodStart: Date | null;
  revaluationPeriodMonths: number | null;
  revaluationSharePercent: number | null;
}

export interface ContractSecurityDepositFormInput {
  baseAmount: number | null;
  interestCalculationStartDate: Date | null;
  interestRows: SecurityDepositInterestRowFragment[];
  isInterestCalculated: boolean;
  isSuretyRenewable: boolean;
  notes: string;
  securityDepositId: number | null;
  securityDepositType: SecurityDepositType | null;
  since: Date | null;
  subject: SubjectFieldValue | null;
  subjectBankAccount: BankAccountFragment | null;
  suretySubject: SubjectFieldValue | null;
  takeoverDate: Date | null;
  until: Date | null;
}

export interface SublocatedContractFormInput {
  agreementDate: Date | null;
  anytimeTerminationWarningMonths: number | null;
  contractId: number | null;
  contractTypeDescription: string;
  effectStartDate: Date | null;
  externalCode: string;
  firstTermDurationMonths: number | null;
  firstTermExpirationDate: Date | null;
  internalCode: string;
  lastRenewalStartDate: Date | null;
  managementSubjectName: string;
  nonRenewalWarningMonths: number | null;
  reason: Reason | null;
  secondTermDurationMonths: number | null;
  secondTermExpirationDate: Date | null;
  status: EntryStatus | null;
  terminationDate: Date | null;
  terminator: ContractTerminator | null;
}

export interface ContractTransactorFormInput {
  address: AddressFragment | null;
  invoiceAddress: AddressFragment | null;
  isInvoiced: boolean;
  since: Date | null;
  subject: SubjectFragment | null;
  transactionSharePercent: number | null;
  transactorId: number | null;
  transactorType: PaymentType | null;
  until: Date | null;
}

export interface ContractFormInput {
  agreementDate: Date | null;
  anytimeTerminationWarningMonths: number | null;
  billing: ContractBillingFormInput;
  contractId: number | null;
  contractType: ContractTypeFragment | null;
  counterparts: ContractCounterpartFormInput[];
  documents: DocumentFormInput[];
  effectStartDate: Date | null;
  externalCode: string;
  firstTermDurationMonths: number | null;
  firstTermExpirationDate: Date | null;
  internalCode: string;
  isOccupiedWithoutRight: boolean;
  isReleased: boolean;
  lastRenewalStartDate: Date | null;
  locatedUnits: ContractLocatedUnitFormInput[];
  managementSubject: SubjectFieldValue | null;
  nonRenewalWarningMonths: number | null;
  notes: string;
  oneshotAdditions: ContractOneshotAdditionFormInput[];
  previousCode: string;
  ratePlans: ContractRatePlanFormInput[];
  reason: Reason | null;
  recoverBillsAfterSuspension: boolean;
  recurringAdditions: ContractRecurringAdditionFormInput[];
  registrationPayments: ContractRegistrationPaymentFragment[];
  registrationTax: ContractRegistrationTaxFormInput;
  releaseDate: Date | null;
  releaseReason: ReleaseReason | null;
  revaluation: ContractRevaluationFormInput;
  revaluationHistories: RevaluationHistoryFragment[];
  secondTermDurationMonths: number | null;
  secondTermExpirationDate: Date | null;
  securityDeposits: ContractSecurityDepositFormInput[];
  status: EntryStatus | null;
  sublocatedContract: SublocatedContractFormInput | null;
  takeovers: TakeoverFragment[];
  terminationDate: Date | null;
  terminator: ContractTerminator | null;
  transactors: ContractTransactorFormInput[];
}
