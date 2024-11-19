import { Stepper } from '@realgimm5/frontend-common/components';

import { ContractsStep } from './Contracts/Contracts';
import { ManagementSubjectStep } from './ManagementSubject/ManagementSubject';
import { ContractTransferStepperProps } from './Transfer.types';

export const ContractTransferStepper = ({
  contract,
  contractTransfer,
  isActive,
  onChange,
  onBack,
  onSave,
  ...stepperProps
}: ContractTransferStepperProps) => (
  <Stepper
    activeStep={stepperProps.activeStep}
    error={stepperProps.error}
    steps={[
      {
        label: 'contract.tab.contracts',
        children: (
          <ContractsStep
            contract={contract}
            contractTransfer={contractTransfer}
            isContractActive={isActive}
            onBack={onBack}
            onChange={onChange}
            onError={stepperProps.handleError}
            onNext={stepperProps.handleNext}
          />
        ),
      },
      {
        label: 'contract.tab.new_management_subject',
        children: (
          <ManagementSubjectStep
            contract={contract}
            contractTransfer={contractTransfer}
            onBack={stepperProps.handleBack}
            onChange={onChange}
            onError={stepperProps.handleError}
            onSave={onSave}
          />
        ),
      },
    ]}
  />
);
