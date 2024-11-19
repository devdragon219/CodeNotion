import { useCallback, useMemo, useState } from 'react';

import { ContractRegistrationTaxGeneralDataSubStep } from './GeneralData/GeneralData';
import { ContractRegistrationTaxStepProps } from './RegistrationTax.types';
import { ContractRegistrationTaxTakeoverSubStep } from './Takeover/Takeover';

export const ContractRegistrationTaxStep = ({
  contract,
  isContractActive,
  onBack,
  onChange,
  onError,
  onNext,
}: ContractRegistrationTaxStepProps) => {
  const [activeSubStep, setActiveSubStep] = useState(0);
  const isTakeoverFromPreviousSubject = useMemo(
    () => contract.registrationTax.isTakeoverFromPreviousSubject,
    [contract.registrationTax.isTakeoverFromPreviousSubject],
  );

  const handleBack = useCallback(() => {
    if (activeSubStep === 0) {
      onBack();
    } else {
      onError(false);
      setActiveSubStep(0);
    }
  }, [activeSubStep, onBack, onError]);

  const handleNext = useCallback(() => {
    if (activeSubStep === 0 && isTakeoverFromPreviousSubject) {
      onError(false);
      setActiveSubStep(1);
    } else {
      onNext();
    }
  }, [activeSubStep, isTakeoverFromPreviousSubject, onError, onNext]);

  return activeSubStep === 0 ? (
    <ContractRegistrationTaxGeneralDataSubStep
      contract={contract}
      isContractActive={isContractActive}
      onBack={handleBack}
      onChange={onChange}
      onError={onError}
      onNext={handleNext}
    />
  ) : (
    <ContractRegistrationTaxTakeoverSubStep
      contract={contract}
      onBack={handleBack}
      onChange={onChange}
      onError={onError}
      onNext={handleNext}
    />
  );
};
