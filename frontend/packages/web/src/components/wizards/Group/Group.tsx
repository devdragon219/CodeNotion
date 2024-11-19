import { CloseDialog, Dialog, Stepper } from '@realgimm5/frontend-common/components';
import { useStepper } from '@realgimm5/frontend-common/hooks';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getEmptyGroupFormInput } from '../../../utils/group/initialValues';
import { getGroupSchema } from '../../../utils/group/schemas/group';
import { GroupGeneralDataStep } from './GeneralData/GeneralData';
import { GroupCreateDialogProps } from './Group.types';
import { GroupPermissionsStep } from './Permissions/Permissions';
import { GroupRecapStep } from './Recap/Recap';

export const GroupCreateDialog = ({ onClose, onSave }: GroupCreateDialogProps) => {
  const { t } = useTranslation();
  const { activeStep, error, handleBack, handleEdit, handleError, handleNext } = useStepper();
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);
  const [group, setGroup] = useState(getEmptyGroupFormInput());
  const canSave = useMemo(() => getGroupSchema(t).isValidSync(group), [group, t]);

  const openCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(true);
  }, []);
  const closeCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(false);
  }, []);

  const handleWorkingClose = useCallback(() => {
    onSave(group);
  }, [group, onSave]);
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
    <Dialog fullScreen open title="group.dialog.create.title" onClose={openCloseConfirmationDialog}>
      <Stepper
        activeStep={activeStep}
        error={error}
        steps={[
          {
            label: 'group.tab.general_data',
            children: (
              <GroupGeneralDataStep group={group} onChange={setGroup} onError={handleError} onNext={handleNext} />
            ),
          },
          {
            label: 'group.tab.permissions',
            children: (
              <GroupPermissionsStep
                group={group}
                onChange={setGroup}
                onError={handleError}
                onBack={handleBack}
                onNext={handleNext}
              />
            ),
          },
          {
            label: 'group.tab.recap',
            children: <GroupRecapStep group={group} onBack={handleBack} onEdit={handleEdit} onSave={onSave} />,
          },
        ]}
      />
    </Dialog>
  );
};
