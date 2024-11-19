import { yupResolver } from '@hookform/resolvers/yup';
import { AddCircleOutline, DesignServicesTwoTone } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import { RepeatableField, SectionTitle, StepForm } from '@realgimm5/frontend-common/components';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EstateTotalMarketValueFormInput } from '../../../../interfaces/FormInputs/Estate';
import { getEmptyEstateMarketValueFormInput } from '../../../../utils/estate/initialValues';
import { getEstateTotalMarketValueMarketValuesSchema } from '../../../../utils/estate/schemas/totalMarketValueMarketValues';
import { MarketValueField } from './Field/Field';
import { EstateMarketValuesStepProps } from './MarketValues.types';

const FIXED_MARKET_VALUE_FIELDS = 1;
export const EstateMarketValuesStep = ({
  estateTotalMarketValue,
  onBack,
  onChange,
  onError,
  onSave,
}: EstateMarketValuesStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<EstateTotalMarketValueFormInput>({
    defaultValues: estateTotalMarketValue,
    resolver: yupResolver(getEstateTotalMarketValueMarketValuesSchema(t)),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'marketValues',
  });

  const handleAddMarketValue = useCallback(() => {
    append(getEmptyEstateMarketValueFormInput());
  }, [append]);

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as EstateTotalMarketValueFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm
      completeIcon={<DesignServicesTwoTone />}
      completeLabel="estate.dialog.total_market_value.action"
      onBack={onBack}
      onComplete={onError}
      onSubmit={handleSubmit(onSave)}
    >
      <Grid2 container spacing={{ xs: 2, sm: 3 }}>
        <SectionTitle value="estate.section_title.add_market_values" />
        <Grid2 size={12}>
          <MarketValueField control={control} errors={errors} index={0} />
        </Grid2>
        <Grid2 size={12}>
          <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
            {fields.slice(FIXED_MARKET_VALUE_FIELDS).map(({ key }, index) => (
              <RepeatableField key={key} index={index + FIXED_MARKET_VALUE_FIELDS} onDelete={remove}>
                <MarketValueField control={control} errors={errors} index={index + FIXED_MARKET_VALUE_FIELDS} />
              </RepeatableField>
            ))}
          </Stack>
        </Grid2>
        <Grid2 size={12}>
          <Button color="secondary" variant="contained" startIcon={<AddCircleOutline />} onClick={handleAddMarketValue}>
            {t('estate.action.add_market_value')}
          </Button>
        </Grid2>
      </Grid2>
    </StepForm>
  );
};
