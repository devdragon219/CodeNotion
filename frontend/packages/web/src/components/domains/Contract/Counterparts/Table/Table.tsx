import { Grid2 } from '@mui/material';
import {
  Alert,
  CheckboxField,
  DateField,
  SecondaryTable,
  SelectField,
  TextField,
} from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { CounterpartType } from '@realgimm5/frontend-common/gql/types';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { ParseKeys } from 'i18next';
import { useCallback } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { getSubjectTaxIdOrVatNumber } from '../../../../../utils/subject/subjectUtils';
import { ContractCounterpartsTableProps } from './Table.types';

export const ContractCounterpartsTable = ({
  control,
  errors,
  isContractActive,
  mode,
  readonly,
  readonlyFields,
}: ContractCounterpartsTableProps) => {
  const { t } = useTranslation();
  const { fields, remove } = useFieldArray({ control, name: 'counterparts' });
  type CounterpartsFieldArray = (typeof fields)[number];

  const getIsFieldReadonly = useCallback(
    (field: keyof CounterpartsFieldArray, index: number) =>
      readonly ||
      (readonlyFields &&
        readonlyFields.some((readonlyField) => readonlyField.field === field && index < readonlyField.untilIndex)),
    [readonly, readonlyFields],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {mode === FormMode.Edit && errors.counterparts?.root?.message && (
        <Grid2 size={12}>
          <Alert severity="error" message={errors.counterparts.root.message} />
        </Grid2>
      )}
      <Grid2 size={12} sx={{ overflowX: 'auto' }}>
        <SecondaryTable
          columns={[
            'contract.field.subject_code',
            'contract.field.subject_name',
            'contract.field.subject_tax_id_or_vat_number',
            'contract.field.counterpart_since',
            'contract.field.counterpart_percent',
            'contract.field.counterpart_main',
            ...((isContractActive ? ['contract.field.counterpart_type'] : []) as ParseKeys[]),
          ]}
          rows={fields.map((entry, index) => [
            entry.subject?.internalCode,
            entry.subject?.name,
            getSubjectTaxIdOrVatNumber(entry.subject),
            <Controller
              key={`counterparts.${index}.since`}
              name={`counterparts.${index}.since`}
              control={control}
              render={({ field }) => (
                <DateField
                  {...field}
                  sx={{ minWidth: '200px' }}
                  placeholder={t('contract.field.counterpart_since')}
                  error={!!errors.counterparts?.[index]?.since}
                  helperText={errors.counterparts?.[index]?.since?.message}
                  readonly={getIsFieldReadonly('since', index)}
                  required
                />
              )}
            />,
            <Controller
              key={`counterparts.${index}.contractSharePercent`}
              name={`counterparts.${index}.contractSharePercent`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ minWidth: '120px' }}
                  type="number"
                  maxLength={3}
                  placeholder={t('contract.field.counterpart_percent')}
                  error={!!errors.counterparts?.[index]?.contractSharePercent}
                  helperText={errors.counterparts?.[index]?.contractSharePercent?.message}
                  readonly={getIsFieldReadonly('contractSharePercent', index)}
                  required
                />
              )}
            />,
            <Controller
              key={`counterparts.${index}.isMainCounterpart`}
              name={`counterparts.${index}.isMainCounterpart`}
              control={control}
              render={({ field }) => (
                <CheckboxField
                  {...field}
                  error={!!errors.counterparts?.[index]?.isMainCounterpart}
                  helperText={errors.counterparts?.[index]?.isMainCounterpart?.message}
                  readonly={getIsFieldReadonly('isMainCounterpart', index)}
                />
              )}
            />,
            ...(isContractActive
              ? [
                  <Controller
                    key={`counterparts.${index}.counterpartType`}
                    name={`counterparts.${index}.counterpartType`}
                    control={control}
                    render={({ field }) => (
                      <SelectField
                        {...field}
                        sx={{ minWidth: '200px' }}
                        options={Object.values(CounterpartType)}
                        getOptionLabel={(option) => t(`common.enum.counterpart_type.${option}`)}
                        placeholder={t('contract.field.counterpart_type')}
                        error={!!errors.counterparts?.[index]?.counterpartType}
                        helperText={errors.counterparts?.[index]?.counterpartType?.message}
                        readonly={getIsFieldReadonly('counterpartType', index)}
                      />
                    )}
                  />,
                ]
              : []),
          ])}
          onRowDelete={!readonly && mode === FormMode.Edit ? remove : undefined}
        />
      </Grid2>
    </Grid2>
  );
};
