import { yupResolver } from '@hookform/resolvers/yup';
import { AddCircleOutline, CheckCircleOutline, EventTwoTone } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import {
  CloseDialog,
  Dialog,
  DialogContent,
  Form,
  RepeatableField,
  SectionTitle,
} from '@realgimm5/frontend-common/components';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { PenaltiesFieldValues, PenaltyFormInput } from '../../../interfaces/FormInputs/Penalty';
import { getEmptyPenaltyFormInput } from '../../../utils/penalty/initialValues';
import { getPenaltiesSchema } from '../../../utils/penalty/schemas/penalties';
import { PenaltyFieldAccordion } from '../../domains/Penalty/Accordion/Accordion';
import { CalendarsDialog } from '../Calendars/Calendars';
import { PenaltyCreateDialogProps } from './Penalty.types';

export const PenaltyCreateDialog = ({ contractInternalCode, onClose, onSave }: PenaltyCreateDialogProps) => {
  const { t } = useTranslation();
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);
  const [isCalendarsDialogOpen, setCalendarsDialogOpen] = useState(false);
  const [canUseInternalCodes, setCanUseInternalCodes] = useState<Record<string, boolean>>({});

  const {
    control,
    formState: { isValid: canSave, errors },
    handleSubmit,
    getValues,
  } = useForm<PenaltiesFieldValues>({
    defaultValues: {
      penalties: [getEmptyPenaltyFormInput()],
    },
    resolver: yupResolver(getPenaltiesSchema(canUseInternalCodes, t)),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'penalties',
  });

  const openCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(true);
  }, []);
  const closeCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(false);
  }, []);

  const openCalendarsDialog = useCallback(() => {
    setCalendarsDialogOpen(true);
  }, []);
  const closeCalendarsDialog = useCallback(() => {
    setCalendarsDialogOpen(false);
  }, []);

  const internalCodes = useMemo(() => fields.map(({ internalCode }) => internalCode), [fields]);

  const handleAddPenalty = useCallback(() => {
    append(getEmptyPenaltyFormInput());
  }, [append]);
  const handleDuplicatePenalty = useCallback(
    (penalty: PenaltyFormInput) => {
      append({
        ...penalty,
        guid: crypto.randomUUID(),
        internalCode: '',
      });
    },
    [append],
  );

  const onSubmit = useCallback(
    (formValues: { penalties: PenaltyFormInput[] }) => {
      onSave(formValues.penalties);
    },
    [onSave],
  );

  const handleWorkingClose = useCallback(() => {
    onSubmit(getValues());
  }, [getValues, onSubmit]);

  const handleDestructiveClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return isCloseConfirmationDialogOpen ? (
    <CloseDialog
      canSave={canSave}
      onCancel={closeCloseConfirmationDialog}
      onSave={handleWorkingClose}
      onClose={handleDestructiveClose}
    />
  ) : isCalendarsDialogOpen ? (
    <CalendarsDialog onClose={closeCalendarsDialog} />
  ) : (
    <Dialog fullScreen open title="penalty.dialog.create.title" onClose={openCloseConfirmationDialog}>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          action={
            <Button color="primary" variant="contained" startIcon={<CheckCircleOutline />} type="submit">
              {t('common.button.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }} sx={{ pr: 2 }}>
            <SectionTitle
              value="penalty.section_title.penalties"
              actions={
                <Button
                  color="secondary"
                  variant="contained"
                  startIcon={<EventTwoTone />}
                  onClick={openCalendarsDialog}
                >
                  {t('penalty.action.calendar')}
                </Button>
              }
            />
            {fields.length !== 0 && (
              <Grid2 size={12}>
                <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
                  {fields.map(({ key }, index) => (
                    <RepeatableField key={key} index={index} onDelete={remove}>
                      <Controller
                        name={`penalties.${index}`}
                        control={control}
                        render={({ field }) => (
                          <PenaltyFieldAccordion
                            {...field}
                            contractInternalCode={contractInternalCode}
                            errors={errors.penalties?.[index]}
                            index={index}
                            internalCodes={internalCodes}
                            penalties={fields}
                            onDuplicate={handleDuplicatePenalty}
                            setCanUseInternalCodes={setCanUseInternalCodes}
                          />
                        )}
                      />
                    </RepeatableField>
                  ))}
                </Stack>
              </Grid2>
            )}
            <Grid2 size={12}>
              <Button color="secondary" variant="contained" startIcon={<AddCircleOutline />} onClick={handleAddPenalty}>
                {t('penalty.action.add_penalty')}
              </Button>
            </Grid2>
          </Grid2>
        </DialogContent>
      </Form>
    </Dialog>
  );
};
