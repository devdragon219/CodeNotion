// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { AccountingItemFragmentDoc } from './RealGimm.Web.AccountingItem.fragment';
import { AddressFragmentDoc } from './RealGimm.Web.Address.fragment';
import { AsstAddressFragmentDoc } from './RealGimm.Web.AsstAddress.fragment';
import { BankAccountFragmentDoc } from './RealGimm.Web.BankAccount.fragment';
import { BillItemTypeFragmentDoc } from './RealGimm.Web.BillItemType.fragment';
import { BillingPauseFragmentDoc } from './RealGimm.Web.BillingPause.fragment';
import { CadastralCategoryFragmentDoc } from './RealGimm.Web.CadastralCategory.fragment';
import { CadastralCoordinatesFragmentDoc } from './RealGimm.Web.CadastralCoordinates.fragment';
import { CadastralLandCategoryFragmentDoc } from './RealGimm.Web.CadastralLandCategory.fragment';
import { EstateUnitCadastralUnitDetailFragmentDoc } from './RealGimm.Web.CadastralUnit.fragment';
import { CadastralUnitIncomeFragmentDoc } from './RealGimm.Web.CadastralUnitIncome.fragment';
import { CadastralUnitInspectionFragmentDoc } from './RealGimm.Web.CadastralUnitInspection.fragment';
import { CityFragmentDoc } from './RealGimm.Web.City.fragment';
import { ContactFragmentDoc } from './RealGimm.Web.Contact.fragment';
import { ContractDetailFragmentDoc, SublocatedContractDetailFragmentDoc } from './RealGimm.Web.Contract.fragment';
import { ContractExpiryOutputFragmentDoc } from './RealGimm.Web.ContractExpiryOutput.fragment';
import { ContractFragmentDoc } from './RealGimm.Web.ContractListOutput.fragment';
import { ContractTypeFragmentDoc } from './RealGimm.Web.ContractType.fragment';
import { DocumentFragmentDoc } from './RealGimm.Web.Document.fragment';
import { DocumentsPerContentCategoryGroupOutputFragmentDoc } from './RealGimm.Web.DocumentsPerContentCategoryGroupOutput.fragment';
import { DocumentsPerContentCategoryOutputFragmentDoc } from './RealGimm.Web.DocumentsPerContentCategoryOutput.fragment';
import { EstateDetailFragmentDoc, EstateFragmentDoc } from './RealGimm.Web.Estate.fragment';
import { EstateSubUnitFragmentDoc } from './RealGimm.Web.EstateSubUnit.fragment';
import { EstateUnitDetailFragmentDoc } from './RealGimm.Web.EstateUnit.fragment';
import { EstateUnitSurfaceSummaryFragmentDoc } from './RealGimm.Web.EstateUnitSurfaceSummary.fragment';
import { EstateUnitSurfaceSummaryFloorFragmentDoc } from './RealGimm.Web.EstateUnitSurfaceSummaryFloor.fragment';
import { EstateUnitSurfaceSummaryFloorSummaryFragmentDoc } from './RealGimm.Web.EstateUnitSurfaceSummaryFloorSummary.fragment';
import { UsageTypeFragmentDoc } from './RealGimm.Web.EstateUsageType.fragment';
import { FloorFragmentDoc } from './RealGimm.Web.Floor.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { RegistrationOfficeFragmentDoc } from './RealGimm.Web.RegistrationOffice.fragment';
import { ContractRegistrationPaymentFragmentDoc } from './RealGimm.Web.RegistrationPayment.fragment';
import { RevaluationHistoryFragmentDoc } from './RealGimm.Web.RevaluationHistory.fragment';
import { SecurityDepositInterestRowFragmentDoc } from './RealGimm.Web.SecurityDepositInterestRow.fragment';
import { StairFragmentDoc } from './RealGimm.Web.Stair.fragment';
import { SubjectDetailFragmentDoc } from './RealGimm.Web.Subject.fragment';
import { SubjectCategoryFragmentDoc } from './RealGimm.Web.SubjectCategory';
import { SubjectRelationFragmentDoc } from './RealGimm.Web.SubjectRelation.fragment';
import { TakeoverFragmentDoc } from './RealGimm.Web.Takeover.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';
import { VatRateFragmentDoc } from './RealGimm.Web.VatRate.fragment';

export type GetContractsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.ContractFilterInput>;
  order?: Types.InputMaybe<Array<Types.ContractSortInput> | Types.ContractSortInput>;
}>;

export type GetContractsQuery = {
  __typename?: 'Query';
  contract: {
    __typename?: 'ContractQueries';
    listContracts?: {
      __typename?: 'ListContractsConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'ContractListOutput';
        id: number;
        isActive: boolean;
        internalCode: string;
        externalCode?: string | null;
        counterpartName?: string | null;
        typeDescription?: string | null;
        isSublocated: boolean;
        status: Types.EntryStatus;
        effectStartDate: string;
        expirationDate?: string | null;
        daysToExpiration?: number | null;
        managementSubjectName?: string | null;
        releaseDate?: string | null;
        releaseReason?: Types.ReleaseReason | null;
        isOccupiedWithoutRight?: boolean | null;
        terminationDate?: string | null;
        terminator?: Types.ContractTerminator | null;
        firstTermDurationMonths?: number | null;
        secondTermDurationMonths?: number | null;
        firstTermExpirationDate?: string | null;
        secondTermExpirationDate?: string | null;
        anytimeTerminationWarningMonths?: number | null;
        nonRenewalWarningMonths?: number | null;
        reason: Types.Reason;
        agreementDate: string;
        lastRenewalStartDate: string;
        locatedUnits: Array<{
          __typename?: 'ContractListLocatedUnitOutput';
          estateUnitOrSubUnitInternalCode?: string | null;
          estateUnitName?: string | null;
          isMainUnit: boolean;
          isRegistryUpdateEnabled: boolean;
          isPartialLocation: boolean;
          surfaceSqM?: number | null;
          estateUnitAddress?: {
            __typename?: 'AsstAddress';
            id: number;
            addressType: Types.AsstAddressType;
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
            locationLatLon?: { __typename?: 'GeoJSONPointType'; coordinates?: Array<number> | null } | null;
          } | null;
        }>;
      }> | null;
    } | null;
  };
};

export type GetAllContractsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ContractFilterInput>;
  order?: Types.InputMaybe<Array<Types.ContractSortInput> | Types.ContractSortInput>;
}>;

