import { CloseDialog, Dialog, Stepper } from '@realgimm5/frontend-common/components';
import { useDebounce, useStepper } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useUtilityType } from '../../../hooks/useUtilityType';
import { getEmptyUtilityTypeFormInput } from '../../../utils/utilityType/initialValues';
import { getUtilityTypeSchema } from '../../../utils/utilityType/schemas/utilityType';
import { UtilityTypeFieldsStep } from './Fields/Fields';
import { UtilityTypeGeneralDataStep } from './GeneralData/GeneralData';
import { UtilityTypeRecapStep } from './Recap/Recap';
import { UtilityTypeCreateDialogProps } from './UtilityType.types';

export const UtilityTypeCreateDialog = ({ onClose, onSave }: UtilityTypeCreateDialogProps) => {
  const { t } = useTranslation();
  const { activeStep, error, handleBack, handleEdit, handleError, handleNext } = useStepper();
  const { checkCanUseInternalCode } = useUtilityType();
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);
  const [utilityType, setUtilityType] = useState(getEmptyUtilityTypeFormInput());
  const debouncedUtilityType = useDebounce(utilityType);
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);

  useEffect(() => {
    checkCanUseInternalCode(
      debouncedUtilityType.internalCode,
      debouncedUtilityType.utilityTypeId,
      setCanUseInternalCode,
    );
    // eslint-disable-next-line
  }, [debouncedUtilityType.internalCode, debouncedUtilityType.utilityTypeId]);

  const canSave = useMemo(
    () => getUtilityTypeSchema(canUseInternalCode, t).isValidSync(utilityType),
    [canUseInternalCode, t, utilityType],
  );

  const openCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(true);
  }, []);
  const closeCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(false);
  }, []);

  const handleWorkingClose = useCallback(() => {
    onSave(utilityType);
  }, [utilityType, onSave]);
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
    <Dialog fullScreen open title="utility_type.dialog.create.title" onClose={openCloseConfirmationDialog}>
      <Stepper
        activeStep={activeStep}
        error={error}
        steps={[
          {
            label: 'utility_type.tab.general_data',
            children: (
              <UtilityTypeGeneralDataStep
                canUseInternalCode={canUseInternalCode}
                utilityType={utilityType}
                onChange={setUtilityType}
                onError={handleError}
                onNext={handleNext}
              />
            ),
          },
          {
            label: 'utility_type.tab.fields',
            children: (
              <UtilityTypeFieldsStep
                utilityType={utilityType}
                onBack={handleBack}
                onChange={setUtilityType}
                onError={handleError}
                onNext={handleNext}
              />
            ),
          },
          {
            label: 'utility_type.tab.recap',
            children: (
              <UtilityTypeRecapStep utilityType={utilityType} onBack={handleBack} onEdit={handleEdit} onSave={onSave} />
            ),
          },
        ]}
      />
    </Dialog>
  );
};
