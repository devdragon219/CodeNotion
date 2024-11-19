import { yupResolver } from '@hookform/resolvers/yup';
import { AddCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import { RepeatableField, StepForm } from '@realgimm5/frontend-common/components';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CostChargeAnalysisFormInput } from '../../../../interfaces/FormInputs/CostChargeAnalysis';
import { getEmptyCostChargeAnalysisFilterFormInput } from '../../../../utils/costChargesAnalysis/initialValues';
import { getCostChargeAnalysisGeneralDataSchema } from '../../../../utils/costChargesAnalysis/schemas/generalData';
import { CostChargeAnalysisFilterField } from '../../../domains/CostChargeAnalysis/GeneralData/FilterField/FilterField';
import { CostChargeAnalysisGeneralDataStepProps } from './GeneralData.types';

export const CostChargeAnalysisGeneralDataStep = ({
  costChargesAnalysis,
  onChange,
  onError,
  onNext,
}: CostChargeAnalysisGeneralDataStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<CostChargeAnalysisFormInput>({
    defaultValues: costChargesAnalysis,
    resolver: yupResolver(getCostChargeAnalysisGeneralDataSchema(t)),
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'filters' });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as CostChargeAnalysisFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  const handleAddFilter = useCallback(() => {
    append(getEmptyCostChargeAnalysisFilterFormInput());
  }, [append]);

  return (
    <StepForm onNext={onError} onSubmit={handleSubmit(onNext)} sx={{ pt: 1 }}>
      <Grid2 container spacing={{ xs: 2, sm: 3 }}>
        {fields.length !== 0 && (
          <Grid2 size={12}>
            <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
              {fields.map(({ key }, index) => (
                <RepeatableField key={key} iconPositionAbsolute={false} index={index} onDelete={remove}>
                  <CostChargeAnalysisFilterField control={control} errors={errors} index={index} setValue={setValue} />
                </RepeatableField>
              ))}
            </Stack>
          </Grid2>
        )}
        <Grid2 size={12}>
          <Button color="secondary" variant="contained" startIcon={<AddCircleOutline />} onClick={handleAddFilter}>
            {t('cost_charge_analysis.action.add_filter')}
          </Button>
        </Grid2>
      </Grid2>
    </StepForm>
  );
};
