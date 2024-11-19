import { Stepper } from '@realgimm5/frontend-common/components';

import { CounterpartsStep } from './Counterparts/Counterparts';
import { OriginalCounterpartsStep } from './OriginalCounterparts/OriginalCounterparts';
import { RecapStep } from './Recap/Recap';
import { CounterpartTakeoverStepperProps } from './Takeover.types';
import { TakeoverCounterpartsStep } from './TakeoverCounterparts/TakeoverCounterparts';
import { TakeoverDataStep } from './TakeoverData/TakeoverData';

export const CounterpartTakeoverStepper = ({
  contract,
  counterpartTakeover,
  isActive,
  onBack,
  onChange,
  onSave,
  ...stepperProps
}: CounterpartTakeoverStepperProps) => (
  <Stepper
    activeStep={stepperProps.activeStep}
    error={stepperProps.error}
    steps={[
      {
        label: 'contract.tab.takeover_data',
        children: (
          <TakeoverDataStep
            counterpartTakeover={counterpartTakeover}
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
            counterpartTakeover={counterpartTakeover}
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
            counterpartTakeover={counterpartTakeover}
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
            counterpartTakeover={counterpartTakeover}
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
            counterpartTakeover={counterpartTakeover}
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
