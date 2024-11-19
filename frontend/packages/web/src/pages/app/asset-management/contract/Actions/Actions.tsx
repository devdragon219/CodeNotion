import { Loader } from '@realgimm5/frontend-common/components';
import { useSnackbar } from '@realgimm5/frontend-common/contexts';
import { parseStringToDate } from '@realgimm5/frontend-common/utils';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ContractBillingPauseConfirmationDialog } from '../../../../../components/dialogs/Contract/BillingPause/BillingPause';
import { ContractReleaseDialog } from '../../../../../components/dialogs/Contract/Release/Release';
import { ContractActions } from '../../../../../components/domains/ContractActions/ContractActions';
import { ContractCounterpartVariationDialog } from '../../../../../components/wizards/ContractCounterpartVariation/ContractCounterpartVariation';
import { ContractVariationDialog } from '../../../../../components/wizards/ContractVariation/ContractVariation';
import { ContractVariation } from '../../../../../enums/ContractVariation';
import { CounterpartVariation } from '../../../../../enums/CounterpartVariation';
import {
  useAddActiveContractTenantsMutation,
  useDeceaseActiveContractTenantMutation,
  useTakeoverActiveContractLandlordMutation,
  useTakeoverActiveContractTenantsMutation,
  useTransferActiveContractTenantsMutation,
} from '../../../../../gql/RealGimm.Web.ActiveContract.operation';
import {
  usePauseContractBillingMutation,
  useReleaseContractMutation,
  useResumeContractBillingMutation,
  useTransferContractManagementSubjectMutation,
} from '../../../../../gql/RealGimm.Web.Contract.operation';
import {
  useAddPassiveContractLandlordsMutation,
  useDeceasePassiveContractLandlordMutation,
  useTakeoverPassiveContractLandlordsMutation,
  useTakeoverPassiveContractTenantMutation,
  useTransferPassiveContractLandlordsMutation,
} from '../../../../../gql/RealGimm.Web.PassiveContract.operation';
import {
  ContractBillingPauseFormInput,
  ContractCounterpartVariationFormInput,
  ContractReleaseFormInput,
  ContractVariationFormInput,
} from '../../../../../interfaces/FormInputs/ContractActions';
import {
  parseContractBillingPauseFormInputToPauseContractBillingVariables,
  parseContractBillingPauseFormInputToResumeContractBillingVariables,
} from '../../../../../utils/contractActions/parseContractBillingPauseFormInput';
import {
  parseContractCounterpartVariationAddFormInputToVariables,
  parseContractCounterpartVariationDeceaseFormInputToVariables,
  parseContractCounterpartVariationTakeoverFormInputToVariables,
  parseContractCounterpartVariationTransferFormInputToVariables,
} from '../../../../../utils/contractActions/parseContractCounterpartVariationFormInput';
import { parseContractReleaseFormInputToReleaseContractVariables } from '../../../../../utils/contractActions/parseContractReleaseFormInput';
import {
  parseContractVariationTakeoverFormInputToTakeoverActiveContractLandlordVariables,
  parseContractVariationTakeoverFormInputToTakeoverPassiveContractTenantVariables,
  parseContractVariationTransferFormInputToTransferContractManagementSubjectVariables,
} from '../../../../../utils/contractActions/parseContractVariationFormInput';
import { ActionsProps } from './Actions.types';

