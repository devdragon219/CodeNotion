import { StepForm } from '@realgimm5/frontend-common/components';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { GroupFormInput } from '../../../../interfaces/FormInputs/Group';
import { PermissionsFieldValues } from '../../../../interfaces/FormInputs/Permissions';
import { PermissionsField } from '../../../core/PermissionsTable/Field/Field';
import { GroupPermissionsStepProps } from './Permissions.types';

export const GroupPermissionsStep = ({ group, onChange, onError, onNext }: GroupPermissionsStepProps) => {
  const { control, handleSubmit, watch, setValue } = useForm<PermissionsFieldValues>({
    defaultValues: { permissions: group.permissions },
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange({ ...group, permissions: formValues.permissions } as GroupFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onNext={onError} onSubmit={handleSubmit(onNext)}>
      <PermissionsField control={control} setValue={setValue} />
    </StepForm>
  );
};
