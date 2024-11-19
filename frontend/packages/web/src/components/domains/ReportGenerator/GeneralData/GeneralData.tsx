import { yupResolver } from '@hookform/resolvers/yup';
import { Grid2 } from '@mui/material';
import { Loader, SectionTitle, SelectField, StepForm } from '@realgimm5/frontend-common/components';
import { useCallback, useEffect, useMemo } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useGetAvailableReportGeneratorsQuery } from '../../../../gql/RealGimm.Web.ReportGenerator.operation';
import { ReportGeneratorOutputFragment } from '../../../../gql/RealGimm.Web.ReportGeneratorOutput.fragment';
import { ReportGeneratorFormInput } from '../../../../interfaces/FormInputs/ReportGenerator';
import { parseReportGeneratorFilterFieldFragmentsToFormViewerFieldFormInputs } from '../../../../utils/reportGenerator/parseReportGeneratorFragment';
import { getReportGeneratorGeneralDataSchema } from '../../../../utils/reportGenerator/schemas/generalData';
import { ReportGeneratorGeneralDataStepProps } from './GeneralData.types';

export const ReportGeneratorGeneralDataStep = ({
  reportGenerator,
  onChange,
  onError,
  onNext,
}: ReportGeneratorGeneralDataStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<ReportGeneratorFormInput>({
    defaultValues: reportGenerator,
    resolver: yupResolver(getReportGeneratorGeneralDataSchema(t)),
  });
  const report = useWatch({ control, name: 'report' });
  const [queryState] = useGetAvailableReportGeneratorsQuery();
  const reports = useMemo(
    () => queryState.data?.reportGenerator.availableReportGenerators ?? [],
    [queryState.data?.reportGenerator.availableReportGenerators],
  );

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as ReportGeneratorFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  const handleReportChange = useCallback(
    (onChange: (report: ReportGeneratorOutputFragment | null) => void) =>
      (report: ReportGeneratorOutputFragment | null) => {
        onChange(report);
        setValue(
          'fields',
          parseReportGeneratorFilterFieldFragmentsToFormViewerFieldFormInputs(report?.filterFields ?? []),
        );
        setValue('formats', []);
      },
    [setValue],
  );

  return (
    <StepForm onNext={onError} onSubmit={handleSubmit(onNext)}>
      <Grid2 container spacing={{ xs: 2, sm: 3 }}>
        {queryState.fetching && <Loader />}
        <SectionTitle value="report_generator.section_title.general_data" />
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Controller
            name="report"
            control={control}
            render={({ field }) => (
              <SelectField
                {...field}
                onChange={handleReportChange(field.onChange)}
                label={t('report_generator.field.report')}
                options={reports}
                getOptionKey={(option) => option.id}
                getOptionLabel={(option) => option.name}
                error={!!errors.report}
                helperText={errors.report?.message}
                required
              />
            )}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Controller
            name="formats"
            control={control}
            render={({ field }) => (
              <SelectField
                {...field}
                multiple
                label={t('report_generator.field.format')}
                options={report?.supportedFormats ?? []}
                getOptionLabel={(option) => t(`common.enum.report_format.${option}`)}
                error={!!errors.formats}
                helperText={errors.formats?.message}
                disabled={!report}
                required
              />
            )}
          />
        </Grid2>
      </Grid2>
    </StepForm>
  );
};
