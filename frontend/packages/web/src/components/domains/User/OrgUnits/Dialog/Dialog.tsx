import { CheckCircleOutline } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Dialog, DialogContent, Form } from '@realgimm5/frontend-common/components';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { UserFormInput } from '../../../../../interfaces/FormInputs/User';
import { UserOrgUnitsField } from '../Field/Field';
import { UserOrgUnitsDialogProps } from './Dialog.types';

export const UserOrgUnitsDialog = ({ input, onClose, onSave }: UserOrgUnitsDialogProps) => {
  const { t } = useTranslation();

  const { control, handleSubmit } = useForm<UserFormInput>({
    defaultValues: input,
  });

  const onSubmit = useCallback(
    (formValues: UserFormInput) => {
      onSave(formValues.orgUnits);
    },
    [onSave],
  );
  return (
    <Dialog fullScreen open onClose={onClose} title="user.dialog.org_units.title">
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          fixedHeight
          action={
            <Button color="primary" variant="contained" type="submit" startIcon={<CheckCircleOutline />}>
              {t('core.button.confirm')}
            </Button>
          }
        >
          <UserOrgUnitsField control={control} />
        </DialogContent>
      </Form>
    </Dialog>
  );
};
