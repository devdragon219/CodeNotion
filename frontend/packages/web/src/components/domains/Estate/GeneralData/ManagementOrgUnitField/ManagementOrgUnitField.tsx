import { AutocompleteInputChangeReason } from '@mui/material';
import { AutocompleteField } from '@realgimm5/frontend-common/components';
import { EntryStatus, SortEnumType } from '@realgimm5/frontend-common/gql/types';
import { useDebounce } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useGetAllOrgUnitsByManagementSubjectIdsQuery } from '../../../../../gql/RealGimm.Web.OrgUnit.operation';
import { EstateFormInput } from '../../../../../interfaces/FormInputs/Estate';
import { ManagementOrgUnitFieldProps } from './ManagementOrgUnitField.types';

export const ManagementOrgUnitField = ({ control, errors, readonly }: ManagementOrgUnitFieldProps) => {
  const { t } = useTranslation();
  const managementSubject = useWatch({ control, name: 'managementSubject' });
  const [mgmtOrgUnitInputValue, setMgmtOrgUnitInputValue] = useState('');
  const debouncedMgmtOrgUnitInputValue = useDebounce(mgmtOrgUnitInputValue);
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState<NonNullable<EstateFormInput['managementOrgUnit']>[]>([]);
  const [getOrgUnitsState] = useGetAllOrgUnitsByManagementSubjectIdsQuery({
    variables: {
      managementSubjectIds: managementSubject ? [managementSubject.id] : [],
      order: {
        name: SortEnumType.Asc,
      },
      where: {
        entryStatus: { eq: EntryStatus.Working },
        ...(debouncedMgmtOrgUnitInputValue.trim().length
          ? {
              name: {
                contains: debouncedMgmtOrgUnitInputValue,
              },
            }
          : {}),
      },
    },
    pause: readonly,
  });

  useEffect(() => {
    const nodes =
      getOrgUnitsState.data?.orgUnit.listOrgUnitsByManagementSubject.map(({ id, name }) => ({
        id,
        name: name ?? '',
      })) ?? [];

    setSubjects(nodes);

    setLoading(false);
  }, [getOrgUnitsState.data]);

  const handleMgmtOrgUnitInputValueChange = useCallback(
    (_: unknown, value: string, reason: AutocompleteInputChangeReason) => {
      setMgmtOrgUnitInputValue(value);
      if (reason !== 'reset') {
        setSubjects([]);
        setLoading(true);
      }
    },
    [],
  );

  return (
    <Controller
      name="managementOrgUnit"
      control={control}
      render={({ field }) => (
        <AutocompleteField
          {...field}
          label={t('estate.field.management_org_unit')}
          options={subjects}
          error={!!errors.managementOrgUnit}
          helperText={errors.managementOrgUnit?.message}
          loading={loading}
          getOptionKey={(option) => option.id}
          getOptionLabel={(option) => option.name}
          inputValue={mgmtOrgUnitInputValue}
          onInputChange={handleMgmtOrgUnitInputValueChange}
          readonly={readonly}
          disabled={!managementSubject}
        />
      )}
    />
  );
};
