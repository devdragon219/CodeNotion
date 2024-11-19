import { parseDateToString } from '@realgimm5/frontend-common/utils';

import { ContractFormInput } from '../../interfaces/FormInputs/Contract';
import {
  ContractBillingPauseFormInput,
  ContractCounterpartVariationAddFormInput,
  ContractCounterpartVariationDeceaseFormInput,
  ContractCounterpartVariationTakeoverFormInput,
  ContractCounterpartVariationTransferFormInput,
  ContractReleaseFormInput,
  ContractVariationTakeoverFormInput,
  ContractVariationTransferFormInput,
} from '../../interfaces/FormInputs/ContractActions';

export const getEmptyContractBillingPauseFormInput = (): ContractBillingPauseFormInput => ({
  isRecoveryArrears: false,
  notes: '',
  since: null,
  until: null,
});

export const getEmptyContractReleaseFormInput = (): ContractReleaseFormInput => ({
  date: null,
  isOccupiedWithoutRight: false,
  reason: null,
});

export const getEmptyContractCounterpartVariationTakeoverFormInput =
  (): ContractCounterpartVariationTakeoverFormInput => ({
    counterparts: [],
    originalCounterparts: [],
    takeoverCounterparts: [],
    takeoverDate: null,
    takeoverLegalRepresentativeSubject: null,
    takeoverType: null,
  });

export const getEmptyContractCounterpartVariationAddFormInput = (): ContractCounterpartVariationAddFormInput => ({
  counterparts: [],
  newCounterparts: [],
});

export const getEmptyContractCounterpartVariationTransferFormInput =
  (): ContractCounterpartVariationTransferFormInput => ({
    counterparts: [],
    originalCounterparts: [],
    takeoverCounterparts: [],
    takeoverDate: null,
    takeoverLegalRepresentativeSubject: null,
  });

export const getEmptyContractCounterpartVariationDeceaseFormInput =
  (): ContractCounterpartVariationDeceaseFormInput => ({
    counterparts: [],
    originalCounterpart: null,
    takeoverCounterparts: [],
  });

export const getEmptyContractVariationTakeoverFormInput = (): ContractVariationTakeoverFormInput => ({
  counterparts: [],
  paymentDate: null,
  takeoverLegalRepresentativeSubject: null,
});

export const getEmptyContractVariationTransferFormInput = (
  currentContract: ContractFormInput,
): ContractVariationTransferFormInput => ({
  contracts: [
    {
      counterpartName:
        currentContract.counterparts.find(({ isMainCounterpart }) => isMainCounterpart)?.subject?.name ?? '',
      effectStartDate: parseDateToString(currentContract.effectStartDate) ?? '',
      id: currentContract.contractId!,
      internalCode: currentContract.internalCode,
      typeDescription: currentContract.contractType!.description,
    },
  ],
  managementSubject: null,
  paymentDate: null,
  takeoverDate: null,
  takeoverLegalRepresentativeSubject: null,
  takeoverType: null,
});
