import { Dialog, Stepper } from '@realgimm5/frontend-common/components';
import { TableProvider } from '@realgimm5/frontend-common/contexts';
import { useStepper } from '@realgimm5/frontend-common/hooks';
import { TableState } from '@tanstack/react-table';
import { useCallback, useState } from 'react';

import { EstateUnitFormInput } from '../../../interfaces/FormInputs/EstateUnit';
import { getEmptyEstateUnitFormInput } from '../../../utils/estateUnit/initialValues';
import { EstateUnitSplitCadastralCoordinatesStep } from './CadastralCoordinates/CadastralCoordinates';
import { EstateUnitSplitCadastralUnitStep } from './CadastralUnit/CadastralUnit';
import { EstateUnitSplitEstateStep } from './Estate/Estate';
import { EstateUnitSplitEstateUnitStep } from './EstateUnit/EstateUnit';
import { EstateUnitSplitDialogProps } from './EstateUnitSplit.types';

export const EstateUnitSplitDialog = ({
  alreadyInUseInternalCodes,
  cadastralUnitMinDate,
  cityName,
  estateId,
  estateUnitMinDate,
  input,
  onClose,
  onSave,
}: EstateUnitSplitDialogProps) => {
  const { activeStep, error, handleBack, handleError, handleNext } = useStepper();
  const [estateUnit, setEstateUnit] = useState(input?.estateUnit ?? getEmptyEstateUnitFormInput());

  const handleSave = useCallback(
    (estateUnit: EstateUnitFormInput, initialState: Partial<TableState>) => {
      onSave(
        input
          ? {
              ...input,
              estateUnit,
            }
          : estateUnit,
        initialState,
      );
    },
    [input, onSave],
  );

  return (
    <Dialog fullScreen open title="estate_unit.dialog.split.title" onClose={onClose}>
      <TableProvider
        key="estate-unit-split"
        initialState={{
          ...(input?.initialState ?? {}),
          sorting: input?.initialState.sorting ?? [
            {
              desc: false,
              id: 'internalCode',
            },
          ],
        }}
      >
        <Stepper
          activeStep={activeStep}
          error={error}
          steps={[
            {
              label: 'estate_unit.dialog.split.tab.estate',
              children: (
                <EstateUnitSplitEstateStep
                  cityName={cityName}
                  estateId={estateId}
                  estateUnit={estateUnit}
                  onChange={setEstateUnit}
                  onError={handleError}
                  onNext={handleNext}
                />
              ),
            },
            {
              label: 'estate_unit.dialog.split.tab.estate_unit',
              children: (
                <EstateUnitSplitEstateUnitStep
                  alreadyInUseInternalCodes={alreadyInUseInternalCodes}
                  estateUnit={estateUnit}
                  minDate={estateUnitMinDate}
                  onBack={handleBack}
                  onChange={setEstateUnit}
                  onError={handleError}
                  onNext={handleNext}
                />
              ),
            },
            {
              label: 'estate_unit.dialog.split.tab.cadastral_unit',
              children: (
                <EstateUnitSplitCadastralUnitStep
                  estateUnit={estateUnit}
                  minDate={cadastralUnitMinDate}
                  onBack={handleBack}
                  onChange={setEstateUnit}
                  onError={handleError}
                  onNext={handleNext}
                />
              ),
            },
            {
              label: 'estate_unit.dialog.split.tab.cadastral_coordinates',
              children: (
                <EstateUnitSplitCadastralCoordinatesStep
                  estateUnit={estateUnit}
                  onBack={handleBack}
                  onChange={setEstateUnit}
                  onError={handleError}
                  onSave={handleSave}
                />
              ),
            },
          ]}
        />
      </TableProvider>
    </Dialog>
  );
};
