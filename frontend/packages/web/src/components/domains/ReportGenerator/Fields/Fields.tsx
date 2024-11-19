import { yupResolver } from '@hookform/resolvers/yup';
import { Grid2 } from '@mui/material';
import { FormViewer, SectionTitle, StepActions, StepContent } from '@realgimm5/frontend-common/components';
import { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ReportGeneratorFormInput } from '../../../../interfaces/FormInputs/ReportGenerator';
import { getReportGeneratorFieldsSchema } from '../../../../utils/reportGenerator/schemas/fields';
import { ReportGeneratorFieldsStepProps } from './Fields.types';

export const ReportGeneratorFieldsStep = ({
  reportGenerator,
  onBack,
  onChange,
  onSave,
}: ReportGeneratorFieldsStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<ReportGeneratorFormInput>({
    defaultValues: reportGenerator,
    resolver: yupResolver(getReportGeneratorFieldsSchema(t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as ReportGeneratorFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  const onSubmit = useCallback(
    (values: ReportGeneratorFormInput) => {
      onSave(values);
    },
    [onSave],
  );

  return (
    <>
      <StepContent>
        <Grid2 container spacing={{ xs: 2, sm: 3 }}>
          <SectionTitle value="report_generator.section_title.fields" />
          <Grid2 size={12}>
            <Controller
              name="fields"
              control={control}
              render={({ field }) => <FormViewer {...field} errors={errors} />}
            />
          </Grid2>
        </Grid2>
      </StepContent>
      <StepActions
        completeLabel="report_generator.action.generate"
        onBack={onBack}
        onComplete={handleSubmit(onSubmit)}
      />
    </>
  );
};
