import { StepForm } from '@realgimm5/frontend-common/components';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { OrgUnitFormInput } from '../../../../interfaces/FormInputs/OrgUnit';
import { OrgUnitCitiesField } from '../../../domains/OrgUnit/CitiesField/CitiesField';
import { OrgUnitGeographicalDataStepProps } from './GeographicalData.types';

export const OrgUnitGeographicalDataStep = ({
  orgUnit,
  onBack,
  onChange,
  onError,
  onNext,
}: OrgUnitGeographicalDataStepProps) => {
  const { control, handleSubmit, watch } = useForm<OrgUnitFormInput>({
    defaultValues: orgUnit,
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as OrgUnitFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)} sx={{ height: 'calc(100% - 92px)' }}>
      <OrgUnitCitiesField control={control} />
    </StepForm>
  );
};
