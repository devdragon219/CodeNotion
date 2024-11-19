import { CloseDialog, Dialog, Stepper, Tab } from '@realgimm5/frontend-common/components';
import { useDebounce, useStepper } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useUtilityService } from '../../../hooks/useUtilityService';
import { getEmptyUtilityServiceFormInput } from '../../../utils/utilityService/initialValues';
import { getUtilityServiceSchema } from '../../../utils/utilityService/schemas/utilityService';
import { UtilityServiceEstateUnitsStep } from './EstateUnits/EstateUnits';
import { UtilityServiceEstateStep } from './Estates/Estates';
import { UtilityServiceGeneralDataStep } from './GeneralData/GeneralData';
import { UtilityServiceRecapStep } from './Recap/Recap';
import { UtilityServiceCreateDialogProps } from './UtilityService.types';

export const UtilityServiceCreateDialog = ({ currentEstates, onClose, onSave }: UtilityServiceCreateDialogProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { activeStep, error, handleBack, handleEdit, handleError, handleNext } = useStepper();
  const { checkCanUseInternalCode } = useUtilityService();
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);
  const [utilityService, setUtilityService] = useState(getEmptyUtilityServiceFormInput());
  const debouncedUtilityService = useDebounce(utilityService);
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);

  useEffect(() => {
    checkCanUseInternalCode(
      debouncedUtilityService.internalCode,
      debouncedUtilityService.utilityServiceId,
      setCanUseInternalCode,
    );
    // eslint-disable-next-line
  }, [debouncedUtilityService.internalCode, debouncedUtilityService.utilityServiceId]);

  const canSave = useMemo(
    () => getUtilityServiceSchema(canUseInternalCode, language, t).isValidSync(utilityService),
    [canUseInternalCode, language, utilityService, t],
  );

  const openCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(true);
  }, []);
  const closeCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(false);
  }, []);

  const handleWorkingClose = useCallback(() => {
    onSave(utilityService);
  }, [utilityService, onSave]);
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
    <Dialog
      fullScreen
      open
      title={`utility_service.dialog.${currentEstates ? 'estates' : 'create.title'}`}
      onClose={currentEstates ? onClose : openCloseConfirmationDialog}
    >
      <Stepper
        activeStep={activeStep}
        error={error}
        steps={[
          ...((currentEstates
            ? []
            : [
                {
                  label: 'utility_service.tab.general_data',
                  children: (
                    <UtilityServiceGeneralDataStep
                      canUseInternalCode={canUseInternalCode}
                      utilityService={utilityService}
                      onChange={setUtilityService}
                      onError={handleError}
                      onNext={handleNext}
                    />
                  ),
                },
              ]) as Tab[]),
          {
            label: 'utility_service.tab.estates',
            children: (
              <UtilityServiceEstateStep
                currentEstates={currentEstates}
                utilityService={utilityService}
                onBack={handleBack}
                onChange={setUtilityService}
                onError={handleError}
                onNext={handleNext}
              />
            ),
          },
          {
            label: 'utility_service.tab.estate_units',
            children: (
              <UtilityServiceEstateUnitsStep
                utilityService={utilityService}
                onBack={handleBack}
                onChange={setUtilityService}
                onError={handleError}
                onNext={currentEstates ? handleWorkingClose : handleNext}
              />
            ),
          },
          ...((currentEstates
            ? []
            : [
                {
                  label: 'utility_service.tab.recap',
                  children: (
                    <UtilityServiceRecapStep
                      utilityService={utilityService}
                      onBack={handleBack}
                      onEdit={handleEdit}
                      onSave={onSave}
                    />
                  ),
                },
              ]) as Tab[]),
        ]}
      />
    </Dialog>
  );
};
