import { yupResolver } from '@hookform/resolvers/yup';
import { AddCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import { RepeatableField, SectionTitle, StepForm } from '@realgimm5/frontend-common/components';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AdministrationsFormInput } from '../../../../interfaces/FormInputs/Administration';
import { getEmptyAdministrationFormInput } from '../../../../utils/administration/initialValues';
import { getAdministrationAdministrationsSchema } from '../../../../utils/administration/schemas/administrations';
import { AdministrationFieldAccordion } from '../../../domains/Administration/Accordion/Accordion';
import { AdministrationAdministrationsStepProps } from './Administration.types';

export const AdministrationAdministrationsStep = ({
  administrations,
  existingAdministrations,
  onChange,
  onError,
  onBack,
  onNext,
}: AdministrationAdministrationsStepProps) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<AdministrationsFormInput>({
    defaultValues: administrations,
    resolver: yupResolver(getAdministrationAdministrationsSchema(existingAdministrations, language, t)),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'administrations',
  });
  const handleAddAdministration = useCallback(() => {
    append(getEmptyAdministrationFormInput());
  }, [append]);

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as AdministrationsFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (errors.administrations && errors.administrations.message) {
      onError(errors.administrations.message);
    }
    // eslint-disable-next-line
  }, [errors.administrations]);

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <Grid2 container spacing={{ xs: 2, sm: 3 }}>
        <SectionTitle value="administration.section_title.administration" />
        {fields.length !== 0 && (
          <Grid2 size={12}>
            <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
              {fields.map(({ key }, index) => (
                <RepeatableField key={key} index={index} onDelete={remove}>
                  <Controller
                    name={`administrations.${index}`}
                    control={control}
                    render={({ field }) => (
                      <AdministrationFieldAccordion
                        {...field}
                        administrations={fields}
                        index={index}
                        errors={errors.administrations?.[index]}
                      />
                    )}
                  />
                </RepeatableField>
              ))}
            </Stack>
          </Grid2>
        )}
        <Grid2 size={12}>
          <Button
            color="secondary"
            variant="contained"
            startIcon={<AddCircleOutline />}
            onClick={handleAddAdministration}
          >
            {t('administration.action.add_administration')}
          </Button>
        </Grid2>
      </Grid2>
    </StepForm>
  );
};
