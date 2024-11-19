import { CheckCircleOutline } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Dialog, DialogContent, Form, Loader } from '@realgimm5/frontend-common/components';
import { useSnackbar } from '@realgimm5/frontend-common/contexts';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useAddSlasMutation } from '../../../../../../gql/RealGimm.Web.SLA.operation';
import { FacilityContractTemplateFormInput } from '../../../../../../interfaces/FormInputs/FacilityContractTemplate';
import { SlaFormInput } from '../../../../../../interfaces/FormInputs/SLA';
import { parseSlaFormInputToSlaInput } from '../../../../../../utils/sla/parseSLAFormInput';
import { parseSlaToSlaFormInput } from '../../../../../../utils/sla/parseSLAFragment';
import { CalendarsDialog } from '../../../../../dialogs/Calendars/Calendars';
import { SlaCreateDialog } from '../../../../../dialogs/SLA/SLA';
import { FacilityContractTemplateSlasTransferList } from '../../TransferList/TransferList';
import { FacilityContractTemplateSlasDialogProps } from './Dialog.types';

export const FacilityContractTemplateSlasDialog = ({
  slas,
  onClose,
  onSave,
}: FacilityContractTemplateSlasDialogProps) => {
  const { t } = useTranslation();
  const { showError, showSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [isCalendarsDialogOpen, setCalendarsDialogOpen] = useState(false);
  const [, createSlasMutation] = useAddSlasMutation();
  const [isCreateSlaDialogOpen, setCreateSlaDialogOpen] = useState(false);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FacilityContractTemplateFormInput>({
    defaultValues: {
      slas: [],
    },
  });
  const { append } = useFieldArray({ control, name: 'slas' });

  const openCalendarsDialog = useCallback(() => {
    setCalendarsDialogOpen(true);
  }, []);
  const closeCalendarsDialog = useCallback(() => {
    setCalendarsDialogOpen(false);
  }, []);

  const handleOpenSlaCreateDialog = useCallback(() => {
    setCreateSlaDialogOpen(true);
  }, []);

  const handleCloseSlaCreateDialog = useCallback(() => {
    setCreateSlaDialogOpen(false);
  }, []);
  const handleSaveCreateSla = useCallback(
    async (slas: SlaFormInput[]) => {
      setLoading(true);
      const result = await createSlasMutation({
        inputs: slas.map((sla) => parseSlaFormInputToSlaInput(sla, FormMode.Create)),
      });
      setLoading(false);
      if (result.data?.sla.addRange.isSuccess) {
        showSnackbar(t('sla.feedback.create'), 'success');
        const value = (result.data.sla.addRange.value ?? []).reduce<SlaFormInput[]>(
          (acc, sla) => (sla ? [...acc, parseSlaToSlaFormInput(sla)] : acc),
          [],
        );
        append(value);
        handleCloseSlaCreateDialog();
      } else {
        showError(result.data?.sla.addRange.validationErrors);
      }
    },
    [createSlasMutation, showSnackbar, t, append, handleCloseSlaCreateDialog, showError],
  );

  const onSubmit = useCallback(
    (formValues: FacilityContractTemplateFormInput) => {
      onSave(formValues.slas);
    },
    [onSave],
  );

  return isCalendarsDialogOpen || isCreateSlaDialogOpen ? (
    <>
      {loading && <Loader />}
      {isCalendarsDialogOpen && <CalendarsDialog onClose={closeCalendarsDialog} />}
      {isCreateSlaDialogOpen && <SlaCreateDialog onClose={handleCloseSlaCreateDialog} onSave={handleSaveCreateSla} />}
    </>
  ) : (
    <Dialog fullScreen open title="facility_contract_template.dialog.add_slas" onClose={onClose}>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          fixedHeight
          action={
            <Button color="primary" variant="contained" type="submit" startIcon={<CheckCircleOutline />}>
              {t('common.button.save')}
            </Button>
          }
        >
          <FacilityContractTemplateSlasTransferList
            control={control}
            errors={errors}
            mode={FormMode.Edit}
            where={{
              id: {
                nin: slas.map(({ slaId }) => slaId),
              },
            }}
            onAddSlas={handleOpenSlaCreateDialog}
            onOpenCalendar={openCalendarsDialog}
          />
        </DialogContent>
      </Form>
    </Dialog>
  );
};
