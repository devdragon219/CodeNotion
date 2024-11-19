import { Button, Grid2 } from '@mui/material';
import { Dialog, DialogContent, Form, SectionTitle } from '@realgimm5/frontend-common/components';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { PermissionsFieldValues } from '../../../../interfaces/FormInputs/Permissions';
import { PermissionsField } from '../Field/Field';
import { PermissionsDialogInput, PermissionsDialogProps } from './Dialog.types';

export const PermissionsDialog = ({ permissionsInput, onSave, onClose }: PermissionsDialogProps) => {
  const { t } = useTranslation();

  const { control, handleSubmit, setValue } = useForm<PermissionsFieldValues>({
    defaultValues: { permissions: permissionsInput ?? [] },
  });

  const onSubmit = useCallback(
    (input: PermissionsDialogInput) => {
      onSave(input);
    },
    [onSave],
  );

  return (
    <Dialog open onClose={onClose} title="group.dialog.change_permissions.title">
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          action={
            <Button color="primary" variant="contained" type="submit">
              {t('common.button.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }}>
            <SectionTitle value="group.section_title.permissions" />
            <Grid2 size={12}>
              <PermissionsField control={control} setValue={setValue} />
            </Grid2>
          </Grid2>
        </DialogContent>
      </Form>
    </Dialog>
  );
};
