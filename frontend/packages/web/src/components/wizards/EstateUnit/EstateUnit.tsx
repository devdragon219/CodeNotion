import { CloseDialog, Dialog, Stepper } from '@realgimm5/frontend-common/components';
import { TableProvider } from '@realgimm5/frontend-common/contexts';
import { useStepper } from '@realgimm5/frontend-common/hooks';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getEmptyEstateUnitFormInput } from '../../../utils/estateUnit/initialValues';
import { getEstateUnitSchema } from '../../../utils/estateUnit/schemas/estateUnit';
import { EstateUnitDocumentsStep } from './Documents/Documents';
import { EstateUnitEstateStep } from './Estate/Estate';
import { EstateUnitCreateDialogProps } from './EstateUnit.types';
import { EstateUnitGeneralDataStep } from './GeneralData/GeneralData';
import { EstateUnitOfficialActStep } from './OfficialAct/OfficialAct';
import { EstateUnitRecapStep } from './Recap/Recap';

export const EstateUnitCreateDialog = ({ estate, onClose, onSave }: EstateUnitCreateDialogProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { activeStep, error, handleBack, handleEdit, handleError, handleNext } = useStepper();
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);
  const [estateUnit, setEstateUnit] = useState(getEmptyEstateUnitFormInput(estate));

  const canSave = useMemo(() => getEstateUnitSchema(language, t).isValidSync(estateUnit), [estateUnit, language, t]);

  const openCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(true);
  }, []);
  const closeCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(false);
  }, []);

  const handleWorkingClose = useCallback(() => {
    onSave(estateUnit);
  }, [estateUnit, onSave]);
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
        <Dialog fullScreen open title="estate_unit.dialog.create.title" onClose={openCloseConfirmationDialog}>
          <Stepper
            activeStep={activeStep}
            error={error}
            steps={[
              {
                label: 'estate_unit.tab.estate',
                children: (
                  <EstateUnitEstateStep
                    estate={estate}
                    estateUnit={estateUnit}
                    onChange={setEstateUnit}
                    onError={handleError}
                    onNext={handleNext}
                  />
                ),
              },
              {
                label: 'estate_unit.tab.general_data',
                children: (
                  <EstateUnitGeneralDataStep
                    estateUnit={estateUnit}
                    onBack={handleBack}
                    onChange={setEstateUnit}
                    onError={handleError}
                    onNext={handleNext}
                  />
                ),
              },
              {
                label: 'estate_unit.tab.official_act',
                children: (
                  <EstateUnitOfficialActStep
                    estateUnit={estateUnit}
                    onBack={handleBack}
                    onChange={setEstateUnit}
                    onError={handleError}
                    onNext={handleNext}
                  />
                ),
              },
              {
                label: 'estate_unit.tab.documents',
                children: (
                  <EstateUnitDocumentsStep
                    estateUnit={estateUnit}
                    onBack={handleBack}
                    onChange={setEstateUnit}
                    onError={handleError}
                    onNext={handleNext}
                  />
                ),
              },
              {
                label: 'estate_unit.tab.recap',
                children: (
                  <EstateUnitRecapStep
                    estateUnit={estateUnit}
                    onBack={handleBack}
                    onEdit={handleEdit}
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
