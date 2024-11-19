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

import { SlaFormInput, SlasFieldValues } from '../../../interfaces/FormInputs/SLA';
import { getEmptySlaFormInput } from '../../../utils/sla/initialValues';
import { getSlasSchema } from '../../../utils/sla/schemas/slas';
import { SlaFieldAccordion } from '../../domains/SLA/Accordion/Accordion';
import { CalendarsDialog } from '../Calendars/Calendars';
import { SlaCreateDialogProps } from './SLA.types';

export const SlaCreateDialog = ({ contractInternalCode, onClose, onSave }: SlaCreateDialogProps) => {
  const { t } = useTranslation();
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);
  const [isCalendarsDialogOpen, setCalendarsDialogOpen] = useState(false);
  const [canUseInternalCodes, setCanUseInternalCodes] = useState<Record<string, boolean>>({});

  const {
    control,
    formState: { isValid: canSave, errors },
    handleSubmit,
    getValues,
  } = useForm<SlasFieldValues>({
    defaultValues: {
      slas: [getEmptySlaFormInput()],
    },
    resolver: yupResolver(getSlasSchema(canUseInternalCodes, t)),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'slas',
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

  const handleAddSla = useCallback(() => {
    append(getEmptySlaFormInput());
  }, [append]);
  const handleDuplicateSla = useCallback(
    (sla: SlaFormInput) => {
      append({
        ...sla,
        guid: crypto.randomUUID(),
        internalCode: '',
      });
    },
    [append],
  );

  const onSubmit = useCallback(
    (formValues: { slas: SlaFormInput[] }) => {
      onSave(formValues.slas);
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
    <Dialog fullScreen open title="sla.dialog.create.title" onClose={openCloseConfirmationDialog}>
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
              value="sla.section_title.slas"
              actions={
                <Button
                  color="secondary"
                  variant="contained"
                  startIcon={<EventTwoTone />}
                  onClick={openCalendarsDialog}
                >
                  {t('sla.action.calendar')}
                </Button>
              }
            />
            {fields.length !== 0 && (
              <Grid2 size={12}>
                <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
                  {fields.map(({ key }, index) => (
                    <RepeatableField key={key} index={index} onDelete={remove}>
                      <Controller
                        name={`slas.${index}`}
                        control={control}
                        render={({ field }) => (
                          <SlaFieldAccordion
                            {...field}
                            contractInternalCode={contractInternalCode}
                            errors={errors.slas?.[index]}
                            index={index}
                            internalCodes={internalCodes}
                            slas={fields}
                            onDuplicate={handleDuplicateSla}
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
              <Button color="secondary" variant="contained" startIcon={<AddCircleOutline />} onClick={handleAddSla}>
                {t('sla.action.add_sla')}
              </Button>
            </Grid2>
          </Grid2>
        </DialogContent>
      </Form>
    </Dialog>
  );
};
