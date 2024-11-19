import { useCallback, useState } from 'react';

import { FacilityContractTemplatePenaltiesFieldSubStep } from './Field/Field';
import { FacilityContractTemplatePenaltiesStepProps } from './Penalties.types';
import { FacilityContractTemplatePenaltiesTransferListSubStep } from './TransferList/TransferList';

export const FacilityContractTemplatePenaltiesStep = ({
  facilityContractTemplate,
  onAddPenalties,
  onBack,
  onChange,
  onError,
  onNext,
  onOpenCalendar,
}: FacilityContractTemplatePenaltiesStepProps) => {
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
    <FacilityContractTemplatePenaltiesTransferListSubStep
      facilityContractTemplate={facilityContractTemplate}
      onAddPenalties={onAddPenalties}
      onBack={handleBack}
      onChange={onChange}
      onError={onError}
      onNext={handleNext}
      onOpenCalendar={onOpenCalendar}
    />
  ) : (
    <FacilityContractTemplatePenaltiesFieldSubStep
      facilityContractTemplate={facilityContractTemplate}
      onAddPenalties={onAddPenalties}
      onBack={handleBack}
      onChange={onChange}
      onError={onError}
      onNext={handleNext}
      onOpenCalendar={onOpenCalendar}
    />
  );
};
