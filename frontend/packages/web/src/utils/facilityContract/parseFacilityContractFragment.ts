import { parseStringToDate } from '@realgimm5/frontend-common/utils';

import { FacilityContractDetailFragment } from '../../gql/RealGimm.Web.FacilityContract.fragment';
import { FacilityContractFormInput } from '../../interfaces/FormInputs/FacilityContract';
import { parsePenaltyToPenaltyFormInput } from '../penalty/parsePenaltyFragment';
import { parseSlaToSlaFormInput } from '../sla/parseSLAFragment';

export const parseFacilityContractToFacilityContractFormInput = (
  facilityContract: FacilityContractDetailFragment,
): FacilityContractFormInput => ({
  agreementDate: parseStringToDate(facilityContract.agreementDate),
  billing: {
    billingPeriod: facilityContract.billingInfo.billingPeriod ?? null,
    discountPercentage: facilityContract.billingInfo.discountPercentage ?? null,
    fixedRateFee: facilityContract.billingInfo.fixedRateFee ?? null,
    purchaseFeeWithoutVat: facilityContract.billingInfo.purchaseFeeWithoutVAT ?? null,
    vatPercentage: facilityContract.billingInfo.vatPercentage ?? null,
  },
  cancellationNoticeDaysCount: facilityContract.cancellationNoticeDaysCount ?? null,
  catalogueTypes: facilityContract.catalogueTypes,
  description: facilityContract.description,
  documents: [],
  effectiveDate: parseStringToDate(facilityContract.effectiveDate),
  entryStatus: facilityContract.entryStatus,
  estateUnits: facilityContract.estateUnits,
  expirationDate: parseStringToDate(facilityContract.expirationDate),
  externalCode: facilityContract.externalCode ?? '',
  facilityContractId: facilityContract.id,
  facilityContractType: facilityContract.type,
  frameworkAgreements: facilityContract.frameworkAgreements.map((agreement) => ({
    externalCode: agreement.externalCode,
    frameworkAgreementId: agreement.id,
    notes: agreement.notes ?? '',
  })),
  internalCode: facilityContract.internalCode,
  maximumRenewalDaysCount: facilityContract.maximumRenewalDaysCount ?? null,
  originalEstateUnitGroup: facilityContract.originalEstateUnitGroup ?? null,
  originalTemplate: facilityContract.originalTemplate ?? null,
  penalties: facilityContract.penalties.map(parsePenaltyToPenaltyFormInput),
  priceLists: facilityContract.priceLists,
  providerSubject: facilityContract.providerSubject,
  renewalNoticeDaysCount: facilityContract.renewalNoticeDaysCount ?? null,
  slas: facilityContract.slas.map(parseSlaToSlaFormInput),
  termExtensions: facilityContract.termExtensions.map((termExtension) => ({
    daysCount: termExtension.daysCount,
    feeDifference: termExtension.feeDifference ?? null,
    notes: termExtension.notes ?? '',
    termExtensionId: termExtension.id,
  })),
  ticketChecklists: facilityContract.ticketChecklists,
});
