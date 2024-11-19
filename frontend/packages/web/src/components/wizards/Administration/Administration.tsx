import { CloseDialog, Dialog, Stepper } from '@realgimm5/frontend-common/components';
import { TableProvider } from '@realgimm5/frontend-common/contexts';
import { useStepper } from '@realgimm5/frontend-common/hooks';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useGetAdministrationsFullQuery } from '../../../gql/RealGimm.Web.Administration.operation';
import { getEmptyAdministrationsFormInput } from '../../../utils/administration/initialValues';
import { getAdministrationSchema } from '../../../utils/administration/schemas/administration';
import { AdministrationCreateDialogProps } from './Administration.types';
import { AdministrationAdministrationsStep } from './Administration/Administration';
import { AdministrationEstateStep } from './Estate/Estate';
import { AdministrationRecapStep } from './Recap/Recap';

export const AdministrationCreateDialog = ({ onClose, onSave }: AdministrationCreateDialogProps) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { activeStep, error, handleBack, handleEdit, handleError, handleNext } = useStepper();
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);
  const [administrations, setAdministrations] = useState(getEmptyAdministrationsFormInput());
  const [queryState] = useGetAdministrationsFullQuery({
    variables: {
      where: {
        estateId: {
          eq: administrations.estate?.id,
        },
      },
    },
    pause: !administrations.estate?.id,
  });
  const existingAdministrations = useMemo(
    () => queryState.data?.administration.listAdministrationsFull ?? [],
    [queryState.data],
  );

  const canSave = useMemo(
    () => getAdministrationSchema(existingAdministrations, language, t).isValidSync(administrations),
    [administrations, language, existingAdministrations, t],
  );

  const openCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(true);
  }, []);
  const closeCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(false);
  }, []);

  const handleWorkingClose = useCallback(() => {
    onSave(administrations);
  }, [administrations, onSave]);
  const handleDestructiveClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <TableProvider
      key="estates"
      initialState={{
        sorting: [
          {
            desc: false,
            id: 'internalCode',
          },
        ],
      }}
    >
      {isCloseConfirmationDialogOpen ? (
        <CloseDialog
          canSave={canSave}
          onCancel={closeCloseConfirmationDialog}
          onSave={handleWorkingClose}
          onClose={handleDestructiveClose}
        />
      ) : (
        <Dialog fullScreen open title="administration.dialog.create.title" onClose={openCloseConfirmationDialog}>
          <Stepper
            activeStep={activeStep}
            error={error}
            steps={[
              {
                label: 'administration.tab.estate',
                children: (
                  <AdministrationEstateStep
                    administration={administrations}
                    onChange={setAdministrations}
                    onError={handleError}
                    onNext={handleNext}
                  />
                ),
              },
              {
                label: 'administration.tab.administration',
                children: (
                  <AdministrationAdministrationsStep
                    administrations={administrations}
                    existingAdministrations={existingAdministrations}
                    onChange={setAdministrations}
                    onError={handleError}
                    onBack={handleBack}
                    onNext={handleNext}
                  />
                ),
              },
              {
                label: 'administration.tab.recap',
                children: (
                  <AdministrationRecapStep
                    administration={administrations}
                    onEdit={handleEdit}
                    onBack={handleBack}
                    onSave={onSave}
                  />
                ),
              },
            ]}
          />
        </Dialog>
      )}
    </TableProvider>
  );
};
