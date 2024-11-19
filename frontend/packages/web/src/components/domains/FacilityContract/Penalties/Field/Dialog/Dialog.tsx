import { CheckCircleOutline } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Dialog, DialogContent, Form } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { GroupConditionsFormInput } from '../../../../../../interfaces/FormInputs/ConditionsBuilder';
import { FacilityContractFormInput } from '../../../../../../interfaces/FormInputs/FacilityContract';
import { PenaltyFormInput } from '../../../../../../interfaces/FormInputs/Penalty';
import { isGroupConditionsFormInput } from '../../../../../../utils/typeNarrowings/isGroupConditions';
import { CalendarsDialog } from '../../../../../dialogs/Calendars/Calendars';
import { PenaltyCreateDialog } from '../../../../../dialogs/Penalty/Penalty';
import { FacilityContractPenaltiesTransferList } from '../../TransferList/TransferList';
import { FacilityContractPenaltiesDialogProps } from './Dialog.types';

export const FacilityContractPenaltiesDialog = ({
  facilityContractId,
  internalCode,
  penalties,
  onClose,
  onSave,
}: FacilityContractPenaltiesDialogProps) => {
  const { t } = useTranslation();
  const [isCalendarsDialogOpen, setCalendarsDialogOpen] = useState(false);
  const [isCreatePenaltyDialogOpen, setCreatePenaltyDialogOpen] = useState(false);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FacilityContractFormInput>({
    defaultValues: {
      facilityContractId,
      internalCode,
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
    (penalties: PenaltyFormInput[]) => {
      append(penalties);
      handleClosePenaltyCreateDialog();
    },
    [append, handleClosePenaltyCreateDialog],
  );

  const onSubmit = useCallback(
    (formValues: FacilityContractFormInput) => {
      const removeId = (conditions: GroupConditionsFormInput): GroupConditionsFormInput => ({
        ...conditions,
        groupConditionId: null,
        conditions: conditions.conditions.map((condition) => {
          if (isGroupConditionsFormInput(condition)) return removeId(condition);

          return {
            ...condition,
            conditionId: null,
          };
        }),
      });

      onSave(
        formValues.penalties.map((penalty) => ({
          ...penalty,
          conditions: {
            ifCondition: removeId(penalty.conditions.ifCondition),
            thenCondition: removeId(penalty.conditions.thenCondition),
          },
          internalCode: '',
          penaltyId: null,
        })),
      );
    },
    [onSave],
  );

  return isCalendarsDialogOpen || isCreatePenaltyDialogOpen ? (
    <>
      {isCalendarsDialogOpen && <CalendarsDialog onClose={closeCalendarsDialog} />}
      {isCreatePenaltyDialogOpen && (
        <PenaltyCreateDialog
          contractInternalCode={internalCode}
          onClose={handleClosePenaltyCreateDialog}
          onSave={handleSaveCreatePenalty}
        />
      )}
    </>
  ) : (
    <Dialog fullScreen open title="facility_contract.dialog.add_penalties" onClose={onClose}>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          fixedHeight
          action={
            <Button color="primary" variant="contained" type="submit" startIcon={<CheckCircleOutline />}>
              {t('common.button.save')}
            </Button>
          }
        >
          <FacilityContractPenaltiesTransferList
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
