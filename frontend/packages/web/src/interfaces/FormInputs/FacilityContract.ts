import { BillingPeriod, EntryStatus } from '@realgimm5/frontend-common/gql/types';
import { DocumentFormInput } from '@realgimm5/frontend-common/interfaces';

import { FacilityCatalogueTypeFragment } from '../../gql/RealGimm.Web.CatalogueType.fragment';
import { EstateUnitFragment } from '../../gql/RealGimm.Web.EstateUnit.fragment';
import { FacilityContractTicketFragment } from '../../gql/RealGimm.Web.Ticket.fragment';
import { TicketChecklistFragment } from '../../gql/RealGimm.Web.TicketChecklist.fragment';
import { EstateUnitGroupFieldValue } from '../FieldValues/EstateUnitGroup';
import { FacilityContractTemplateFieldValue } from '../FieldValues/FacilityContractTemplate';
import { FacilityContractTypeFieldValue } from '../FieldValues/FacilityContractType';
import { PriceListFieldValue } from '../FieldValues/PriceList';
import { SubjectFieldValue } from '../FieldValues/Subject';
import { PenaltyFormInput } from './Penalty';
import { SlaFormInput } from './SLA';

export interface FacilityContractBillingFormInput {
  billingPeriod: BillingPeriod | null;
  discountPercentage: number | null;
  fixedRateFee: number | null;
  purchaseFeeWithoutVat: number | null;
  vatPercentage: number | null;
}

export interface FacilityContractFrameworkAgreementFormInput {
  externalCode: string;
  frameworkAgreementId: number | null;
  notes: string;
}

export interface FacilityContractTermExtensionFormInput {
  daysCount: number | null;
  feeDifference: number | null;
  notes: string;
  termExtensionId: number | null;
}

export interface FacilityContractFormInput {
  agreementDate: Date | null;
  billing: FacilityContractBillingFormInput;
  cancellationNoticeDaysCount: number | null;
  catalogueTypes: FacilityCatalogueTypeFragment[];
  description: string;
  documents: DocumentFormInput[];
  effectiveDate: Date | null;
  entryStatus: EntryStatus | null;
  estateUnits: EstateUnitFragment[];
  expirationDate: Date | null;
  externalCode: string;
  facilityContractId: number | null;
  facilityContractType: FacilityContractTypeFieldValue | null;
  frameworkAgreements: FacilityContractFrameworkAgreementFormInput[];
  internalCode: string;
  maximumRenewalDaysCount: number | null;
  originalEstateUnitGroup: EstateUnitGroupFieldValue | null;
  originalTemplate: FacilityContractTemplateFieldValue | null;
  penalties: PenaltyFormInput[];
  priceLists: PriceListFieldValue[];
  providerSubject: SubjectFieldValue | null;
  renewalNoticeDaysCount: number | null;
  slas: SlaFormInput[];
  termExtensions: FacilityContractTermExtensionFormInput[];
  ticketChecklists: TicketChecklistFragment[];
}

type Ticket = Omit<FacilityContractTicketFragment, '__typename'>;
export type GroupedFacilityContractTicketRow = Partial<Ticket> & {
  locationEstateUnit?: {
    id: number;
    internalCode: string;
  };
  requestYear?: number;
  tickets?: GroupedFacilityContractTicketRow[];
};
