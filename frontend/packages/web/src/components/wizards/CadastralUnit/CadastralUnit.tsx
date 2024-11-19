import { CloseDialog, Dialog, Stepper } from '@realgimm5/frontend-common/components';
import { TableProvider } from '@realgimm5/frontend-common/contexts';
import { useStepper } from '@realgimm5/frontend-common/hooks';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getCoordinateType } from '../../../utils/cadastralUnit/getCoordinateType';
import { getEmptyCadastralUnitFormInput } from '../../../utils/cadastralUnit/initialValues';
import { getCadastralUnitSchema } from '../../../utils/cadastralUnit/schemas/cadastralUnit';
import { CadastralUnitCreateDialogProps } from './CadastralUnit.types';
import { CadastralUnitCoordinatesStep } from './Coordinates/Coordinates';
import { CadastralUnitEstateUnitStep } from './EstateUnit/EstateUnit';
import { CadastralUnitGeneralDataStep } from './GeneralData/GeneralData';
import { CadastralUnitIncomeStep } from './Income/Income';
import { CadastralUnitInspectionStep } from './Inspection/Inspection';
import { CadastralUnitRecapStep } from './Recap/Recap';

export const CadastralUnitCreateDialog = ({ estateUnit, onClose, onSave }: CadastralUnitCreateDialogProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { activeStep, error, handleBack, handleEdit, handleError, handleNext } = useStepper();
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);
  const [cadastralUnit, setCadastralUnit] = useState(getEmptyCadastralUnitFormInput(estateUnit));

  const canSave = useMemo(
    () => getCadastralUnitSchema(getCoordinateType(cadastralUnit.address), language, t).isValidSync(cadastralUnit),
    [cadastralUnit, language, t],
  );

  const openCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(true);
  }, []);
  const closeCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(false);
  }, []);

  const handleWorkingClose = useCallback(() => {
    onSave(cadastralUnit);
  }, [cadastralUnit, onSave]);
  const handleDestructiveClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <TableProvider
      key="estate-unit"
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
        <Dialog fullScreen open title="cadastral_unit.dialog.create.title" onClose={openCloseConfirmationDialog}>
          <Stepper
            activeStep={activeStep}
            error={error}
            steps={[
              {
                label: 'cadastral_unit.tab.estate_unit',
                children: (
                  <CadastralUnitEstateUnitStep
                    cadastralUnit={cadastralUnit}
                    estateUnit={estateUnit}
                    onChange={setCadastralUnit}
                    onError={handleError}
                    onNext={handleNext}
                  />
                ),
              },
              {
                label: 'cadastral_unit.tab.general_data',
                children: (
                  <CadastralUnitGeneralDataStep
                    cadastralUnit={cadastralUnit}
                    onBack={handleBack}
                    onChange={setCadastralUnit}
                    onError={handleError}
                    onNext={handleNext}
                  />
                ),
              },
              {
                label: 'cadastral_unit.tab.inspection',
                children: (
                  <CadastralUnitInspectionStep
                    cadastralUnit={cadastralUnit}
                    onBack={handleBack}
                    onChange={setCadastralUnit}
                    onError={handleError}
                    onNext={handleNext}
                  />
                ),
              },
              {
                label: 'cadastral_unit.tab.income',
                children: (
                  <CadastralUnitIncomeStep
                    cadastralUnit={cadastralUnit}
                    onBack={handleBack}
                    onChange={setCadastralUnit}
                    onError={handleError}
                    onNext={handleNext}
                  />
                ),
              },
              {
                label: 'cadastral_unit.tab.cadastral_coordinates',
                children: (
                  <CadastralUnitCoordinatesStep
                    cadastralUnit={cadastralUnit}
                    onBack={handleBack}
                    onChange={setCadastralUnit}
                    onError={handleError}
                    onNext={handleNext}
                  />
                ),
              },
              {
                label: 'cadastral_unit.tab.recap',
                children: (
                  <CadastralUnitRecapStep
                    cadastralUnit={cadastralUnit}
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
