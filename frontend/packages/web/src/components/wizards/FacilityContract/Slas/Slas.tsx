import { useCallback, useState } from 'react';

import { FacilityContractSlasFieldSubStep } from './Field/Field';
import { FacilityContractSlasStepProps } from './Slas.types';
import { FacilityContractSlasTransferListSubStep } from './TransferList/TransferList';

export const FacilityContractSlasStep = ({
  facilityContract,
  onAddSlas,
  onBack,
  onChange,
  onError,
  onNext,
  onOpenCalendar,
}: FacilityContractSlasStepProps) => {
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
        slas: facilityContract.slas.map((sla) => ({
          ...sla,
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
    <FacilityContractSlasTransferListSubStep
      facilityContract={facilityContract}
      onAddSlas={onAddSlas}
      onBack={handleBack}
      onChange={onChange}
      onError={onError}
      onNext={handleNext}
      onOpenCalendar={onOpenCalendar}
    />
  ) : (
    <FacilityContractSlasFieldSubStep
      facilityContract={facilityContract}
      onAddSlas={onAddSlas}
      onBack={handleBack}
      onChange={onChange}
      onError={onError}
      onNext={handleNext}
      onOpenCalendar={onOpenCalendar}
    />
  );
};