export type GetAllContractsQuery = {
  __typename?: 'Query';
  contract: {
    __typename?: 'ContractQueries';
    listContractsFull: Array<{
      __typename?: 'Contract';
      status: Types.EntryStatus;
      internalCode: string;
      externalCode?: string | null;
      previousCode?: string | null;
      reason: Types.Reason;
      agreementDate: string;
      effectStartDate: string;
      lastRenewalStartDate: string;
      firstTermDurationMonths?: number | null;
      secondTermDurationMonths?: number | null;
      firstTermExpirationDate?: string | null;
      secondTermExpirationDate?: string | null;
      anytimeTerminationWarningMonths?: number | null;
      nonRenewalWarningMonths?: number | null;
      terminationDate?: string | null;
      terminator?: Types.ContractTerminator | null;
      billingStartDate: string;
      billingEndDate?: string | null;
      billingAfterTerm: boolean;
      recoverBillsAfterSuspension: boolean;
      billingAlignedToCalendarYear: boolean;
      billingAppliesBaseFee: boolean;
      billingBaseFee?: number | null;
      billingVATRateType?: Types.VatRateType | null;
      billingPeriod?: Types.BillingPeriod | null;
      billingWithSplitPayment: boolean;
      billingWithStampTax?: Types.AutomaticBoolean | null;
      notes?: string | null;
      billingNotes?: string | null;
      isReleased: boolean;
      releaseDate?: string | null;
      releaseReason?: Types.ReleaseReason | null;
      isOccupiedWithoutRight?: boolean | null;
      id: number;
      managementSubject:
        | {
            __typename: 'LegalSubject';
            fullName: string;
            shorthandDescription?: string | null;
            baseCountryTaxIdCode?: string | null;
            additionalTaxIdCode?: string | null;
            additionalGovIdCode?: string | null;
            bankingId1?: string | null;
            bankingId2?: string | null;
            businessStart?: string | null;
            companiesHouseIdCode?: string | null;
            shareCapital?: number | null;
            interGroupSignature?: string | null;
            legalSubjectType: Types.LegalSubjectType;
            name: string;
            id: number;
            personType: Types.PersonType;
            internalCode: string;
            externalSourceCode?: string | null;
            entryStatus: Types.EntryStatus;
            closureDate?: string | null;
            companyGroupParent?: {
              __typename?: 'SubjectRelation';
              since?: string | null;
              until?: string | null;
              groupRelationType?: Types.CompanyGroup | null;
              officerRelationType?: Types.OfficerType | null;
              relationType: Types.SubjectRelationType;
              id: number;
              main:
                | { __typename?: 'LegalSubject'; name: string; id: number }
                | { __typename?: 'ManagementSubject'; name: string; id: number }
                | { __typename?: 'PhysicalSubject'; name: string; id: number };
              subordinate:
                | { __typename?: 'LegalSubject'; name: string; id: number }
                | { __typename?: 'ManagementSubject'; name: string; id: number }
                | { __typename?: 'PhysicalSubject'; name: string; id: number };
            } | null;
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
            bankAccounts: Array<{
              __typename?: 'BankAccount';
              bankAccountType: Types.BankAccountType;
              referenceCode?: string | null;
              referenceCodeType: Types.BankAccountCodeType;
              notes?: string | null;
              accountHolder?: string | null;
              id: number;
            }>;
            contacts: Array<{
              __typename?: 'Contact';
              id: number;
              contactInfo?: string | null;
              contactInfoType: Types.ContactInfoType;
              contactType: Types.ContactType;
            }>;
            categories: Array<{
              __typename?: 'SubjectCategory';
              name: string;
              id: number;
              function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
            }>;
            heirs: Array<{
              __typename?: 'SubjectRelation';
              since?: string | null;
              until?: string | null;
              groupRelationType?: Types.CompanyGroup | null;
              officerRelationType?: Types.OfficerType | null;
              relationType: Types.SubjectRelationType;
              id: number;
              main:
                | { __typename?: 'LegalSubject'; name: string; id: number }
                | { __typename?: 'ManagementSubject'; name: string; id: number }
                | { __typename?: 'PhysicalSubject'; name: string; id: number };
              subordinate:
                | { __typename?: 'LegalSubject'; name: string; id: number }
                | { __typename?: 'ManagementSubject'; name: string; id: number }
                | { __typename?: 'PhysicalSubject'; name: string; id: number };
            }>;
            officers: Array<{
              __typename?: 'SubjectRelation';
              since?: string | null;
              until?: string | null;
              groupRelationType?: Types.CompanyGroup | null;
              officerRelationType?: Types.OfficerType | null;
              relationType: Types.SubjectRelationType;
              id: number;
              main:
                | { __typename?: 'LegalSubject'; name: string; id: number }
                | { __typename?: 'ManagementSubject'; name: string; id: number }
                | { __typename?: 'PhysicalSubject'; name: string; id: number };
              subordinate:
                | { __typename?: 'LegalSubject'; name: string; id: number }
                | { __typename?: 'ManagementSubject'; name: string; id: number }
                | { __typename?: 'PhysicalSubject'; name: string; id: number };
            }>;
            owningMgmtSubjects: Array<{
              __typename?: 'SubjectRelation';
              since?: string | null;
              until?: string | null;
              groupRelationType?: Types.CompanyGroup | null;
              officerRelationType?: Types.OfficerType | null;
              relationType: Types.SubjectRelationType;
              id: number;
              main:
                | { __typename?: 'LegalSubject'; name: string; id: number }
                | { __typename?: 'ManagementSubject'; name: string; id: number }
                | { __typename?: 'PhysicalSubject'; name: string; id: number };
              subordinate:
                | { __typename?: 'LegalSubject'; name: string; id: number }
                | { __typename?: 'ManagementSubject'; name: string; id: number }
                | { __typename?: 'PhysicalSubject'; name: string; id: number };
            }>;
            taxStatuses: Array<{
              __typename?: 'TaxStatus';
              taxStatusType: Types.TaxStatusType;
              since?: string | null;
              until?: string | null;
              id: number;
            }>;
          }
        | {
            __typename: 'ManagementSubject';
            fullName: string;
            shorthandDescription?: string | null;
            baseCountryTaxIdCode?: string | null;
            additionalTaxIdCode?: string | null;
            additionalGovIdCode?: string | null;
            bankingId1?: string | null;
            bankingId2?: string | null;
            businessStart?: string | null;
            managementCode?: string | null;
            companiesHouseIdCode?: string | null;
            shareCapital?: number | null;
            interGroupSignature?: string | null;
            name: string;
            id: number;
            personType: Types.PersonType;
            internalCode: string;
            externalSourceCode?: string | null;
            entryStatus: Types.EntryStatus;
            closureDate?: string | null;
            companyGroupParent?: {
              __typename?: 'SubjectRelation';
              since?: string | null;
              until?: string | null;
              groupRelationType?: Types.CompanyGroup | null;
              officerRelationType?: Types.OfficerType | null;
              relationType: Types.SubjectRelationType;
              id: number;
              main:
                | { __typename?: 'LegalSubject'; name: string; id: number }
                | { __typename?: 'ManagementSubject'; name: string; id: number }
                | { __typename?: 'PhysicalSubject'; name: string; id: number };
              subordinate:
                | { __typename?: 'LegalSubject'; name: string; id: number }
                | { __typename?: 'ManagementSubject'; name: string; id: number }
                | { __typename?: 'PhysicalSubject'; name: string; id: number };
            } | null;
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
            bankAccounts: Array<{
              __typename?: 'BankAccount';
              bankAccountType: Types.BankAccountType;
              referenceCode?: string | null;
              referenceCodeType: Types.BankAccountCodeType;
              notes?: string | null;
              accountHolder?: string | null;
              id: number;
            }>;
            contacts: Array<{
              __typename?: 'Contact';
              id: number;
              contactInfo?: string | null;
              contactInfoType: Types.ContactInfoType;
              contactType: Types.ContactType;
            }>;
            categories: Array<{
              __typename?: 'SubjectCategory';
              name: string;
              id: number;
              function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
            }>;
            heirs: Array<{
              __typename?: 'SubjectRelation';
              since?: string | null;
              until?: string | null;
              groupRelationType?: Types.CompanyGroup | null;
              officerRelationType?: Types.OfficerType | null;
              relationType: Types.SubjectRelationType;
              id: number;
              main:
                | { __typename?: 'LegalSubject'; name: string; id: number }
                | { __typename?: 'ManagementSubject'; name: string; id: number }
                | { __typename?: 'PhysicalSubject'; name: string; id: number };
              subordinate:
                | { __typename?: 'LegalSubject'; name: string; id: number }
                | { __typename?: 'ManagementSubject'; name: string; id: number }
                | { __typename?: 'PhysicalSubject'; name: string; id: number };
            }>;
            officers: Array<{
              __typename?: 'SubjectRelation';
              since?: string | null;
              until?: string | null;
              groupRelationType?: Types.CompanyGroup | null;
              officerRelationType?: Types.OfficerType | null;
              relationType: Types.SubjectRelationType;
              id: number;
              main:
                | { __typename?: 'LegalSubject'; name: string; id: number }
                | { __typename?: 'ManagementSubject'; name: string; id: number }
                | { __typename?: 'PhysicalSubject'; name: string; id: number };
              subordinate:
                | { __typename?: 'LegalSubject'; name: string; id: number }
                | { __typename?: 'ManagementSubject'; name: string; id: number }
                | { __typename?: 'PhysicalSubject'; name: string; id: number };
            }>;
            owningMgmtSubjects: Array<{
              __typename?: 'SubjectRelation';
              since?: string | null;
              until?: string | null;
              groupRelationType?: Types.CompanyGroup | null;
              officerRelationType?: Types.OfficerType | null;
              relationType: Types.SubjectRelationType;
              id: number;
              main:
                | { __typename?: 'LegalSubject'; name: string; id: number }
                | { __typename?: 'ManagementSubject'; name: string; id: number }
                | { __typename?: 'PhysicalSubject'; name: string; id: number };
              subordinate:
                | { __typename?: 'LegalSubject'; name: string; id: number }
                | { __typename?: 'ManagementSubject'; name: string; id: number }
                | { __typename?: 'PhysicalSubject'; name: string; id: number };
            }>;
            taxStatuses: Array<{
              __typename?: 'TaxStatus';
              taxStatusType: Types.TaxStatusType;
              since?: string | null;
              until?: string | null;
              id: number;
            }>;
          }
        | {
            __typename: 'PhysicalSubject';
            firstName?: string | null;
            lastName?: string | null;
            birthCountryTaxIdCode?: string | null;
            professionalTaxIdCode?: string | null;
            birthDate?: string | null;
            birthSex?: Types.BirthSex | null;
            name: string;
            id: number;
            personType: Types.PersonType;
            internalCode: string;
            externalSourceCode?: string | null;
            entryStatus: Types.EntryStatus;
            closureDate?: string | null;
            birthLocation?: {
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
            } | null;
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
            bankAccounts: Array<{
              __typename?: 'BankAccount';
              bankAccountType: Types.BankAccountType;
              referenceCode?: string | null;
              referenceCodeType: Types.BankAccountCodeType;
              notes?: string | null;
              accountHolder?: string | null;
              id: number;
            }>;
            contacts: Array<{
              __typename?: 'Contact';
              id: number;
              contactInfo?: string | null;
              contactInfoType: Types.ContactInfoType;
              contactType: Types.ContactType;
            }>;
            categories: Array<{
              __typename?: 'SubjectCategory';
              name: string;
              id: number;
              function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
            }>;
            heirs: Array<{
              __typename?: 'SubjectRelation';
              since?: string | null;
              until?: string | null;
              groupRelationType?: Types.CompanyGroup | null;
              officerRelationType?: Types.OfficerType | null;
              relationType: Types.SubjectRelationType;
              id: number;
              main:
                | { __typename?: 'LegalSubject'; name: string; id: number }
                | { __typename?: 'ManagementSubject'; name: string; id: number }
                | { __typename?: 'PhysicalSubject'; name: string; id: number };
              subordinate:
                | { __typename?: 'LegalSubject'; name: string; id: number }
                | { __typename?: 'ManagementSubject'; name: string; id: number }
                | { __typename?: 'PhysicalSubject'; name: string; id: number };
            }>;
            officers: Array<{
              __typename?: 'SubjectRelation';
              since?: string | null;
              until?: string | null;
              groupRelationType?: Types.CompanyGroup | null;
              officerRelationType?: Types.OfficerType | null;
              relationType: Types.SubjectRelationType;
              id: number;
              main:
                | { __typename?: 'LegalSubject'; name: string; id: number }
                | { __typename?: 'ManagementSubject'; name: string; id: number }
                | { __typename?: 'PhysicalSubject'; name: string; id: number };
              subordinate:
                | { __typename?: 'LegalSubject'; name: string; id: number }
                | { __typename?: 'ManagementSubject'; name: string; id: number }
                | { __typename?: 'PhysicalSubject'; name: string; id: number };
            }>;
            owningMgmtSubjects: Array<{
              __typename?: 'SubjectRelation';
              since?: string | null;
              until?: string | null;
              groupRelationType?: Types.CompanyGroup | null;
              officerRelationType?: Types.OfficerType | null;
              relationType: Types.SubjectRelationType;
              id: number;
              main:
                | { __typename?: 'LegalSubject'; name: string; id: number }
                | { __typename?: 'ManagementSubject'; name: string; id: number }
                | { __typename?: 'PhysicalSubject'; name: string; id: number };
              subordinate:
                | { __typename?: 'LegalSubject'; name: string; id: number }
                | { __typename?: 'ManagementSubject'; name: string; id: number }
                | { __typename?: 'PhysicalSubject'; name: string; id: number };
            }>;
            taxStatuses: Array<{
              __typename?: 'TaxStatus';
              taxStatusType: Types.TaxStatusType;
              since?: string | null;
              until?: string | null;
              id: number;
            }>;
          };
      type: {
        __typename?: 'ContractType';
        id: number;
        internalCode: string;
        description: string;
        isActive: boolean;
        isRentChargeApplicable: boolean;
        nature: Types.AssetNature;
        usageTypeId: number;
        isRegistrationTax: boolean;
        isStampTax: boolean;
        registrationTaxIncomeType?: Types.RegistrationTaxIncomeTypeRli | null;
        registrationTaxPercent?: number | null;
        registrationTaxTenantPercent?: number | null;
        isRevaluationApplicable: boolean;
        isAbsoluteRevaluation: boolean;
        revaluationRatePercent?: number | null;
        revaluationIndexMonth?: number | null;
        revaluationCalculationMonth?: number | null;
        usageType: {
          __typename?: 'EstateUsageType';
          id: number;
          name: string;
          internalCode: string;
          ordering: number;
          isForEstate: boolean;
          isForEstateUnit: boolean;
          isForEstateSubUnit: boolean;
          isForContracts: boolean;
        };
      };
      billingBaseFeeBillItemType?: {
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
      } | null;
      billingPauses: Array<{
        __typename?: 'BillingPause';
        since: string;
        until?: string | null;
        notes?: string | null;
        isRecoveryArrears?: boolean | null;
        id: number;
      }>;
      registrationTaxData?: {
        __typename?: 'RegistrationTax';
        contractRegistrationCode?: string | null;
        exemptions?: Types.RegistrationTaxExemption | null;
        firstOnlineRegistrationDate?: string | null;
        firstRegistrationDate?: string | null;
        firstRegistrationPeriod: Types.RegistrationTaxPeriod;
        incomeType?: Types.RegistrationTaxIncomeType | null;
        incomeTypeRLI?: Types.RegistrationTaxIncomeTypeRli | null;
        isAccountingManaged: boolean;
        isRLIModeEnabled: boolean;
        isTakeoverFromPreviousSubject: boolean;
        isVoluntarySanctionApplied: boolean;
        lastOnlinePaymentDate?: string | null;
        lastPaymentDate?: string | null;
        numberOfCopies: number;
        numberOfPages: number;
        paymentType: Types.RegistrationTaxPaymentType;
        registrationNumber?: string | null;
        registrationSerialNumber?: string | null;
        registrationYear?: number | null;
        specialCase?: Types.RegistrationTaxSpecialCase | null;
        takeoverDate?: string | null;
        takeoverType?: Types.TakeoverType | null;
        taxableRateRatioPercent: number;
        tenantShareOfStampTaxPercent: number;
        tenantTaxSharePercent: number;
        transferResolutionAmount?: number | null;
        legalRepresentativeSubject?:
          | {
              __typename: 'LegalSubject';
              fullName: string;
              shorthandDescription?: string | null;
              baseCountryTaxIdCode?: string | null;
              additionalTaxIdCode?: string | null;
              additionalGovIdCode?: string | null;
              bankingId1?: string | null;
              bankingId2?: string | null;
              businessStart?: string | null;
              companiesHouseIdCode?: string | null;
              shareCapital?: number | null;
              interGroupSignature?: string | null;
              legalSubjectType: Types.LegalSubjectType;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              companyGroupParent?: {
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
          | {
              __typename: 'ManagementSubject';
              fullName: string;
              shorthandDescription?: string | null;
              baseCountryTaxIdCode?: string | null;
              additionalTaxIdCode?: string | null;
              additionalGovIdCode?: string | null;
              bankingId1?: string | null;
              bankingId2?: string | null;
              businessStart?: string | null;
              managementCode?: string | null;
              companiesHouseIdCode?: string | null;
              shareCapital?: number | null;
              interGroupSignature?: string | null;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              companyGroupParent?: {
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
          | {
              __typename: 'PhysicalSubject';
              firstName?: string | null;
              lastName?: string | null;
              birthCountryTaxIdCode?: string | null;
              professionalTaxIdCode?: string | null;
              birthDate?: string | null;
              birthSex?: Types.BirthSex | null;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              birthLocation?: {
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
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
          | null;
        originalSubjects: Array<
          | {
              __typename: 'LegalSubject';
              fullName: string;
              shorthandDescription?: string | null;
              baseCountryTaxIdCode?: string | null;
              additionalTaxIdCode?: string | null;
              additionalGovIdCode?: string | null;
              bankingId1?: string | null;
              bankingId2?: string | null;
              businessStart?: string | null;
              companiesHouseIdCode?: string | null;
              shareCapital?: number | null;
              interGroupSignature?: string | null;
              legalSubjectType: Types.LegalSubjectType;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              companyGroupParent?: {
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
          | {
              __typename: 'ManagementSubject';
              fullName: string;
              shorthandDescription?: string | null;
              baseCountryTaxIdCode?: string | null;
              additionalTaxIdCode?: string | null;
              additionalGovIdCode?: string | null;
              bankingId1?: string | null;
              bankingId2?: string | null;
              businessStart?: string | null;
              managementCode?: string | null;
              companiesHouseIdCode?: string | null;
              shareCapital?: number | null;
              interGroupSignature?: string | null;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              companyGroupParent?: {
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
          | {
              __typename: 'PhysicalSubject';
              firstName?: string | null;
              lastName?: string | null;
              birthCountryTaxIdCode?: string | null;
              professionalTaxIdCode?: string | null;
              birthDate?: string | null;
              birthSex?: Types.BirthSex | null;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              birthLocation?: {
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
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
        >;
        registrationOffice?: {
          __typename?: 'RegistrationOffice';
          id: number;
          description: string;
          externalCode: string;
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
        } | null;
      } | null;
      registrationPayments: Array<{
        __typename?: 'RegistrationPayment';
        paymentType: Types.RegistrationPaymentType;
        paymentYear: number;
        paymentCode: string;
        valueDate: string;
        taxAmount: number;
        sanctionAmount: number;
        totalAmount: number;
        id: number;
      }>;
      takeovers: Array<{
        __typename?: 'Takeover';
        originalSubjectId: number;
        newSubjectId: number;
        legalRepresentativeSubjectId?: number | null;
        takeoverDate: string;
        effectiveDate: string;
        type: Types.TakeoverType;
        id: number;
        originalSubject:
          | {
              __typename: 'LegalSubject';
              fullName: string;
              shorthandDescription?: string | null;
              baseCountryTaxIdCode?: string | null;
              additionalTaxIdCode?: string | null;
              additionalGovIdCode?: string | null;
              bankingId1?: string | null;
              bankingId2?: string | null;
              businessStart?: string | null;
              companiesHouseIdCode?: string | null;
              shareCapital?: number | null;
              interGroupSignature?: string | null;
              legalSubjectType: Types.LegalSubjectType;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              companyGroupParent?: {
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
          | {
              __typename: 'ManagementSubject';
              fullName: string;
              shorthandDescription?: string | null;
              baseCountryTaxIdCode?: string | null;
              additionalTaxIdCode?: string | null;
              additionalGovIdCode?: string | null;
              bankingId1?: string | null;
              bankingId2?: string | null;
              businessStart?: string | null;
              managementCode?: string | null;
              companiesHouseIdCode?: string | null;
              shareCapital?: number | null;
              interGroupSignature?: string | null;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              companyGroupParent?: {
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
          | {
              __typename: 'PhysicalSubject';
              firstName?: string | null;
              lastName?: string | null;
              birthCountryTaxIdCode?: string | null;
              professionalTaxIdCode?: string | null;
              birthDate?: string | null;
              birthSex?: Types.BirthSex | null;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              birthLocation?: {
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
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            };
        newSubject:
          | {
              __typename: 'LegalSubject';
              fullName: string;
              shorthandDescription?: string | null;
              baseCountryTaxIdCode?: string | null;
              additionalTaxIdCode?: string | null;
              additionalGovIdCode?: string | null;
              bankingId1?: string | null;
              bankingId2?: string | null;
              businessStart?: string | null;
              companiesHouseIdCode?: string | null;
              shareCapital?: number | null;
              interGroupSignature?: string | null;
              legalSubjectType: Types.LegalSubjectType;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              companyGroupParent?: {
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
          | {
              __typename: 'ManagementSubject';
              fullName: string;
              shorthandDescription?: string | null;
              baseCountryTaxIdCode?: string | null;
              additionalTaxIdCode?: string | null;
              additionalGovIdCode?: string | null;
              bankingId1?: string | null;
              bankingId2?: string | null;
              businessStart?: string | null;
              managementCode?: string | null;
              companiesHouseIdCode?: string | null;
              shareCapital?: number | null;
              interGroupSignature?: string | null;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              companyGroupParent?: {
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
          | {
              __typename: 'PhysicalSubject';
              firstName?: string | null;
              lastName?: string | null;
              birthCountryTaxIdCode?: string | null;
              professionalTaxIdCode?: string | null;
              birthDate?: string | null;
              birthSex?: Types.BirthSex | null;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              birthLocation?: {
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
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            };
        legalRepresentativeSubject?:
          | {
              __typename: 'LegalSubject';
              fullName: string;
              shorthandDescription?: string | null;
              baseCountryTaxIdCode?: string | null;
              additionalTaxIdCode?: string | null;
              additionalGovIdCode?: string | null;
              bankingId1?: string | null;
              bankingId2?: string | null;
              businessStart?: string | null;
              companiesHouseIdCode?: string | null;
              shareCapital?: number | null;
              interGroupSignature?: string | null;
              legalSubjectType: Types.LegalSubjectType;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              companyGroupParent?: {
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
          | {
              __typename: 'ManagementSubject';
              fullName: string;
              shorthandDescription?: string | null;
              baseCountryTaxIdCode?: string | null;
              additionalTaxIdCode?: string | null;
              additionalGovIdCode?: string | null;
              bankingId1?: string | null;
              bankingId2?: string | null;
              businessStart?: string | null;
              managementCode?: string | null;
              companiesHouseIdCode?: string | null;
              shareCapital?: number | null;
              interGroupSignature?: string | null;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              companyGroupParent?: {
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
          | {
              __typename: 'PhysicalSubject';
              firstName?: string | null;
              lastName?: string | null;
              birthCountryTaxIdCode?: string | null;
              professionalTaxIdCode?: string | null;
              birthDate?: string | null;
              birthSex?: Types.BirthSex | null;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              birthLocation?: {
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
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
          | null;
      }>;
      revaluationData?: {
        __typename?: 'Revaluation';
        baseRevaluationRate?: number | null;
        isAbsoluteRevaluationApplied: boolean;
        isBackHistoryEnabled: boolean;
        isRevaluationCalculated: boolean;
        nextApplicationDate: string;
        rateType: Types.RevaluationRateType;
        referencePeriodEnd: string;
        referencePeriodStart: string;
        revaluationPeriodMonths: number;
        revaluationSharePercent: number;
      } | null;
      revaluationHistories: Array<{
        __typename?: 'RevaluationHistory';
        since: string;
        baseYearlyRate: number;
        indexPercent: number;
        revaluationAmount: number;
        yearlyRateWithRevaluation: number;
        id: number;
      }>;
      locatedUnits: Array<{
        __typename?: 'LocatedUnit';
        id: number;
        isMainUnit: boolean;
        isPartialLocation: boolean;
        isRegistryUpdateEnabled: boolean;
        surfaceSqM?: number | null;
        estateSubUnit?: {
          __typename?: 'EstateSubUnit';
          internalCode: string;
          occupantType?: Types.OccupantType | null;
          occupancyPercent?: number | null;
          notes?: string | null;
          since?: string | null;
          until?: string | null;
          surfaceSqM?: number | null;
          id: number;
          occupantSubject?:
            | { __typename?: 'LegalSubject'; name: string; id: number }
            | { __typename?: 'ManagementSubject'; name: string; id: number }
            | { __typename?: 'PhysicalSubject'; name: string; id: number }
            | null;
          orgUnit?: { __typename?: 'OrgUnit'; id: number; name?: string | null } | null;
          usageType?: {
            __typename?: 'EstateUsageType';
            id: number;
            name: string;
            internalCode: string;
            ordering: number;
            isForEstate: boolean;
            isForEstateUnit: boolean;
            isForEstateSubUnit: boolean;
            isForContracts: boolean;
          } | null;
          estateUnit: {
            __typename?: 'EstateUnit';
            id: number;
            name?: string | null;
            type: Types.EstateUnitType;
            address: {
              __typename?: 'AsstAddress';
              id: number;
              addressType: Types.AsstAddressType;
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
              locationLatLon?: { __typename?: 'GeoJSONPointType'; coordinates?: Array<number> | null } | null;
            };
            currentCadastralUnit?: {
              __typename?: 'CadastralUnit';
              id: number;
              isAncillaryUnit: boolean;
              isCadastralRegistrationInProgress: boolean;
            } | null;
          };
        } | null;
        estateUnit: {
          __typename?: 'EstateUnit';
          id: number;
          name?: string | null;
          internalCode: string;
          externalCode?: string | null;
          type: Types.EstateUnitType;
          status: Types.EstateUnitStatus;
          disusedDate?: string | null;
          ownershipType: Types.EstateUnitOwnershipType;
          ownershipStartDate: string;
          ownershipEndDate?: string | null;
          ownershipPercent?: number | null;
          subNumbering?: string | null;
          sharedArea: boolean;
          notes?: string | null;
          netSurface?: number | null;
          grossSurface?: number | null;
          usageType: {
            __typename?: 'EstateUsageType';
            id: number;
            name: string;
            internalCode: string;
            ordering: number;
            isForEstate: boolean;
            isForEstateUnit: boolean;
            isForEstateSubUnit: boolean;
            isForContracts: boolean;
          };
          address: {
            __typename?: 'AsstAddress';
            id: number;
            addressType: Types.AsstAddressType;
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
            locationLatLon?: { __typename?: 'GeoJSONPointType'; coordinates?: Array<number> | null } | null;
          };
          estate: {
            __typename?: 'Estate';
            id: number;
            internalCode: string;
            name?: string | null;
            type: Types.EstateType;
            externalCode?: string | null;
            surfaceAreaSqM?: number | null;
            ownership: Types.EstateOwnership;
            buildYear?: number | null;
            status: Types.EstateStatus;
            notes?: string | null;
            managementSubject:
              | { __typename?: 'LegalSubject'; id: number; name: string }
              | { __typename?: 'ManagementSubject'; id: number; name: string }
              | { __typename?: 'PhysicalSubject'; id: number; name: string };
            addresses: Array<{
              __typename?: 'AsstAddress';
              id: number;
              addressType: Types.AsstAddressType;
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
              locationLatLon?: { __typename?: 'GeoJSONPointType'; coordinates?: Array<number> | null } | null;
            }>;
            estateUnits: Array<{ __typename?: 'EstateUnit'; id: number }>;
            floors: Array<{
              __typename?: 'Floor';
              id: number;
              name: string;
              position: number;
              templateReference: string;
            }>;
            mainUsageType: { __typename?: 'EstateMainUsageType'; id: number; name: string };
            usageType: { __typename?: 'EstateUsageType'; id: number; name: string };
            managementOrgUnit?: { __typename?: 'OrgUnit'; id: number; name?: string | null } | null;
            stairs: Array<{ __typename?: 'Stair'; id: number; description: string }>;
          };
          floors: Array<{
            __typename?: 'Floor';
            id: number;
            name: string;
            position: number;
            templateReference: string;
          }>;
          stair?: { __typename?: 'Stair'; id: number; description: string } | null;
          officialAct?: {
            __typename?: 'OfficialAct';
            id: number;
            protocolNumber: string;
            registrationNumber?: string | null;
            registrationDate?: string | null;
            issuerName?: string | null;
            actRegistrationFields: Array<{
              __typename?: 'ActRegistrationField';
              fieldType: Types.RegistrationFieldType;
              value?: string | null;
              id: number;
            }>;
            actRegistrationDates: Array<{
              __typename?: 'ActRegistrationDate';
              dateType: Types.RegistrationDateType;
              value: string;
              id: number;
            }>;
          } | null;
          lastRepossession?: {
            __typename?: 'Repossession';
            notes?: string | null;
            eventDate?: string | null;
            eventType?: Types.RepossessionType | null;
            eventReason?: Types.RepossessionReason | null;
            unitStatus?: Types.UnitCondition | null;
            isAssignable?: boolean | null;
            isKeysReturned?: boolean | null;
            isWithValuables?: boolean | null;
            id: number;
          } | null;
          surfacesTree: Array<{
            __typename?: 'EstateUnitSurfaceSummary';
            surfaceId?: number | null;
            metric: Types.SurfaceMeasurementMetric;
            surfaceSqMTotal?: number | null;
            surfaceSqMCommonArea?: number | null;
            surfaceSqMSideArea?: number | null;
            floors: Array<{
              __typename?: 'EstateUnitSurfaceSummaryFloor';
              surfaceId?: number | null;
              surfaceSqMTotal?: number | null;
              surfaceSqMCommonArea?: number | null;
              surfaceSqMSideArea?: number | null;
              floor: {
                __typename?: 'EstateUnitSurfaceSummaryFloorSummary';
                id?: number | null;
                name?: string | null;
                position: number;
                templateReference?: string | null;
              };
              functionAreas: Array<{
                __typename?: 'EstateUnitSurfaceSummaryFunctionArea';
                surfaceId?: number | null;
                surfaceSqMTotal?: number | null;
                surfaceSqMCommonArea?: number | null;
                surfaceSqMSideArea?: number | null;
                functionArea: {
                  __typename?: 'EstateUnitSurfaceSummaryFunctionAreaSummary';
                  id?: number | null;
                  name?: string | null;
                  surfaceType: Types.SurfaceType;
                };
              }>;
            }>;
          }>;
          currentCadastralUnit?: {
            __typename?: 'CadastralUnit';
            internalCode: string;
            type: Types.EstateUnitType;
            status: Types.CadastralUnitStatus;
            since?: string | null;
            until?: string | null;
            lastRelevantChangeDate?: string | null;
            cadastralNotes?: string | null;
            fiscalNotes?: string | null;
            consortiumNotes?: string | null;
            isCadastralRegistrationInProgress: boolean;
            isAncillaryUnit: boolean;
            id: number;
            address: {
              __typename?: 'AsstAddress';
              id: number;
              addressType: Types.AsstAddressType;
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
              locationLatLon?: { __typename?: 'GeoJSONPointType'; coordinates?: Array<number> | null } | null;
            };
            coordinates: Array<{
              __typename?: 'CadastralCoordinates';
              coordinateType: Types.CoordinateType;
              unmanagedOverride?: string | null;
              level1?: string | null;
              level2?: string | null;
              level3?: string | null;
              level4?: string | null;
              level5?: string | null;
              itTavPartita?: string | null;
              itTavCorpo?: string | null;
              itTavPorzione?: string | null;
              hasITTavData: boolean;
              notes?: string | null;
              id: number;
            }>;
            unavailabilities: Array<{
              __typename?: 'CadastralUnavailability';
              since?: string | null;
              until?: string | null;
              notes?: string | null;
              id: number;
            }>;
            inspection?: {
              __typename?: 'CadastralUnitInspection';
              date?: string | null;
              protocolDate?: string | null;
              protocolNumber?: string | null;
              heading?: string | null;
              macroZone?: string | null;
              microZone?: string | null;
              isHistoricalEstate: boolean;
              isDirectRestriction: boolean;
            } | null;
            income: {
              __typename?: 'CadastralUnitIncome';
              macroCategory?: string | null;
              microCategory?: string | null;
              metric?: Types.IncomeMetric | null;
              metricAmount?: number | null;
              metricRentedAmount?: number | null;
              registeredSurface?: number | null;
              type?: Types.IncomeType | null;
              cadastralAmount?: number | null;
              farmAmount?: number | null;
              landAmount?: number | null;
              marketValue?: number | null;
              cadastralCategory?: {
                __typename?: 'CadastralCategory';
                id: number;
                description: string;
                externalCode?: string | null;
              } | null;
              cadastralLandCategory?: {
                __typename?: 'CadastralLandCategory';
                id: number;
                description: string;
                internalCode: string;
                countryISO: string;
                ordering: number;
              } | null;
            };
          } | null;
        };
      }>;
      counterparts: Array<{
        __typename?: 'Counterpart';
        id: number;
        contractSharePercent: number;
        type: Types.CounterpartType;
        isMainCounterpart: boolean;
        since: string;
        until?: string | null;
        subject:
          | {
              __typename: 'LegalSubject';
              fullName: string;
              shorthandDescription?: string | null;
              baseCountryTaxIdCode?: string | null;
              additionalTaxIdCode?: string | null;
              additionalGovIdCode?: string | null;
              bankingId1?: string | null;
              bankingId2?: string | null;
              businessStart?: string | null;
              companiesHouseIdCode?: string | null;
              shareCapital?: number | null;
              interGroupSignature?: string | null;
              legalSubjectType: Types.LegalSubjectType;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              companyGroupParent?: {
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
          | {
              __typename: 'ManagementSubject';
              fullName: string;
              shorthandDescription?: string | null;
              baseCountryTaxIdCode?: string | null;
              additionalTaxIdCode?: string | null;
              additionalGovIdCode?: string | null;
              bankingId1?: string | null;
              bankingId2?: string | null;
              businessStart?: string | null;
              managementCode?: string | null;
              companiesHouseIdCode?: string | null;
              shareCapital?: number | null;
              interGroupSignature?: string | null;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              companyGroupParent?: {
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
          | {
              __typename: 'PhysicalSubject';
              firstName?: string | null;
              lastName?: string | null;
              birthCountryTaxIdCode?: string | null;
              professionalTaxIdCode?: string | null;
              birthDate?: string | null;
              birthSex?: Types.BirthSex | null;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              birthLocation?: {
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
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            };
      }>;
      transactors: Array<{
        __typename?: 'Transactor';
        id: number;
        addressId: number;
        invoiceAddressId: number;
        isInvoiced: boolean;
        since: string;
        transactionSharePercent: number;
        type: Types.PaymentType;
        until?: string | null;
        subject:
          | {
              __typename: 'LegalSubject';
              fullName: string;
              shorthandDescription?: string | null;
              baseCountryTaxIdCode?: string | null;
              additionalTaxIdCode?: string | null;
              additionalGovIdCode?: string | null;
              bankingId1?: string | null;
              bankingId2?: string | null;
              businessStart?: string | null;
              companiesHouseIdCode?: string | null;
              shareCapital?: number | null;
              interGroupSignature?: string | null;
              legalSubjectType: Types.LegalSubjectType;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              companyGroupParent?: {
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
          | {
              __typename: 'ManagementSubject';
              fullName: string;
              shorthandDescription?: string | null;
              baseCountryTaxIdCode?: string | null;
              additionalTaxIdCode?: string | null;
              additionalGovIdCode?: string | null;
              bankingId1?: string | null;
              bankingId2?: string | null;
              businessStart?: string | null;
              managementCode?: string | null;
              companiesHouseIdCode?: string | null;
              shareCapital?: number | null;
              interGroupSignature?: string | null;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              companyGroupParent?: {
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
          | {
              __typename: 'PhysicalSubject';
              firstName?: string | null;
              lastName?: string | null;
              birthCountryTaxIdCode?: string | null;
              professionalTaxIdCode?: string | null;
              birthDate?: string | null;
              birthSex?: Types.BirthSex | null;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              birthLocation?: {
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
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            };
      }>;
      securityDeposits: Array<{
        __typename?: 'SecurityDeposit';
        id: number;
        bankAccountId?: number | null;
        baseAmount: number;
        interestCalculationStartDate?: string | null;
        isInterestCalculated: boolean;
        isSuretyRenewable: boolean;
        notes?: string | null;
        type: Types.SecurityDepositType;
        since?: string | null;
        takeoverDate?: string | null;
        until?: string | null;
        subject?:
          | {
              __typename: 'LegalSubject';
              fullName: string;
              shorthandDescription?: string | null;
              baseCountryTaxIdCode?: string | null;
              additionalTaxIdCode?: string | null;
              additionalGovIdCode?: string | null;
              bankingId1?: string | null;
              bankingId2?: string | null;
              businessStart?: string | null;
              companiesHouseIdCode?: string | null;
              shareCapital?: number | null;
              interGroupSignature?: string | null;
              legalSubjectType: Types.LegalSubjectType;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              companyGroupParent?: {
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
          | {
              __typename: 'ManagementSubject';
              fullName: string;
              shorthandDescription?: string | null;
              baseCountryTaxIdCode?: string | null;
              additionalTaxIdCode?: string | null;
              additionalGovIdCode?: string | null;
              bankingId1?: string | null;
              bankingId2?: string | null;
              businessStart?: string | null;
              managementCode?: string | null;
              companiesHouseIdCode?: string | null;
              shareCapital?: number | null;
              interGroupSignature?: string | null;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              companyGroupParent?: {
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
          | {
              __typename: 'PhysicalSubject';
              firstName?: string | null;
              lastName?: string | null;
              birthCountryTaxIdCode?: string | null;
              professionalTaxIdCode?: string | null;
              birthDate?: string | null;
              birthSex?: Types.BirthSex | null;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              birthLocation?: {
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
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
          | null;
        suretySubject?:
          | {
              __typename: 'LegalSubject';
              fullName: string;
              shorthandDescription?: string | null;
              baseCountryTaxIdCode?: string | null;
              additionalTaxIdCode?: string | null;
              additionalGovIdCode?: string | null;
              bankingId1?: string | null;
              bankingId2?: string | null;
              businessStart?: string | null;
              companiesHouseIdCode?: string | null;
              shareCapital?: number | null;
              interGroupSignature?: string | null;
              legalSubjectType: Types.LegalSubjectType;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              companyGroupParent?: {
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
          | {
              __typename: 'ManagementSubject';
              fullName: string;
              shorthandDescription?: string | null;
              baseCountryTaxIdCode?: string | null;
              additionalTaxIdCode?: string | null;
              additionalGovIdCode?: string | null;
              bankingId1?: string | null;
              bankingId2?: string | null;
              businessStart?: string | null;
              managementCode?: string | null;
              companiesHouseIdCode?: string | null;
              shareCapital?: number | null;
              interGroupSignature?: string | null;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              companyGroupParent?: {
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
          | {
              __typename: 'PhysicalSubject';
              firstName?: string | null;
              lastName?: string | null;
              birthCountryTaxIdCode?: string | null;
              professionalTaxIdCode?: string | null;
              birthDate?: string | null;
              birthSex?: Types.BirthSex | null;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              birthLocation?: {
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
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
          | null;
        interestRows: Array<{
          __typename?: 'SecurityDepositInterestRow';
          since?: string | null;
          until?: string | null;
          baseAmount: number;
          calculationDate: string;
          interestAmount: number;
          appliedInterestRate: number;
          id: number;
        }>;
      }>;
      oneshotAdditions: Array<{
        __typename?: 'OneshotAddition';
        startDate: string;
        isRentalRateVariation: boolean;
        amount: number;
        installments?: number | null;
        isBoundToTermDay: boolean;
        termStartDate?: string | null;
        termEndDate?: string | null;
        notes?: string | null;
        id: number;
        vatRate: {
          __typename?: 'VATRate';
          id: number;
          internalCode: string;
          description: string;
          type: Types.VatRateType;
          ratePercent: number;
        };
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
        accountingItem: {
          __typename?: 'AccountingItem';
          id: number;
          description: string;
          internalCode: string;
          externalCode: string;
        };
      }>;
      recurringAdditions: Array<{
        __typename?: 'RecurringAddition';
        amountPerInstallment: number;
        excludeStartMonth?: number | null;
        excludeEndMonth?: number | null;
        notes?: string | null;
        id: number;
        vatRate: {
          __typename?: 'VATRate';
          id: number;
          internalCode: string;
          description: string;
          type: Types.VatRateType;
          ratePercent: number;
        };
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
        accountingItem: {
          __typename?: 'AccountingItem';
          id: number;
          description: string;
          internalCode: string;
          externalCode: string;
        };
      }>;
      ratePlans: Array<{
        __typename?: 'RatePlan';
        id: number;
        since: string;
        newYearlyRate: number;
        isDeclarationExpected: boolean;
        isDeclared: boolean;
      }>;
      sublocatedContract?: {
        __typename?: 'Contract';
        internalCode: string;
        externalCode?: string | null;
        status: Types.EntryStatus;
        reason: Types.Reason;
        agreementDate: string;
        effectStartDate: string;
        lastRenewalStartDate: string;
        firstTermDurationMonths?: number | null;
        secondTermDurationMonths?: number | null;
        firstTermExpirationDate?: string | null;
        secondTermExpirationDate?: string | null;
        anytimeTerminationWarningMonths?: number | null;
        nonRenewalWarningMonths?: number | null;
        terminationDate?: string | null;
        terminator?: Types.ContractTerminator | null;
        id: number;
        managementSubject:
          | { __typename?: 'LegalSubject'; name: string }
          | { __typename?: 'ManagementSubject'; name: string }
          | { __typename?: 'PhysicalSubject'; name: string };
        type: { __typename?: 'ContractType'; description: string };
      } | null;
    }>;
  };
};

export type GetContractQueryVariables = Types.Exact<{
  contractId: Types.Scalars['Int']['input'];
}>;

export type GetContractQuery = {
  __typename?: 'Query';
  contract: {
    __typename?: 'ContractQueries';
    contract?: {
      __typename?: 'Contract';
      status: Types.EntryStatus;
      internalCode: string;
      externalCode?: string | null;
      previousCode?: string | null;
      reason: Types.Reason;
      agreementDate: string;
      effectStartDate: string;
      lastRenewalStartDate: string;
      firstTermDurationMonths?: number | null;
      secondTermDurationMonths?: number | null;
      firstTermExpirationDate?: string | null;
      secondTermExpirationDate?: string | null;
      anytimeTerminationWarningMonths?: number | null;
      nonRenewalWarningMonths?: number | null;
      terminationDate?: string | null;
      terminator?: Types.ContractTerminator | null;
      billingStartDate: string;
      billingEndDate?: string | null;
      billingAfterTerm: boolean;
      recoverBillsAfterSuspension: boolean;
      billingAlignedToCalendarYear: boolean;
      billingAppliesBaseFee: boolean;
      billingBaseFee?: number | null;
      billingVATRateType?: Types.VatRateType | null;
      billingPeriod?: Types.BillingPeriod | null;
      billingWithSplitPayment: boolean;
      billingWithStampTax?: Types.AutomaticBoolean | null;
      notes?: string | null;
      billingNotes?: string | null;
      isReleased: boolean;
      releaseDate?: string | null;
      releaseReason?: Types.ReleaseReason | null;
      isOccupiedWithoutRight?: boolean | null;
      id: number;
      managementSubject:
        | {
            __typename: 'LegalSubject';
            fullName: string;
            shorthandDescription?: string | null;
            baseCountryTaxIdCode?: string | null;
            additionalTaxIdCode?: string | null;
            additionalGovIdCode?: string | null;
            bankingId1?: string | null;
            bankingId2?: string | null;
            businessStart?: string | null;
            companiesHouseIdCode?: string | null;
            shareCapital?: number | null;
            interGroupSignature?: string | null;
            legalSubjectType: Types.LegalSubjectType;
            name: string;
            id: number;
            personType: Types.PersonType;
            internalCode: string;
            externalSourceCode?: string | null;
            entryStatus: Types.EntryStatus;
            closureDate?: string | null;
            companyGroupParent?: {
              __typename?: 'SubjectRelation';
              since?: string | null;
              until?: string | null;
              groupRelationType?: Types.CompanyGroup | null;
              officerRelationType?: Types.OfficerType | null;
              relationType: Types.SubjectRelationType;
              id: number;
              main:
                | { __typename?: 'LegalSubject'; name: string; id: number }
                | { __typename?: 'ManagementSubject'; name: string; id: number }
                | { __typename?: 'PhysicalSubject'; name: string; id: number };
              subordinate:
                | { __typename?: 'LegalSubject'; name: string; id: number }
                | { __typename?: 'ManagementSubject'; name: string; id: number }
                | { __typename?: 'PhysicalSubject'; name: string; id: number };
            } | null;
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
            bankAccounts: Array<{
              __typename?: 'BankAccount';
              bankAccountType: Types.BankAccountType;
              referenceCode?: string | null;
              referenceCodeType: Types.BankAccountCodeType;
              notes?: string | null;
              accountHolder?: string | null;
              id: number;
            }>;
            contacts: Array<{
              __typename?: 'Contact';
              id: number;
              contactInfo?: string | null;
              contactInfoType: Types.ContactInfoType;
              contactType: Types.ContactType;
            }>;
            categories: Array<{
              __typename?: 'SubjectCategory';
              name: string;
              id: number;
              function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
            }>;
            heirs: Array<{
              __typename?: 'SubjectRelation';
              since?: string | null;
              until?: string | null;
              groupRelationType?: Types.CompanyGroup | null;
              officerRelationType?: Types.OfficerType | null;
              relationType: Types.SubjectRelationType;
              id: number;
              main:
                | { __typename?: 'LegalSubject'; name: string; id: number }
                | { __typename?: 'ManagementSubject'; name: string; id: number }
                | { __typename?: 'PhysicalSubject'; name: string; id: number };
              subordinate:
                | { __typename?: 'LegalSubject'; name: string; id: number }
                | { __typename?: 'ManagementSubject'; name: string; id: number }
                | { __typename?: 'PhysicalSubject'; name: string; id: number };
            }>;
            officers: Array<{
              __typename?: 'SubjectRelation';
              since?: string | null;
              until?: string | null;
              groupRelationType?: Types.CompanyGroup | null;
              officerRelationType?: Types.OfficerType | null;
              relationType: Types.SubjectRelationType;
              id: number;
              main:
                | { __typename?: 'LegalSubject'; name: string; id: number }
                | { __typename?: 'ManagementSubject'; name: string; id: number }
                | { __typename?: 'PhysicalSubject'; name: string; id: number };
              subordinate:
                | { __typename?: 'LegalSubject'; name: string; id: number }
                | { __typename?: 'ManagementSubject'; name: string; id: number }
                | { __typename?: 'PhysicalSubject'; name: string; id: number };
            }>;
            owningMgmtSubjects: Array<{
              __typename?: 'SubjectRelation';
              since?: string | null;
              until?: string | null;
              groupRelationType?: Types.CompanyGroup | null;
              officerRelationType?: Types.OfficerType | null;
              relationType: Types.SubjectRelationType;
              id: number;
              main:
                | { __typename?: 'LegalSubject'; name: string; id: number }
                | { __typename?: 'ManagementSubject'; name: string; id: number }
                | { __typename?: 'PhysicalSubject'; name: string; id: number };
              subordinate:
                | { __typename?: 'LegalSubject'; name: string; id: number }
                | { __typename?: 'ManagementSubject'; name: string; id: number }
                | { __typename?: 'PhysicalSubject'; name: string; id: number };
            }>;
            taxStatuses: Array<{
              __typename?: 'TaxStatus';
              taxStatusType: Types.TaxStatusType;
              since?: string | null;
              until?: string | null;
              id: number;
            }>;
          }
        | {
            __typename: 'ManagementSubject';
            fullName: string;
            shorthandDescription?: string | null;
            baseCountryTaxIdCode?: string | null;
            additionalTaxIdCode?: string | null;
            additionalGovIdCode?: string | null;
            bankingId1?: string | null;
            bankingId2?: string | null;
            businessStart?: string | null;
            managementCode?: string | null;
            companiesHouseIdCode?: string | null;
            shareCapital?: number | null;
            interGroupSignature?: string | null;
            name: string;
            id: number;
            personType: Types.PersonType;
            internalCode: string;
            externalSourceCode?: string | null;
            entryStatus: Types.EntryStatus;
            closureDate?: string | null;
            companyGroupParent?: {
              __typename?: 'SubjectRelation';
              since?: string | null;
              until?: string | null;
              groupRelationType?: Types.CompanyGroup | null;
              officerRelationType?: Types.OfficerType | null;
              relationType: Types.SubjectRelationType;
              id: number;
              main:
                | { __typename?: 'LegalSubject'; name: string; id: number }
                | { __typename?: 'ManagementSubject'; name: string; id: number }
                | { __typename?: 'PhysicalSubject'; name: string; id: number };
              subordinate:
                | { __typename?: 'LegalSubject'; name: string; id: number }
                | { __typename?: 'ManagementSubject'; name: string; id: number }
                | { __typename?: 'PhysicalSubject'; name: string; id: number };
            } | null;
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
            bankAccounts: Array<{
              __typename?: 'BankAccount';
              bankAccountType: Types.BankAccountType;
              referenceCode?: string | null;
              referenceCodeType: Types.BankAccountCodeType;
              notes?: string | null;
              accountHolder?: string | null;
              id: number;
            }>;
            contacts: Array<{
              __typename?: 'Contact';
              id: number;
              contactInfo?: string | null;
              contactInfoType: Types.ContactInfoType;
              contactType: Types.ContactType;
            }>;
            categories: Array<{
              __typename?: 'SubjectCategory';
              name: string;
              id: number;
              function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
            }>;
            heirs: Array<{
              __typename?: 'SubjectRelation';
              since?: string | null;
              until?: string | null;
              groupRelationType?: Types.CompanyGroup | null;
              officerRelationType?: Types.OfficerType | null;
              relationType: Types.SubjectRelationType;
              id: number;
              main:
                | { __typename?: 'LegalSubject'; name: string; id: number }
                | { __typename?: 'ManagementSubject'; name: string; id: number }
                | { __typename?: 'PhysicalSubject'; name: string; id: number };
              subordinate:
                | { __typename?: 'LegalSubject'; name: string; id: number }
                | { __typename?: 'ManagementSubject'; name: string; id: number }
                | { __typename?: 'PhysicalSubject'; name: string; id: number };
            }>;
            officers: Array<{
              __typename?: 'SubjectRelation';
              since?: string | null;
              until?: string | null;
              groupRelationType?: Types.CompanyGroup | null;
              officerRelationType?: Types.OfficerType | null;
              relationType: Types.SubjectRelationType;
              id: number;
              main:
                | { __typename?: 'LegalSubject'; name: string; id: number }
                | { __typename?: 'ManagementSubject'; name: string; id: number }
                | { __typename?: 'PhysicalSubject'; name: string; id: number };
              subordinate:
                | { __typename?: 'LegalSubject'; name: string; id: number }
                | { __typename?: 'ManagementSubject'; name: string; id: number }
                | { __typename?: 'PhysicalSubject'; name: string; id: number };
            }>;
            owningMgmtSubjects: Array<{
              __typename?: 'SubjectRelation';
              since?: string | null;
              until?: string | null;
              groupRelationType?: Types.CompanyGroup | null;
              officerRelationType?: Types.OfficerType | null;
              relationType: Types.SubjectRelationType;
              id: number;
              main:
                | { __typename?: 'LegalSubject'; name: string; id: number }
                | { __typename?: 'ManagementSubject'; name: string; id: number }
                | { __typename?: 'PhysicalSubject'; name: string; id: number };
              subordinate:
                | { __typename?: 'LegalSubject'; name: string; id: number }
                | { __typename?: 'ManagementSubject'; name: string; id: number }
                | { __typename?: 'PhysicalSubject'; name: string; id: number };
            }>;
            taxStatuses: Array<{
              __typename?: 'TaxStatus';
              taxStatusType: Types.TaxStatusType;
              since?: string | null;
              until?: string | null;
              id: number;
            }>;
          }
        | {
            __typename: 'PhysicalSubject';
            firstName?: string | null;
            lastName?: string | null;
            birthCountryTaxIdCode?: string | null;
            professionalTaxIdCode?: string | null;
            birthDate?: string | null;
            birthSex?: Types.BirthSex | null;
            name: string;
            id: number;
            personType: Types.PersonType;
            internalCode: string;
            externalSourceCode?: string | null;
            entryStatus: Types.EntryStatus;
            closureDate?: string | null;
            birthLocation?: {
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
            } | null;
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
            bankAccounts: Array<{
              __typename?: 'BankAccount';
              bankAccountType: Types.BankAccountType;
              referenceCode?: string | null;
              referenceCodeType: Types.BankAccountCodeType;
              notes?: string | null;
              accountHolder?: string | null;
              id: number;
            }>;
            contacts: Array<{
              __typename?: 'Contact';
              id: number;
              contactInfo?: string | null;
              contactInfoType: Types.ContactInfoType;
              contactType: Types.ContactType;
            }>;
            categories: Array<{
              __typename?: 'SubjectCategory';
              name: string;
              id: number;
              function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
            }>;
            heirs: Array<{
              __typename?: 'SubjectRelation';
              since?: string | null;
              until?: string | null;
              groupRelationType?: Types.CompanyGroup | null;
              officerRelationType?: Types.OfficerType | null;
              relationType: Types.SubjectRelationType;
              id: number;
              main:
                | { __typename?: 'LegalSubject'; name: string; id: number }
                | { __typename?: 'ManagementSubject'; name: string; id: number }
                | { __typename?: 'PhysicalSubject'; name: string; id: number };
              subordinate:
                | { __typename?: 'LegalSubject'; name: string; id: number }
                | { __typename?: 'ManagementSubject'; name: string; id: number }
                | { __typename?: 'PhysicalSubject'; name: string; id: number };
            }>;
            officers: Array<{
              __typename?: 'SubjectRelation';
              since?: string | null;
              until?: string | null;
              groupRelationType?: Types.CompanyGroup | null;
              officerRelationType?: Types.OfficerType | null;
              relationType: Types.SubjectRelationType;
              id: number;
              main:
                | { __typename?: 'LegalSubject'; name: string; id: number }
                | { __typename?: 'ManagementSubject'; name: string; id: number }
                | { __typename?: 'PhysicalSubject'; name: string; id: number };
              subordinate:
                | { __typename?: 'LegalSubject'; name: string; id: number }
                | { __typename?: 'ManagementSubject'; name: string; id: number }
                | { __typename?: 'PhysicalSubject'; name: string; id: number };
            }>;
            owningMgmtSubjects: Array<{
              __typename?: 'SubjectRelation';
              since?: string | null;
              until?: string | null;
              groupRelationType?: Types.CompanyGroup | null;
              officerRelationType?: Types.OfficerType | null;
              relationType: Types.SubjectRelationType;
              id: number;
              main:
                | { __typename?: 'LegalSubject'; name: string; id: number }
                | { __typename?: 'ManagementSubject'; name: string; id: number }
                | { __typename?: 'PhysicalSubject'; name: string; id: number };
              subordinate:
                | { __typename?: 'LegalSubject'; name: string; id: number }
                | { __typename?: 'ManagementSubject'; name: string; id: number }
                | { __typename?: 'PhysicalSubject'; name: string; id: number };
            }>;
            taxStatuses: Array<{
              __typename?: 'TaxStatus';
              taxStatusType: Types.TaxStatusType;
              since?: string | null;
              until?: string | null;
              id: number;
            }>;
          };
      type: {
        __typename?: 'ContractType';
        id: number;
        internalCode: string;
        description: string;
        isActive: boolean;
        isRentChargeApplicable: boolean;
        nature: Types.AssetNature;
        usageTypeId: number;
        isRegistrationTax: boolean;
        isStampTax: boolean;
        registrationTaxIncomeType?: Types.RegistrationTaxIncomeTypeRli | null;
        registrationTaxPercent?: number | null;
        registrationTaxTenantPercent?: number | null;
        isRevaluationApplicable: boolean;
        isAbsoluteRevaluation: boolean;
        revaluationRatePercent?: number | null;
        revaluationIndexMonth?: number | null;
        revaluationCalculationMonth?: number | null;
        usageType: {
          __typename?: 'EstateUsageType';
          id: number;
          name: string;
          internalCode: string;
          ordering: number;
          isForEstate: boolean;
          isForEstateUnit: boolean;
          isForEstateSubUnit: boolean;
          isForContracts: boolean;
        };
      };
      billingBaseFeeBillItemType?: {
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
      } | null;
      billingPauses: Array<{
        __typename?: 'BillingPause';
        since: string;
        until?: string | null;
        notes?: string | null;
        isRecoveryArrears?: boolean | null;
        id: number;
      }>;
      registrationTaxData?: {
        __typename?: 'RegistrationTax';
        contractRegistrationCode?: string | null;
        exemptions?: Types.RegistrationTaxExemption | null;
        firstOnlineRegistrationDate?: string | null;
        firstRegistrationDate?: string | null;
        firstRegistrationPeriod: Types.RegistrationTaxPeriod;
        incomeType?: Types.RegistrationTaxIncomeType | null;
        incomeTypeRLI?: Types.RegistrationTaxIncomeTypeRli | null;
        isAccountingManaged: boolean;
        isRLIModeEnabled: boolean;
        isTakeoverFromPreviousSubject: boolean;
        isVoluntarySanctionApplied: boolean;
        lastOnlinePaymentDate?: string | null;
        lastPaymentDate?: string | null;
        numberOfCopies: number;
        numberOfPages: number;
        paymentType: Types.RegistrationTaxPaymentType;
        registrationNumber?: string | null;
        registrationSerialNumber?: string | null;
        registrationYear?: number | null;
        specialCase?: Types.RegistrationTaxSpecialCase | null;
        takeoverDate?: string | null;
        takeoverType?: Types.TakeoverType | null;
        taxableRateRatioPercent: number;
        tenantShareOfStampTaxPercent: number;
        tenantTaxSharePercent: number;
        transferResolutionAmount?: number | null;
        legalRepresentativeSubject?:
          | {
              __typename: 'LegalSubject';
              fullName: string;
              shorthandDescription?: string | null;
              baseCountryTaxIdCode?: string | null;
              additionalTaxIdCode?: string | null;
              additionalGovIdCode?: string | null;
              bankingId1?: string | null;
              bankingId2?: string | null;
              businessStart?: string | null;
              companiesHouseIdCode?: string | null;
              shareCapital?: number | null;
              interGroupSignature?: string | null;
              legalSubjectType: Types.LegalSubjectType;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              companyGroupParent?: {
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
          | {
              __typename: 'ManagementSubject';
              fullName: string;
              shorthandDescription?: string | null;
              baseCountryTaxIdCode?: string | null;
              additionalTaxIdCode?: string | null;
              additionalGovIdCode?: string | null;
              bankingId1?: string | null;
              bankingId2?: string | null;
              businessStart?: string | null;
              managementCode?: string | null;
              companiesHouseIdCode?: string | null;
              shareCapital?: number | null;
              interGroupSignature?: string | null;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              companyGroupParent?: {
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
          | {
              __typename: 'PhysicalSubject';
              firstName?: string | null;
              lastName?: string | null;
              birthCountryTaxIdCode?: string | null;
              professionalTaxIdCode?: string | null;
              birthDate?: string | null;
              birthSex?: Types.BirthSex | null;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              birthLocation?: {
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
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
          | null;
        originalSubjects: Array<
          | {
              __typename: 'LegalSubject';
              fullName: string;
              shorthandDescription?: string | null;
              baseCountryTaxIdCode?: string | null;
              additionalTaxIdCode?: string | null;
              additionalGovIdCode?: string | null;
              bankingId1?: string | null;
              bankingId2?: string | null;
              businessStart?: string | null;
              companiesHouseIdCode?: string | null;
              shareCapital?: number | null;
              interGroupSignature?: string | null;
              legalSubjectType: Types.LegalSubjectType;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              companyGroupParent?: {
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
          | {
              __typename: 'ManagementSubject';
              fullName: string;
              shorthandDescription?: string | null;
              baseCountryTaxIdCode?: string | null;
              additionalTaxIdCode?: string | null;
              additionalGovIdCode?: string | null;
              bankingId1?: string | null;
              bankingId2?: string | null;
              businessStart?: string | null;
              managementCode?: string | null;
              companiesHouseIdCode?: string | null;
              shareCapital?: number | null;
              interGroupSignature?: string | null;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              companyGroupParent?: {
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
          | {
              __typename: 'PhysicalSubject';
              firstName?: string | null;
              lastName?: string | null;
              birthCountryTaxIdCode?: string | null;
              professionalTaxIdCode?: string | null;
              birthDate?: string | null;
              birthSex?: Types.BirthSex | null;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              birthLocation?: {
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
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
        >;
        registrationOffice?: {
          __typename?: 'RegistrationOffice';
          id: number;
          description: string;
          externalCode: string;
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
        } | null;
      } | null;
      registrationPayments: Array<{
        __typename?: 'RegistrationPayment';
        paymentType: Types.RegistrationPaymentType;
        paymentYear: number;
        paymentCode: string;
        valueDate: string;
        taxAmount: number;
        sanctionAmount: number;
        totalAmount: number;
        id: number;
      }>;
      takeovers: Array<{
        __typename?: 'Takeover';
        originalSubjectId: number;
        newSubjectId: number;
        legalRepresentativeSubjectId?: number | null;
        takeoverDate: string;
        effectiveDate: string;
        type: Types.TakeoverType;
        id: number;
        originalSubject:
          | {
              __typename: 'LegalSubject';
              fullName: string;
              shorthandDescription?: string | null;
              baseCountryTaxIdCode?: string | null;
              additionalTaxIdCode?: string | null;
              additionalGovIdCode?: string | null;
              bankingId1?: string | null;
              bankingId2?: string | null;
              businessStart?: string | null;
              companiesHouseIdCode?: string | null;
              shareCapital?: number | null;
              interGroupSignature?: string | null;
              legalSubjectType: Types.LegalSubjectType;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              companyGroupParent?: {
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
          | {
              __typename: 'ManagementSubject';
              fullName: string;
              shorthandDescription?: string | null;
              baseCountryTaxIdCode?: string | null;
              additionalTaxIdCode?: string | null;
              additionalGovIdCode?: string | null;
              bankingId1?: string | null;
              bankingId2?: string | null;
              businessStart?: string | null;
              managementCode?: string | null;
              companiesHouseIdCode?: string | null;
              shareCapital?: number | null;
              interGroupSignature?: string | null;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              companyGroupParent?: {
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
          | {
              __typename: 'PhysicalSubject';
              firstName?: string | null;
              lastName?: string | null;
              birthCountryTaxIdCode?: string | null;
              professionalTaxIdCode?: string | null;
              birthDate?: string | null;
              birthSex?: Types.BirthSex | null;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              birthLocation?: {
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
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            };
        newSubject:
          | {
              __typename: 'LegalSubject';
              fullName: string;
              shorthandDescription?: string | null;
              baseCountryTaxIdCode?: string | null;
              additionalTaxIdCode?: string | null;
              additionalGovIdCode?: string | null;
              bankingId1?: string | null;
              bankingId2?: string | null;
              businessStart?: string | null;
              companiesHouseIdCode?: string | null;
              shareCapital?: number | null;
              interGroupSignature?: string | null;
              legalSubjectType: Types.LegalSubjectType;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              companyGroupParent?: {
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
          | {
              __typename: 'ManagementSubject';
              fullName: string;
              shorthandDescription?: string | null;
              baseCountryTaxIdCode?: string | null;
              additionalTaxIdCode?: string | null;
              additionalGovIdCode?: string | null;
              bankingId1?: string | null;
              bankingId2?: string | null;
              businessStart?: string | null;
              managementCode?: string | null;
              companiesHouseIdCode?: string | null;
              shareCapital?: number | null;
              interGroupSignature?: string | null;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              companyGroupParent?: {
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
          | {
              __typename: 'PhysicalSubject';
              firstName?: string | null;
              lastName?: string | null;
              birthCountryTaxIdCode?: string | null;
              professionalTaxIdCode?: string | null;
              birthDate?: string | null;
              birthSex?: Types.BirthSex | null;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              birthLocation?: {
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
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            };
        legalRepresentativeSubject?:
          | {
              __typename: 'LegalSubject';
              fullName: string;
              shorthandDescription?: string | null;
              baseCountryTaxIdCode?: string | null;
              additionalTaxIdCode?: string | null;
              additionalGovIdCode?: string | null;
              bankingId1?: string | null;
              bankingId2?: string | null;
              businessStart?: string | null;
              companiesHouseIdCode?: string | null;
              shareCapital?: number | null;
              interGroupSignature?: string | null;
              legalSubjectType: Types.LegalSubjectType;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              companyGroupParent?: {
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
          | {
              __typename: 'ManagementSubject';
              fullName: string;
              shorthandDescription?: string | null;
              baseCountryTaxIdCode?: string | null;
              additionalTaxIdCode?: string | null;
              additionalGovIdCode?: string | null;
              bankingId1?: string | null;
              bankingId2?: string | null;
              businessStart?: string | null;
              managementCode?: string | null;
              companiesHouseIdCode?: string | null;
              shareCapital?: number | null;
              interGroupSignature?: string | null;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              companyGroupParent?: {
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
          | {
              __typename: 'PhysicalSubject';
              firstName?: string | null;
              lastName?: string | null;
              birthCountryTaxIdCode?: string | null;
              professionalTaxIdCode?: string | null;
              birthDate?: string | null;
              birthSex?: Types.BirthSex | null;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              birthLocation?: {
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
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
          | null;
      }>;
      revaluationData?: {
        __typename?: 'Revaluation';
        baseRevaluationRate?: number | null;
        isAbsoluteRevaluationApplied: boolean;
        isBackHistoryEnabled: boolean;
        isRevaluationCalculated: boolean;
        nextApplicationDate: string;
        rateType: Types.RevaluationRateType;
        referencePeriodEnd: string;
        referencePeriodStart: string;
        revaluationPeriodMonths: number;
        revaluationSharePercent: number;
      } | null;
      revaluationHistories: Array<{
        __typename?: 'RevaluationHistory';
        since: string;
        baseYearlyRate: number;
        indexPercent: number;
        revaluationAmount: number;
        yearlyRateWithRevaluation: number;
        id: number;
      }>;
      locatedUnits: Array<{
        __typename?: 'LocatedUnit';
        id: number;
        isMainUnit: boolean;
        isPartialLocation: boolean;
        isRegistryUpdateEnabled: boolean;
        surfaceSqM?: number | null;
        estateSubUnit?: {
          __typename?: 'EstateSubUnit';
          internalCode: string;
          occupantType?: Types.OccupantType | null;
          occupancyPercent?: number | null;
          notes?: string | null;
          since?: string | null;
          until?: string | null;
          surfaceSqM?: number | null;
          id: number;
          occupantSubject?:
            | { __typename?: 'LegalSubject'; name: string; id: number }
            | { __typename?: 'ManagementSubject'; name: string; id: number }
            | { __typename?: 'PhysicalSubject'; name: string; id: number }
            | null;
          orgUnit?: { __typename?: 'OrgUnit'; id: number; name?: string | null } | null;
          usageType?: {
            __typename?: 'EstateUsageType';
            id: number;
            name: string;
            internalCode: string;
            ordering: number;
            isForEstate: boolean;
            isForEstateUnit: boolean;
            isForEstateSubUnit: boolean;
            isForContracts: boolean;
          } | null;
          estateUnit: {
            __typename?: 'EstateUnit';
            id: number;
            name?: string | null;
            type: Types.EstateUnitType;
            address: {
              __typename?: 'AsstAddress';
              id: number;
              addressType: Types.AsstAddressType;
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
              locationLatLon?: { __typename?: 'GeoJSONPointType'; coordinates?: Array<number> | null } | null;
            };
            currentCadastralUnit?: {
              __typename?: 'CadastralUnit';
              id: number;
              isAncillaryUnit: boolean;
              isCadastralRegistrationInProgress: boolean;
            } | null;
          };
        } | null;
        estateUnit: {
          __typename?: 'EstateUnit';
          id: number;
          name?: string | null;
          internalCode: string;
          externalCode?: string | null;
          type: Types.EstateUnitType;
          status: Types.EstateUnitStatus;
          disusedDate?: string | null;
          ownershipType: Types.EstateUnitOwnershipType;
          ownershipStartDate: string;
          ownershipEndDate?: string | null;
          ownershipPercent?: number | null;
          subNumbering?: string | null;
          sharedArea: boolean;
          notes?: string | null;
          netSurface?: number | null;
          grossSurface?: number | null;
          usageType: {
            __typename?: 'EstateUsageType';
            id: number;
            name: string;
            internalCode: string;
            ordering: number;
            isForEstate: boolean;
            isForEstateUnit: boolean;
            isForEstateSubUnit: boolean;
            isForContracts: boolean;
          };
          address: {
            __typename?: 'AsstAddress';
            id: number;
            addressType: Types.AsstAddressType;
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
            locationLatLon?: { __typename?: 'GeoJSONPointType'; coordinates?: Array<number> | null } | null;
          };
          estate: {
            __typename?: 'Estate';
            id: number;
            internalCode: string;
            name?: string | null;
            type: Types.EstateType;
            externalCode?: string | null;
            surfaceAreaSqM?: number | null;
            ownership: Types.EstateOwnership;
            buildYear?: number | null;
            status: Types.EstateStatus;
            notes?: string | null;
            managementSubject:
              | { __typename?: 'LegalSubject'; id: number; name: string }
              | { __typename?: 'ManagementSubject'; id: number; name: string }
              | { __typename?: 'PhysicalSubject'; id: number; name: string };
            addresses: Array<{
              __typename?: 'AsstAddress';
              id: number;
              addressType: Types.AsstAddressType;
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
              locationLatLon?: { __typename?: 'GeoJSONPointType'; coordinates?: Array<number> | null } | null;
            }>;
            estateUnits: Array<{ __typename?: 'EstateUnit'; id: number }>;
            floors: Array<{
              __typename?: 'Floor';
              id: number;
              name: string;
              position: number;
              templateReference: string;
            }>;
            mainUsageType: { __typename?: 'EstateMainUsageType'; id: number; name: string };
            usageType: { __typename?: 'EstateUsageType'; id: number; name: string };
            managementOrgUnit?: { __typename?: 'OrgUnit'; id: number; name?: string | null } | null;
            stairs: Array<{ __typename?: 'Stair'; id: number; description: string }>;
          };
          floors: Array<{
            __typename?: 'Floor';
            id: number;
            name: string;
            position: number;
            templateReference: string;
          }>;
          stair?: { __typename?: 'Stair'; id: number; description: string } | null;
          officialAct?: {
            __typename?: 'OfficialAct';
            id: number;
            protocolNumber: string;
            registrationNumber?: string | null;
            registrationDate?: string | null;
            issuerName?: string | null;
            actRegistrationFields: Array<{
              __typename?: 'ActRegistrationField';
              fieldType: Types.RegistrationFieldType;
              value?: string | null;
              id: number;
            }>;
            actRegistrationDates: Array<{
              __typename?: 'ActRegistrationDate';
              dateType: Types.RegistrationDateType;
              value: string;
              id: number;
            }>;
          } | null;
          lastRepossession?: {
            __typename?: 'Repossession';
            notes?: string | null;
            eventDate?: string | null;
            eventType?: Types.RepossessionType | null;
            eventReason?: Types.RepossessionReason | null;
            unitStatus?: Types.UnitCondition | null;
            isAssignable?: boolean | null;
            isKeysReturned?: boolean | null;
            isWithValuables?: boolean | null;
            id: number;
          } | null;
          surfacesTree: Array<{
            __typename?: 'EstateUnitSurfaceSummary';
            surfaceId?: number | null;
            metric: Types.SurfaceMeasurementMetric;
            surfaceSqMTotal?: number | null;
            surfaceSqMCommonArea?: number | null;
            surfaceSqMSideArea?: number | null;
            floors: Array<{
              __typename?: 'EstateUnitSurfaceSummaryFloor';
              surfaceId?: number | null;
              surfaceSqMTotal?: number | null;
              surfaceSqMCommonArea?: number | null;
              surfaceSqMSideArea?: number | null;
              floor: {
                __typename?: 'EstateUnitSurfaceSummaryFloorSummary';
                id?: number | null;
                name?: string | null;
                position: number;
                templateReference?: string | null;
              };
              functionAreas: Array<{
                __typename?: 'EstateUnitSurfaceSummaryFunctionArea';
                surfaceId?: number | null;
                surfaceSqMTotal?: number | null;
                surfaceSqMCommonArea?: number | null;
                surfaceSqMSideArea?: number | null;
                functionArea: {
                  __typename?: 'EstateUnitSurfaceSummaryFunctionAreaSummary';
                  id?: number | null;
                  name?: string | null;
                  surfaceType: Types.SurfaceType;
                };
              }>;
            }>;
          }>;
          currentCadastralUnit?: {
            __typename?: 'CadastralUnit';
            internalCode: string;
            type: Types.EstateUnitType;
            status: Types.CadastralUnitStatus;
            since?: string | null;
            until?: string | null;
            lastRelevantChangeDate?: string | null;
            cadastralNotes?: string | null;
            fiscalNotes?: string | null;
            consortiumNotes?: string | null;
            isCadastralRegistrationInProgress: boolean;
            isAncillaryUnit: boolean;
            id: number;
            address: {
              __typename?: 'AsstAddress';
              id: number;
              addressType: Types.AsstAddressType;
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
              locationLatLon?: { __typename?: 'GeoJSONPointType'; coordinates?: Array<number> | null } | null;
            };
            coordinates: Array<{
              __typename?: 'CadastralCoordinates';
              coordinateType: Types.CoordinateType;
              unmanagedOverride?: string | null;
              level1?: string | null;
              level2?: string | null;
              level3?: string | null;
              level4?: string | null;
              level5?: string | null;
              itTavPartita?: string | null;
              itTavCorpo?: string | null;
              itTavPorzione?: string | null;
              hasITTavData: boolean;
              notes?: string | null;
              id: number;
            }>;
            unavailabilities: Array<{
              __typename?: 'CadastralUnavailability';
              since?: string | null;
              until?: string | null;
              notes?: string | null;
              id: number;
            }>;
            inspection?: {
              __typename?: 'CadastralUnitInspection';
              date?: string | null;
              protocolDate?: string | null;
              protocolNumber?: string | null;
              heading?: string | null;
              macroZone?: string | null;
              microZone?: string | null;
              isHistoricalEstate: boolean;
              isDirectRestriction: boolean;
            } | null;
            income: {
              __typename?: 'CadastralUnitIncome';
              macroCategory?: string | null;
              microCategory?: string | null;
              metric?: Types.IncomeMetric | null;
              metricAmount?: number | null;
              metricRentedAmount?: number | null;
              registeredSurface?: number | null;
              type?: Types.IncomeType | null;
              cadastralAmount?: number | null;
              farmAmount?: number | null;
              landAmount?: number | null;
              marketValue?: number | null;
              cadastralCategory?: {
                __typename?: 'CadastralCategory';
                id: number;
                description: string;
                externalCode?: string | null;
              } | null;
              cadastralLandCategory?: {
                __typename?: 'CadastralLandCategory';
                id: number;
                description: string;
                internalCode: string;
                countryISO: string;
                ordering: number;
              } | null;
            };
          } | null;
        };
      }>;
      counterparts: Array<{
        __typename?: 'Counterpart';
        id: number;
        contractSharePercent: number;
        type: Types.CounterpartType;
        isMainCounterpart: boolean;
        since: string;
        until?: string | null;
        subject:
          | {
              __typename: 'LegalSubject';
              fullName: string;
              shorthandDescription?: string | null;
              baseCountryTaxIdCode?: string | null;
              additionalTaxIdCode?: string | null;
              additionalGovIdCode?: string | null;
              bankingId1?: string | null;
              bankingId2?: string | null;
              businessStart?: string | null;
              companiesHouseIdCode?: string | null;
              shareCapital?: number | null;
              interGroupSignature?: string | null;
              legalSubjectType: Types.LegalSubjectType;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              companyGroupParent?: {
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
          | {
              __typename: 'ManagementSubject';
              fullName: string;
              shorthandDescription?: string | null;
              baseCountryTaxIdCode?: string | null;
              additionalTaxIdCode?: string | null;
              additionalGovIdCode?: string | null;
              bankingId1?: string | null;
              bankingId2?: string | null;
              businessStart?: string | null;
              managementCode?: string | null;
              companiesHouseIdCode?: string | null;
              shareCapital?: number | null;
              interGroupSignature?: string | null;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              companyGroupParent?: {
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
          | {
              __typename: 'PhysicalSubject';
              firstName?: string | null;
              lastName?: string | null;
              birthCountryTaxIdCode?: string | null;
              professionalTaxIdCode?: string | null;
              birthDate?: string | null;
              birthSex?: Types.BirthSex | null;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              birthLocation?: {
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
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            };
      }>;
      transactors: Array<{
        __typename?: 'Transactor';
        id: number;
        addressId: number;
        invoiceAddressId: number;
        isInvoiced: boolean;
        since: string;
        transactionSharePercent: number;
        type: Types.PaymentType;
        until?: string | null;
        subject:
          | {
              __typename: 'LegalSubject';
              fullName: string;
              shorthandDescription?: string | null;
              baseCountryTaxIdCode?: string | null;
              additionalTaxIdCode?: string | null;
              additionalGovIdCode?: string | null;
              bankingId1?: string | null;
              bankingId2?: string | null;
              businessStart?: string | null;
              companiesHouseIdCode?: string | null;
              shareCapital?: number | null;
              interGroupSignature?: string | null;
              legalSubjectType: Types.LegalSubjectType;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              companyGroupParent?: {
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
          | {
              __typename: 'ManagementSubject';
              fullName: string;
              shorthandDescription?: string | null;
              baseCountryTaxIdCode?: string | null;
              additionalTaxIdCode?: string | null;
              additionalGovIdCode?: string | null;
              bankingId1?: string | null;
              bankingId2?: string | null;
              businessStart?: string | null;
              managementCode?: string | null;
              companiesHouseIdCode?: string | null;
              shareCapital?: number | null;
              interGroupSignature?: string | null;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              companyGroupParent?: {
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
          | {
              __typename: 'PhysicalSubject';
              firstName?: string | null;
              lastName?: string | null;
              birthCountryTaxIdCode?: string | null;
              professionalTaxIdCode?: string | null;
              birthDate?: string | null;
              birthSex?: Types.BirthSex | null;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              birthLocation?: {
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
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            };
      }>;
      securityDeposits: Array<{
        __typename?: 'SecurityDeposit';
        id: number;
        bankAccountId?: number | null;
        baseAmount: number;
        interestCalculationStartDate?: string | null;
        isInterestCalculated: boolean;
        isSuretyRenewable: boolean;
        notes?: string | null;
        type: Types.SecurityDepositType;
        since?: string | null;
        takeoverDate?: string | null;
        until?: string | null;
        subject?:
          | {
              __typename: 'LegalSubject';
              fullName: string;
              shorthandDescription?: string | null;
              baseCountryTaxIdCode?: string | null;
              additionalTaxIdCode?: string | null;
              additionalGovIdCode?: string | null;
              bankingId1?: string | null;
              bankingId2?: string | null;
              businessStart?: string | null;
              companiesHouseIdCode?: string | null;
              shareCapital?: number | null;
              interGroupSignature?: string | null;
              legalSubjectType: Types.LegalSubjectType;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              companyGroupParent?: {
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
          | {
              __typename: 'ManagementSubject';
              fullName: string;
              shorthandDescription?: string | null;
              baseCountryTaxIdCode?: string | null;
              additionalTaxIdCode?: string | null;
              additionalGovIdCode?: string | null;
              bankingId1?: string | null;
              bankingId2?: string | null;
              businessStart?: string | null;
              managementCode?: string | null;
              companiesHouseIdCode?: string | null;
              shareCapital?: number | null;
              interGroupSignature?: string | null;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              companyGroupParent?: {
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
          | {
              __typename: 'PhysicalSubject';
              firstName?: string | null;
              lastName?: string | null;
              birthCountryTaxIdCode?: string | null;
              professionalTaxIdCode?: string | null;
              birthDate?: string | null;
              birthSex?: Types.BirthSex | null;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              birthLocation?: {
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
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
          | null;
        suretySubject?:
          | {
              __typename: 'LegalSubject';
              fullName: string;
              shorthandDescription?: string | null;
              baseCountryTaxIdCode?: string | null;
              additionalTaxIdCode?: string | null;
              additionalGovIdCode?: string | null;
              bankingId1?: string | null;
              bankingId2?: string | null;
              businessStart?: string | null;
              companiesHouseIdCode?: string | null;
              shareCapital?: number | null;
              interGroupSignature?: string | null;
              legalSubjectType: Types.LegalSubjectType;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              companyGroupParent?: {
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
          | {
              __typename: 'ManagementSubject';
              fullName: string;
              shorthandDescription?: string | null;
              baseCountryTaxIdCode?: string | null;
              additionalTaxIdCode?: string | null;
              additionalGovIdCode?: string | null;
              bankingId1?: string | null;
              bankingId2?: string | null;
              businessStart?: string | null;
              managementCode?: string | null;
              companiesHouseIdCode?: string | null;
              shareCapital?: number | null;
              interGroupSignature?: string | null;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              companyGroupParent?: {
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
          | {
              __typename: 'PhysicalSubject';
              firstName?: string | null;
              lastName?: string | null;
              birthCountryTaxIdCode?: string | null;
              professionalTaxIdCode?: string | null;
              birthDate?: string | null;
              birthSex?: Types.BirthSex | null;
              name: string;
              id: number;
              personType: Types.PersonType;
              internalCode: string;
              externalSourceCode?: string | null;
              entryStatus: Types.EntryStatus;
              closureDate?: string | null;
              birthLocation?: {
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
              } | null;
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
              bankAccounts: Array<{
                __typename?: 'BankAccount';
                bankAccountType: Types.BankAccountType;
                referenceCode?: string | null;
                referenceCodeType: Types.BankAccountCodeType;
                notes?: string | null;
                accountHolder?: string | null;
                id: number;
              }>;
              contacts: Array<{
                __typename?: 'Contact';
                id: number;
                contactInfo?: string | null;
                contactInfoType: Types.ContactInfoType;
                contactType: Types.ContactType;
              }>;
              categories: Array<{
                __typename?: 'SubjectCategory';
                name: string;
                id: number;
                function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
              }>;
              heirs: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              officers: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              owningMgmtSubjects: Array<{
                __typename?: 'SubjectRelation';
                since?: string | null;
                until?: string | null;
                groupRelationType?: Types.CompanyGroup | null;
                officerRelationType?: Types.OfficerType | null;
                relationType: Types.SubjectRelationType;
                id: number;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
                subordinate:
                  | { __typename?: 'LegalSubject'; name: string; id: number }
                  | { __typename?: 'ManagementSubject'; name: string; id: number }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number };
              }>;
              taxStatuses: Array<{
                __typename?: 'TaxStatus';
                taxStatusType: Types.TaxStatusType;
                since?: string | null;
                until?: string | null;
                id: number;
              }>;
            }
          | null;
        interestRows: Array<{
          __typename?: 'SecurityDepositInterestRow';
          since?: string | null;
          until?: string | null;
          baseAmount: number;
          calculationDate: string;
          interestAmount: number;
          appliedInterestRate: number;
          id: number;
        }>;
      }>;
      oneshotAdditions: Array<{
        __typename?: 'OneshotAddition';
        startDate: string;
        isRentalRateVariation: boolean;
        amount: number;
        installments?: number | null;
        isBoundToTermDay: boolean;
        termStartDate?: string | null;
        termEndDate?: string | null;
        notes?: string | null;
        id: number;
        vatRate: {
          __typename?: 'VATRate';
          id: number;
          internalCode: string;
          description: string;
          type: Types.VatRateType;
          ratePercent: number;
        };
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
        accountingItem: {
          __typename?: 'AccountingItem';
          id: number;
          description: string;
          internalCode: string;
          externalCode: string;
        };
      }>;
      recurringAdditions: Array<{
        __typename?: 'RecurringAddition';
        amountPerInstallment: number;
        excludeStartMonth?: number | null;
        excludeEndMonth?: number | null;
        notes?: string | null;
        id: number;
        vatRate: {
          __typename?: 'VATRate';
          id: number;
          internalCode: string;
          description: string;
          type: Types.VatRateType;
          ratePercent: number;
        };
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
        accountingItem: {
          __typename?: 'AccountingItem';
          id: number;
          description: string;
          internalCode: string;
          externalCode: string;
        };
      }>;
      ratePlans: Array<{
        __typename?: 'RatePlan';
        id: number;
        since: string;
        newYearlyRate: number;
        isDeclarationExpected: boolean;
        isDeclared: boolean;
      }>;
      sublocatedContract?: {
        __typename?: 'Contract';
        internalCode: string;
        externalCode?: string | null;
        status: Types.EntryStatus;
        reason: Types.Reason;
        agreementDate: string;
        effectStartDate: string;
        lastRenewalStartDate: string;
        firstTermDurationMonths?: number | null;
        secondTermDurationMonths?: number | null;
        firstTermExpirationDate?: string | null;
        secondTermExpirationDate?: string | null;
        anytimeTerminationWarningMonths?: number | null;
        nonRenewalWarningMonths?: number | null;
        terminationDate?: string | null;
        terminator?: Types.ContractTerminator | null;
        id: number;
        managementSubject:
          | { __typename?: 'LegalSubject'; name: string }
          | { __typename?: 'ManagementSubject'; name: string }
          | { __typename?: 'PhysicalSubject'; name: string };
        type: { __typename?: 'ContractType'; description: string };
      } | null;
    } | null;
  };
};

export type DeleteContractMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type DeleteContractMutation = {
  __typename?: 'Mutation';
  contract: {
    __typename?: 'ContractMutations';
    delete: {
      __typename?: 'Result';
      errors?: Array<string | null> | null;
      isSuccess: boolean;
      validationErrors?: Array<{
        __typename?: 'ValidationError';
        identifier?: string | null;
        errorMessage?: string | null;
        errorCode?: string | null;
        severity: Types.ValidationSeverity;
      } | null> | null;
    };
  };
};

export type DeleteContractsMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteContractsMutation = {
  __typename?: 'Mutation';
  contract: {
    __typename?: 'ContractMutations';
    deleteRange: {
      __typename?: 'Result';
      errors?: Array<string | null> | null;
      isSuccess: boolean;
      validationErrors?: Array<{
        __typename?: 'ValidationError';
        identifier?: string | null;
        errorMessage?: string | null;
        errorCode?: string | null;
        severity: Types.ValidationSeverity;
      } | null> | null;
    };
  };
};

export type CreateContractMutationVariables = Types.Exact<{
  contractInput: Types.ContractInput;
}>;

export type CreateContractMutation = {
  __typename?: 'Mutation';
  contract: {
    __typename?: 'ContractMutations';
    add: {
      __typename?: 'ResultOfContract';
      errors?: Array<string | null> | null;
      isSuccess: boolean;
      validationErrors?: Array<{
        __typename?: 'ValidationError';
        identifier?: string | null;
        errorMessage?: string | null;
        errorCode?: string | null;
        severity: Types.ValidationSeverity;
      } | null> | null;
      value?: { __typename?: 'Contract'; id: number } | null;
    };
  };
};

export type UpdateContractMutationVariables = Types.Exact<{
  contractId: Types.Scalars['Int']['input'];
  contractInput: Types.ContractInput;
}>;

export type UpdateContractMutation = {
  __typename?: 'Mutation';
  contract: {
    __typename?: 'ContractMutations';
    update: {
      __typename?: 'ResultOfContract';
      errors?: Array<string | null> | null;
      isSuccess: boolean;
      validationErrors?: Array<{
        __typename?: 'ValidationError';
        identifier?: string | null;
        errorMessage?: string | null;
        errorCode?: string | null;
        severity: Types.ValidationSeverity;
      } | null> | null;
    };
  };
};

export type GetContractInternalCodeQueryVariables = Types.Exact<{
  isActiveContract: Types.Scalars['Boolean']['input'];
}>;

export type GetContractInternalCodeQuery = {
  __typename?: 'Query';
  contract: { __typename?: 'ContractQueries'; proposeNewInternalCode?: string | null };
};

export type CanUseContractInternalCodeQueryVariables = Types.Exact<{
  internalCode: Types.Scalars['String']['input'];
  currentContractId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CanUseContractInternalCodeQuery = {
  __typename?: 'Query';
  contract: { __typename?: 'ContractQueries'; canUseInternalCode: boolean };
};

export type ExportContractsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ContractFilterInput>;
  order?: Types.InputMaybe<Array<Types.ContractSortInput> | Types.ContractSortInput>;
}>;

export type ExportContractsQuery = {
  __typename?: 'Query';
  contract: { __typename?: 'ContractQueries'; exportToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string } };
};

export type PauseContractBillingMutationVariables = Types.Exact<{
  contractId: Types.Scalars['Int']['input'];
  since: Types.Scalars['Date']['input'];
  notes?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;

export type PauseContractBillingMutation = {
  __typename?: 'Mutation';
  contract: {
    __typename?: 'ContractMutations';
    pauseBilling: {
      __typename?: 'ResultOfBillingPause';
      errors?: Array<string | null> | null;
      isSuccess: boolean;
      validationErrors?: Array<{
        __typename?: 'ValidationError';
        identifier?: string | null;
        errorMessage?: string | null;
        errorCode?: string | null;
        severity: Types.ValidationSeverity;
      } | null> | null;
    };
  };
};

export type ResumeContractBillingMutationVariables = Types.Exact<{
  contractId: Types.Scalars['Int']['input'];
  pauseEndDate: Types.Scalars['Date']['input'];
  isRecoveryArrears: Types.Scalars['Boolean']['input'];
  notes?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;

export type ResumeContractBillingMutation = {
  __typename?: 'Mutation';
  contract: {
    __typename?: 'ContractMutations';
    resumeBilling: {
      __typename?: 'ResultOfBillingPause';
      errors?: Array<string | null> | null;
      isSuccess: boolean;
      validationErrors?: Array<{
        __typename?: 'ValidationError';
        identifier?: string | null;
        errorMessage?: string | null;
        errorCode?: string | null;
        severity: Types.ValidationSeverity;
      } | null> | null;
    };
  };
};

export type ReleaseContractMutationVariables = Types.Exact<{
  contractId: Types.Scalars['Int']['input'];
  releaseReason?: Types.InputMaybe<Types.ReleaseReason>;
  releaseDate?: Types.InputMaybe<Types.Scalars['Date']['input']>;
  isOccupiedWithoutRight: Types.Scalars['Boolean']['input'];
}>;

export type ReleaseContractMutation = {
  __typename?: 'Mutation';
  contract: {
    __typename?: 'ContractMutations';
    release: {
      __typename?: 'Result';
      errors?: Array<string | null> | null;
      isSuccess: boolean;
      validationErrors?: Array<{
        __typename?: 'ValidationError';
        identifier?: string | null;
        errorMessage?: string | null;
        errorCode?: string | null;
        severity: Types.ValidationSeverity;
      } | null> | null;
    };
  };
};

export type TransferContractManagementSubjectMutationVariables = Types.Exact<{
  contractIds: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
  newManagementSubjectId: Types.Scalars['Int']['input'];
  legalRepresentativeSubjectId: Types.Scalars['Int']['input'];
  paymentDate: Types.Scalars['Date']['input'];
  terminationDate: Types.Scalars['Date']['input'];
  takeoverType: Types.TakeoverType;
}>;

export type TransferContractManagementSubjectMutation = {
  __typename?: 'Mutation';
  contract: {
    __typename?: 'ContractMutations';
    transferManagementSubject: {
      __typename?: 'Result';
      errors?: Array<string | null> | null;
      isSuccess: boolean;
      validationErrors?: Array<{
        __typename?: 'ValidationError';
        identifier?: string | null;
        errorMessage?: string | null;
        errorCode?: string | null;
        severity: Types.ValidationSeverity;
      } | null> | null;
    };
  };
};

export type AddContractDocumentsMutationVariables = Types.Exact<{
  contractId: Types.Scalars['Int']['input'];
  inputs: Array<Types.DocumentInput> | Types.DocumentInput;
}>;

export type AddContractDocumentsMutation = {
  __typename?: 'Mutation';
  contract: {
    __typename?: 'ContractMutations';
    document: {
      __typename?: 'ContractDocumentMutations';
      addRange: {
        __typename?: 'ResultOfDocument__';
        errors?: Array<string | null> | null;
        isSuccess: boolean;
        validationErrors?: Array<{
          __typename?: 'ValidationError';
          identifier?: string | null;
          errorMessage?: string | null;
          errorCode?: string | null;
          severity: Types.ValidationSeverity;
        } | null> | null;
      };
    };
  };
};

export type DeleteContractDocumentsMutationVariables = Types.Exact<{
  entityId: Types.Scalars['Int']['input'];
  cmisIds: Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input'];
}>;

export type DeleteContractDocumentsMutation = {
  __typename?: 'Mutation';
  contract: {
    __typename?: 'ContractMutations';
    document: {
      __typename?: 'ContractDocumentMutations';
      deleteRange: {
        __typename?: 'ResultOfDocument__';
        errors?: Array<string | null> | null;
        isSuccess: boolean;
        validationErrors?: Array<{
          __typename?: 'ValidationError';
          identifier?: string | null;
          errorMessage?: string | null;
          errorCode?: string | null;
          severity: Types.ValidationSeverity;
        } | null> | null;
      };
    };
  };
};

export type UpdateContractDocumentMutationVariables = Types.Exact<{
  contractId: Types.Scalars['Int']['input'];
  input: Types.DocumentInput;
}>;

export type UpdateContractDocumentMutation = {
  __typename?: 'Mutation';
  contract: {
    __typename?: 'ContractMutations';
    document: {
      __typename?: 'ContractDocumentMutations';
      update: {
        __typename?: 'ResultOfDocument';
        errors?: Array<string | null> | null;
        isSuccess: boolean;
        validationErrors?: Array<{
          __typename?: 'ValidationError';
          identifier?: string | null;
          errorMessage?: string | null;
          errorCode?: string | null;
          severity: Types.ValidationSeverity;
        } | null> | null;
      };
    };
  };
};

export type GetContractDocumentsQueryVariables = Types.Exact<{
  contractId: Types.Scalars['Int']['input'];
  where?: Types.InputMaybe<Types.DocumentFilterInput>;
  order?: Types.InputMaybe<
    Array<Types.DocumentsPerContentCategoryGroupOutputSortInput> | Types.DocumentsPerContentCategoryGroupOutputSortInput
  >;
}>;

export type GetContractDocumentsQuery = {
  __typename?: 'Query';
  contract: {
    __typename?: 'ContractQueries';
    contract?: {
      __typename?: 'Contract';
      documents: Array<{
        __typename?: 'DocumentsPerContentCategoryGroupOutput';
        contentCategoryGroup: string;
        guid: string;
        subRows: Array<{
          __typename?: 'DocumentsPerContentCategoryOutput';
          contentCategory: Types.ContentCategory;
          guid: string;
          subRows: Array<{
            __typename?: 'Document';
            cmisId: string;
            contentCategory: Types.ContentCategory;
            contentCategoryGroup: string;
            contentType: Types.ContentType;
            creationDate: string;
            entityId?: string | null;
            entityIntId?: number | null;
            fileName?: string | null;
            issueDate?: string | null;
            issuer?: string | null;
            issuerCode?: string | null;
            mimeType?: string | null;
            name: string;
            notes?: string | null;
            protocolNumber?: string | null;
            since?: string | null;
            until?: string | null;
            uploaderName?: string | null;
          }>;
        }>;
      }>;
    } | null;
  };
};

export type GetLastContractExpiriesQueryVariables = Types.Exact<{
  isActive: Types.Scalars['Boolean']['input'];
}>;

export type GetLastContractExpiriesQuery = {
  __typename?: 'Query';
  contract: {
    __typename?: 'ContractQueries';
    lastContractExpiries: Array<{
      __typename?: 'ContractExpiryOutput';
      contractId: number;
      internalCode: string;
      typeDescription?: string | null;
      daysToExpiration: number;
      managementSubjectName?: string | null;
      billingBaseFee?: number | null;
    }>;
  };
};

export type GetContractStatisticsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetContractStatisticsQuery = {
  __typename?: 'Query';
  contract: {
    __typename?: 'ContractQueries';
    statistics: {
      __typename?: 'ContractStatisticsOutput';
      monthly: Array<{
        __typename?: 'ContractMonthlyStatisticsOutput';
        totalActiveContractsCount: number;
        totalActiveContractsRevenue: number;
        totalPassiveContractsCount: number;
        totalPassiveContractsRevenue: number;
      }>;
      yearly: Array<{
        __typename?: 'ContractYearlyStatisticsOutput';
        totalActiveContractsCount: number;
        totalActiveContractsRevenue: number;
        totalPassiveContractsCount: number;
        totalPassiveContractsRevenue: number;
      }>;
    };
  };
};

export const GetContractsDocument = gql`
  query getContracts(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: ContractFilterInput
    $order: [ContractSortInput!]
  ) {
    contract {
      listContracts(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...ContractFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${ContractFragmentDoc}
  ${AsstAddressFragmentDoc}
  ${CityFragmentDoc}
`;

export function useGetContractsQuery(options?: Omit<Urql.UseQueryArgs<GetContractsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetContractsQuery, GetContractsQueryVariables>({ query: GetContractsDocument, ...options });
}
export const GetAllContractsDocument = gql`
  query getAllContracts($where: ContractFilterInput, $order: [ContractSortInput!]) {
    contract {
      listContractsFull(where: $where, order: $order) {
        ...ContractDetailFragment
      }
    }
  }
  ${ContractDetailFragmentDoc}
  ${SubjectDetailFragmentDoc}
  ${AddressFragmentDoc}
  ${CityFragmentDoc}
  ${BankAccountFragmentDoc}
  ${ContactFragmentDoc}
  ${SubjectCategoryFragmentDoc}
  ${SubjectRelationFragmentDoc}
  ${ContractTypeFragmentDoc}
  ${UsageTypeFragmentDoc}
  ${BillItemTypeFragmentDoc}
  ${AccountingItemFragmentDoc}
  ${VatRateFragmentDoc}
  ${BillingPauseFragmentDoc}
  ${RegistrationOfficeFragmentDoc}
  ${ContractRegistrationPaymentFragmentDoc}
  ${TakeoverFragmentDoc}
  ${RevaluationHistoryFragmentDoc}
  ${EstateSubUnitFragmentDoc}
  ${AsstAddressFragmentDoc}
  ${EstateUnitDetailFragmentDoc}
  ${EstateFragmentDoc}
  ${FloorFragmentDoc}
  ${StairFragmentDoc}
  ${EstateUnitSurfaceSummaryFragmentDoc}
  ${EstateUnitSurfaceSummaryFloorFragmentDoc}
  ${EstateUnitSurfaceSummaryFloorSummaryFragmentDoc}
  ${EstateUnitCadastralUnitDetailFragmentDoc}
  ${CadastralCoordinatesFragmentDoc}
  ${CadastralUnitInspectionFragmentDoc}
  ${CadastralUnitIncomeFragmentDoc}
  ${CadastralCategoryFragmentDoc}
  ${CadastralLandCategoryFragmentDoc}
  ${SecurityDepositInterestRowFragmentDoc}
  ${SublocatedContractDetailFragmentDoc}
`;

export function useGetAllContractsQuery(options?: Omit<Urql.UseQueryArgs<GetAllContractsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllContractsQuery, GetAllContractsQueryVariables>({
    query: GetAllContractsDocument,
    ...options,
  });
}
export const GetContractDocument = gql`
  query getContract($contractId: Int!) {
    contract {
      contract(contractId: $contractId) {
        ...ContractDetailFragment
      }
    }
  }
  ${ContractDetailFragmentDoc}
  ${SubjectDetailFragmentDoc}
  ${AddressFragmentDoc}
  ${CityFragmentDoc}
  ${BankAccountFragmentDoc}
  ${ContactFragmentDoc}
  ${SubjectCategoryFragmentDoc}
  ${SubjectRelationFragmentDoc}
  ${ContractTypeFragmentDoc}
  ${UsageTypeFragmentDoc}
  ${BillItemTypeFragmentDoc}
  ${AccountingItemFragmentDoc}
  ${VatRateFragmentDoc}
  ${BillingPauseFragmentDoc}
  ${RegistrationOfficeFragmentDoc}
  ${ContractRegistrationPaymentFragmentDoc}
  ${TakeoverFragmentDoc}
  ${RevaluationHistoryFragmentDoc}
  ${EstateSubUnitFragmentDoc}
  ${AsstAddressFragmentDoc}
  ${EstateUnitDetailFragmentDoc}
  ${EstateFragmentDoc}
  ${FloorFragmentDoc}
  ${StairFragmentDoc}
  ${EstateUnitSurfaceSummaryFragmentDoc}
  ${EstateUnitSurfaceSummaryFloorFragmentDoc}
  ${EstateUnitSurfaceSummaryFloorSummaryFragmentDoc}
  ${EstateUnitCadastralUnitDetailFragmentDoc}
  ${CadastralCoordinatesFragmentDoc}
  ${CadastralUnitInspectionFragmentDoc}
  ${CadastralUnitIncomeFragmentDoc}
  ${CadastralCategoryFragmentDoc}
  ${CadastralLandCategoryFragmentDoc}
  ${SecurityDepositInterestRowFragmentDoc}
  ${SublocatedContractDetailFragmentDoc}
`;

export function useGetContractQuery(options: Omit<Urql.UseQueryArgs<GetContractQueryVariables>, 'query'>) {
  return Urql.useQuery<GetContractQuery, GetContractQueryVariables>({ query: GetContractDocument, ...options });
}
export const DeleteContractDocument = gql`
  mutation deleteContract($id: Int!) {
    contract {
      delete(id: $id) {
        errors
        isSuccess
        validationErrors {
          ...ValidationErrorFragment
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useDeleteContractMutation() {
  return Urql.useMutation<DeleteContractMutation, DeleteContractMutationVariables>(DeleteContractDocument);
}
export const DeleteContractsDocument = gql`
  mutation deleteContracts($ids: [Int!]!) {
    contract {
      deleteRange(ids: $ids) {
        errors
        isSuccess
        validationErrors {
          ...ValidationErrorFragment
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useDeleteContractsMutation() {
  return Urql.useMutation<DeleteContractsMutation, DeleteContractsMutationVariables>(DeleteContractsDocument);
}
export const CreateContractDocument = gql`
  mutation createContract($contractInput: ContractInput!) {
    contract {
      add(input: $contractInput) {
        errors
        isSuccess
        validationErrors {
          ...ValidationErrorFragment
        }
        value {
          id
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useCreateContractMutation() {
  return Urql.useMutation<CreateContractMutation, CreateContractMutationVariables>(CreateContractDocument);
}
export const UpdateContractDocument = gql`
  mutation updateContract($contractId: Int!, $contractInput: ContractInput!) {
    contract {
      update(id: $contractId, input: $contractInput) {
        errors
        isSuccess
        validationErrors {
          ...ValidationErrorFragment
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useUpdateContractMutation() {
  return Urql.useMutation<UpdateContractMutation, UpdateContractMutationVariables>(UpdateContractDocument);
}
export const GetContractInternalCodeDocument = gql`
  query getContractInternalCode($isActiveContract: Boolean!) {
    contract {
      proposeNewInternalCode(isActiveContract: $isActiveContract)
    }
  }
`;

export function useGetContractInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<GetContractInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetContractInternalCodeQuery, GetContractInternalCodeQueryVariables>({
    query: GetContractInternalCodeDocument,
    ...options,
  });
}
export const CanUseContractInternalCodeDocument = gql`
  query canUseContractInternalCode($internalCode: String!, $currentContractId: Int) {
    contract {
      canUseInternalCode(internalCode: $internalCode, currentContractId: $currentContractId)
    }
  }
`;

export function useCanUseContractInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<CanUseContractInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<CanUseContractInternalCodeQuery, CanUseContractInternalCodeQueryVariables>({
    query: CanUseContractInternalCodeDocument,
    ...options,
  });
}
export const ExportContractsDocument = gql`
  query exportContracts($where: ContractFilterInput, $order: [ContractSortInput!]) {
    contract {
      exportToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportContractsQuery(options?: Omit<Urql.UseQueryArgs<ExportContractsQueryVariables>, 'query'>) {
  return Urql.useQuery<ExportContractsQuery, ExportContractsQueryVariables>({
    query: ExportContractsDocument,
    ...options,
  });
}
export const PauseContractBillingDocument = gql`
  mutation pauseContractBilling($contractId: Int!, $since: Date!, $notes: String) {
    contract {
      pauseBilling(contractId: $contractId, since: $since, notes: $notes) {
        errors
        isSuccess
        validationErrors {
          ...ValidationErrorFragment
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function usePauseContractBillingMutation() {
  return Urql.useMutation<PauseContractBillingMutation, PauseContractBillingMutationVariables>(
    PauseContractBillingDocument,
  );
}
export const ResumeContractBillingDocument = gql`
  mutation resumeContractBilling(
    $contractId: Int!
    $pauseEndDate: Date!
    $isRecoveryArrears: Boolean!
    $notes: String
  ) {
    contract {
      resumeBilling(
        contractId: $contractId
        pauseEndDate: $pauseEndDate
        isRecoveryArrears: $isRecoveryArrears
        notes: $notes
      ) {
        errors
        isSuccess
        validationErrors {
          ...ValidationErrorFragment
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useResumeContractBillingMutation() {
  return Urql.useMutation<ResumeContractBillingMutation, ResumeContractBillingMutationVariables>(
    ResumeContractBillingDocument,
  );
}
export const ReleaseContractDocument = gql`
  mutation releaseContract(
    $contractId: Int!
    $releaseReason: ReleaseReason
    $releaseDate: Date
    $isOccupiedWithoutRight: Boolean!
  ) {
    contract {
      release(
        id: $contractId
        releaseReason: $releaseReason
        releaseDate: $releaseDate
        isOccupiedWithoutRight: $isOccupiedWithoutRight
      ) {
        errors
        isSuccess
        validationErrors {
          ...ValidationErrorFragment
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useReleaseContractMutation() {
  return Urql.useMutation<ReleaseContractMutation, ReleaseContractMutationVariables>(ReleaseContractDocument);
}
export const TransferContractManagementSubjectDocument = gql`
  mutation transferContractManagementSubject(
    $contractIds: [Int!]!
    $newManagementSubjectId: Int!
    $legalRepresentativeSubjectId: Int!
    $paymentDate: Date!
    $terminationDate: Date!
    $takeoverType: TakeoverType!
  ) {
    contract {
      transferManagementSubject(
        contractIds: $contractIds
        newManagementSubjectId: $newManagementSubjectId
        legalRepresentativeSubjectId: $legalRepresentativeSubjectId
        paymentDate: $paymentDate
        terminationDate: $terminationDate
        takeoverType: $takeoverType
      ) {
        errors
        isSuccess
        validationErrors {
          ...ValidationErrorFragment
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useTransferContractManagementSubjectMutation() {
  return Urql.useMutation<
    TransferContractManagementSubjectMutation,
    TransferContractManagementSubjectMutationVariables
  >(TransferContractManagementSubjectDocument);
}
export const AddContractDocumentsDocument = gql`
  mutation addContractDocuments($contractId: Int!, $inputs: [DocumentInput!]!) {
    contract {
      document {
        addRange(contractId: $contractId, inputs: $inputs) {
          errors
          isSuccess
          validationErrors {
            ...ValidationErrorFragment
          }
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useAddContractDocumentsMutation() {
  return Urql.useMutation<AddContractDocumentsMutation, AddContractDocumentsMutationVariables>(
    AddContractDocumentsDocument,
  );
}
export const DeleteContractDocumentsDocument = gql`
  mutation deleteContractDocuments($entityId: Int!, $cmisIds: [String!]!) {
    contract {
      document {
        deleteRange(contractId: $entityId, cmisIds: $cmisIds) {
          errors
          isSuccess
          validationErrors {
            ...ValidationErrorFragment
          }
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useDeleteContractDocumentsMutation() {
  return Urql.useMutation<DeleteContractDocumentsMutation, DeleteContractDocumentsMutationVariables>(
    DeleteContractDocumentsDocument,
  );
}
export const UpdateContractDocumentDocument = gql`
  mutation updateContractDocument($contractId: Int!, $input: DocumentInput!) {
    contract {
      document {
        update(contractId: $contractId, input: $input) {
          errors
          isSuccess
          validationErrors {
            ...ValidationErrorFragment
          }
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useUpdateContractDocumentMutation() {
  return Urql.useMutation<UpdateContractDocumentMutation, UpdateContractDocumentMutationVariables>(
    UpdateContractDocumentDocument,
  );
}
export const GetContractDocumentsDocument = gql`
  query getContractDocuments(
    $contractId: Int!
    $where: DocumentFilterInput
    $order: [DocumentsPerContentCategoryGroupOutputSortInput!]
  ) {
    contract {
      contract(contractId: $contractId) {
        documents(where: $where, order: $order) {
          ...DocumentsPerContentCategoryGroupOutputFragment
        }
      }
    }
  }
  ${DocumentsPerContentCategoryGroupOutputFragmentDoc}
  ${DocumentsPerContentCategoryOutputFragmentDoc}
  ${DocumentFragmentDoc}
`;

export function useGetContractDocumentsQuery(
  options: Omit<Urql.UseQueryArgs<GetContractDocumentsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetContractDocumentsQuery, GetContractDocumentsQueryVariables>({
    query: GetContractDocumentsDocument,
    ...options,
  });
}
export const GetLastContractExpiriesDocument = gql`
  query getLastContractExpiries($isActive: Boolean!) {
    contract {
      lastContractExpiries(isActive: $isActive) {
        ...ContractExpiryOutputFragment
      }
    }
  }
  ${ContractExpiryOutputFragmentDoc}
`;

export function useGetLastContractExpiriesQuery(
  options: Omit<Urql.UseQueryArgs<GetLastContractExpiriesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetLastContractExpiriesQuery, GetLastContractExpiriesQueryVariables>({
    query: GetLastContractExpiriesDocument,
    ...options,
  });
}
export const GetContractStatisticsDocument = gql`
  query getContractStatistics {
    contract {
      statistics {
        monthly {
          totalActiveContractsCount
          totalActiveContractsRevenue
          totalPassiveContractsCount
          totalPassiveContractsRevenue
        }
        yearly {
          totalActiveContractsCount
          totalActiveContractsRevenue
          totalPassiveContractsCount
          totalPassiveContractsRevenue
        }
      }
    }
  }
`;

export function useGetContractStatisticsQuery(
  options?: Omit<Urql.UseQueryArgs<GetContractStatisticsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetContractStatisticsQuery, GetContractStatisticsQueryVariables>({
    query: GetContractStatisticsDocument,
    ...options,
  });
}
