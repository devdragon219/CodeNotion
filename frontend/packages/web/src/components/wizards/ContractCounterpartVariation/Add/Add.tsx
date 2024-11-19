import { Stepper } from '@realgimm5/frontend-common/components';

import { CounterpartAddStepperProps } from './Add.types';
import { CounterpartsStep } from './Counterparts/Counterparts';
import { NewCounterpartsStep } from './NewCounterparts/NewCounterparts';

export const CounterpartAddStepper = ({
  contract,
  counterpartAdd,
  isActive,
  onBack,
  onChange,
  onSave,
  ...stepperProps
}: CounterpartAddStepperProps) => (
  <Stepper
    activeStep={stepperProps.activeStep}
    error={stepperProps.error}
    steps={[
      {
        label: 'contract.tab.subjects',
        children: (
          <NewCounterpartsStep
            counterpartAdd={counterpartAdd}
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
        label: `contract.tab.counterparts_${isActive ? 'tenant' : 'landlord'}`,
        children: (
          <CounterpartsStep
            counterpartAdd={counterpartAdd}
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
