import { Grid2 } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Control, Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { OperationResult, useClient } from 'urql';

import { FormMode } from '../../../enums/FormMode';
import { UserProfileFragment } from '../../../gql/RealGimm.WebCommon.User.fragment';
import { GetProfileDocument, GetProfileQuery } from '../../../gql/RealGimm.WebCommon.User.operation';
import { UserStatus } from '../../../gql/types';
import { ContactsFieldValues } from '../../../interfaces/FormInputs/Contacts';
import { ProfileFormInput } from '../../../interfaces/FormInputs/Profile';
import { parseProfileToProfileFormInput } from '../../../utils/profile/parseProfileFragment';
import { ContactsField } from '../../Fields/Contacts/Contacts';
import { DateField } from '../../Fields/Date/Date';
import { SelectField } from '../../Fields/Select/Select';
import { TextField } from '../../Fields/Text/Text';
import { Form } from '../../Form/Form';
import { Loader } from '../../Loader/Loader';

export const ProfileGeneralData = () => {
  const { t } = useTranslation();
  const client = useClient();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<ProfileFormInput>();

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    const result: OperationResult<GetProfileQuery> = await client.query(GetProfileDocument, {});
    setLoading(false);
    return parseProfileToProfileFormInput(result.data?.user.me as UserProfileFragment);
  }, [client]);

  const {
    control,
    formState: { errors },
    watch,
  } = useForm<ProfileFormInput>({
    defaultValues: fetchProfile,
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      setProfile(formValues as ProfileFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Form noValidate>
      {loading && <Loader />}
      {profile && (
        <Grid2 container spacing={{ xs: 2, sm: 3 }}>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('common.component.profile.field.last_name')}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  readonly
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('common.component.profile.field.first_name')}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  readonly
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="userName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('common.component.profile.field.user_name')}
                  type="email"
                  error={!!errors.userName}
                  helperText={errors.userName?.message}
                  readonly
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="managementSubjects"
              control={control}
              render={({ field }) => (
                <SelectField
                  {...field}
                  multiple
                  label={t('common.component.profile.field.management_subjects')}
                  options={field.value}
                  error={!!errors.managementSubjects}
                  helperText={errors.managementSubjects?.message}
                  readonly
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <SelectField
                  {...field}
                  label={t('common.component.profile.field.status')}
                  options={Object.values(UserStatus)}
                  getOptionLabel={(option) => t(`common.enum.user_status.${option}`)}
                  error={!!errors.status}
                  helperText={errors.status?.message}
                  readonly
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="enabledSince"
              control={control}
              render={({ field }) => (
                <DateField
                  {...field}
                  label={t('common.component.profile.field.enabled_since')}
                  error={!!errors.enabledSince}
                  helperText={errors.enabledSince?.message}
                  readonly
                />
              )}
            />
          </Grid2>
          <Grid2 size={12}>
            <ContactsField
              control={control as unknown as Control<ContactsFieldValues>}
              readonly
              errors={errors}
              mode={FormMode.Edit}
            />
          </Grid2>
        </Grid2>
      )}
    </Form>
  );
};
