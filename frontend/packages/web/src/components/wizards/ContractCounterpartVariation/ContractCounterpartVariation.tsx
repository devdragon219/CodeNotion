import { CheckCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { Dialog, DialogContent, Loader, RadioGroupField, SectionTitle } from '@realgimm5/frontend-common/components';
import { useSnackbar } from '@realgimm5/frontend-common/contexts';
import { useStepper } from '@realgimm5/frontend-common/hooks';
import { parseDateToString, parseStringToDate } from '@realgimm5/frontend-common/utils';
import { ParseKeys } from 'i18next';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CounterpartVariation } from '../../../enums/CounterpartVariation';
import { useAddHeirsMutation } from '../../../gql/RealGimm.Web.Subject.operation';
import {
  ContractCounterpartVariationAddFormInput,
  ContractCounterpartVariationDeceaseFormInput,
  ContractCounterpartVariationTakeoverFormInput,
  ContractCounterpartVariationTransferFormInput,
} from '../../../interfaces/FormInputs/ContractActions';
import { SubjectHeirFormInput } from '../../../interfaces/FormInputs/Subject';
import {
  getEmptyContractCounterpartVariationAddFormInput,
  getEmptyContractCounterpartVariationDeceaseFormInput,
  getEmptyContractCounterpartVariationTakeoverFormInput,
  getEmptyContractCounterpartVariationTransferFormInput,
} from '../../../utils/contractActions/initialValues';
import { HeirDialog } from '../../dialogs/Heir/Heir';
import { HeirDialogInput } from '../../dialogs/Heir/Heir.types';
import { CounterpartAddStepper } from './Add/Add';
import { ContractCounterpartVariationDialogProps } from './ContractCounterpartVariation.types';
import { CounterpartDeceaseStepper } from './Decease/Decease';
import { CounterpartTakeoverStepper } from './Takeover/Takeover';
import { CounterpartTransferStepper } from './Transfer/Transfer';

