import { FormMode } from '@realgimm5/frontend-common/enums';
import { FcltContractInput } from '@realgimm5/frontend-common/gql/types';
import { getStringOrNull, parseDateToString } from '@realgimm5/frontend-common/utils';

import { FacilityContractFormInput } from '../../interfaces/FormInputs/FacilityContract';
import { parsePenaltyFormInputToPenaltyInput } from '../penalty/parsePenaltyFormInput';
import { parseSlaFormInputToSlaInput } from '../sla/parseSLAFormInput';

export const parseFacilityContractFormInputToFacilityContractInput = (
  facilityContract: FacilityContractFormInput,
  mode: FormMode,
): FcltContractInput => ({
  agreementDate: parseDateToString(facilityContract.agreementDate),
  billingInfo: {
    billingPeriod: facilityContract.billing.billingPeriod,
    discountPercentage: facilityContract.billing.discountPercentage,
    fixedRateFee: facilityContract.billing.fixedRateFee,
    purchaseFeeWithoutVAT: facilityContract.billing.purchaseFeeWithoutVat,
    vatPercentage: facilityContract.billing.vatPercentage,
  },
  cancellationNoticeDaysCount: facilityContract.cancellationNoticeDaysCount,
  catalogueTypeIds: facilityContract.catalogueTypes.map(({ id }) => id),
  description: facilityContract.description,
  effectiveDate: parseDateToString(facilityContract.effectiveDate)!,
  entryStatus: facilityContract.entryStatus!,
  estateUnitIds: facilityContract.estateUnits.map(({ id }) => id),
  expirationDate: parseDateToString(facilityContract.expirationDate)!,
  externalCode: getStringOrNull(facilityContract.externalCode),
  frameworkAgreements: facilityContract.frameworkAgreements.map((agreement) => ({
    externalCode: agreement.externalCode,
    id: agreement.frameworkAgreementId,
    notes: getStringOrNull(agreement.notes),
  })),
  internalCode: facilityContract.internalCode,
  maximumRenewalDaysCount: facilityContract.maximumRenewalDaysCount,
  originalEstateUnitGroupId: facilityContract.originalEstateUnitGroup?.id,
  originalTemplateId: facilityContract.originalTemplate?.id,
  penalties: facilityContract.penalties.map((sla) => parsePenaltyFormInputToPenaltyInput(sla, mode)),
  priceListIds: facilityContract.priceLists.map(({ id }) => id),
  providerSubjectId: facilityContract.providerSubject!.id,
  renewalNoticeDaysCount: facilityContract.renewalNoticeDaysCount,
  slas: facilityContract.slas.map((sla) => parseSlaFormInputToSlaInput(sla, mode)),
  termExtensions: facilityContract.termExtensions.map((termExtension) => ({
    daysCount: termExtension.daysCount!,
    feeDifference: termExtension.feeDifference,
    id: termExtension.termExtensionId,
    notes: getStringOrNull(termExtension.notes),
  })),
  typeId: facilityContract.facilityContractType!.id,
});
