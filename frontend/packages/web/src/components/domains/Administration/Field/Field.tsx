import { Grid2 } from '@mui/material';
import {
  CheckboxField,
  DateField,
  SecondaryTable,
  SectionTitle,
  SelectField,
  TextField,
} from '@realgimm5/frontend-common/components';
import { AddressType, AdministrationType, PaymentType } from '@realgimm5/frontend-common/gql/types';
import { getContactsFormInput } from '@realgimm5/frontend-common/utils';
import { forwardRef, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { SubjectFieldValue } from '../../../../interfaces/FieldValues/Subject';
import { AdministrationFormInput } from '../../../../interfaces/FormInputs/Administration';
import { getCountryName } from '../../../../utils/countryUtils';
import { SubjectField } from '../../../core/Fields/Subject/Subject';
import { AdministrationFieldProps } from './Field.types';

const AdministrationField = forwardRef<HTMLDivElement, AdministrationFieldProps>(
  ({ errors, onChange, value, readonly }, ref) => {
    const {
      t,
      i18n: { language },
    } = useTranslation();

    const handleAdministratorChange = useCallback(
      (input: SubjectFieldValue | null) => {
        onChange({ ...value, administratorSubject: input, bankAccount: null });
      },
      [onChange, value],
    );

    const handleChange = useCallback(
      (key: keyof AdministrationFormInput) => (input?: unknown) => {
        onChange({ ...value, [key]: input });
      },
      [onChange, value],
    );

    const administratorInfo = useMemo(
      () => ({
        address: value.administratorSubject?.addresses?.find(
          (address) => address.addressType === AddressType.LegalResidential,
        ),
        contacts: getContactsFormInput(value.administratorSubject?.contacts),
        bankAccounts: value.administratorSubject?.bankAccounts,
      }),
      [value.administratorSubject],
    );

    const isBankAccountRequired = useMemo(() => {
      return value.paymentType ? [PaymentType.Rid, PaymentType.WireTransfer].includes(value.paymentType) : false;
    }, [value.paymentType]);

    const hasTerms = useMemo(() => value.hasTerms, [value.hasTerms]);

    return (
      <Grid2 ref={ref} container spacing={{ xs: 2, sm: 3 }}>
        <SectionTitle value={'administration.section_title.general_data'} />
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <SelectField
            label={t('administration.field.administration_type')}
            value={value.administrationType}
            onChange={handleChange('administrationType')}
            options={Object.values(AdministrationType)}
            getOptionLabel={(option) => t(`common.enum.administration_type.${option}`)}
            error={!!errors?.administrationType}
            helperText={errors?.administrationType?.message}
            readonly={readonly}
            required
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <SubjectField
            label={t('administration.field.administrator')}
            error={!!errors?.administratorSubject}
            helperText={errors?.administratorSubject?.message}
            value={value.administratorSubject}
            onChange={handleAdministratorChange}
            readonly={readonly}
            disabled={hasTerms}
            where={{
              categories: {
                some: {
                  function: {
                    eq: {
                      isBuildingAdministrator: true,
                    },
                  },
                },
              },
            }}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 3 }}>
          <DateField
            label={t('administration.field.start_date')}
            value={value.since}
            onChange={handleChange('since')}
            error={!!errors?.since}
            helperText={errors?.since?.message}
            readonly={readonly}
            disabled={hasTerms}
            required
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 3 }}>
          <DateField
            label={t('administration.field.end_date')}
            value={value.until}
            onChange={handleChange('until')}
            error={!!errors?.until}
            helperText={errors?.until?.message}
            readonly={readonly}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 3 }}>
          <SelectField
            label={t('administration.field.payment_type')}
            value={value.paymentType}
            onChange={handleChange('paymentType')}
            options={Object.values(PaymentType)}
            getOptionLabel={(option) => t(`common.enum.payment_type.${option}`)}
            error={!!errors?.paymentType}
            helperText={errors?.paymentType?.message}
            readonly={readonly}
            required
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 3 }}>
          <CheckboxField
            label={t('administration.field.is_payment_data_included')}
            value={value.isPaymentDataIncluded}
            onChange={() => {
              handleChange('isPaymentDataIncluded')(value.isPaymentDataIncluded ? false : true);
            }}
            error={!!errors?.isPaymentDataIncluded}
            helperText={errors?.isPaymentDataIncluded?.message}
            readonly={readonly}
          />
        </Grid2>
        <Grid2 size={12}>
          <TextField
            label={t('administration.field.notes')}
            value={value.notes}
            onChange={handleChange('notes')}
            error={!!errors?.notes}
            helperText={errors?.notes?.message}
            readonly={readonly}
          />
        </Grid2>
        <SectionTitle value={'administration.section_title.bank_account'} />
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <SelectField
            label={t('subject.field.bank_account_number')}
            value={value.bankAccount}
            getOptionKey={(option) => String(option.id)}
            getOptionLabel={(option) => option.referenceCode ?? ''}
            onChange={handleChange('bankAccount')}
            options={value.administratorSubject?.bankAccounts ?? []}
            error={!!errors?.bankAccount}
            helperText={errors?.bankAccount?.message}
            readonly={readonly}
            clearable
            disabled={!value.administratorSubject}
            required={isBankAccountRequired}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            value={value.bankAccount?.accountHolder}
            label={t('subject.field.bank_account_holder')}
            readonly={readonly}
            disabled
          />
        </Grid2>
        <Grid2 size={12}>
          <TextField
            value={value.bankAccount?.notes}
            label={t('subject.field.bank_account_notes')}
            readonly={readonly}
            disabled
          />
        </Grid2>
        <SectionTitle value={'administration.section_title.address'} />
        <Grid2 size={{ xs: 12, sm: 4 }}>
          <TextField
            value={
              administratorInfo.address?.countryISO
                ? getCountryName(administratorInfo.address.countryISO, language)
                : ''
            }
            label={t('subject.field.address_country')}
            readonly={readonly}
            disabled
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 4 }}>
          <TextField
            value={administratorInfo.address?.cityName}
            label={t('subject.field.address_city')}
            readonly={readonly}
            disabled
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 4 }}>
          <TextField
            value={administratorInfo.address?.countyName}
            label={t('subject.field.address_county')}
            readonly={readonly}
            disabled
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 4 }}>
          <TextField
            value={administratorInfo.address?.toponymy}
            label={t('subject.field.address_toponymy')}
            readonly={readonly}
            disabled
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 4 }}>
          <TextField
            value={administratorInfo.address?.numbering}
            label={t('subject.field.address_number')}
            readonly={readonly}
            disabled
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 4 }}>
          <TextField
            value={administratorInfo.address?.localPostCode}
            label={t('subject.field.address_postal_code')}
            readonly={readonly}
            disabled
          />
        </Grid2>
        <SectionTitle value={'administration.section_title.contacts'} />
        <Grid2 size={12}>
          <SecondaryTable
            columns={[
              'common.component.contacts_field.field.phone_type',
              'common.component.contacts_field.field.phone_number',
            ]}
            rows={administratorInfo.contacts.phones.map((entry) => [
              entry.contactInfoType ? t(`common.enum.contact_info_type.${entry.contactInfoType}`) : null,
              entry.contactInfo,
            ])}
          />
        </Grid2>
        <Grid2 size={12}>
          <SecondaryTable
            columns={[
              'common.component.contacts_field.field.email_type',
              'common.component.contacts_field.field.email',
            ]}
            rows={administratorInfo.contacts.emails.map((entry) => [
              entry.contactInfoType ? t(`common.enum.contact_info_type.${entry.contactInfoType}`) : null,
              entry.contactInfo,
            ])}
          />
        </Grid2>
      </Grid2>
    );
  },
);

AdministrationField.displayName = 'AdministrationField';
export { AdministrationField };
