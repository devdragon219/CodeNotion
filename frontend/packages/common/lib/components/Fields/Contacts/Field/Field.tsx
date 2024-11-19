import { Grid2 } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ContactInfoType } from '../../../../gql/types';
import { SelectField } from '../../Select/Select';
import { TextField } from '../../Text/Text';
import { ContactFieldProps } from './Field.types';

export const ContactField = ({ control, errors, index, type }: ContactFieldProps) => {
  const { t } = useTranslation();

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name={`contacts.${type === 'email' ? 'emails' : 'phones'}.${index}.contactInfoType`}
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t(`common.component.contacts_field.field.${type === 'email' ? 'email_type' : 'phone_type'}`)}
              options={
                type === 'email'
                  ? [ContactInfoType.EMail, ContactInfoType.RegisteredEmail]
                  : [ContactInfoType.MobilePhone, ContactInfoType.LandlinePhone]
              }
              getOptionLabel={(type) => t(`common.enum.contact_info_type.${type}`)}
              error={
                type === 'email'
                  ? !!errors.contacts?.emails?.[index]?.contactInfoType
                  : !!errors.contacts?.phones?.[index]?.contactInfoType
              }
              helperText={
                type === 'email'
                  ? errors.contacts?.emails?.[index]?.contactInfoType?.message
                  : errors.contacts?.phones?.[index]?.contactInfoType?.message
              }
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name={`contacts.${type === 'email' ? 'emails' : 'phones'}.${index}.contactInfo`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t(`common.component.contacts_field.field.${type === 'email' ? 'email' : 'phone_number'}`)}
              error={
                type === 'email'
                  ? !!errors.contacts?.emails?.[index]?.contactInfo
                  : !!errors.contacts?.phones?.[index]?.contactInfo
              }
              helperText={
                type === 'email'
                  ? errors.contacts?.emails?.[index]?.contactInfo?.message
                  : errors.contacts?.phones?.[index]?.contactInfo?.message
              }
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
