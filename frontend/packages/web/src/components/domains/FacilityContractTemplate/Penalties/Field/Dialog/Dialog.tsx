import { CheckCircleOutline } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Dialog, DialogContent, Form, Loader } from '@realgimm5/frontend-common/components';
import { useSnackbar } from '@realgimm5/frontend-common/contexts';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useAddPenaltiesMutation } from '../../../../../../gql/RealGimm.Web.Penalty.operation';
import { FacilityContractTemplateFormInput } from '../../../../../../interfaces/FormInputs/FacilityContractTemplate';
import { PenaltyFormInput } from '../../../../../../interfaces/FormInputs/Penalty';
import { parsePenaltyFormInputToPenaltyInput } from '../../../../../../utils/penalty/parsePenaltyFormInput';
import { parsePenaltyToPenaltyFormInput } from '../../../../../../utils/penalty/parsePenaltyFragment';
import { CalendarsDialog } from '../../../../../dialogs/Calendars/Calendars';
import { PenaltyCreateDialog } from '../../../../../dialogs/Penalty/Penalty';
import { FacilityContractTemplatePenaltiesTransferList } from '../../TransferList/TransferList';
import { FacilityContractTemplatePenaltiesDialogProps } from './Dialog.types';

export const FacilityContractTemplatePenaltiesDialog = ({
  penalties,
  onClose,
  onSave,
}: FacilityContractTemplatePenaltiesDialogProps) => {
  const { t } = useTranslation();
  const { showError, showSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [isCalendarsDialogOpen, setCalendarsDialogOpen] = useState(false);
  const [, createPenaltiesMutation] = useAddPenaltiesMutation();
  const [isCreatePenaltyDialogOpen, setCreatePenaltyDialogOpen] = useState(false);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FacilityContractTemplateFormInput>({
    defaultValues: {
      penalties: [],
    },
  });
  const { append } = useFieldArray({ control, name: 'penalties' });

  const openCalendarsDialog = useCallback(() => {
    setCalendarsDialogOpen(true);
  }, []);
  const closeCalendarsDialog = useCallback(() => {
    setCalendarsDialogOpen(false);
  }, []);

  const handleOpenPenaltyCreateDialog = useCallback(() => {
    setCreatePenaltyDialogOpen(true);
  }, []);

  const handleClosePenaltyCreateDialog = useCallback(() => {
    setCreatePenaltyDialogOpen(false);
  }, []);
  const handleSaveCreatePenalty = useCallback(
    async (penalties: PenaltyFormInput[]) => {
      setLoading(true);
      const result = await createPenaltiesMutation({
        inputs: penalties.map((penalty) => parsePenaltyFormInputToPenaltyInput(penalty, FormMode.Create)),
      });
      setLoading(false);
      if (result.data?.penalty.addRange.isSuccess) {
        showSnackbar(t('penalty.feedback.create'), 'success');
        const value = (result.data.penalty.addRange.value ?? []).reduce<PenaltyFormInput[]>(
          (acc, penalty) => (penalty ? [...acc, parsePenaltyToPenaltyFormInput(penalty)] : acc),
          [],
        );
        append(value);
        handleClosePenaltyCreateDialog();
      } else {
        showError(result.data?.penalty.addRange.validationErrors);
      }
    },
    [createPenaltiesMutation, showSnackbar, t, append, handleClosePenaltyCreateDialog, showError],
  );

  const onSubmit = useCallback(
    (formValues: FacilityContractTemplateFormInput) => {
      onSave(formValues.penalties);
    },
    [onSave],
  );

  return isCalendarsDialogOpen || isCreatePenaltyDialogOpen ? (
    <>
      {loading && <Loader />}
      {isCalendarsDialogOpen && <CalendarsDialog onClose={closeCalendarsDialog} />}
      {isCreatePenaltyDialogOpen && (
        <PenaltyCreateDialog onClose={handleClosePenaltyCreateDialog} onSave={handleSaveCreatePenalty} />
      )}
    </>
  ) : (
    <Dialog fullScreen open title="facility_contract_template.dialog.add_penalties" onClose={onClose}>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          fixedHeight
          action={
            <Button color="primary" variant="contained" type="submit" startIcon={<CheckCircleOutline />}>
              {t('common.button.save')}
            </Button>
          }
        >
          <FacilityContractTemplatePenaltiesTransferList
            control={control}
            errors={errors}
            mode={FormMode.Edit}
            where={{
              id: {
                nin: penalties.map(({ penaltyId }) => penaltyId),
              },
            }}
            onAddPenalties={handleOpenPenaltyCreateDialog}
            onOpenCalendar={openCalendarsDialog}
          />
        </DialogContent>
      </Form>
    </Dialog>
  );
};
