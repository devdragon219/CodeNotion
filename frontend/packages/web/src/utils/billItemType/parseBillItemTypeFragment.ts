import { Applicability } from '../../enums/Applicability';
import { BillItemTypeFragment } from '../../gql/RealGimm.Web.BillItemType.fragment';
import { BillItemTypeFormInput } from '../../interfaces/FormInputs/BillItemType';

export const parseBillItemTypeToBillItemTypeFormInput = (
  billItemType: BillItemTypeFragment,
): BillItemTypeFormInput => ({
  activeExemptVR: billItemType.activeExemptVR,
  activeNonTaxableVR: billItemType.activeNonTaxableVR,
  activeSubjectVR: billItemType.activeSubjectVR,
  administrationVatRateType: billItemType.administrationVR.type,
  administrationVR: billItemType.administrationVR,
  applicability: [
    billItemType.isForAdministration ? Applicability.Administration : undefined,
    billItemType.isForContractCosts ? Applicability.ContractCosts : undefined,
    billItemType.isForContractFee ? Applicability.ContractFee : undefined,
    billItemType.isForTax ? Applicability.Tax : undefined,
  ].filter((it) => !!it),
  billItemTypeId: billItemType.id,
  defaultAccountingItem: billItemType.defaultAccountingItem ?? null,
  description: billItemType.description,
  internalCode: billItemType.internalCode,
  isPositive: billItemType.isPositive,
  passiveExemptVR: billItemType.passiveExemptVR,
  passiveNonTaxableVR: billItemType.passiveNonTaxableVR,
  passiveSubjectVR: billItemType.passiveSubjectVR,
});
