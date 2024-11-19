import { useCallback, useState } from 'react';

import { ContractTransactorsTableSubStep } from './Table/Table';
import { ContractTransactorsStepProps } from './Transactors.types';
import { ContractTransactorsTransferListSubStep } from './TransferList/TransferList';

export const ContractTransactorsStep = ({
  contract,
  isContractActive,
  onBack,
  onChange,
  onError,
  onNext,
}: ContractTransactorsStepProps) => {
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
    <ContractTransactorsTransferListSubStep
      contract={contract}
      isContractActive={isContractActive}
      onBack={handleBack}
      onChange={onChange}
      onError={onError}
      onNext={handleNext}
    />
  ) : (
    <ContractTransactorsTableSubStep
      contract={contract}
      isContractActive={isContractActive}
      onBack={handleBack}
      onChange={onChange}
      onError={onError}
      onNext={handleNext}
    />
  );
};
