// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { AccountingItemFragmentDoc } from './RealGimm.Web.AccountingItem.fragment';
import { AddressFragmentDoc } from './RealGimm.Web.Address.fragment';
import { AdministrationDetailFragmentDoc } from './RealGimm.Web.Administration.fragment';
import { BankAccountFragmentDoc } from './RealGimm.Web.BankAccount.fragment';
import { BillItemTypeFragmentDoc } from './RealGimm.Web.BillItemType.fragment';
import { CityFragmentDoc } from './RealGimm.Web.City.fragment';
import { ContactFragmentDoc } from './RealGimm.Web.Contact.fragment';
import { MainUsageTypeFragmentDoc } from './RealGimm.Web.EstateMainUsageType.fragment';
import { AdministratorFragmentDoc } from './RealGimm.Web.Subject.fragment';
import { TermGroupedInstallmentPaymentFragmentDoc } from './RealGimm.Web.TermGroupedInstallmentPayment.fragment';
import { TermInstallmentFragmentDoc } from './RealGimm.Web.TermInstallment.fragment';
import { VatRateFragmentDoc } from './RealGimm.Web.VatRate.fragment';

export type AdministrationTermFragment = {
  __typename?: 'AdministrationTerm';
  id: number;
  termType: Types.TermType;
  name: string;
  expectedAmount: number;
  since: string;
  until: string;
  installments: Array<{
    __typename?: 'TermInstallment';
    id: number;
    installmentNumber: number;
    dueDate: string;
    amount: number;
    since: string;
    until: string;
    notes?: string | null;
    billItemType: {
      __typename?: 'BillItemType';
      id: number;
      internalCode: string;
      description: string;
      isPositive: boolean;
      isForContractFee: boolean;
      isForContractCosts: boolean;
      isForAdministration: boolean;
      isForTax: boolean;
      defaultAccountingItem?: {
        __typename?: 'AccountingItem';
        id: number;
        description: string;
        internalCode: string;
        externalCode: string;
      } | null;
      activeSubjectVR: {
        __typename?: 'VATRate';
        id: number;
        internalCode: string;
        description: string;
        type: Types.VatRateType;
        ratePercent: number;
      };
      activeExemptVR: {
        __typename?: 'VATRate';
        id: number;
        internalCode: string;
        description: string;
        type: Types.VatRateType;
        ratePercent: number;
      };
      activeNonTaxableVR: {
        __typename?: 'VATRate';
        id: number;
        internalCode: string;
        description: string;
        type: Types.VatRateType;
        ratePercent: number;
      };
      passiveSubjectVR: {
        __typename?: 'VATRate';
        id: number;
        internalCode: string;
        description: string;
        type: Types.VatRateType;
        ratePercent: number;
      };
      passiveExemptVR: {
        __typename?: 'VATRate';
        id: number;
        internalCode: string;
        description: string;
        type: Types.VatRateType;
        ratePercent: number;
      };
      passiveNonTaxableVR: {
        __typename?: 'VATRate';
        id: number;
        internalCode: string;
        description: string;
        type: Types.VatRateType;
        ratePercent: number;
      };
      administrationVR: {
        __typename?: 'VATRate';
        id: number;
        internalCode: string;
        description: string;
        type: Types.VatRateType;
        ratePercent: number;
      };
    };
  }>;
};

