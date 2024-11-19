import { CloseDialog, Dialog, Stepper } from '@realgimm5/frontend-common/components';
import { useDebounce, useStepper } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useContractType } from '../../../hooks/useContractType';
import { getEmptyContractTypeFormInput } from '../../../utils/contractType/initialValues';
import { getContractTypeSchema } from '../../../utils/contractType/schemas/contractType';
import { ContractTypeDialogProps } from './ContractType.types';
import { ContractTypeGeneralDataStep } from './GeneralData/GeneralData';
import { ContractTypeParametricDataStep } from './ParametricData/ParametricData';
import { ContractTypeRecapStep } from './Recap/Recap';

export const ContractTypeCreateDialog = ({ onClose, onSave }: ContractTypeDialogProps) => {
  const { t } = useTranslation();
  const { activeStep, error, handleBack, handleEdit, handleError, handleNext } = useStepper();
  const { checkCanUseInternalCode } = useContractType();
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);
  const [contractType, setContractType] = useState(getEmptyContractTypeFormInput());
  const debouncedContractType = useDebounce(contractType);
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);

  useEffect(() => {
    checkCanUseInternalCode(
      debouncedContractType.internalCode,
      debouncedContractType.contractTypeId,
      setCanUseInternalCode,
    );
    // eslint-disable-next-line
  }, [debouncedContractType.internalCode, debouncedContractType.contractTypeId]);

  const canSave = useMemo(
    () => getContractTypeSchema(canUseInternalCode, t).isValidSync(contractType),
    [canUseInternalCode, contractType, t],
  );

  const openCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(true);
  }, []);
  const closeCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(false);
  }, []);

  const handleWorkingClose = useCallback(() => {
    onSave(contractType);
  }, [contractType, onSave]);
  const handleDestructiveClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return isCloseConfirmationDialogOpen ? (
    <CloseDialog
      canSave={canSave}
      onCancel={closeCloseConfirmationDialog}
      onSave={handleWorkingClose}
      onClose={handleDestructiveClose}
    />
  ) : (
    <Dialog fullScreen open title="contract_type.dialog.create.title" onClose={openCloseConfirmationDialog}>
      <Stepper
        activeStep={activeStep}
        error={error}
        steps={[
          {
            label: 'contract_type.tab.general_data',
            children: (
              <ContractTypeGeneralDataStep
                contractType={contractType}
                canUseInternalCode={canUseInternalCode}
                onChange={setContractType}
                onNext={handleNext}
                onError={handleError}
              />
            ),
          },
          {
            label: 'contract_type.tab.parametric_data',
            children: (
              <ContractTypeParametricDataStep
                contractType={contractType}
                onChange={setContractType}
                onBack={handleBack}
                onNext={handleNext}
                onError={handleError}
              />
            ),
          },
          {
            label: 'contract_type.tab.recap',
            children: (
              <ContractTypeRecapStep
                contractType={contractType}
                onBack={handleBack}
                onEdit={handleEdit}
                onSave={onSave}
              />
            ),
          },
        ]}
      />
    </Dialog>
  );
};
