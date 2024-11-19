import { AddCircleOutline, EventTwoTone } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import { Alert, EmptyText, RepeatableField, SectionTitle } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { PenaltyFormInput } from '../../../../../interfaces/FormInputs/Penalty';
import { CalendarsDialog } from '../../../../dialogs/Calendars/Calendars';
import { PenaltyFieldAccordion } from '../../../Penalty/Accordion/Accordion';
import { FacilityContractTemplatePenaltiesDialog } from './Dialog/Dialog';
import { FacilityContractTemplatePenaltiesFieldProps } from './Field.types';

export const FacilityContractTemplatePenaltiesField = ({
  control,
  errors,
  mode,
  readonly,
  onAddPenalties,
  onOpenCalendar,
}: FacilityContractTemplatePenaltiesFieldProps) => {
  const { t } = useTranslation();
  const [isCalendarsDialogOpen, setCalendarsDialogOpen] = useState(false);
  const [isPenaltiesDialogOpen, setPenaltiesDialogOpen] = useState(false);
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'penalties',
  });

  const openCalendarsDialog = useCallback(() => {
    if (onOpenCalendar) {
      onOpenCalendar();
    } else {
      setCalendarsDialogOpen(true);
    }
  }, [onOpenCalendar]);
  const closeCalendarsDialog = useCallback(() => {
    setCalendarsDialogOpen(false);
  }, []);

  const handleAddPenalties = useCallback(() => {
    if (onAddPenalties) {
      onAddPenalties();
    } else {
      setPenaltiesDialogOpen(true);
    }
  }, [onAddPenalties]);
  const handleClosePenaltiesDialog = useCallback(() => {
    setPenaltiesDialogOpen(false);
  }, []);
  const handleSavePenalties = useCallback(
    (penalties: PenaltyFormInput[]) => {
      append(penalties);
      handleClosePenaltiesDialog();
    },
    [append, handleClosePenaltiesDialog],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }} sx={{ pr: 2 }}>
      {isCalendarsDialogOpen && <CalendarsDialog readonly={!readonly} onClose={closeCalendarsDialog} />}
      {isPenaltiesDialogOpen && (
        <FacilityContractTemplatePenaltiesDialog
          penalties={fields}
          onClose={handleClosePenaltiesDialog}
          onSave={handleSavePenalties}
        />
      )}
      <SectionTitle
        actions={
          <>
            <Button color="secondary" variant="contained" startIcon={<EventTwoTone />} onClick={openCalendarsDialog}>
              {t('facility_contract_template.action.calendar')}
            </Button>
            {!readonly && (
              <Button
                color="secondary"
                variant="contained"
                startIcon={<AddCircleOutline />}
                onClick={handleAddPenalties}
              >
                {t('facility_contract_template.action.add_penalties')}
              </Button>
            )}
          </>
        }
        value="facility_contract_template.section_title.penalties"
      />
      {mode === FormMode.Edit && errors.penalties?.root?.message && (
        <Grid2 size={12}>
          <Alert severity="error" message={errors.penalties.root.message} />
        </Grid2>
      )}
      {fields.length !== 0 ? (
        <Grid2 size={12}>
          <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
            {fields.map(({ key }, index) => (
              <RepeatableField key={key} index={index} onDelete={readonly ? undefined : remove}>
                <Controller
                  name={`penalties.${index}`}
                  control={control}
                  render={({ field }) => <PenaltyFieldAccordion {...field} index={index} readonly />}
                />
              </RepeatableField>
            ))}
          </Stack>
        </Grid2>
      ) : readonly ? (
        <EmptyText value="facility_contract_template.text.no_penalties" />
      ) : (
        <></>
      )}
    </Grid2>
  );
};
