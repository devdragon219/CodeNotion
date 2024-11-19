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
import { SlaFormInput } from '../../../../../../interfaces/FormInputs/SLA';
import { isGroupConditionsFormInput } from '../../../../../../utils/typeNarrowings/isGroupConditions';
import { CalendarsDialog } from '../../../../../dialogs/Calendars/Calendars';
import { SlaCreateDialog } from '../../../../../dialogs/SLA/SLA';
import { FacilityContractSlasTransferList } from '../../TransferList/TransferList';
import { FacilityContractSlasDialogProps } from './Dialog.types';

export const FacilityContractSlasDialog = ({
  facilityContractId,
  internalCode,
  slas,
  onClose,
  onSave,
}: FacilityContractSlasDialogProps) => {
  const { t } = useTranslation();
  const [isCalendarsDialogOpen, setCalendarsDialogOpen] = useState(false);
  const [isCreateSlaDialogOpen, setCreateSlaDialogOpen] = useState(false);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FacilityContractFormInput>({
    defaultValues: {
      facilityContractId,
      internalCode,
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
    (slas: SlaFormInput[]) => {
      append(slas);
      handleCloseSlaCreateDialog();
    },
    [append, handleCloseSlaCreateDialog],
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
        formValues.slas.map((sla) => ({
          ...sla,
          conditions: {
            ifCondition: removeId(sla.conditions.ifCondition),
            thenCondition: removeId(sla.conditions.thenCondition),
          },
          internalCode: '',
          slaId: null,
        })),
      );
    },
    [onSave],
  );

  return isCalendarsDialogOpen || isCreateSlaDialogOpen ? (
    <>
      {isCalendarsDialogOpen && <CalendarsDialog onClose={closeCalendarsDialog} />}
      {isCreateSlaDialogOpen && (
        <SlaCreateDialog
          contractInternalCode={internalCode}
          onClose={handleCloseSlaCreateDialog}
          onSave={handleSaveCreateSla}
        />
      )}
    </>
  ) : (
    <Dialog fullScreen open title="facility_contract.dialog.add_slas" onClose={onClose}>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          fixedHeight
          action={
            <Button color="primary" variant="contained" type="submit" startIcon={<CheckCircleOutline />}>
              {t('common.button.save')}
            </Button>
          }
        >
          <FacilityContractSlasTransferList
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
