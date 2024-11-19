import { CheckCircleOutline } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Dialog, DialogContent, Form } from '@realgimm5/frontend-common/components';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { OrgUnitFormInput } from '../../../../interfaces/FormInputs/OrgUnit';
import { OrgUnitCitiesField } from '../CitiesField/CitiesField';
import { OrgUnitCitiesDialogProps } from './CitiesDialog.types';

export const OrgUnitCitiesDialog = ({ input, onClose, onSave }: OrgUnitCitiesDialogProps) => {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm<OrgUnitFormInput>({
    defaultValues: {
      cities: input,
    },
  });

  const onSubmit = useCallback(
    (formValues: OrgUnitFormInput) => {
      onSave(formValues.cities);
    },
    [onSave],
  );

  return (
    <Dialog fullScreen open title="org_unit.dialog.cities.title" onClose={onClose}>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          fixedHeight
          action={
            <Button color="primary" variant="contained" type="submit" startIcon={<CheckCircleOutline />}>
              {t('core.button.confirm')}
            </Button>
          }
        >
          <OrgUnitCitiesField control={control} />
        </DialogContent>
      </Form>
    </Dialog>
  );
};
