import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid2 } from '@mui/material';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../../../contexts/auth/hook';
import { useSnackbar } from '../../../contexts/snackbar/hook';
import { useChangePasswordMutation } from '../../../gql/RealGimm.WebCommon.User.operation';
import { ProfileChangePasswordFormInput } from '../../../interfaces/FormInputs/Profile';
import { getEmptyProfileChangePasswordFormInput } from '../../../utils/profile/initialValues';
import { getProfileChangePasswordSchema } from '../../../utils/profile/schemas/changePassword';
import { PasswordField } from '../../Fields/Password/Password';
import { TextField } from '../../Fields/Text/Text';
import { Form } from '../../Form/Form';
import { Loader } from '../../Loader/Loader';

export const ProfileChangePassword = () => {
  const { t } = useTranslation();
  const { showError, showSnackbar } = useSnackbar();
  const { user } = useAuth();
  const [mutationState, changePasswordMutation] = useChangePasswordMutation();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ProfileChangePasswordFormInput>({
    defaultValues: getEmptyProfileChangePasswordFormInput(),
    resolver: yupResolver(getProfileChangePasswordSchema(t)),
  });

  const onSubmit = useCallback(
    async (values: ProfileChangePasswordFormInput) => {
      const result = await changePasswordMutation({
        input: {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
          username: user?.username ?? '',
        },
      });
      if (result.data?.user.changePassword.isSuccess) {
        showSnackbar(t('common.component.profile.feedback.change_password'), 'success');
      } else {
        showError(result.data?.user.changePassword.validationErrors);
      }
    },
    [user, t, changePasswordMutation, showSnackbar, showError],
  );

  return (
    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
      {mutationState.fetching && <Loader />}
      <Grid2 container spacing={{ xs: 2, sm: 3 }}>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField autoComplete="username" value={user?.username} sx={{ display: 'none' }} />
          <Controller
            name="currentPassword"
            control={control}
            render={({ field }) => (
              <PasswordField
                {...field}
                label={t('common.component.profile.field.current_password')}
                autoComplete="current-password"
                error={!!errors.currentPassword}
                helperText={errors.currentPassword?.message}
              />
            )}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }} />
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <PasswordField
                {...field}
                label={t('common.component.profile.field.new_password')}
                autoComplete="new-password"
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
              />
            )}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <PasswordField
                {...field}
                label={t('common.component.profile.field.confirm_password')}
                autoComplete="new-password"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
            )}
          />
        </Grid2>
        <Grid2 size={12} sx={{ textAlign: 'right' }}>
          <Button type="submit">{t('common.component.profile.action.change_password')}</Button>
        </Grid2>
      </Grid2>
    </Form>
  );
};