export const Actions = ({ contract, isContractActive, onSuccess }: ActionsProps) => {
  const { t } = useTranslation();
  const { showError, showSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [isBillingPauseDialogOpen, setBillingPauseDialogOpen] = useState(false);
  const [isReleaseContractDialogOpen, setReleaseContractDialogOpen] = useState(false);
  const [isCounterpartVariationDialogOpen, setCounterpartVariationDialogOpen] = useState(false);
  const [isContractVariationDialogOpen, setContractVariationDialogOpen] = useState(false);
  const [, pauseContractBillingMutation] = usePauseContractBillingMutation();
  const [, resumeContractBillingMutation] = useResumeContractBillingMutation();
  const [, releaseContractMutation] = useReleaseContractMutation();
  const [, transferContractManagementSubjectMutation] = useTransferContractManagementSubjectMutation();
  const [, takeoverActiveContractLandlordMutation] = useTakeoverActiveContractLandlordMutation();
  const [, addActiveContractTenantsMutation] = useAddActiveContractTenantsMutation();
  const [, takeoverActiveContractTenantsMutation] = useTakeoverActiveContractTenantsMutation();
  const [, transferActiveContractTenantsMutation] = useTransferActiveContractTenantsMutation();
  const [, deceaseActiveContractTenantMutation] = useDeceaseActiveContractTenantMutation();
  const [, takeoverPassiveContractLandlordMutation] = useTakeoverPassiveContractTenantMutation();
  const [, addPassiveContractLandlordMutation] = useAddPassiveContractLandlordsMutation();
  const [, takeoverPassiveContractLandlordsMutation] = useTakeoverPassiveContractLandlordsMutation();
  const [, transferPassiveContractLandlordsMutation] = useTransferPassiveContractLandlordsMutation();
  const [, deceasePassiveContractLandlordMutation] = useDeceasePassiveContractLandlordMutation();

  const pausedSince = useMemo(
    () =>
      contract.billing.pauses.reduce<Date | null>((_, billingPause) => {
        if (!billingPause.until) {
          return parseStringToDate(billingPause.since);
        }
        return null;
      }, null) ?? null,
    [contract],
  );

  const handleOpenBillingPauseDialog = useCallback(() => {
    setBillingPauseDialogOpen(true);
  }, []);
  const handleCloseBillingPauseDialog = useCallback(() => {
    setBillingPauseDialogOpen(false);
  }, []);
  const handleSaveBillingPause = useCallback(
    async (value: ContractBillingPauseFormInput) => {
      const execute = async () => {
        if (value.until) {
          const result = await resumeContractBillingMutation(
            parseContractBillingPauseFormInputToResumeContractBillingVariables(contract.contractId!, value),
          );
          return result.data?.contract.resumeBilling;
        } else {
          const result = await pauseContractBillingMutation(
            parseContractBillingPauseFormInputToPauseContractBillingVariables(contract.contractId!, value),
          );
          return result.data?.contract.pauseBilling;
        }
      };
      setLoading(true);
      const result = await execute();
      setLoading(false);
      if (result?.isSuccess) {
        showSnackbar(t(`contract.feedback.${value.until ? 'resume' : 'pause'}_billing`), 'success');
        handleCloseBillingPauseDialog();
        onSuccess();
      } else {
        showError(result?.validationErrors);
      }
    },
    [
      resumeContractBillingMutation,
      contract.contractId,
      pauseContractBillingMutation,
      showSnackbar,
      t,
      handleCloseBillingPauseDialog,
      onSuccess,
      showError,
    ],
  );

  const handleOpenReleaseContractDialog = useCallback(() => {
    setReleaseContractDialogOpen(true);
  }, []);
  const handleCloseReleaseContractDialog = useCallback(() => {
    setReleaseContractDialogOpen(false);
  }, []);
  const handleSaveReleaseContract = useCallback(
    async (value: ContractReleaseFormInput) => {
      setLoading(true);
      const result = await releaseContractMutation(
        parseContractReleaseFormInputToReleaseContractVariables(contract.contractId!, value),
      );
      setLoading(false);
      if (result.data?.contract.release.isSuccess) {
        showSnackbar(t('contract.feedback.release_contract'), 'success');
        handleCloseReleaseContractDialog();
        onSuccess();
      } else {
        showError(result.data?.contract.release.validationErrors);
      }
    },
    [
      releaseContractMutation,
      contract.contractId,
      showSnackbar,
      t,
      handleCloseReleaseContractDialog,
      onSuccess,
      showError,
    ],
  );

  const handleOpenCounterpartVariationDialog = useCallback(() => {
    setCounterpartVariationDialogOpen(true);
  }, []);
  const handleCloseCounterpartVariationDialog = useCallback(() => {
    setCounterpartVariationDialogOpen(false);
  }, []);
  const handleSaveCounterpartVariation = useCallback(
    async (counterpartVariation: ContractCounterpartVariationFormInput) => {
      const execute = async () => {
        switch (counterpartVariation.variation) {
          case CounterpartVariation.Add: {
            const variables = parseContractCounterpartVariationAddFormInputToVariables(
              contract.contractId!,
              counterpartVariation.input,
            );
            if (isContractActive) {
              const result = await addActiveContractTenantsMutation(variables);
              return result.data?.activeContract.addTenants;
            } else {
              const result = await addPassiveContractLandlordMutation(variables);
              return result.data?.passiveContract.addLandlords;
            }
          }
          case CounterpartVariation.Takeover: {
            const variables = parseContractCounterpartVariationTakeoverFormInputToVariables(
              contract.contractId!,
              counterpartVariation.input,
            );
            if (isContractActive) {
              const result = await takeoverActiveContractTenantsMutation(variables);
              return result.data?.activeContract.takeoverTenants;
            } else {
              const result = await takeoverPassiveContractLandlordsMutation(variables);
              return result.data?.passiveContract.takeoverLandlords;
            }
          }
          case CounterpartVariation.Transfer: {
            const variables = parseContractCounterpartVariationTransferFormInputToVariables(
              contract.contractId!,
              counterpartVariation.input,
            );
            if (isContractActive) {
              const result = await transferActiveContractTenantsMutation(variables);
              return result.data?.activeContract.transferTenants;
            } else {
              const result = await transferPassiveContractLandlordsMutation(variables);
              return result.data?.passiveContract.transferLandlords;
            }
          }
          case CounterpartVariation.Decease: {
            const variables = parseContractCounterpartVariationDeceaseFormInputToVariables(
              contract.contractId!,
              counterpartVariation.input,
            );
            if (isContractActive) {
              const result = await deceaseActiveContractTenantMutation(variables);
              return result.data?.activeContract.takeoverDeadTenant;
            } else {
              const result = await deceasePassiveContractLandlordMutation(variables);
              return result.data?.passiveContract.takeoverDeadLandlord;
            }
          }
        }
      };

      setLoading(true);
      const result = await execute();
      setLoading(false);
      if (result?.isSuccess) {
        showSnackbar(
          t(`contract.feedback.counterpart_variation.${isContractActive ? 'tenant' : 'landlord'}`),
          'success',
        );
        handleCloseCounterpartVariationDialog();
        onSuccess();
      } else {
        showError(result?.validationErrors);
      }
    },
    [
      addActiveContractTenantsMutation,
      addPassiveContractLandlordMutation,
      contract.contractId,
      deceaseActiveContractTenantMutation,
      deceasePassiveContractLandlordMutation,
      handleCloseCounterpartVariationDialog,
      isContractActive,
      onSuccess,
      showError,
      showSnackbar,
      t,
      takeoverActiveContractTenantsMutation,
      takeoverPassiveContractLandlordsMutation,
      transferActiveContractTenantsMutation,
      transferPassiveContractLandlordsMutation,
    ],
  );

  const handleOpenContractVariationDialog = useCallback(() => {
    setContractVariationDialogOpen(true);
  }, []);
  const handleCloseContractVariationDialog = useCallback(() => {
    setContractVariationDialogOpen(false);
  }, []);
  const handleSaveContractVariation = useCallback(
    async (contractVariation: ContractVariationFormInput) => {
      const execute = async () => {
        switch (contractVariation.variation) {
          case ContractVariation.Takeover: {
            if (isContractActive) {
              const result = await takeoverActiveContractLandlordMutation(
                parseContractVariationTakeoverFormInputToTakeoverActiveContractLandlordVariables(
                  contract.contractId!,
                  contractVariation.input,
                ),
              );
              return result.data?.activeContract.takeoverLandlord;
            } else {
              const result = await takeoverPassiveContractLandlordMutation(
                parseContractVariationTakeoverFormInputToTakeoverPassiveContractTenantVariables(
                  contract.contractId!,
                  contractVariation.input,
                ),
              );
              return result.data?.passiveContract.takeoverTenants;
            }
          }
          case ContractVariation.Transfer: {
            const result = await transferContractManagementSubjectMutation(
              parseContractVariationTransferFormInputToTransferContractManagementSubjectVariables(
                contractVariation.input,
              ),
            );
            return result.data?.contract.transferManagementSubject;
          }
        }
      };

      setLoading(true);
      const result = await execute();
      setLoading(false);
      if (result?.isSuccess) {
        showSnackbar(t(`contract.feedback.contract_variation.${isContractActive ? 'landlord' : 'tenant'}`), 'success');
        handleCloseContractVariationDialog();
        onSuccess();
      } else {
        showError(result?.validationErrors);
      }
    },
    [
      contract.contractId,
      handleCloseContractVariationDialog,
      isContractActive,
      onSuccess,
      showError,
      showSnackbar,
      t,
      takeoverActiveContractLandlordMutation,
      takeoverPassiveContractLandlordMutation,
      transferContractManagementSubjectMutation,
    ],
  );

  return (
    <>
      {loading && <Loader />}
      {isBillingPauseDialogOpen && (
        <ContractBillingPauseConfirmationDialog
          pausedSince={pausedSince}
          onClose={handleCloseBillingPauseDialog}
          onSave={handleSaveBillingPause}
        />
      )}
      {isReleaseContractDialogOpen && (
        <ContractReleaseDialog onClose={handleCloseReleaseContractDialog} onSave={handleSaveReleaseContract} />
      )}
      {isCounterpartVariationDialogOpen && (
        <ContractCounterpartVariationDialog
          contract={contract}
          isActive={isContractActive}
          onClose={handleCloseCounterpartVariationDialog}
          onSave={handleSaveCounterpartVariation}
        />
      )}
      {isContractVariationDialogOpen && (
        <ContractVariationDialog
          contract={contract}
          isActive={isContractActive}
          onClose={handleCloseContractVariationDialog}
          onSave={handleSaveContractVariation}
        />
      )}
      <ContractActions
        isContractActive={isContractActive}
        isContractPaused={!!pausedSince}
        onBillingPause={handleOpenBillingPauseDialog}
        onContractRelease={handleOpenReleaseContractDialog}
        onContractVariation={handleOpenContractVariationDialog}
        onCounterpartVariation={handleOpenCounterpartVariationDialog}
      />
    </>
  );
};
