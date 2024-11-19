import { Step as MuiStep, StepContent, StepLabel, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { StepItemProps } from './StepItem.types';

export const StepItem = ({
  activeStep,
  children,
  error,
  index,
  label,
  message,
  orientation,
  ...props
}: StepItemProps) => {
  const { t } = useTranslation();
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (index < activeStep) {
      setCompleted(true);
    }
    // eslint-disable-next-line
  }, [activeStep]);

  const hasError = useMemo(() => !!error && index === activeStep, [activeStep, error, index]);

  const optional = useMemo(() => {
    if (typeof error === 'string' && index === activeStep) {
      return (
        <Typography variant="caption" sx={(theme) => ({ color: theme.palette.danger[300], verticalAlign: 'top' })}>
          {error}
        </Typography>
      );
    }

    if (!message) {
      return undefined;
    }

    return (
      <Typography variant="caption" sx={{ verticalAlign: 'top' }}>
        {t(message)}
      </Typography>
    );
  }, [activeStep, error, index, message, t]);

  return (
    <MuiStep {...props} completed={index !== activeStep && completed} index={index} sx={{ py: { md: 1.25 } }}>
      <StepLabel error={hasError} optional={optional}>
        <Typography variant="bodySm">{t(label)}</Typography>
      </StepLabel>
      {orientation === 'vertical' && <StepContent>{children}</StepContent>}
    </MuiStep>
  );
};
