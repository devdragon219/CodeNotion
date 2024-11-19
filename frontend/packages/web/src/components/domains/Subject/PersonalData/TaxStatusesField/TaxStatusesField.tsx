import { Grid2 } from '@mui/material';
import { CheckboxField } from '@realgimm5/frontend-common/components';
import { TaxStatusType } from '@realgimm5/frontend-common/gql/types';
import { ChangeEvent, useCallback } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { SubjectTaxStatusFormInput } from '../../../../../interfaces/FormInputs/Subject';
import { getEmptySubjectTaxStatusFormInput } from '../../../../../utils/subject/initialValues';
import { TaxStatusesFieldProps } from './TaxStatusesField.types';

export const TaxStatusesField = ({ control, readonly }: TaxStatusesFieldProps) => {
  const { t } = useTranslation();

  const handleCheckboxChange = useCallback(
    (onChange: (value: SubjectTaxStatusFormInput | null) => void, taxStatusType: TaxStatusType) =>
      (_: ChangeEvent<HTMLInputElement>, checked: boolean) => {
        if (checked) {
          onChange(getEmptySubjectTaxStatusFormInput(taxStatusType));
        } else {
          onChange(null);
        }
      },
    [],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="taxStatusLandlordVat"
          control={control}
          render={({ field }) => (
            <CheckboxField
              label={t('subject.field.tax_status_landlord_vat')}
              checked={!!field.value}
              readonly={readonly}
              onChange={handleCheckboxChange(field.onChange, TaxStatusType.VatSubjectAsLandlord)}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="taxStatusTenantVat"
          control={control}
          render={({ field }) => (
            <CheckboxField
              label={t('subject.field.tax_status_tenant_vat')}
              checked={!!field.value}
              readonly={readonly}
              onChange={handleCheckboxChange(field.onChange, TaxStatusType.VatSubjectAsTenant)}
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
