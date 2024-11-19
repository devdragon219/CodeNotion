import { useCallback, useState } from 'react';

import { FacilityContractTemplateSlasFieldSubStep } from './Field/Field';
import { FacilityContractTemplateSlasStepProps } from './Slas.types';
import { FacilityContractTemplateSlasTransferListSubStep } from './TransferList/TransferList';

export const FacilityContractTemplateSlasStep = ({
  facilityContractTemplate,
  onAddSlas,
  onBack,
  onChange,
  onError,
  onNext,
  onOpenCalendar,
}: FacilityContractTemplateSlasStepProps) => {
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
    <FacilityContractTemplateSlasTransferListSubStep
      facilityContractTemplate={facilityContractTemplate}
      onAddSlas={onAddSlas}
      onBack={handleBack}
      onChange={onChange}
      onError={onError}
      onNext={handleNext}
      onOpenCalendar={onOpenCalendar}
    />
  ) : (
    <FacilityContractTemplateSlasFieldSubStep
      facilityContractTemplate={facilityContractTemplate}
      onAddSlas={onAddSlas}
      onBack={handleBack}
      onChange={onChange}
      onError={onError}
      onNext={handleNext}
      onOpenCalendar={onOpenCalendar}
    />
  );
};
