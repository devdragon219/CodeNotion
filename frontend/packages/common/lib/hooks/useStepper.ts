import { useCallback, useState } from 'react';

export interface UseStepperProps {
  activeStep: number;
  error: boolean | string;
  handleBack: () => void;
  handleEdit: (step: number) => void;
  handleError: (error?: boolean | string) => void;
  handleNext: () => void;
}

export const useStepper = (): UseStepperProps => {
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState<boolean | string>(false);

  const handleBack = useCallback(() => {
    setError(false);
    setActiveStep((activeStep) => activeStep - 1);
  }, []);

  const handleEdit = useCallback((step: number) => {
    setActiveStep(step);
  }, []);

  const handleError = useCallback((error: boolean | string = true) => {
    setError(error);
  }, []);

  const handleNext = useCallback(() => {
    setError(false);
    setActiveStep((activeStep) => activeStep + 1);
  }, []);

  return {
    activeStep,
    error,
    handleBack,
    handleEdit,
    handleError,
    handleNext,
  };
};
