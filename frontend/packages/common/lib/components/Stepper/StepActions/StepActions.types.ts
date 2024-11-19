import { ParseKeys } from 'i18next';
import { ReactElement } from 'react';

export interface StepActionsProps {
  completeIcon?: ReactElement;
  completeLabel?: ParseKeys;
  onBack?: () => void;
  onComplete?: () => void;
  onNext?: () => void;
}
