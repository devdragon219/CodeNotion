import { AddCircleOutline, EventTwoTone } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import { Alert, EmptyText, RepeatableField, SectionTitle } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { SlaFormInput } from '../../../../../interfaces/FormInputs/SLA';
import { CalendarsDialog } from '../../../../dialogs/Calendars/Calendars';
import { SlaFieldAccordion } from '../../../SLA/Accordion/Accordion';
import { FacilityContractTemplateSlasDialog } from './Dialog/Dialog';
import { FacilityContractTemplateSlasFieldProps } from './Field.types';

export const FacilityContractTemplateSlasField = ({
  control,
  errors,
  mode,
  readonly,
  onAddSlas,
  onOpenCalendar,
}: FacilityContractTemplateSlasFieldProps) => {
  const { t } = useTranslation();
  const [isCalendarsDialogOpen, setCalendarsDialogOpen] = useState(false);
  const [isSlasDialogOpen, setSlasDialogOpen] = useState(false);
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'slas',
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

  const handleAddSlas = useCallback(() => {
    if (onAddSlas) {
      onAddSlas();
    } else {
      setSlasDialogOpen(true);
    }
  }, [onAddSlas]);
  const handleCloseSlasDialog = useCallback(() => {
    setSlasDialogOpen(false);
  }, []);
  const handleSaveSlas = useCallback(
    (slas: SlaFormInput[]) => {
      append(slas);
      handleCloseSlasDialog();
    },
    [append, handleCloseSlasDialog],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }} sx={{ pr: 2 }}>
      {isCalendarsDialogOpen && <CalendarsDialog readonly={!readonly} onClose={closeCalendarsDialog} />}
      {isSlasDialogOpen && (
        <FacilityContractTemplateSlasDialog slas={fields} onClose={handleCloseSlasDialog} onSave={handleSaveSlas} />
      )}
      <SectionTitle
        actions={
          <>
            <Button color="secondary" variant="contained" startIcon={<EventTwoTone />} onClick={openCalendarsDialog}>
              {t('facility_contract_template.action.calendar')}
            </Button>
            {!readonly && (
              <Button color="secondary" variant="contained" startIcon={<AddCircleOutline />} onClick={handleAddSlas}>
                {t('facility_contract_template.action.add_slas')}
              </Button>
            )}
          </>
        }
        value="facility_contract_template.section_title.slas"
      />
      {mode === FormMode.Edit && errors.slas?.root?.message && (
        <Grid2 size={12}>
          <Alert severity="error" message={errors.slas.root.message} />
        </Grid2>
      )}
      {fields.length !== 0 ? (
        <Grid2 size={12}>
          <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
            {fields.map(({ key }, index) => (
              <RepeatableField key={key} index={index} onDelete={readonly ? undefined : remove}>
                <Controller
                  name={`slas.${index}`}
                  control={control}
                  render={({ field }) => <SlaFieldAccordion {...field} index={index} readonly />}
                />
              </RepeatableField>
            ))}
          </Stack>
        </Grid2>
      ) : readonly ? (
        <EmptyText value="facility_contract_template.text.no_slas" />
      ) : (
        <></>
      )}
    </Grid2>
  );
};
