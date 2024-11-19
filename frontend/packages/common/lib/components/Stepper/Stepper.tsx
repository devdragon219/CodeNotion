/* eslint-disable no-restricted-imports */
import { Box, Stepper as MuiStepper, Theme, useMediaQuery } from '@mui/material';
import { useEffect, useMemo, useRef } from 'react';

import { parseSxPropsToArray } from '../../utils/muiUtils';
import { StepItem } from './StepItem/StepItem';
import { StepperProps } from './Stepper.types';

export const Stepper = ({ activeStep, error, steps, sx }: StepperProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const matchDownMd = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const orientation = useMemo(() => (matchDownMd ? 'vertical' : 'horizontal'), [matchDownMd]);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({ top: 0 });
      ref.current.focus();
    }
  }, [activeStep, ref]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <MuiStepper
        activeStep={activeStep}
        orientation={orientation}
        sx={(theme) => ({
          [theme.breakpoints.down('md')]: {
            pb: 2.5,
          },
          [theme.breakpoints.up('md')]: {
            px: 1.25,
            mb: 2.5,
          },
        })}
      >
        {steps.map((step, index) => (
          <StepItem
            key={index}
            {...step}
            activeStep={activeStep}
            error={error}
            index={index}
            orientation={orientation}
          />
        ))}
      </MuiStepper>
      {orientation !== 'vertical' && (
        <Box
          ref={ref}
          tabIndex={0}
          sx={[
            (theme) => ({
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              overflowY: 'auto',
              outline: 'none',
              mx: -4,
              px: 6,
              width: 'calc(100% + 64px)',
              [theme.breakpoints.down('md')]: {
                mx: -2,
                px: 4,
                width: 'calc(100% + 32px)',
              },
            }),
            ...parseSxPropsToArray(sx),
          ]}
        >
          {steps[activeStep].children}
        </Box>
      )}
    </Box>
  );
};
