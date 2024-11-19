import { Grid2 } from '@mui/material';
import { SectionTitle, SelectField, TextField } from '@realgimm5/frontend-common/components';
import { EntryStatus } from '@realgimm5/frontend-common/gql/types';
import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { TicketChecklistTemplateFormInput } from '../../../../interfaces/FormInputs/TicketChecklistTemplate';
import { parseAddressToString } from '../../../../utils/addressUtils';
import { TicketChecklistTemplateGeneralData } from '../../TicketChecklistTemplate/GeneralData/GeneralData';
import { TicketChecklistGeneralDataProps } from './GeneralData.types';

export const TicketChecklistGeneralData = ({
  control,
  errors,
  readonly,
  setValue,
}: TicketChecklistGeneralDataProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <Grid2 size={12}>
        <TicketChecklistTemplateGeneralData
          control={control as unknown as Control<TicketChecklistTemplateFormInput>}
          errors={errors}
          readonly={readonly}
          setValue={setValue as unknown as UseFormSetValue<TicketChecklistTemplateFormInput>}
        />
      </Grid2>
      <SectionTitle value="ticket_checklist.section_title.general_data_unit" />
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="estateUnit.internalCode"
          control={control}
          render={({ field }) => (
            <TextField {...field} label={t('ticket_checklist.field.estate_unit_code')} readonly={readonly} disabled />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="estateUnit.name"
          control={control}
          render={({ field }) => (
            <TextField {...field} label={t('ticket_checklist.field.estate_unit_name')} readonly={readonly} disabled />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="estateUnit.address"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              value={parseAddressToString(field.value, language)}
              label={t('ticket_checklist.field.estate_unit_address')}
              readonly={readonly}
              disabled
            />
          )}
        />
      </Grid2>

      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="facilityContract.internalCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('ticket_checklist.field.facility_contract_code')}
              readonly={readonly}
              disabled
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="facilityContract.providerSubject.name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('ticket_checklist.field.facility_contract_provider')}
              readonly={readonly}
              disabled
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="facilityContract.type.name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('ticket_checklist.field.facility_contract_type')}
              readonly={readonly}
              disabled
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="facilityContract.entryStatus"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              options={Object.values(EntryStatus)}
              getOptionLabel={(option) => t(`common.enum.entry_status.${option}`)}
              label={t('ticket_checklist.field.facility_contract_status')}
              readonly={readonly}
              disabled
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
