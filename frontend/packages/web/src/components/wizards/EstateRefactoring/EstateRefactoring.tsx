import { Dialog, Stepper } from '@realgimm5/frontend-common/components';
import { useStepper } from '@realgimm5/frontend-common/hooks';
import { useState } from 'react';

import { getEmptyEstateRefactoringFormInput } from '../../../utils/estate/initialValues';
import { EstateRefactoringDialogProps } from './EstateRefactoring.types';
import { EstateRefactoringEstateUnitsStep } from './EstateUnits/EstateUnits';
import { EstateRefactoringGeneralDataStep } from './GeneralData/GeneralData';

export const EstateRefactoringDialog = ({ estateId, input, onClose, onSave }: EstateRefactoringDialogProps) => {
  const { activeStep, error, handleBack, handleError, handleNext } = useStepper();
  const [estateRefactoring, setEstateRefactoring] = useState(
    input?.estateRefactoring ?? getEmptyEstateRefactoringFormInput(),
  );

  return (
    <Dialog fullScreen open title={`estate.dialog.refactoring.${input ? 'edit' : 'add'}`} onClose={onClose}>
      <Stepper
        activeStep={activeStep}
        error={error}
        steps={[
          {
            label: 'estate.tab.general_data',
            children: (
              <EstateRefactoringGeneralDataStep
                estateRefactoring={estateRefactoring}
                onChange={setEstateRefactoring}
                onError={handleError}
                onNext={handleNext}
              />
            ),
          },
          {
            label: 'estate.tab.select_estate_unit',
            children: (
              <EstateRefactoringEstateUnitsStep
                estateId={estateId}
                estateRefactoring={estateRefactoring}
                index={input?.index}
                onBack={handleBack}
                onChange={setEstateRefactoring}
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