export type AdministrationTermDetailFragment = {
  __typename?: 'AdministrationTerm';
  id: number;
  name: string;
  expectedAmount: number;
  since: string;
  until: string;
  termType: Types.TermType;
  administration: {
    __typename?: 'Administration';
    administrationType: Types.AdministrationType;
    paymentType: Types.PaymentType;
    since: string;
    until?: string | null;
    notes?: string | null;
    isPaymentDataIncluded: boolean;
    id: number;
    terms: Array<{ __typename?: 'AdministrationTerm'; id: number }>;
    estate: {
      __typename?: 'Estate';
      id: number;
      internalCode: string;
      name?: string | null;
      mainUsageType: {
        __typename?: 'EstateMainUsageType';
        id: number;
        name: string;
        internalCode: string;
        ordering: number;
      };
    };
    administratorSubject:
      | {
          __typename: 'LegalSubject';
          id: number;
          name: string;
          addresses: Array<{
            __typename?: 'Address';
            id: number;
            addressType: Types.AddressType;
            cityName?: string | null;
            countryISO?: string | null;
            countyName?: string | null;
            localPostCode?: string | null;
            notes?: string | null;
            numbering?: string | null;
            toponymy?: string | null;
            city?: {
              __typename?: 'City';
              guid: string;
              id: number;
              name: string;
              countyName?: string | null;
              countryName?: string | null;
              countryISO: string;
              cadastralCode?: string | null;
            } | null;
          }>;
          contacts: Array<{
            __typename?: 'Contact';
            id: number;
            contactInfo?: string | null;
            contactInfoType: Types.ContactInfoType;
            contactType: Types.ContactType;
          }>;
          bankAccounts: Array<{
            __typename?: 'BankAccount';
            bankAccountType: Types.BankAccountType;
            referenceCode?: string | null;
            referenceCodeType: Types.BankAccountCodeType;
            notes?: string | null;
            accountHolder?: string | null;
            id: number;
          }>;
        }
      | {
          __typename: 'ManagementSubject';
          id: number;
          name: string;
          addresses: Array<{
            __typename?: 'Address';
            id: number;
            addressType: Types.AddressType;
            cityName?: string | null;
            countryISO?: string | null;
            countyName?: string | null;
            localPostCode?: string | null;
            notes?: string | null;
            numbering?: string | null;
            toponymy?: string | null;
            city?: {
              __typename?: 'City';
              guid: string;
              id: number;
              name: string;
              countyName?: string | null;
              countryName?: string | null;
              countryISO: string;
              cadastralCode?: string | null;
            } | null;
          }>;
          contacts: Array<{
            __typename?: 'Contact';
            id: number;
            contactInfo?: string | null;
            contactInfoType: Types.ContactInfoType;
            contactType: Types.ContactType;
          }>;
          bankAccounts: Array<{
            __typename?: 'BankAccount';
            bankAccountType: Types.BankAccountType;
            referenceCode?: string | null;
            referenceCodeType: Types.BankAccountCodeType;
            notes?: string | null;
            accountHolder?: string | null;
            id: number;
          }>;
        }
      | {
          __typename: 'PhysicalSubject';
          id: number;
          name: string;
          addresses: Array<{
            __typename?: 'Address';
            id: number;
            addressType: Types.AddressType;
            cityName?: string | null;
            countryISO?: string | null;
            countyName?: string | null;
            localPostCode?: string | null;
            notes?: string | null;
            numbering?: string | null;
            toponymy?: string | null;
            city?: {
              __typename?: 'City';
              guid: string;
              id: number;
              name: string;
              countyName?: string | null;
              countryName?: string | null;
              countryISO: string;
              cadastralCode?: string | null;
            } | null;
          }>;
          contacts: Array<{
            __typename?: 'Contact';
            id: number;
            contactInfo?: string | null;
            contactInfoType: Types.ContactInfoType;
            contactType: Types.ContactType;
          }>;
          bankAccounts: Array<{
            __typename?: 'BankAccount';
            bankAccountType: Types.BankAccountType;
            referenceCode?: string | null;
            referenceCodeType: Types.BankAccountCodeType;
            notes?: string | null;
            accountHolder?: string | null;
            id: number;
          }>;
        };
    bankAccount?: {
      __typename?: 'BankAccount';
      bankAccountType: Types.BankAccountType;
      referenceCode?: string | null;
      referenceCodeType: Types.BankAccountCodeType;
      notes?: string | null;
      accountHolder?: string | null;
      id: number;
    } | null;
  };
  installments: Array<{
    __typename?: 'TermInstallment';
    id: number;
    installmentNumber: number;
    dueDate: string;
    amount: number;
    since: string;
    until: string;
    notes?: string | null;
    billItemType: {
      __typename?: 'BillItemType';
      id: number;
      internalCode: string;
      description: string;
      isPositive: boolean;
      isForContractFee: boolean;
      isForContractCosts: boolean;
      isForAdministration: boolean;
      isForTax: boolean;
      defaultAccountingItem?: {
        __typename?: 'AccountingItem';
        id: number;
        description: string;
        internalCode: string;
        externalCode: string;
      } | null;
      activeSubjectVR: {
        __typename?: 'VATRate';
        id: number;
        internalCode: string;
        description: string;
        type: Types.VatRateType;
        ratePercent: number;
      };
      activeExemptVR: {
        __typename?: 'VATRate';
        id: number;
        internalCode: string;
        description: string;
        type: Types.VatRateType;
        ratePercent: number;
      };
      activeNonTaxableVR: {
        __typename?: 'VATRate';
        id: number;
        internalCode: string;
        description: string;
        type: Types.VatRateType;
        ratePercent: number;
      };
      passiveSubjectVR: {
        __typename?: 'VATRate';
        id: number;
        internalCode: string;
        description: string;
        type: Types.VatRateType;
        ratePercent: number;
      };
      passiveExemptVR: {
        __typename?: 'VATRate';
        id: number;
        internalCode: string;
        description: string;
        type: Types.VatRateType;
        ratePercent: number;
      };
      passiveNonTaxableVR: {
        __typename?: 'VATRate';
        id: number;
        internalCode: string;
        description: string;
        type: Types.VatRateType;
        ratePercent: number;
      };
      administrationVR: {
        __typename?: 'VATRate';
        id: number;
        internalCode: string;
        description: string;
        type: Types.VatRateType;
        ratePercent: number;
      };
    };
  }>;
  payments: Array<{
    __typename?: 'TermGroupedInstallmentPayment';
    billId: number;
    billDate: string;
    billInternalCode: string;
    billIsTemporary: boolean;
    termInstallments: Array<{
      __typename?: 'TermInstallment';
      id: number;
      amount: number;
      installmentNumber: number;
      billItemType: {
        __typename?: 'BillItemType';
        description: string;
        administrationVR: { __typename?: 'VATRate'; ratePercent: number };
      };
    }>;
  }>;
};

export const AdministrationTermFragmentDoc = gql`
  fragment AdministrationTermFragment on AdministrationTerm {
    id
    termType
    name
    expectedAmount
    since
    until
    installments {
      ...TermInstallmentFragment
    }
  }
`;
export const AdministrationTermDetailFragmentDoc = gql`
  fragment AdministrationTermDetailFragment on AdministrationTerm {
    id
    name
    expectedAmount
    since
    until
    termType
    administration {
      ...AdministrationDetailFragment
    }
    installments {
      ...TermInstallmentFragment
    }
    payments {
      ...TermGroupedInstallmentPaymentFragment
    }
  }
`;
