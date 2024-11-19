import { useCallback, useState } from 'react';

import { ContractSublocatedDataGeneralDataSubStep } from './GeneralData/GeneralData';
import { ContractSublocatedDataPassiveContractsSubStep } from './PassiveContracts/PassiveContracts';
import { ContractSublocatedDataStepProps } from './SublocatedData.types';

export const ContractSublocatedDataStep = ({
  contract,
  hasSublocatedContract,
  onBack,
  onChange,
  onError,
  onNext,
  onShowAllLocatedUnits,
}: ContractSublocatedDataStepProps) => {
  const [activeSubStep, setActiveSubStep] = useState(hasSublocatedContract ? 1 : 0);

  const handleBack = useCallback(() => {
    if (hasSublocatedContract || activeSubStep === 0) {
      onBack();
    } else {
      onError(false);
      setActiveSubStep(0);
    }
  }, [activeSubStep, hasSublocatedContract, onBack, onError]);

  const handleNext = useCallback(() => {
    if (activeSubStep === 0) {
      onError(false);
      setActiveSubStep(1);
    } else {
      onNext();
    }
  }, [activeSubStep, onError, onNext]);

  return activeSubStep === 0 ? (
    <ContractSublocatedDataPassiveContractsSubStep
      contract={contract}
      onBack={handleBack}
      onChange={onChange}
      onError={onError}
      onNext={handleNext}
      onShowAllLocatedUnits={onShowAllLocatedUnits}
    />
  ) : (
    <ContractSublocatedDataGeneralDataSubStep
      contract={contract}
      onBack={handleBack}
      onChange={onChange}
      onError={onError}
      onNext={handleNext}
    />
  );
};
