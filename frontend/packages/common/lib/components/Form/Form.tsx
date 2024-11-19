import { styled } from '@mui/material';
import { FormEvent, FormHTMLAttributes, useCallback } from 'react';

const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});

export const Form = ({ onSubmit, ...props }: FormHTMLAttributes<HTMLFormElement>) => {
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.stopPropagation();
      if (onSubmit) {
        onSubmit(e);
      }
    },
    [onSubmit],
  );

  return <StyledForm {...props} onSubmit={handleSubmit} />;
};
