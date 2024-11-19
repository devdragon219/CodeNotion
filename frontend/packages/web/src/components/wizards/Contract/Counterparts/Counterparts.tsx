import { useCallback, useState } from 'react';

import { ContractCounterpartsStepProps } from './Counterparts.types';
import { ContractCounterpartsTableSubStep } from './Table/Table';
import { ContractCounterpartsTransferListSubStep } from './TransferList/TransferList';

export const ContractCounterpartsStep = ({
  contract,
  isContractActive,
  onBack,
  onChange,
  onError,
  onNext,
}: ContractCounterpartsStepProps) => {
  const [activeSubStep, setActiveSubStep] = useState(0);

  const handleBack = useCallback(() => {
    if (activeSubStep === 0) {
      onBack();
    } else {
      onError(false);
      setActiveSubStep(0);
    }
  }, [activeSubStep, onBack, onError]);

  const handleNext = useCallback(() => {
    if (activeSubStep === 0) {
      onError(false);
      setActiveSubStep(1);
    } else {
      onNext();
    }
  }, [activeSubStep, onError, onNext]);

  return activeSubStep === 0 ? (
    <ContractCounterpartsTransferListSubStep
      contract={contract}
      isContractActive={isContractActive}
      onBack={handleBack}
      onChange={onChange}
      onError={onError}
      onNext={handleNext}
    />
  ) : (
    <ContractCounterpartsTableSubStep
      contract={contract}
      isContractActive={isContractActive}
      onBack={handleBack}
      onChange={onChange}
      onError={onError}
      onNext={handleNext}
    />
  );
};
