import { Dialog, Stepper } from '@realgimm5/frontend-common/components';
import { useStepper } from '@realgimm5/frontend-common/hooks';
import { useState } from 'react';

import { ContractLocatedUnitFormInput } from '../../../interfaces/FormInputs/Contract';
import { ContractLocatedUnitCreateDialogProps } from './ContractLocatedUnit.types';
import { ContractLocatedUnitsTableStep } from './Table/Table';
import { ContractLocatedUnitsTransferListStep } from './TransferList/TransferList';

export const ContractLocatedUnitCreateDialog = ({
  currentLocatedUnits,
  isActive,
  onClose,
  onSave,
}: ContractLocatedUnitCreateDialogProps) => {
  const { activeStep, error, handleBack, handleError, handleNext } = useStepper();
  const [locatedUnits, setLocatedUnits] = useState<ContractLocatedUnitFormInput[]>([]);

  return (
    <Dialog
      fullScreen
      open
      title={`contract.dialog.located_unit.estate${isActive ? '_sub_' : '_'}unit`}
      onClose={onClose}
    >
      <Stepper
        activeStep={activeStep}
        error={error}
        steps={[
          {
            label: `contract.tab.select_estate${isActive ? '_sub_' : '_'}units`,
            children: (
              <ContractLocatedUnitsTransferListStep
                currentLocatedUnits={currentLocatedUnits}
                isContractActive={isActive}
                locatedUnits={locatedUnits}
                onChange={setLocatedUnits}
                onError={handleError}
                onNext={handleNext}
              />
            ),
          },
          {
            label: 'contract.tab.additional_data',
            children: (
              <ContractLocatedUnitsTableStep
                locatedUnits={locatedUnits}
                isContractActive={isActive}
                onBack={handleBack}
                onChange={setLocatedUnits}
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
