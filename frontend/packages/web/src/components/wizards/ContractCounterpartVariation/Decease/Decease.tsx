import { Stepper } from '@realgimm5/frontend-common/components';

import { CounterpartsStep } from './Counterparts/Counterparts';
import { CounterpartDeceaseStepperProps } from './Decease.types';
import { OriginalCounterpartStep } from './OriginalCounterpart/OriginalCounterpart';
import { TakeoverCounterpartsStep } from './TakeoverCounterparts/TakeoverCounterparts';

export const CounterpartDeceaseStepper = ({
  contract,
  counterpartDecease,
  isActive,
  onAddHeir,
  onBack,
  onChange,
  onSave,
  ...stepperProps
}: CounterpartDeceaseStepperProps) => (
  <Stepper
    activeStep={stepperProps.activeStep}
    error={stepperProps.error}
    steps={[
      {
        label: 'contract.tab.subject',
        children: (
          <OriginalCounterpartStep
            counterpartDecease={counterpartDecease}
            currentCounterparts={contract.counterparts}
            isContractActive={isActive}
            onBack={onBack}
            onChange={onChange}
            onError={stepperProps.handleError}
            onNext={stepperProps.handleNext}
          />
        ),
      },
      {
        label: 'contract.tab.heirs',
        children: (
          <TakeoverCounterpartsStep
            counterpartDecease={counterpartDecease}
            isContractActive={isActive}
            onAddHeir={onAddHeir}
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
            counterpartDecease={counterpartDecease}
            currentCounterparts={contract.counterparts}
            isContractActive={isActive}
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
