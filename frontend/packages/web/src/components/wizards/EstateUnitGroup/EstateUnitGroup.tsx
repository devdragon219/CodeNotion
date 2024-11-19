import { CloseDialog, Dialog, Stepper } from '@realgimm5/frontend-common/components';
import { useDebounce, useStepper } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useEstateUnitGroup } from '../../../hooks/useEstateUnitGroup';
import { getEmptyEstateUnitGroupFormInput } from '../../../utils/estateUnitGroup/initialValues';
import { getEstateUnitGroupSchema } from '../../../utils/estateUnitGroup/schemas/estateUnitGroup';
import { EstateUnitGroupCreateDialogProps } from './EstateUnitGroup.types';
import { EstateUnitGroupEstateUnitsStep } from './EstateUnits/EstateUnits';
import { EstateUnitGroupGeneralDataStep } from './GeneralData/GeneralData';

export const EstateUnitGroupCreateDialog = ({ onClose, onSave }: EstateUnitGroupCreateDialogProps) => {
  const { t } = useTranslation();
  const { activeStep, error, handleBack, handleError, handleNext } = useStepper();
  const { checkCanUseInternalCode } = useEstateUnitGroup();
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);
  const [estateUnitGroup, setEstateUnitGroup] = useState(getEmptyEstateUnitGroupFormInput());
  const debouncedEstateUnitGroup = useDebounce(estateUnitGroup);
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);

  useEffect(() => {
    checkCanUseInternalCode(
      debouncedEstateUnitGroup.internalCode,
      debouncedEstateUnitGroup.estateUnitGroupId,
      setCanUseInternalCode,
    );
    // eslint-disable-next-line
  }, [debouncedEstateUnitGroup.internalCode, debouncedEstateUnitGroup.estateUnitGroupId]);

  const canSave = useMemo(
    () => getEstateUnitGroupSchema(canUseInternalCode, t).isValidSync(estateUnitGroup),
    [canUseInternalCode, estateUnitGroup, t],
  );

  const openCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(true);
  }, []);
  const closeCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(false);
  }, []);

  const handleWorkingClose = useCallback(() => {
    onSave(estateUnitGroup);
  }, [estateUnitGroup, onSave]);
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
    <Dialog fullScreen open title="estate_unit_group.dialog.create.title" onClose={openCloseConfirmationDialog}>
      <Stepper
        activeStep={activeStep}
        error={error}
        steps={[
          {
            label: 'estate_unit_group.tab.general_data',
            children: (
              <EstateUnitGroupGeneralDataStep
                canUseInternalCode={canUseInternalCode}
                estateUnitGroup={estateUnitGroup}
                onChange={setEstateUnitGroup}
                onError={handleError}
                onNext={handleNext}
              />
            ),
          },
          {
            label: 'estate_unit_group.tab.estate_units',
            children: (
              <EstateUnitGroupEstateUnitsStep
                estateUnitGroup={estateUnitGroup}
                onBack={handleBack}
                onChange={setEstateUnitGroup}
                onError={handleError}
                onSave={onSave}
              />
            ),
          },
        ]}
      />
    </Dialog>
  );
};
