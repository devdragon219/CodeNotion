import { Grid2 } from '@mui/material';
import { StepForm } from '@realgimm5/frontend-common/components';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { UserFormInput } from '../../../../interfaces/FormInputs/User';
import { UserOrgUnitsField } from '../../../domains/User/OrgUnits/Field/Field';
import { UserOrgUnitsStepProps } from './OrgUnits.types';

export const UserOrgUnitsStep = ({ user, onBack, onChange, onError, onNext }: UserOrgUnitsStepProps) => {
  const { control, handleSubmit, watch } = useForm<UserFormInput>({
    defaultValues: user,
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as UserFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)} sx={{ height: 'calc(100% - 92px)' }}>
      <Grid2 container spacing={{ xs: 2, sm: 3 }} sx={{ height: '100%' }}>
        <Grid2 size={12} sx={{ height: 'calc(100% - 46px)' }}>
          <UserOrgUnitsField control={control} />
        </Grid2>
      </Grid2>
    </StepForm>
  );
};
