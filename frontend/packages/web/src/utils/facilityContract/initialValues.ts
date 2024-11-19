import { EntryStatus } from '@realgimm5/frontend-common/gql/types';

import {
  FacilityContractFormInput,
  FacilityContractFrameworkAgreementFormInput,
  FacilityContractTermExtensionFormInput,
} from '../../interfaces/FormInputs/FacilityContract';

export const getEmptyFacilityContractFrameworkAgreementFormInput = (): FacilityContractFrameworkAgreementFormInput => ({
  externalCode: '',
  frameworkAgreementId: null,
  notes: '',
});

export const getEmptyFacilityContractTermExtensionFormInput = (): FacilityContractTermExtensionFormInput => ({
  daysCount: null,
  feeDifference: null,
  notes: '',
  termExtensionId: null,
});

export const getEmptyFacilityContractFormInput = (): FacilityContractFormInput => ({
  agreementDate: null,
  billing: {
    billingPeriod: null,
    discountPercentage: null,
    fixedRateFee: null,
    purchaseFeeWithoutVat: null,
    vatPercentage: null,
  },
  cancellationNoticeDaysCount: null,
  catalogueTypes: [],
  description: '',
  documents: [],
  effectiveDate: null,
  entryStatus: EntryStatus.IncompleteDraft,
  estateUnits: [],
  expirationDate: null,
  externalCode: '',
  facilityContractId: null,
  facilityContractType: null,
  frameworkAgreements: [],
  internalCode: '',
  maximumRenewalDaysCount: null,
  originalEstateUnitGroup: null,
  originalTemplate: null,
  penalties: [],
  priceLists: [],
  providerSubject: null,
  renewalNoticeDaysCount: null,
  slas: [],
  termExtensions: [],
  ticketChecklists: [],
});
