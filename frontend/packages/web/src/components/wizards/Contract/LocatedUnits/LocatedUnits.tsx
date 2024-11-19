import { useCallback, useState } from 'react';

import { ContractLocatedUnitsStepProps } from './LocatedUnits.types';
import { ContractLocatedUnitsTableSubStep } from './Table/Table';
import { ContractLocatedUnitsTransferListSubStep } from './TransferList/TransferList';

export const ContractLocatedUnitsStep = ({
  contract,
  isContractActive,
  onBack,
  onChange,
  onError,
  onNext,
}: ContractLocatedUnitsStepProps) => {
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
    <ContractLocatedUnitsTransferListSubStep
      contract={contract}
      isContractActive={isContractActive}
      onBack={handleBack}
      onChange={onChange}
      onError={onError}
      onNext={handleNext}
    />
  ) : (
    <ContractLocatedUnitsTableSubStep
      contract={contract}
      isContractActive={isContractActive}
      onBack={handleBack}
      onChange={onChange}
      onError={onError}
      onNext={handleNext}
    />
  );
};
