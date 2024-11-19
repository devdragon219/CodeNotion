import { CloseDialog, Dialog, Stepper } from '@realgimm5/frontend-common/components';
import { useStepper } from '@realgimm5/frontend-common/hooks';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getEmptyAdministrationTermFormInput } from '../../../utils/administrationTerm/initialValues';
import { getAdministrationTermSchema } from '../../../utils/administrationTerm/schemas/administrationTerm';
import { AdministrationTermCreateDialogProps } from './AdministrationTerm.types';
import { AdministrationTermGeneralDataStep } from './GeneralData/GeneralData';
import { AdministrationTermInstallmentsStep } from './Installments/Installments';
import { AdministrationTermRecapStep } from './Recap/Recap';

export const AdministrationTermCreateDialog = ({
  administration,
  existingAdministrationTerms,
  onClose,
  onSave,
}: AdministrationTermCreateDialogProps) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { activeStep, error, handleBack, handleEdit, handleError, handleNext } = useStepper();
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);
  const [administrationTerm, setAdministrationTerm] = useState(getEmptyAdministrationTermFormInput());

  const canSave = useMemo(
    () =>
      getAdministrationTermSchema(
        administrationTerm,
        existingAdministrationTerms,
        language,
        t,
        administration,
      ).isValidSync(administrationTerm),
    [administration, administrationTerm, existingAdministrationTerms, language, t],
  );

  const openCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(true);
  }, []);
  const closeCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(false);
  }, []);

  const handleWorkingClose = useCallback(() => {
    onSave(administrationTerm);
  }, [administrationTerm, onSave]);
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
    <Dialog fullScreen open title="administration_term.dialog.create.title" onClose={openCloseConfirmationDialog}>
      <Stepper
        activeStep={activeStep}
        error={error}
        steps={[
          {
            label: 'administration_term.tab.general_data',
            children: (
              <AdministrationTermGeneralDataStep
                administration={administration}
                administrationTerm={administrationTerm}
                onChange={setAdministrationTerm}
                onError={handleError}
                onNext={handleNext}
                existingAdministrationTerms={existingAdministrationTerms}
              />
            ),
          },
          {
            label: 'administration_term.tab.installments',
            children: (
              <AdministrationTermInstallmentsStep
                administrationTerm={administrationTerm}
                onBack={handleBack}
                onChange={setAdministrationTerm}
                onError={handleError}
                onNext={handleNext}
              />
            ),
          },
          {
            label: 'administration_term.tab.recap',
            children: (
              <AdministrationTermRecapStep
                administrationTerm={administrationTerm}
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
