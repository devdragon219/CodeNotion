import { CheckCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { Dialog, DialogContent, RadioGroupField, SectionTitle } from '@realgimm5/frontend-common/components';
import { useStepper } from '@realgimm5/frontend-common/hooks';
import { ParseKeys } from 'i18next';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ContractVariation } from '../../../enums/ContractVariation';
import {
  ContractVariationTakeoverFormInput,
  ContractVariationTransferFormInput,
} from '../../../interfaces/FormInputs/ContractActions';
import {
  getEmptyContractVariationTakeoverFormInput,
  getEmptyContractVariationTransferFormInput,
} from '../../../utils/contractActions/initialValues';
import { ContractVariationDialogProps } from './ContractVariation.types';
import { ContractTakeover } from './Takeover/Takeover';
import { ContractTransferStepper } from './Transfer/Transfer';

export const ContractVariationDialog = ({ contract, isActive, onClose, onSave }: ContractVariationDialogProps) => {
  const { t } = useTranslation();
  const stepperProps = useStepper();
  const [isStepperVisible, setStepperVisible] = useState(false);
  const [variation, setVariation] = useState<ContractVariation | null>(null);
  const [contractTakeover, setContractTakeover] = useState(getEmptyContractVariationTakeoverFormInput());
  const [contractTransfer, setContractTransfer] = useState(getEmptyContractVariationTransferFormInput(contract));

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
      return `core.enum.contract_${isActive ? 'landlord' : 'tenant'}_variation.${variation}`;
    }
    return `contract.dialog.contract_variation.title.${isActive ? 'landlord' : 'tenant'}`;
  }, [isStepperVisible, variation, isActive]);

  const getStepper = useCallback(() => {
    if (!variation) return null;

    switch (variation) {
      case ContractVariation.Takeover: {
        const handleSave = (input: ContractVariationTakeoverFormInput) => {
          onSave({
            input,
            variation,
          });
        };
        return (
          <ContractTakeover
            contract={contract}
            contractTakeover={contractTakeover}
            isActive={isActive}
            onBack={handleBack}
            onChange={setContractTakeover}
            onSave={handleSave}
          />
        );
      }
      case ContractVariation.Transfer: {
        const handleSave = (input: ContractVariationTransferFormInput) => {
          onSave({
            input,
            variation,
          });
        };
        return (
          <ContractTransferStepper
            {...stepperProps}
            contract={contract}
            contractTransfer={contractTransfer}
            isActive={isActive}
            onBack={handleBack}
            onChange={setContractTransfer}
            onSave={handleSave}
          />
        );
      }
    }
  }, [contract, contractTakeover, contractTransfer, handleBack, isActive, onSave, stepperProps, variation]);

  return (
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
            <SectionTitle value={`contract.section_title.contract_${isActive ? 'landlord' : 'tenant'}_variation`} />
            <Grid2 size={12}>
              <RadioGroupField
                options={Object.values(ContractVariation).map((value) => ({
                  label: t(`core.enum.contract_${isActive ? 'landlord' : 'tenant'}_variation.${value}`),
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
