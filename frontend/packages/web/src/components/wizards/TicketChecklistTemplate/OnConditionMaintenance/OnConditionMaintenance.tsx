import { useCallback, useState } from 'react';

import { TicketChecklistTemplateOnConditionMaintenanceActivitiesSubStep } from './Activities/Activities';
import { TicketChecklistTemplateOnConditionMaintenanceFieldsSubStep } from './Fields/Fields';
import { TicketChecklistTemplateOnConditionMaintenanceStepProps } from './OnConditionMaintenance.types';

export const TicketChecklistTemplateOnConditionMaintenanceStep = ({
  ticketChecklistTemplate,
  onBack,
  onChange,
  onError,
  onNext,
}: TicketChecklistTemplateOnConditionMaintenanceStepProps) => {
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
    <TicketChecklistTemplateOnConditionMaintenanceFieldsSubStep
      ticketChecklistTemplate={ticketChecklistTemplate}
      onBack={handleBack}
      onChange={onChange}
      onError={onError}
      onNext={handleNext}
    />
  ) : (
    <TicketChecklistTemplateOnConditionMaintenanceActivitiesSubStep
      ticketChecklistTemplate={ticketChecklistTemplate}
      onBack={handleBack}
      onChange={onChange}
      onError={onError}
      onNext={handleNext}
    />
  );
};
