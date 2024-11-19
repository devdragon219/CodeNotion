import { AutocompleteInputChangeReason } from '@mui/material';
import { AutocompleteField } from '@realgimm5/frontend-common/components';
import { DEFAULT_AUTOCOMPLETE_FETCH_COUNT } from '@realgimm5/frontend-common/configs';
import { SortEnumType } from '@realgimm5/frontend-common/gql/types';
import { useDebounce } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useGetGroupsQuery } from '../../../../../gql/RealGimm.Web.Group.operation';
import { UserGroupFormInput } from '../../../../../interfaces/FormInputs/User';
import { GroupsFieldProps } from './GroupsField.types';

export const GroupsField = ({ control, errors, readonly }: GroupsFieldProps) => {
  const { t } = useTranslation();

  const [inputValue, setInputValue] = useState('');
  const debouncedInputValue = useDebounce(inputValue);
  const [loading, setLoading] = useState(false);
  const [selectOptions, setSelectOptions] = useState<{
    afterRef: string | null | undefined;
    nodes: UserGroupFormInput[];
  }>({
    afterRef: undefined,
    nodes: [],
  });

  const [getGroupsState] = useGetGroupsQuery({
    variables: {
      first: DEFAULT_AUTOCOMPLETE_FETCH_COUNT,
      after: selectOptions.afterRef,
      order: {
        name: SortEnumType.Asc,
      },
      where: {
        ...(debouncedInputValue.trim().length
          ? {
              name: {
                contains: debouncedInputValue,
              },
            }
          : {}),
      },
    },
    pause: readonly,
  });

  useEffect(() => {
    const nodes =
      getGroupsState.data?.admin.listGroup?.nodes?.map(({ id, name }) => ({
        groupId: id,
        name: name,
      })) ?? [];

    setSelectOptions((options) => ({
      ...options,
      nodes: options.afterRef ? [...options.nodes, ...nodes] : nodes,
    }));

    setLoading(false);
  }, [getGroupsState.data]);

  const handleSearchInputValueChange = useCallback(
    (_: unknown, value: string, reason: AutocompleteInputChangeReason) => {
      setInputValue(value);
      if (reason !== 'reset') {
        setSelectOptions({ afterRef: null, nodes: [] });
        setLoading(true);
      }
    },
    [],
  );

  const handleLoadMore = useCallback(() => {
    const { hasNextPage, endCursor } = getGroupsState.data?.admin.listGroup?.pageInfo ?? {};
    if (hasNextPage) {
      setSelectOptions((options) => ({ ...options, afterRef: endCursor }));
    }
  }, [getGroupsState.data?.admin.listGroup?.pageInfo]);

  return (
    <Controller
      name="groups"
      control={control}
      render={({ field }) => (
        <AutocompleteField
          {...field}
          multiple
          label={t('user.field.groups')}
          options={selectOptions.nodes}
          getOptionKey={(option) => option.groupId}
          getOptionLabel={(option) => option.name}
          error={!!errors.groups}
          helperText={errors.groups?.message}
          inputValue={inputValue}
          onInputChange={handleSearchInputValueChange}
          onLoadMore={handleLoadMore}
          loading={loading}
          readonly={readonly}
          required
        />
      )}
    />
  );
};
