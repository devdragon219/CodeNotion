import { Grid2 } from '@mui/material';
import { TextField } from '@realgimm5/frontend-common/components';
import { forwardRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { ConditionType } from '../../../../enums/ConditionType';
import { PenaltyFormInput } from '../../../../interfaces/FormInputs/Penalty';
import { ConditionsBuilder } from '../../../core/ConditionsBuilder/ConditionsBuilder';
import { PenaltyFieldProps } from './Field.types';

const PenaltyField = forwardRef<HTMLDivElement, PenaltyFieldProps>(({ errors, readonly, value, onChange }, ref) => {
  const { t } = useTranslation();

  const handleChange = useCallback(
    (key: keyof PenaltyFormInput) => (input?: unknown) => {
      onChange({ ...value, [key]: input });
    },
    [onChange, value],
  );

  return (
    <Grid2 ref={ref} container spacing={{ xs: 2, sm: 3 }}>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <TextField
          label={t('penalty.field.internal_code')}
          value={value.internalCode}
          onChange={handleChange('internalCode')}
          error={!!errors?.internalCode}
          helperText={errors?.internalCode?.message}
          readonly={readonly}
          required
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <TextField
          label={t('penalty.field.description')}
          value={value.description}
          onChange={handleChange('description')}
          error={!!errors?.description}
          helperText={errors?.description?.message}
          readonly={readonly}
          required
        />
      </Grid2>
      <Grid2 size={12}>
        <ConditionsBuilder
          conditionTypes={{
            if: Object.values(ConditionType).filter((it) => it !== ConditionType.PenaltyType),
            then: [ConditionType.PenaltyType],
          }}
          errors={errors?.conditions}
          readonly={readonly}
          value={value.conditions}
          onChange={handleChange('conditions')}
        />
      </Grid2>
    </Grid2>
  );
});
PenaltyField.displayName = 'PenaltyField';

export { PenaltyField };
