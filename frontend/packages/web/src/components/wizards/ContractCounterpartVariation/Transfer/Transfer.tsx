import { Stepper } from '@realgimm5/frontend-common/components';

import { CounterpartsStep } from './Counterparts/Counterparts';
import { OriginalCounterpartsStep } from './OriginalCounterparts/OriginalCounterparts';
import { RecapStep } from './Recap/Recap';
import { TakeoverCounterpartsStep } from './TakeoverCounterparts/TakeoverCounterparts';
import { CounterpartTransferStepperProps } from './Transfer.types';
import { TransferDataStep } from './TransferData/TransferData';

export const CounterpartTransferStepper = ({
  contract,
  counterpartTransfer,
  isActive,
  onChange,
  onBack,
  onSave,
  ...stepperProps
}: CounterpartTransferStepperProps) => (
  <Stepper
    activeStep={stepperProps.activeStep}
    error={stepperProps.error}
    steps={[
      {
        label: 'contract.tab.transfer_data',
        children: (
          <TransferDataStep
            counterpartTransfer={counterpartTransfer}
            isContractActive={isActive}
            managementSubjectOfficers={contract.managementSubject?.officers ?? []}
            onBack={onBack}
            onChange={onChange}
            onError={stepperProps.handleError}
            onNext={stepperProps.handleNext}
          />
        ),
      },
      {
        label: 'contract.tab.takeover_counterparts',
        children: (
          <TakeoverCounterpartsStep
            counterpartTransfer={counterpartTransfer}
            currentCounterparts={contract.counterparts}
            isContractActive={isActive}
            onBack={stepperProps.handleBack}
            onChange={onChange}
            onError={stepperProps.handleError}
            onNext={stepperProps.handleNext}
          />
        ),
      },
      {
        label: 'contract.tab.original_counterparts',
        children: (
          <OriginalCounterpartsStep
            counterpartTransfer={counterpartTransfer}
            currentCounterparts={contract.counterparts}
            isContractActive={isActive}
            onBack={stepperProps.handleBack}
            onChange={onChange}
            onError={stepperProps.handleError}
            onNext={stepperProps.handleNext}
          />
        ),
      },
      {
        label: `contract.tab.counterparts_${isActive ? 'tenant' : 'landlord'}`,
        children: (
          <CounterpartsStep
            counterpartTransfer={counterpartTransfer}
            currentCounterparts={contract.counterparts}
            isContractActive={isActive}
            onBack={stepperProps.handleBack}
            onChange={onChange}
            onError={stepperProps.handleError}
            onNext={stepperProps.handleNext}
          />
        ),
      },
      {
        label: 'contract.tab.recap',
        children: (
          <RecapStep
            counterpartTransfer={counterpartTransfer}
            isContractActive={isActive}
            onBack={stepperProps.handleBack}
            onEdit={stepperProps.handleEdit}
            onSave={onSave}
          />
        ),
      },
    ]}
  />
);
