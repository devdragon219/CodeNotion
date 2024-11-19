import { yupResolver } from '@hookform/resolvers/yup';
import { CheckCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { Dialog, DialogContent, Form, SectionTitle } from '@realgimm5/frontend-common/components';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { UserFormInput } from '../../../../../interfaces/FormInputs/User';
import { getUserPasswordSchema } from '../../../../../utils/user/schemas/password';
import { UserPasswordField } from '../PasswordField/PasswordField';
import { PasswordDialogProps } from './PasswordDialog.types';

export const PasswordDialog = ({ onSave, onClose }: PasswordDialogProps) => {
  const { t } = useTranslation();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<UserFormInput>({
    defaultValues: {
      password: {
        newPassword: '',
        confirmPassword: '',
      },
    },
    resolver: yupResolver(getUserPasswordSchema(t)),
  });

  const onSubmit = useCallback(
    (input: UserFormInput) => {
      if (input.password !== null) {
        onSave(input.password);
      }
    },
    [onSave],
  );

  return (
    <Dialog open onClose={onClose} title="user.dialog.change_password.title">
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          action={
            <Button color="primary" variant="contained" type="submit" startIcon={<CheckCircleOutline />}>
              {t('common.button.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }}>
            <SectionTitle value="user.section_title.change_password" />
            <Grid2 size={12}>
              <UserPasswordField control={control} errors={errors} />
            </Grid2>
          </Grid2>
        </DialogContent>
      </Form>
    </Dialog>
  );
};
