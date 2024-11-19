import { AutocompleteInputChangeReason } from '@mui/material';
import { AutocompleteField } from '@realgimm5/frontend-common/components';
import { DEFAULT_AUTOCOMPLETE_FETCH_COUNT } from '@realgimm5/frontend-common/configs';
import { SortEnumType } from '@realgimm5/frontend-common/gql/types';
import { useDebounce } from '@realgimm5/frontend-common/hooks';
import { forwardRef, useCallback, useEffect, useState } from 'react';

import { useGetOrgUnitsQuery } from '../../../../gql/RealGimm.Web.OrgUnit.operation';
import { OrgUnitFieldValue } from '../../../../interfaces/FieldValues/OrgUnit';
import { OrgUnitFieldProps } from './OrgUnit.types';

const OrgUnitField = forwardRef<HTMLDivElement, OrgUnitFieldProps>(
  ({ disabled, entryStatus, orgUnitIdToExclude, orgUnitType, parentSubjectId, readonly, ...props }, ref) => {
    const [inputValue, setInputValue] = useState('');
    const debouncedInputValue = useDebounce(inputValue);
    const [loading, setLoading] = useState(false);
    const [queryResults, setQueryResults] = useState<{
      afterRef: string | null | undefined;
      nodes: OrgUnitFieldValue[];
    }>({
      afterRef: undefined,
      nodes: [],
    });
    const [getQueryState] = useGetOrgUnitsQuery({
      variables: {
        first: DEFAULT_AUTOCOMPLETE_FETCH_COUNT,
        after: queryResults.afterRef,
        order: {
          name: SortEnumType.Asc,
        },
        where: {
          ...(debouncedInputValue.trim().length && {
            name: {
              contains: debouncedInputValue.replace(/\(.*?\)/, '').trim(),
            },
          }),
          ...(parentSubjectId && {
            parentSubjectId: {
              eq: parentSubjectId,
            },
            and: [
              ...(orgUnitIdToExclude ? [{ id: { neq: orgUnitIdToExclude } }] : []),
              ...(parentSubjectId ? [{ parentSubjectId: { eq: parentSubjectId } }] : []),
              ...(orgUnitType ? [{ orgUnitType: { eq: orgUnitType } }] : []),
              ...(entryStatus ? [{ entryStatus: { eq: entryStatus } }] : []),
            ],
          }),
        },
      },
      pause: readonly ?? disabled,
    });

    useEffect(() => {
      const nodes =
        getQueryState.data?.orgUnit.listOrgUnits?.nodes?.map(({ id, name }) => ({
          id,
          name: name ?? '',
        })) ?? [];

      setQueryResults((results) => ({
        ...results,
        nodes: results.afterRef ? [...results.nodes, ...nodes] : nodes,
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
      const { hasNextPage, endCursor } = getQueryState.data?.orgUnit.listOrgUnits?.pageInfo ?? {};
      if (hasNextPage) {
        setQueryResults((results) => ({ ...results, afterRef: endCursor }));
      }
    }, [getQueryState.data?.orgUnit.listOrgUnits?.pageInfo]);

    return (
      <AutocompleteField
        {...props}
        ref={ref}
        options={queryResults.nodes}
        loading={loading}
        getOptionKey={(option) => option.id}
        getOptionLabel={(option) => option.name}
        inputValue={inputValue}
        onInputChange={handleInputValueChange}
        onLoadMore={handleLoadMore}
        disabled={disabled}
        readonly={readonly}
      />
    );
  },
);
OrgUnitField.displayName = 'OrgUnitField';

export { OrgUnitField };
