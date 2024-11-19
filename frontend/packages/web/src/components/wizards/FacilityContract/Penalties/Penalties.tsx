import { useCallback, useState } from 'react';

import { FacilityContractPenaltiesFieldSubStep } from './Field/Field';
import { FacilityContractPenaltiesStepProps } from './Penalties.types';
import { FacilityContractPenaltiesTransferListSubStep } from './TransferList/TransferList';

export const FacilityContractPenaltiesStep = ({
  facilityContract,
  onAddPenalties,
  onBack,
  onChange,
  onError,
  onNext,
  onOpenCalendar,
}: FacilityContractPenaltiesStepProps) => {
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
      onChange({
        ...facilityContract,
        penalties: facilityContract.penalties.map((penalty) => ({
          ...penalty,
          internalCode: '',
        })),
      });
      onError(false);
      setActiveSubStep(1);
    } else {
      onNext();
    }
  }, [activeSubStep, facilityContract, onChange, onError, onNext]);

  return activeSubStep === 0 ? (
    <FacilityContractPenaltiesTransferListSubStep
      facilityContract={facilityContract}
      onAddPenalties={onAddPenalties}
      onBack={handleBack}
      onChange={onChange}
      onError={onError}
      onNext={handleNext}
      onOpenCalendar={onOpenCalendar}
    />
  ) : (
    <FacilityContractPenaltiesFieldSubStep
      facilityContract={facilityContract}
      onAddPenalties={onAddPenalties}
      onBack={handleBack}
      onChange={onChange}
      onError={onError}
      onNext={handleNext}
      onOpenCalendar={onOpenCalendar}
    />
  );
};
