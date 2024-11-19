import { AutocompleteInputChangeReason } from '@mui/material';
import { AutocompleteField } from '@realgimm5/frontend-common/components';
import { DEFAULT_AUTOCOMPLETE_FETCH_COUNT } from '@realgimm5/frontend-common/configs';
import { SortEnumType } from '@realgimm5/frontend-common/gql/types';
import { useDebounce } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useGetTicketProviderSubjectsQuery } from '../../../../../gql/RealGimm.Web.Ticket.operation';
import { SubjectFieldValue } from '../../../../../interfaces/FieldValues/Subject';
import { SupplierSubjectFieldProps } from './SupplierSubject.types';

export const SupplierSubjectField = ({ control, disabled, errors, readonly, setValue }: SupplierSubjectFieldProps) => {
  const { t } = useTranslation();
  const locationEstateUnit = useWatch({ control, name: 'locationEstateUnit' });
  const catalogueItems = useWatch({ control, name: 'catalogueItems' });
  const [inputValue, setInputValue] = useState('');
  const debouncedInputValue = useDebounce(inputValue);
  const [loading, setLoading] = useState(false);
  const [queryResults, setQueryResults] = useState<{
    afterRef: string | null | undefined;
    nodes: SubjectFieldValue[];
  }>({
    afterRef: undefined,
    nodes: [],
  });
  const [getQueryState] = useGetTicketProviderSubjectsQuery({
    variables: {
      estateUnitId: Number(locationEstateUnit?.id),
      catalogueItemIds: catalogueItems.map(({ id }) => id),
      first: DEFAULT_AUTOCOMPLETE_FETCH_COUNT,
      after: queryResults.afterRef,
      order: {
        name: SortEnumType.Asc,
      },
      where: {
        ...(debouncedInputValue.trim().length && {
          name: {
            contains: debouncedInputValue,
          },
        }),
      },
    },
    pause: (readonly ?? disabled ?? false) || catalogueItems.length === 0,
  });

  useEffect(() => {
    const nodes =
      getQueryState.data?.ticket.listAvailableProviderSubjects?.nodes?.map(({ id, name }) => ({
        id,
        name,
      })) ?? [];

    setQueryResults((subjects) => ({
      ...subjects,
      nodes: subjects.afterRef ? [...subjects.nodes, ...nodes] : nodes,
    }));

    setLoading(false);
  }, [getQueryState.data]);

  const handleInputValueChange = useCallback((_: unknown, value: string, reason: AutocompleteInputChangeReason) => {
    setInputValue(value);
    if (reason !== 'reset') {
      setQueryResults({ afterRef: null, nodes: [] });
      setLoading(true);
    }
  }, []);

  const handleLoadMore = useCallback(() => {
    const { hasNextPage, endCursor } = getQueryState.data?.ticket.listAvailableProviderSubjects?.pageInfo ?? {};
    if (hasNextPage) {
      setQueryResults((subjects) => ({ ...subjects, afterRef: endCursor }));
    }
  }, [getQueryState.data?.ticket.listAvailableProviderSubjects?.pageInfo]);

  const handleChange = useCallback(
    (onChange: (value: SubjectFieldValue | null) => void) => (value: SubjectFieldValue | null) => {
      onChange(value);

      setValue('plannedTeam', null);
      setValue('plannedTeamLeaderUser', null);
    },
    [setValue],
  );

  return (
    <Controller
      name="supplierSubject"
      control={control}
      render={({ field }) => (
        <AutocompleteField
          {...field}
          onChange={handleChange(field.onChange)}
          label={t('ticket.field.supplier_subject')}
          error={!!errors.supplierSubject}
          helperText={errors.supplierSubject?.message}
          options={queryResults.nodes}
          loading={loading}
          getOptionKey={(option) => option.id}
          getOptionLabel={(option) => option.name}
          inputValue={inputValue}
          onInputChange={handleInputValueChange}
          onLoadMore={handleLoadMore}
          disabled={disabled}
          readonly={readonly}
          required
        />
      )}
    />
  );
};
