import { AutocompleteInputChangeReason } from '@mui/material';
import { AutocompleteField, TextField } from '@realgimm5/frontend-common/components';
import { DEFAULT_AUTOCOMPLETE_FETCH_COUNT } from '@realgimm5/frontend-common/configs';
import { SortEnumType } from '@realgimm5/frontend-common/gql/types';
import { useDebounce } from '@realgimm5/frontend-common/hooks';
import { forwardRef, useCallback, useEffect, useState } from 'react';

import { useGetCitiesQuery } from '../../../../gql/RealGimm.Web.City.operation';
import { CityFieldValue } from '../../../../interfaces/FieldValues/City';
import { getEmptyCityFieldValue } from '../../../../utils/components/addressesField/initialValues';
import { parseCityToCityFieldValue } from '../../../../utils/components/addressesField/parseAddressFragment';
import { CityFieldProps } from './City.types';

const CityField = forwardRef<HTMLDivElement, CityFieldProps>(
  ({ countryISO, disabled, onChange, readonly, ...props }, ref) => {
    const [hasCountryCities, setHasCountryCities] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const debouncedInputValue = useDebounce(inputValue);
    const [loading, setLoading] = useState(false);
    const [queryResults, setQueryResults] = useState<{
      afterRef: string | null | undefined;
      nodes: CityFieldValue[];
    }>({
      afterRef: undefined,
      nodes: [],
    });
    const [getQueryState] = useGetCitiesQuery({
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
          ...(countryISO && {
            countryISO: {
              eq: countryISO,
            },
          }),
        },
      },
      pause: !countryISO || (readonly ?? disabled),
    });

    useEffect(() => {
      const nodes = getQueryState.data?.city.listCities?.nodes?.map(parseCityToCityFieldValue) ?? [];
      const totalCount = getQueryState.data?.city.listCities?.totalCount ?? 0;

      setQueryResults((results) => ({
        ...results,
        nodes: results.afterRef ? [...results.nodes, ...nodes] : nodes,
      }));

      if (!hasCountryCities && totalCount !== 0) {
        setHasCountryCities(true);
      }

      setLoading(false);
      // eslint-disable-next-line
    }, [getQueryState.data]);

    useEffect(() => {
      setHasCountryCities(false);
      setQueryResults({ afterRef: null, nodes: [] });
      setInputValue('');
    }, [countryISO]);

    const handleInputValueChange = useCallback((_: unknown, value: string, reason: AutocompleteInputChangeReason) => {
      setInputValue(value);
      if (reason !== 'reset') {
        setQueryResults({ afterRef: null, nodes: [] });
        setLoading(true);
      }
    }, []);

    const handleLoadMore = useCallback(() => {
      const { hasNextPage, endCursor } = getQueryState.data?.city.listCities?.pageInfo ?? {};
      if (hasNextPage) {
        setQueryResults((results) => ({ ...results, afterRef: endCursor }));
      }
    }, [getQueryState.data?.city.listCities?.pageInfo]);

    const handleCityNameChange = useCallback(
      (value: string | null) => {
        onChange?.(getEmptyCityFieldValue(value ?? ''));
      },
      [onChange],
    );

    return countryISO && hasCountryCities ? (
      <AutocompleteField
        {...props}
        ref={ref}
        options={queryResults.nodes}
        getOptionKey={(option) => Number(option.id)}
        getOptionLabel={(option) => option.name}
        loading={loading}
        inputValue={inputValue}
        onInputChange={handleInputValueChange}
        onLoadMore={handleLoadMore}
        disabled={disabled}
        readonly={readonly}
        onChange={onChange}
      />
    ) : (
      <TextField
        ref={ref}
        label={props.label}
        value={props.value?.name ?? ''}
        onChange={handleCityNameChange}
        disabled={disabled || !countryISO}
        readonly={readonly}
        required={props.required}
        error={props.error}
        helperText={props.helperText}
      />
    );
  },
);
CityField.displayName = 'CityField';

export { CityField };
