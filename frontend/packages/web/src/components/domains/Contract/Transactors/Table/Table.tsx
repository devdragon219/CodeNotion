import { AddCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import {
  Alert,
  CheckboxField,
  DateField,
  SecondaryTable,
  SectionTitle,
  SelectField,
  TextField,
} from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { PaymentType } from '@realgimm5/frontend-common/gql/types';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback, useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ContractTransactorFormInput } from '../../../../../interfaces/FormInputs/Contract';
import { parseAddressToString } from '../../../../../utils/addressUtils';
import { getSubjectTaxIdOrVatNumber } from '../../../../../utils/subject/subjectUtils';
import { ContractTransactorCreateDialog } from '../../../../wizards/ContractTransactor/ContractTransactor';
import { ContractTransactorsTableProps } from './Table.types';

export const ContractTransactorsTable = ({
  control,
  errors,
  isContractActive,
  mode,
  readonly,
}: ContractTransactorsTableProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const [isTransactorDialogOpen, setTransactorDialogOpen] = useState(false);
  const effectStartDate = useWatch({ control, name: 'effectStartDate' });
  const { fields, append, remove } = useFieldArray({ control, name: 'transactors' });

  const handleAddTransactor = useCallback(() => {
    setTransactorDialogOpen(true);
  }, []);
  const handleCloseTransactorDialog = useCallback(() => {
    setTransactorDialogOpen(false);
  }, []);
  const handleSaveTransactors = useCallback(
    (transactors: ContractTransactorFormInput[]) => {
      append(transactors);
      handleCloseTransactorDialog();
    },
    [append, handleCloseTransactorDialog],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {mode === FormMode.Edit && errors.transactors?.root?.message && (
        <Grid2 size={12}>
          <Alert severity="error" message={errors.transactors.root.message} />
        </Grid2>
      )}
      {mode === FormMode.Edit && (
        <SectionTitle
          actions={
            !readonly ? (
              <Button
                color="secondary"
                variant="contained"
                startIcon={<AddCircleOutline />}
                onClick={handleAddTransactor}
              >
                {t(`contract.action.add_transactor_${isContractActive ? 'notice' : 'warrant'}`)}
              </Button>
            ) : undefined
          }
          value={`contract.tab.transactors_${isContractActive ? 'notices' : 'warrants'}`}
        />
      )}
      {isTransactorDialogOpen && (
        <ContractTransactorCreateDialog
          currentTransactors={fields}
          effectStartDate={effectStartDate}
          isActive={isContractActive}
          onClose={handleCloseTransactorDialog}
          onSave={handleSaveTransactors}
        />
      )}
      <Grid2 size={12} sx={{ overflowX: 'auto' }}>
        <SecondaryTable
          columns={[
            'contract.field.subject_code',
            'contract.field.subject_name',
            'contract.field.subject_tax_id_or_vat_number',
            'contract.field.transactor_percent',
            'contract.field.transactor_since',
            'contract.field.transactor_type',
            'contract.field.transactor_address',
            'contract.field.transactor_invoice_address',
            `contract.field.transactor_subject_${isContractActive ? 'invoiced' : 'invoicing'}`,
          ]}
          rows={fields.map((entry, index) => [
            entry.subject?.internalCode,
            entry.subject?.name,
            getSubjectTaxIdOrVatNumber(entry.subject),
            <Controller
              key={`transactors.${index}.transactionSharePercent`}
              name={`transactors.${index}.transactionSharePercent`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ minWidth: '120px' }}
                  type="number"
                  maxLength={3}
                  placeholder={t('contract.field.transactor_percent')}
                  error={!!errors.transactors?.[index]?.transactionSharePercent}
                  helperText={errors.transactors?.[index]?.transactionSharePercent?.message}
                  readonly={readonly}
                  required
                />
              )}
            />,
            <Controller
              key={`transactors.${index}.since`}
              name={`transactors.${index}.since`}
              control={control}
              render={({ field }) => (
                <DateField
                  {...field}
                  sx={{ minWidth: '200px' }}
                  placeholder={t('contract.field.transactor_since')}
                  error={!!errors.transactors?.[index]?.since}
                  helperText={errors.transactors?.[index]?.since?.message}
                  readonly={readonly}
                  required
                />
              )}
            />,
            <Controller
              key={`transactors.${index}.transactorType`}
              name={`transactors.${index}.transactorType`}
              control={control}
              render={({ field }) => (
                <SelectField
                  {...field}
                  sx={{ minWidth: '200px' }}
                  options={Object.values(PaymentType)}
                  getOptionLabel={(option) => t(`common.enum.payment_type.${option}`)}
                  placeholder={t('contract.field.transactor_type')}
                  error={!!errors.transactors?.[index]?.transactorType}
                  helperText={errors.transactors?.[index]?.transactorType?.message}
                  readonly={readonly}
                  required
                />
              )}
            />,
            <Controller
              key={`transactors.${index}.address`}
              name={`transactors.${index}.address`}
              control={control}
              render={({ field }) => (
                <SelectField
                  {...field}
                  sx={{ minWidth: '200px' }}
                  options={entry.subject?.addresses ?? []}
                  getOptionKey={(option) => String(option.id)}
                  getOptionLabel={(option) => parseAddressToString(option, language)}
                  placeholder={t('contract.field.transactor_address')}
                  error={!!errors.transactors?.[index]?.address}
                  helperText={errors.transactors?.[index]?.address?.message}
                  readonly={readonly}
                  required
                />
              )}
            />,
            <Controller
              key={`transactors.${index}.invoiceAddress`}
              name={`transactors.${index}.invoiceAddress`}
              control={control}
              render={({ field }) => (
                <SelectField
                  {...field}
                  sx={{ minWidth: '200px' }}
                  options={entry.subject?.addresses ?? []}
                  getOptionKey={(option) => String(option.id)}
                  getOptionLabel={(option) => parseAddressToString(option, language)}
                  placeholder={t('contract.field.transactor_invoice_address')}
                  error={!!errors.transactors?.[index]?.invoiceAddress}
                  helperText={errors.transactors?.[index]?.invoiceAddress?.message}
                  readonly={readonly}
                  required
                />
              )}
            />,
            <Controller
              key={`transactors.${index}.isInvoiced`}
              name={`transactors.${index}.isInvoiced`}
              control={control}
              render={({ field }) => (
                <CheckboxField
                  {...field}
                  error={!!errors.transactors?.[index]?.isInvoiced}
                  helperText={errors.transactors?.[index]?.isInvoiced?.message}
                  readonly={readonly}
                />
              )}
            />,
          ])}
          onRowDelete={!readonly && mode === FormMode.Edit ? remove : undefined}
        />
      </Grid2>
    </Grid2>
  );
};