export const ContractCounterpartVariationDialog = ({
  contract,
  isActive,
  onClose,
  onSave,
}: ContractCounterpartVariationDialogProps) => {
  const { t } = useTranslation();
  const { showError, showSnackbar } = useSnackbar();
  const stepperProps = useStepper();
  const [loading, setLoading] = useState(false);
  const [, addHeirsMutation] = useAddHeirsMutation();
  const [addHeirDialogProps, setHeirDialogProps] = useState<{
    open: boolean;
    onComplete?: () => void;
  }>({
    open: false,
  });
  const [isStepperVisible, setStepperVisible] = useState(false);
  const [variation, setVariation] = useState<CounterpartVariation | null>(null);
  const [counterpartAdd, setCounterpartAdd] = useState(getEmptyContractCounterpartVariationAddFormInput());
  const [counterpartDecease, setCounterpartDecease] = useState(getEmptyContractCounterpartVariationDeceaseFormInput());
  const [counterpartTakeover, setCounterpartTakeover] = useState(
    getEmptyContractCounterpartVariationTakeoverFormInput(),
  );
  const [counterpartTransfer, setCounterpartTransfer] = useState(
    getEmptyContractCounterpartVariationTransferFormInput(),
  );

  const handleContinue = useCallback(() => {
    if (variation) {
      setStepperVisible(true);
    }
  }, [variation]);
  const handleBack = useCallback(() => {
    setStepperVisible(false);
  }, []);

  const title = useMemo((): ParseKeys => {
    if (isStepperVisible && variation) {
      return `core.enum.counterpart_${isActive ? 'tenant' : 'landlord'}_variation.${variation}`;
    }
    return `contract.dialog.counterpart_variation.title.${isActive ? 'tenant' : 'landlord'}`;
  }, [isStepperVisible, variation, isActive]);

  const openAddHeirDialog = useCallback((onComplete: () => void) => {
    setHeirDialogProps({
      open: true,
      onComplete,
    });
  }, []);
  const closeAddHeirDialog = useCallback(() => {
    setHeirDialogProps({
      open: false,
    });
  }, []);
  const handleSaveHeir = useCallback(
    async (value: SubjectHeirFormInput[] | HeirDialogInput) => {
      if (Array.isArray(value) && value.length > 0) {
        setLoading(true);
        const result = await addHeirsMutation({
          subjectId: counterpartDecease.originalCounterpart!.subject!.id,
          heirs: value.map(({ heir, since }) => ({
            id: heir!.id,
            since: parseDateToString(since),
          })),
        });
        setLoading(false);
        if (result.data?.subject.addHeirs.isSuccess) {
          showSnackbar(t(`contract.feedback.heir.${value.length === 1 ? 'single' : 'multiple'}`), 'success');
          addHeirDialogProps.onComplete?.();
          closeAddHeirDialog();
        } else {
          showError(result.data?.subject.addHeirs.validationErrors);
        }
      } else {
        closeAddHeirDialog();
      }
    },
    [
      addHeirsMutation,
      counterpartDecease.originalCounterpart,
      showSnackbar,
      t,
      addHeirDialogProps,
      closeAddHeirDialog,
      showError,
    ],
  );

  const getStepper = useCallback(() => {
    if (!variation) return null;

    switch (variation) {
      case CounterpartVariation.Add: {
        const handleSave = (input: ContractCounterpartVariationAddFormInput) => {
          onSave({
            input,
            variation,
          });
        };
        return (
          <CounterpartAddStepper
            {...stepperProps}
            contract={contract}
            counterpartAdd={counterpartAdd}
            isActive={isActive}
            onBack={handleBack}
            onChange={setCounterpartAdd}
            onSave={handleSave}
          />
        );
      }
      case CounterpartVariation.Takeover: {
        const handleSave = (input: ContractCounterpartVariationTakeoverFormInput) => {
          onSave({
            input,
            variation,
          });
        };
        return (
          <CounterpartTakeoverStepper
            {...stepperProps}
            contract={contract}
            counterpartTakeover={counterpartTakeover}
            isActive={isActive}
            onBack={handleBack}
            onChange={setCounterpartTakeover}
            onSave={handleSave}
          />
        );
      }
      case CounterpartVariation.Transfer: {
        const handleSave = (input: ContractCounterpartVariationTransferFormInput) => {
          onSave({
            input,
            variation,
          });
        };
        return (
          <CounterpartTransferStepper
            {...stepperProps}
            contract={contract}
            counterpartTransfer={counterpartTransfer}
            isActive={isActive}
            onBack={handleBack}
            onChange={setCounterpartTransfer}
            onSave={handleSave}
          />
        );
      }
      case CounterpartVariation.Decease: {
        const handleSave = (input: ContractCounterpartVariationDeceaseFormInput) => {
          onSave({
            input,
            variation,
          });
        };
        return (
          <CounterpartDeceaseStepper
            {...stepperProps}
            contract={contract}
            counterpartDecease={counterpartDecease}
            isActive={isActive}
            onAddHeir={openAddHeirDialog}
            onBack={handleBack}
            onChange={setCounterpartDecease}
            onSave={handleSave}
          />
        );
      }
    }
  }, [
    contract,
    counterpartAdd,
    counterpartDecease,
    counterpartTakeover,
    counterpartTransfer,
    handleBack,
    isActive,
    onSave,
    openAddHeirDialog,
    stepperProps,
    variation,
  ]);

  const selectedHeirs = useMemo(
    () =>
      counterpartDecease.originalCounterpart?.subject?.heirs.map(({ subordinate, since }) => ({
        heir: {
          id: subordinate.id,
          name: subordinate.name,
        },
        since: parseStringToDate(since),
      })) ?? [],
    [counterpartDecease.originalCounterpart],
  );
  const subjectId = useMemo(
    () => counterpartDecease.originalCounterpart?.subject?.id,
    [counterpartDecease.originalCounterpart?.subject?.id],
  );
  const owningManagementSubjectIds = useMemo(
    () => counterpartDecease.originalCounterpart?.subject?.owningMgmtSubjects.map(({ main }) => main.id) ?? [],
    [counterpartDecease.originalCounterpart?.subject?.owningMgmtSubjects],
  );

  return addHeirDialogProps.open ? (
    <>
      {loading && <Loader />}
      <HeirDialog
        owningManagementSubjectIds={owningManagementSubjectIds}
        selectedHeirs={selectedHeirs}
        subjectId={subjectId}
        onClose={closeAddHeirDialog}
        onSave={handleSaveHeir}
      />
    </>
  ) : (
    <Dialog fullScreen open title={title} onClose={onClose}>
      {isStepperVisible ? (
        getStepper()
      ) : (
        <DialogContent
          action={
            <Button color="primary" variant="contained" startIcon={<CheckCircleOutline />} onClick={handleContinue}>
              {t('common.button.continue')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }}>
            <SectionTitle value={`contract.section_title.counterparts_${isActive ? 'tenant' : 'landlord'}_variation`} />
            <Grid2 size={12}>
              <RadioGroupField
                options={Object.values(CounterpartVariation).map((value) => ({
                  label: t(`core.enum.counterpart_${isActive ? 'tenant' : 'landlord'}_variation.${value}`),
                  value,
                }))}
                value={variation}
                onChange={setVariation}
              />
            </Grid2>
          </Grid2>
        </DialogContent>
      )}
    </Dialog>
  );
};
