import { AutocompleteInputChangeReason } from '@mui/material';
import { AutocompleteField } from '@realgimm5/frontend-common/components';
import { DEFAULT_AUTOCOMPLETE_FETCH_COUNT } from '@realgimm5/frontend-common/configs';
import { SortEnumType } from '@realgimm5/frontend-common/gql/types';
import { useDebounce } from '@realgimm5/frontend-common/hooks';
import { forwardRef, useCallback, useEffect, useState } from 'react';

import { useGetFullFacilityContractTemplatesQuery } from '../../../../gql/RealGimm.Web.FacilityContractTemplate.operation';
import { FacilityContractTemplateFieldValue } from '../../../../interfaces/FieldValues/FacilityContractTemplate';
import { FacilityContractTemplateFieldProps } from './FacilityContractTemplate.types';

const FacilityContractTemplateField = forwardRef<HTMLDivElement, FacilityContractTemplateFieldProps>(
  ({ disabled, readonly, where, ...props }, ref) => {
    const [inputValue, setInputValue] = useState('');
    const debouncedInputValue = useDebounce(inputValue);
    const [loading, setLoading] = useState(false);
    const [queryResults, setQueryResults] = useState<{
      afterRef: string | null | undefined;
      nodes: FacilityContractTemplateFieldValue[];
    }>({
      afterRef: undefined,
      nodes: [],
    });
    const [getQueryState] = useGetFullFacilityContractTemplatesQuery({
      variables: {
        first: DEFAULT_AUTOCOMPLETE_FETCH_COUNT,
        after: queryResults.afterRef,
        order: {
          description: SortEnumType.Asc,
        },
        where: {
          ...(debouncedInputValue.trim().length && {
            description: {
              contains: debouncedInputValue.replace(/\(.*?\)/, '').trim(),
            },
          }),
          ...(where ?? {}),
        },
      },
      pause: readonly ?? disabled,
    });

    useEffect(() => {
      const nodes = getQueryState.data?.contractTemplate.listContractTemplates?.nodes ?? [];

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
      const { hasNextPage, endCursor } = getQueryState.data?.contractTemplate.listContractTemplates?.pageInfo ?? {};
      if (hasNextPage) {
        setQueryResults((results) => ({ ...results, afterRef: endCursor }));
      }
    }, [getQueryState.data?.contractTemplate.listContractTemplates?.pageInfo]);

    return (
      <AutocompleteField
        {...props}
        ref={ref}
        options={queryResults.nodes}
        loading={loading}
        getOptionKey={(option) => option.id}
        getOptionLabel={(option) => option.description}
        inputValue={inputValue}
        onInputChange={handleInputValueChange}
        onLoadMore={handleLoadMore}
        disabled={disabled}
        readonly={readonly}
      />
    );
  },
);
FacilityContractTemplateField.displayName = 'FacilityContractTemplateField';

export { FacilityContractTemplateField };
