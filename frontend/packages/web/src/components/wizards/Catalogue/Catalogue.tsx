import { CloseDialog, Dialog, Stepper } from '@realgimm5/frontend-common/components';
import { TableProvider } from '@realgimm5/frontend-common/contexts';
import { useStepper } from '@realgimm5/frontend-common/hooks';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getEmptyCatalogueFormInput } from '../../../utils/catalogue/initialValues';
import { getCatalogueSchema } from '../../../utils/catalogue/schemas/catalogue';
import { CatalogueCreateDialogProps } from './Catalogue.types';
import { CatalogueDocumentsStep } from './Documents/Documents';
import { CatalogueEstateStep } from './Estate/Estate';
import { CatalogueGeneralDataStep } from './GeneralData/GeneralData';
import { CatalogueItemsStep } from './Items/Items';
import { CatalogueRecapStep } from './Recap/Recap';

export const CatalogueCreateDialog = ({ estate, onClose, onSave }: CatalogueCreateDialogProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { activeStep, error, handleBack, handleEdit, handleError, handleNext } = useStepper();
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);
  const [catalogue, setCatalogue] = useState(getEmptyCatalogueFormInput(estate));
  const [canUseInternalCodes, setCanUseInternalCodes] = useState<Record<string, boolean>>({});

  const canSave = useMemo(
    () => getCatalogueSchema(canUseInternalCodes, language, t).isValidSync(catalogue),
    [canUseInternalCodes, catalogue, language, t],
  );

  const openCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(true);
  }, []);
  const closeCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(false);
  }, []);

  const handleWorkingClose = useCallback(() => {
    onSave(catalogue);
  }, [catalogue, onSave]);
  const handleDestructiveClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <TableProvider
      key="estate"
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
        <Dialog fullScreen open title="catalogue.dialog.create.title" onClose={openCloseConfirmationDialog}>
          <Stepper
            activeStep={activeStep}
            error={error}
            steps={[
              {
                label: 'catalogue.tab.estate',
                children: (
                  <CatalogueEstateStep
                    catalogue={catalogue}
                    estate={estate}
                    onChange={setCatalogue}
                    onError={handleError}
                    onNext={handleNext}
                  />
                ),
              },
              {
                label: 'catalogue.tab.general_data',
                children: (
                  <CatalogueGeneralDataStep
                    catalogue={catalogue}
                    onBack={handleBack}
                    onChange={setCatalogue}
                    onError={handleError}
                    onNext={handleNext}
                  />
                ),
              },
              {
                label: 'catalogue.tab.items',
                children: (
                  <CatalogueItemsStep
                    canUseInternalCodes={canUseInternalCodes}
                    catalogue={catalogue}
                    onBack={handleBack}
                    onChange={setCatalogue}
                    onError={handleError}
                    onNext={handleNext}
                    setCanUseInternalCodes={setCanUseInternalCodes}
                  />
                ),
              },
              {
                label: 'catalogue.tab.documents',
                children: (
                  <CatalogueDocumentsStep
                    catalogue={catalogue}
                    onBack={handleBack}
                    onChange={setCatalogue}
                    onError={handleError}
                    onNext={handleNext}
                  />
                ),
              },
              {
                label: 'catalogue.tab.recap',
                children: (
                  <CatalogueRecapStep catalogue={catalogue} onBack={handleBack} onEdit={handleEdit} onSave={onSave} />
                ),
              },
            ]}
          />
        </Dialog>
      )}
    </TableProvider>
  );
};
