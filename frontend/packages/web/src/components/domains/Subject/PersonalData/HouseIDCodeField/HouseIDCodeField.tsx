import { Grid2 } from '@mui/material';
import { TextField } from '@realgimm5/frontend-common/components';
import { useDebounce } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { OperationResult, useClient } from 'urql';

import { FindCountyCityDocument, FindCountyCityQuery } from '../../../../../gql/RealGimm.Web.City.operation';
import { HouseIdCodeFieldProps } from './HouseIDCodeField.types';

export const HouseIdCodeField = ({ control, errors, readonly, setValue }: HouseIdCodeFieldProps) => {
  const { t } = useTranslation();
  const client = useClient();
  const houseIdCode = useWatch({ control, name: 'companiesHouseIdCode' });
  const debouncedHouseIdCode = useDebounce(houseIdCode);

  const findGovIdCountyName = useCallback(async () => {
    if (!/^[a-zA-Z]{2}/.test(debouncedHouseIdCode)) {
      setValue('companiesHouseIdCountyName', '');
      return;
    }

    const result: OperationResult<FindCountyCityQuery> = await client.query(FindCountyCityDocument, {
      countyShortCode: debouncedHouseIdCode.slice(0, 2),
    });
    setValue('companiesHouseIdCountyName', result.data?.city.findCountyCity.value?.countyName ?? '');
  }, [debouncedHouseIdCode, client, setValue]);

  useEffect(() => {
    void findGovIdCountyName();
    // eslint-disable-next-line
  }, [debouncedHouseIdCode]);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="companiesHouseIdCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('subject.field.cciaa_number')}
              error={!!errors.companiesHouseIdCode}
              helperText={errors.companiesHouseIdCode?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="companiesHouseIdCountyName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('subject.field.cciaa_county')}
              error={!!errors.companiesHouseIdCode}
              helperText={errors.companiesHouseIdCode?.message}
              readonly={readonly}
              disabled
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
