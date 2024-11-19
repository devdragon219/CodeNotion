import { Dialog, Stepper } from '@realgimm5/frontend-common/components';
import { useStepper } from '@realgimm5/frontend-common/hooks';
import { useState } from 'react';

import { ContractTransactorFormInput } from '../../../interfaces/FormInputs/Contract';
import { ContractTransactorCreateDialogProps } from './ContractTransactor.types';
import { ContractTransactorsTableStep } from './Table/Table';
import { ContractTransactorsTransferListStep } from './TransferList/TransferList';

export const ContractTransactorCreateDialog = ({
  currentTransactors,
  effectStartDate,
  isActive,
  onClose,
  onSave,
}: ContractTransactorCreateDialogProps) => {
  const { activeStep, error, handleBack, handleError, handleNext } = useStepper();
  const [transactors, setTransactors] = useState<ContractTransactorFormInput[]>([]);

  return (
    <Dialog fullScreen open title={`contract.dialog.transactor.${isActive ? 'notice' : 'warrant'}`} onClose={onClose}>
      <Stepper
        activeStep={activeStep}
        error={error}
        steps={[
          {
            label: 'contract.tab.subjects',
            children: (
              <ContractTransactorsTransferListStep
                currentTransactors={currentTransactors}
                effectStartDate={effectStartDate}
                isContractActive={isActive}
                transactors={transactors}
                onChange={setTransactors}
                onError={handleError}
                onNext={handleNext}
              />
            ),
          },
          {
            label: `contract.tab.transactors_${isActive ? 'notices' : 'warrants'}`,
            children: (
              <ContractTransactorsTableStep
                isContractActive={isActive}
                transactors={transactors}
                onBack={handleBack}
                onChange={setTransactors}
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
