import { parseDateToString } from '@realgimm5/frontend-common/utils';

import {
  AddActiveContractTenantsMutationVariables,
  DeceaseActiveContractTenantMutationVariables,
  TakeoverActiveContractTenantsMutationVariables,
  TransferActiveContractTenantsMutationVariables,
} from '../../gql/RealGimm.Web.ActiveContract.operation';
import {
  AddPassiveContractLandlordsMutationVariables,
  DeceasePassiveContractLandlordMutationVariables,
  TakeoverPassiveContractLandlordsMutationVariables,
  TransferPassiveContractLandlordsMutationVariables,
} from '../../gql/RealGimm.Web.PassiveContract.operation';
import {
  ContractCounterpartVariationAddFormInput,
  ContractCounterpartVariationDeceaseFormInput,
  ContractCounterpartVariationTakeoverFormInput,
  ContractCounterpartVariationTransferFormInput,
} from '../../interfaces/FormInputs/ContractActions';

export const parseContractCounterpartVariationAddFormInputToVariables = (
  contractId: number,
  counterpartAdd: ContractCounterpartVariationAddFormInput,
): AddActiveContractTenantsMutationVariables | AddPassiveContractLandlordsMutationVariables => ({
  contractId,
  newCounterpartInputs: counterpartAdd.counterparts
    .filter(({ counterpartId }) => counterpartId === null)
    .map((counterpart) => ({
      contractSharePercent: counterpart.contractSharePercent!,
      isMainCounterpart: counterpart.isMainCounterpart,
      since: parseDateToString(counterpart.since)!,
      subjectId: counterpart.subject!.id,
      type: counterpart.counterpartType!,
    })),
  updatedCounterpartInputs: counterpartAdd.counterparts
    .filter(({ counterpartId }) => counterpartId !== null)
    .map((counterpart) => ({
      contractSharePercent: counterpart.contractSharePercent!,
      id: counterpart.counterpartId!,
      isMainCounterpart: counterpart.isMainCounterpart,
      type: counterpart.counterpartType!,
    })),
});

export const parseContractCounterpartVariationTakeoverFormInputToVariables = (
  contractId: number,
  counterpartTakeover: ContractCounterpartVariationTakeoverFormInput,
): TakeoverActiveContractTenantsMutationVariables | TakeoverPassiveContractLandlordsMutationVariables => ({
  contractId,
  newCounterpartInputs: counterpartTakeover.counterparts
    .filter(({ counterpartId }) => counterpartId === null)
    .map((counterpart) => ({
      contractSharePercent: counterpart.contractSharePercent!,
      isMainCounterpart: counterpart.isMainCounterpart,
      subjectId: counterpart.subject!.id,
      type: counterpart.counterpartType!,
    })),
  takeoverDate: parseDateToString(counterpartTakeover.takeoverDate)!,
  takeoverType: counterpartTakeover.takeoverType!,
  updatedCounterpartInputs: counterpartTakeover.counterparts
    .filter(({ counterpartId }) => counterpartId !== null)
    .map((counterpart) => ({
      contractSharePercent: counterpart.contractSharePercent!,
      id: counterpart.counterpartId!,
      isMainCounterpart: counterpart.isMainCounterpart,
    })),
});

export const parseContractCounterpartVariationTransferFormInputToVariables = (
  contractId: number,
  counterpartTransfer: ContractCounterpartVariationTransferFormInput,
): TransferActiveContractTenantsMutationVariables | TransferPassiveContractLandlordsMutationVariables => ({
  contractId,
  newCounterpartInputs: counterpartTransfer.counterparts
    .filter(({ counterpartId }) => counterpartId === null)
    .map((counterpart) => ({
      contractSharePercent: counterpart.contractSharePercent!,
      isMainCounterpart: counterpart.isMainCounterpart,
      subjectId: counterpart.subject!.id,
      type: counterpart.counterpartType!,
    })),
  transferDate: parseDateToString(counterpartTransfer.takeoverDate)!,
  updatedCounterpartInputs: counterpartTransfer.counterparts
    .filter(({ counterpartId }) => counterpartId !== null)
    .map((counterpart) => ({
      contractSharePercent: counterpart.contractSharePercent!,
      id: counterpart.counterpartId!,
      isMainCounterpart: counterpart.isMainCounterpart,
    })),
});

export const parseContractCounterpartVariationDeceaseFormInputToVariables = (
  contractId: number,
  counterpartDecease: ContractCounterpartVariationDeceaseFormInput,
): DeceaseActiveContractTenantMutationVariables | DeceasePassiveContractLandlordMutationVariables => ({
  contractId,
  deadCounterpartId: counterpartDecease.originalCounterpart!.counterpartId!,
  heirInputs: counterpartDecease.counterparts
    .filter(({ counterpartId }) => counterpartId === null)
    .map((counterpart) => ({
      contractSharePercent: counterpart.contractSharePercent!,
      isMainCounterpart: counterpart.isMainCounterpart,
      subjectId: counterpart.subject!.id,
      takeoverDate: parseDateToString(counterpart.since)!,
      type: counterpart.counterpartType!,
    })),
  updatedCounterpartInputs: counterpartDecease.counterparts
    .filter(({ counterpartId }) => counterpartId !== null)
    .map((counterpart) => ({
      contractSharePercent: counterpart.contractSharePercent!,
      id: counterpart.counterpartId!,
      isMainCounterpart: counterpart.isMainCounterpart,
    })),
});
