import { Button, Grid2 } from '@mui/material';
import { DateField, SectionTitle, SelectField, TextField } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { EntryStatus, PersonType, UserStatus } from '@realgimm5/frontend-common/gql/types';
import { useCallback, useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { UserPasswordFormInput } from '../../../../interfaces/FormInputs/User';
import { SubjectField } from '../../../core/Fields/Subject/Subject';
import { UserGeneralDataProps } from './GeneralData.types';
import { PasswordDialog } from './PasswordDialog/PasswordDialog';
import { UserPasswordField } from './PasswordField/PasswordField';

export const UserGeneralData = ({ control, errors, mode, readonly, setValue }: UserGeneralDataProps) => {
  const { t } = useTranslation();
  const [isPasswordDialogOpen, setPasswordDialogOpen] = useState(false);

  const handleClosePasswordDialog = useCallback(() => {
    setPasswordDialogOpen(false);
  }, []);
  const handleOpenPasswordDialog = useCallback(() => {
    setPasswordDialogOpen(true);
  }, []);
  const handleSavePassword = useCallback(
    (passwordInput: UserPasswordFormInput) => {
      setValue('password', passwordInput);
      setPasswordDialogOpen(false);
    },
    [setValue],
  );

  const userStatus = useWatch({ control, name: 'status' });

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {mode === FormMode.Create && <SectionTitle value="user.tab.general_data" />}
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('user.field.first_name')}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              required
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('user.field.last_name')}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              required
              readonly={readonly}
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
              label={t('user.field.user_name')}
              error={!!errors.userName}
              helperText={errors.userName?.message}
              required
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="managementSubjects"
          control={control}
          render={({ field }) => (
            <SubjectField
              {...field}
              label={t('user.field.management_subjects')}
              error={!!errors.managementSubjects}
              helperText={errors.managementSubjects?.message}
              readonly={readonly}
              multiple
              required
              where={{
                entryStatus: {
                  eq: EntryStatus.Working,
                },
                personType: {
                  eq: PersonType.ManagementSubject,
                },
              }}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: mode === FormMode.Create ? 6 : 4 }}>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('user.field.status')}
              options={Object.values(UserStatus)}
              getOptionLabel={(option) => t(`common.enum.user_status.${option}`)}
              error={!!errors.status}
              helperText={errors.status?.message}
              required
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: mode === FormMode.Create ? 6 : 4 }}>
        <Controller
          name="enabledSince"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('user.field.enabled_since')}
              error={!!errors.enabledSince}
              helperText={errors.enabledSince?.message}
              disabled={userStatus !== UserStatus.Active}
              required={userStatus === UserStatus.Active}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      {mode === FormMode.Create && (
        <Grid2 size={12}>
          <UserPasswordField control={control} errors={errors} />
        </Grid2>
      )}
      {mode === FormMode.Edit && (
        <>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="ceasedDate"
              control={control}
              render={({ field }) => (
                <DateField
                  {...field}
                  label={t('user.field.ceased_date')}
                  error={!!errors.ceasedDate}
                  helperText={errors.ceasedDate?.message}
                  disabled={userStatus !== UserStatus.Ceased}
                  required={userStatus === UserStatus.Ceased}
                  readonly={readonly}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="lockedSince"
              control={control}
              render={({ field }) => (
                <DateField
                  {...field}
                  label={t('user.field.locked_since')}
                  error={!!errors.lockedSince}
                  helperText={errors.lockedSince?.message}
                  disabled={userStatus !== UserStatus.Suspended}
                  required={userStatus === UserStatus.Suspended}
                  readonly={readonly}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="suspensionReason"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('user.field.suspension_reason')}
                  error={!!errors.suspensionReason}
                  helperText={errors.suspensionReason?.message}
                  disabled={userStatus !== UserStatus.Suspended}
                  readonly={readonly}
                />
              )}
            />
          </Grid2>
        </>
      )}
      {mode === FormMode.Edit && !readonly && (
        <Grid2 size={12}>
          <Button color="secondary" variant="contained" onClick={handleOpenPasswordDialog}>
            {t('user.action.change_password')}
          </Button>
        </Grid2>
      )}
      {isPasswordDialogOpen && <PasswordDialog onSave={handleSavePassword} onClose={handleClosePasswordDialog} />}
    </Grid2>
  );
};
