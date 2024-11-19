import { Grid2 } from '@mui/material';
import {
  CheckboxField,
  CurrencyField,
  DateField,
  SectionTitle,
  SelectField,
  TextField,
} from '@realgimm5/frontend-common/components';
import { EntryStatus, MeteringType, UtilityCategory } from '@realgimm5/frontend-common/gql/types';
import { parseStringToDate } from '@realgimm5/frontend-common/utils';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { SubjectFragment } from '../../../../gql/RealGimm.Web.Subject.fragment';
import { getSubjectVatNumber } from '../../../../utils/subject/subjectUtils';
import { CostChargeUtilityServiceProps } from './UtilityService.types';

export const CostChargeUtilityService = ({ control, readonly }: CostChargeUtilityServiceProps) => {
  const { t } = useTranslation();

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <SectionTitle value="cost_charge.section_title.utility_service" />
      <Grid2 size={{ xs: 12, sm: 3 }}>
        <Controller
          name="utilityService.referenceSubject.name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('cost_charge.field.reference_subject')}
              readonly={readonly}
              disabled
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 3 }}>
        <Controller
          name="utilityService.orgUnit.name"
          control={control}
          render={({ field }) => (
            <TextField {...field} label={t('cost_charge.field.org_unit')} readonly={readonly} disabled required />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 3 }}>
        <Controller
          name="utilityService.utilityType"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              value={`${field.value.internalCode} - ${field.value.description}`}
              label={t('cost_charge.field.utility_type')}
              readonly={readonly}
              disabled
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 3 }}>
        <Controller
          name="utilityService.utilityType.category"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              options={Object.values(UtilityCategory)}
              getOptionLabel={(option) => t(`common.enum.utility_category.${option}`)}
              label={t('cost_charge.field.utility_type_category')}
              readonly={readonly}
              disabled
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="utilityService.providerSubject.name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('cost_charge.field.provider_subject')}
              readonly={readonly}
              disabled
              required
            />
          )}
        />{' '}
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="utilityService.providerSubject.internalCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('cost_charge.field.provider_subject_internal_code')}
              readonly={readonly}
              disabled
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="utilityService.providerSubject"
          control={control}
          render={({ field }) => (
            <TextField
              value={getSubjectVatNumber(field.value as SubjectFragment)}
              label={t('cost_charge.field.provider_subject_vat_number')}
              readonly={readonly}
              disabled
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 3 }}>
        <Controller
          name="utilityService.accountingItem.description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('cost_charge.field.accounting_item')}
              readonly={readonly}
              disabled
              required
            />
          )}
        />{' '}
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 3 }}>
        <Controller
          name="utilityService.description"
          control={control}
          render={({ field }) => (
            <TextField {...field} label={t('cost_charge.field.utility_description')} readonly={readonly} disabled />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 3 }}>
        <Controller
          name="utilityService.utilityContractCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('cost_charge.field.utility_contract_code')}
              disabled
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 3 }}>
        <Controller
          name="utilityService.utilityUserCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('cost_charge.field.utility_user_code')}
              readonly={readonly}
              disabled
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="utilityService.utilityType.meteringType"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              options={Object.values(MeteringType)}
              getOptionLabel={(option) => t(`common.enum.metering_type.${option}`)}
              label={t('cost_charge.field.utility_type_metering_type')}
              readonly={readonly}
              disabled
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="utilityService.isFreeMarket"
          control={control}
          render={({ field }) => (
            <CheckboxField
              {...field}
              label={t('cost_charge.field.free_market')}
              readonly={readonly}
              disabled
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="utilityService.deposit"
          control={control}
          render={({ field }) => (
            <CurrencyField {...field} label={t('cost_charge.field.deposit')} readonly={readonly} disabled />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="utilityService.status"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              options={Object.values(EntryStatus)}
              getOptionLabel={(option) => t(`common.enum.entry_status.${option}`)}
              label={t('cost_charge.field.status')}
              readonly={readonly}
              disabled
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="utilityService.utilityMeterSerial"
          control={control}
          render={({ field }) => (
            <TextField {...field} label={t('cost_charge.field.utility_meter_serial')} readonly={readonly} disabled />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="utilityService.utilityDeliveryPointCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('cost_charge.field.utility_delivery_point_code')}
              readonly={readonly}
              disabled
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="utilityService.activationDate"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              value={parseStringToDate(field.value)}
              label={t('cost_charge.field.activation_date')}
              readonly={readonly}
              required
              disabled
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="utilityService.deactivationDate"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              value={parseStringToDate(field.value)}
              label={t('cost_charge.field.deactivation_date')}
              readonly={readonly}
              disabled
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="utilityService.deactivationRequestDate"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              value={parseStringToDate(field.value)}
              label={t('cost_charge.field.deactivation_request_date')}
              readonly={readonly}
              disabled
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="utilityService.contractPowerNominal"
          control={control}
          render={({ field }) => (
            <TextField {...field} label={t('cost_charge.field.contract_power_nominal')} disabled readonly={readonly} />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="utilityService.contractPowerMaximum"
          control={control}
          render={({ field }) => (
            <TextField {...field} label={t('cost_charge.field.contract_power_maximum')} disabled readonly={readonly} />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="utilityService.contractNominalTension"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('cost_charge.field.contract_nominal_tension')}
              disabled
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={12}>
        <Controller
          name="utilityService.notes"
          control={control}
          render={({ field }) => (
            <TextField {...field} multiline label={t('cost_charge.field.notes')} disabled readonly={readonly} />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
