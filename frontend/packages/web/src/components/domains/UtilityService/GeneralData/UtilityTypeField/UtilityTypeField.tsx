import { AutocompleteInputChangeReason } from '@mui/material';
import { AutocompleteField } from '@realgimm5/frontend-common/components';
import { DEFAULT_AUTOCOMPLETE_FETCH_COUNT } from '@realgimm5/frontend-common/configs';
import { SortEnumType } from '@realgimm5/frontend-common/gql/types';
import { useDebounce } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useGetUtilityTypesQuery } from '../../../../../gql/RealGimm.Web.UtilityType.operation';
import { UtilityServiceFormInput } from '../../../../../interfaces/FormInputs/UtilityService';
import { UtilityTypeFieldProps } from './UtilityTypeField.types';

export const UtilityTypeField = ({ control, disabled, errors, readonly }: UtilityTypeFieldProps) => {
  const { t } = useTranslation();
  const [itemInputValue, setInputValue] = useState('');
  const debouncedInputValue = useDebounce(itemInputValue);
  const [loading, setLoading] = useState(false);
  const [utilityTypes, setUtilityTypes] = useState<{
    afterRef: string | null | undefined;
    nodes: NonNullable<UtilityServiceFormInput['utilityType']>[];
  }>({
    afterRef: undefined,
    nodes: [],
  });
  const [queryState] = useGetUtilityTypesQuery({
    variables: {
      first: DEFAULT_AUTOCOMPLETE_FETCH_COUNT,
      after: utilityTypes.afterRef,
      order: {
        description: SortEnumType.Asc,
      },
      ...(debouncedInputValue.length > 0 && {
        where: {
          description: {
            contains: debouncedInputValue.replace(/.*?- /, '').trim(),
          },
        },
      }),
    },
    pause: readonly,
  });

  useEffect(() => {
    const nodes = queryState.data?.utilityType.listUtilityType?.nodes ?? [];

    setUtilityTypes((utilityTypes) => ({
      ...utilityTypes,
      nodes: utilityTypes.afterRef ? [...utilityTypes.nodes, ...nodes] : nodes,
    }));

    setLoading(false);
  }, [queryState.data]);

  const handleLoadMoreAccountingItems = useCallback(() => {
    const { hasNextPage, endCursor } = queryState.data?.utilityType.listUtilityType?.pageInfo ?? {};
    if (hasNextPage) {
      setUtilityTypes((accountingItems) => ({ ...accountingItems, afterRef: endCursor }));
    }
  }, [queryState.data?.utilityType.listUtilityType?.pageInfo]);

  const handleInputValueChange = useCallback((_: unknown, value: string, reason: AutocompleteInputChangeReason) => {
    setInputValue(value);
    if (reason !== 'reset') {
      setUtilityTypes({ afterRef: null, nodes: [] });
      setLoading(true);
    }
  }, []);

  return (
    <Controller
      name="utilityType"
      control={control}
      render={({ field }) => (
        <AutocompleteField
          {...field}
          label={t('utility_service.field.utility_type')}
          options={utilityTypes.nodes}
          getOptionKey={(option) => option.id}
          getOptionLabel={(option) => `${option.internalCode} - ${option.description}`}
          loading={loading}
          inputValue={itemInputValue}
          onInputChange={handleInputValueChange}
          onLoadMore={handleLoadMoreAccountingItems}
          error={!!errors.utilityType}
          helperText={errors.utilityType?.message}
          disabled={disabled}
          readonly={readonly}
          required
        />
      )}
    />
  );
};
