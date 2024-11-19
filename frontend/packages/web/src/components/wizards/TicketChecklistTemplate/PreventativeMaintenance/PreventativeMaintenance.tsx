import { useCallback, useState } from 'react';

import { TicketChecklistTemplatePreventativeMaintenanceActivitiesSubStep } from './Activities/Activities';
import { TicketChecklistTemplatePreventativeMaintenanceFieldsSubStep } from './Fields/Fields';
import { TicketChecklistTemplatePreventativeMaintenanceStepProps } from './PreventativeMaintenance.types';

export const TicketChecklistTemplatePreventativeMaintenanceStep = ({
  ticketChecklistTemplate,
  onBack,
  onChange,
  onError,
  onNext,
}: TicketChecklistTemplatePreventativeMaintenanceStepProps) => {
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
    <TicketChecklistTemplatePreventativeMaintenanceFieldsSubStep
      ticketChecklistTemplate={ticketChecklistTemplate}
      onBack={handleBack}
      onChange={onChange}
      onError={onError}
      onNext={handleNext}
    />
  ) : (
    <TicketChecklistTemplatePreventativeMaintenanceActivitiesSubStep
      ticketChecklistTemplate={ticketChecklistTemplate}
      onBack={handleBack}
      onChange={onChange}
      onError={onError}
      onNext={handleNext}
    />
  );
};
