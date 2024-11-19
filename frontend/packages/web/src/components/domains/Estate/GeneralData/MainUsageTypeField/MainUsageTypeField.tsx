import { AutocompleteInputChangeReason } from '@mui/material';
import { AutocompleteField } from '@realgimm5/frontend-common/components';
import { DEFAULT_AUTOCOMPLETE_FETCH_COUNT } from '@realgimm5/frontend-common/configs';
import { SortEnumType } from '@realgimm5/frontend-common/gql/types';
import { useDebounce } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useGetMainUsageTypesQuery } from '../../../../../gql/RealGimm.Web.MainUsageType.operation';
import { MainUsageTypeFormInput } from '../../../../../interfaces/FormInputs/MainUsageType';
import { parseMainUsageTypeToMainUsageTypeFormInput } from '../../../../../utils/mainUsageType/parseMainUsageTypeFragment';
import { MainUsageTypeFieldProps } from './MainUsageTypeField.types';

export const MainUsageTypeField = ({ control, errors, readonly }: MainUsageTypeFieldProps) => {
  const { t } = useTranslation();
  const [mainUsageTypeInputValue, setMainUsageTypeInputValue] = useState('');
  const debouncedMainUsageInputValue = useDebounce(mainUsageTypeInputValue);
  const [loading, setLoading] = useState(false);
  const [mainUsageTypes, setMainUsageTypes] = useState<{
    afterRef: string | null | undefined;
    nodes: MainUsageTypeFormInput[];
  }>({
    afterRef: undefined,
    nodes: [],
  });

  const [queryState] = useGetMainUsageTypesQuery({
    variables: {
      first: DEFAULT_AUTOCOMPLETE_FETCH_COUNT,
      after: mainUsageTypes.afterRef,
      order: [
        {
          ordering: SortEnumType.Asc,
        },
        {
          name: SortEnumType.Asc,
        },
      ],
      where: {
        ...(debouncedMainUsageInputValue.trim().length
          ? {
              name: {
                contains: debouncedMainUsageInputValue.replace(/\(.*?\)/, '').trim(),
              },
            }
          : {}),
      },
    },
    pause: readonly,
  });

  useEffect(() => {
    const nodes =
      queryState.data?.estateMainUsageType.listEstateMainUsageTypes?.nodes?.map(
        parseMainUsageTypeToMainUsageTypeFormInput,
      ) ?? [];

    setMainUsageTypes((mainUsageTypes) => ({
      ...mainUsageTypes,
      nodes: mainUsageTypes.afterRef ? [...mainUsageTypes.nodes, ...nodes] : nodes,
    }));

    setLoading(false);
  }, [queryState.data]);

  const handleMainUsageTypeInputValueChange = useCallback(
    (_: unknown, value: string, reason: AutocompleteInputChangeReason) => {
      setMainUsageTypeInputValue(value);
      if (reason !== 'reset') {
        setMainUsageTypes({ afterRef: null, nodes: [] });
        setLoading(true);
      }
    },
    [],
  );

  const handleLoadMoreMainUsageTypes = useCallback(() => {
    const { hasNextPage, endCursor } = queryState.data?.estateMainUsageType.listEstateMainUsageTypes?.pageInfo ?? {};
    if (hasNextPage) {
      setMainUsageTypes((mainUsageTypes) => ({ ...mainUsageTypes, afterRef: endCursor }));
    }
  }, [queryState.data?.estateMainUsageType.listEstateMainUsageTypes?.pageInfo]);

  return (
    <Controller
      name="mainUsageType"
      control={control}
      render={({ field }) => (
        <AutocompleteField
          {...field}
          label={t('estate.field.main_usage_type')}
          options={mainUsageTypes.nodes}
          getOptionKey={(option) => Number(option.mainUsageTypeId)}
          getOptionLabel={(option) => option.name}
          error={!!errors.mainUsageType}
          helperText={errors.mainUsageType?.message}
          loading={loading}
          inputValue={mainUsageTypeInputValue}
          onInputChange={handleMainUsageTypeInputValueChange}
          onLoadMore={handleLoadMoreMainUsageTypes}
          readonly={readonly}
          required
        />
      )}
    />
  );
};
