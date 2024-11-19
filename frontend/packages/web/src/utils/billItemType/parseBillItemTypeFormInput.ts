import { BillItemTypeInput } from '@realgimm5/frontend-common/gql/types';

import { Applicability } from '../../enums/Applicability';
import { BillItemTypeFormInput } from '../../interfaces/FormInputs/BillItemType';

export const parseBillItemTypeFormInputToBillItemTypeInput = (
  billItemType: BillItemTypeFormInput,
): BillItemTypeInput => ({
  activeExemptVRId: billItemType.activeExemptVR!.id,
  activeNonTaxableVRId: billItemType.activeNonTaxableVR!.id,
  activeSubjectVRId: billItemType.activeSubjectVR!.id,
  administrationVRId: billItemType.administrationVR!.id,
  defaultAccountingItemId: billItemType.defaultAccountingItem?.id,
  description: billItemType.description,
  id: billItemType.billItemTypeId,
  internalCode: billItemType.internalCode,
  isForAdministration: billItemType.applicability.includes(Applicability.Administration),
  isForContractCosts: billItemType.applicability.includes(Applicability.ContractCosts),
  isForContractFee: billItemType.applicability.includes(Applicability.ContractFee),
  isForTax: billItemType.applicability.includes(Applicability.Tax),
  isPositive: billItemType.isPositive!,
  passiveExemptVRId: billItemType.passiveExemptVR!.id,
  passiveNonTaxableVRId: billItemType.passiveNonTaxableVR!.id,
  passiveSubjectVRId: billItemType.passiveSubjectVR!.id,
});
