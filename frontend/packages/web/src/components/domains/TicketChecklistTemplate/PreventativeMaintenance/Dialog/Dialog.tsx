import { yupResolver } from '@hookform/resolvers/yup';
import { CheckCircleOutline } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Dialog, DialogContent, Form } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { TicketChecklistTemplateFormInput } from '../../../../../interfaces/FormInputs/TicketChecklistTemplate';
import { getTicketChecklistTemplatePreventativeMaintenanceSchema } from '../../../../../utils/ticketChecklistTemplate/schemas/preventativeMaintenance';
import { TicketChecklistTemplatePreventativeMaintenanceActivities } from '../../PreventativeMaintenanceActivities/PreventativeMaintenanceActivities';
import { ActivitiesDialogProps } from './Dialog.types';

export const ActivitiesDialog = ({ activities, catalogueType, onClose, onSave }: ActivitiesDialogProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<TicketChecklistTemplateFormInput>({
    defaultValues: {
      catalogueType,
      preventative: {
        activities: [],
      },
    },
    resolver: yupResolver(getTicketChecklistTemplatePreventativeMaintenanceSchema(t, 'activities')),
  });

  const onSubmit = useCallback(
    (formValues: TicketChecklistTemplateFormInput) => {
      onSave(formValues.preventative.activities);
    },
    [onSave],
  );

  return (
    <Dialog open onClose={onClose} title="ticket_checklist_template.dialog.add_activities">
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          fixedHeight
          action={
            <Button color="primary" variant="contained" type="submit" startIcon={<CheckCircleOutline />}>
              {t('common.button.save')}
            </Button>
          }
        >
          <TicketChecklistTemplatePreventativeMaintenanceActivities
            control={control}
            currentActivities={activities}
            errors={errors}
            mode={FormMode.Edit}
          />
        </DialogContent>
      </Form>
    </Dialog>
  );
};
