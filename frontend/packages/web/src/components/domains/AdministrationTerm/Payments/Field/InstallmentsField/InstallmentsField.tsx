import { AutocompleteField } from '@realgimm5/frontend-common/components';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { AdministrationTermPaymentInstallmentsFieldProps } from './InstallmentsField.types';

export const AdministrationTermPaymentInstallmentsField = ({
  errors,
  readonly,
  value,
  onChange,
  installments,
  existingPayments,
}: AdministrationTermPaymentInstallmentsFieldProps) => {
  const { t } = useTranslation();

  const paidInstallmentGuids = useMemo(
    () =>
      existingPayments?.reduce<string[]>(
        (paidInstallmentsGuids, currentPayment) => [...paidInstallmentsGuids, ...currentPayment.installments],
        [],
      ) ?? [],
    [existingPayments],
  );

  const options = useMemo(
    () =>
      installments.reduce<string[]>((options, currentInstallment) => {
        if (paidInstallmentGuids.includes(currentInstallment.guid)) return [...options];

        return [...options, currentInstallment.guid];
      }, []),
    [installments, paidInstallmentGuids],
  );

  return (
    <AutocompleteField
      label={t('administration_term.field.installment_number')}
      value={value.installments}
      onChange={onChange}
      multiple
      options={options}
      error={!!errors?.installments}
      helperText={errors?.installments?.message}
      getOptionLabel={(option) => {
        const installment = installments.find(({ guid }) => guid === option);
        const installmentNumber = installment?.installmentNumber ?? '';
        const expenseReason = installment?.billItemType?.description ?? '';

        return `${installmentNumber}${expenseReason.length > 0 ? ` ${expenseReason}` : ''}`;
      }}
      readonly={readonly}
      required
    />
  );
};
