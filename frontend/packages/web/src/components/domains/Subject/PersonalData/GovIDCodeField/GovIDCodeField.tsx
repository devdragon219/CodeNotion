import { Grid2 } from '@mui/material';
import { TextField } from '@realgimm5/frontend-common/components';
import { useDebounce } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { OperationResult, useClient } from 'urql';

import { FindCountyCityDocument, FindCountyCityQuery } from '../../../../../gql/RealGimm.Web.City.operation';
import { GovIdCodeFieldProps } from './GovIDCodeField.types';

export const GovIdCodeField = ({ control, errors, readonly, setValue }: GovIdCodeFieldProps) => {
  const { t } = useTranslation();
  const client = useClient();
  const govIdCode = useWatch({ control, name: 'additionalGovIdCode' });
  const debouncedGovIdCode = useDebounce(govIdCode);

  const findGovIdCountyName = useCallback(async () => {
    if (!/^[a-zA-Z]{2}/.test(debouncedGovIdCode)) {
      setValue('additionalGovIdCountyName', '');
      return;
    }

    const result: OperationResult<FindCountyCityQuery> = await client.query(FindCountyCityDocument, {
      countyShortCode: debouncedGovIdCode.slice(0, 2),
    });
    setValue('additionalGovIdCountyName', result.data?.city.findCountyCity.value?.countyName ?? '');
  }, [debouncedGovIdCode, client, setValue]);

  useEffect(() => {
    void findGovIdCountyName();
    // eslint-disable-next-line
  }, [debouncedGovIdCode]);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="additionalGovIdCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('subject.field.rea_number')}
              error={!!errors.additionalGovIdCode}
              helperText={errors.additionalGovIdCode?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="additionalGovIdCountyName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('subject.field.rea_county')}
              error={!!errors.additionalGovIdCode}
              helperText={errors.additionalGovIdCode?.message}
              readonly={readonly}
              disabled
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
