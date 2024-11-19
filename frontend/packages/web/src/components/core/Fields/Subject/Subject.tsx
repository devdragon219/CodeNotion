import { AutocompleteInputChangeReason } from '@mui/material';
import { AutocompleteField } from '@realgimm5/frontend-common/components';
import { DEFAULT_AUTOCOMPLETE_FETCH_COUNT } from '@realgimm5/frontend-common/configs';
import { PhysicalSubject, SortEnumType } from '@realgimm5/frontend-common/gql/types';
import { useDebounce } from '@realgimm5/frontend-common/hooks';
import { isOfType } from '@realgimm5/frontend-common/utils';
import { ForwardedRef, ReactElement, forwardRef, useCallback, useEffect, useState } from 'react';

import { useGetSubjectsQuery } from '../../../../gql/RealGimm.Web.Subject.operation';
import { SubjectFieldValue } from '../../../../interfaces/FieldValues/Subject';
import { SubjectFieldProps } from './Subject.types';

const SubjectField = <Multiple extends boolean | undefined = undefined>(
  { disabled, readonly, where, ...props }: SubjectFieldProps<Multiple>,
  ref: ForwardedRef<HTMLDivElement>,
) => {
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
  const [getQueryState] = useGetSubjectsQuery({
    variables: {
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
        ...(where ?? {}),
      },
    },
    pause: readonly ?? disabled,
  });

  useEffect(() => {
    const nodes =
      getQueryState.data?.subject.listSubjects?.nodes?.map((subjectFragment) => {
        const { addresses, bankAccounts, contacts, id, internalCode, name, officers } = subjectFragment;

        return {
          addresses,
          bankAccounts: bankAccounts.map(
            ({ accountHolder, bankAccountType, id, notes, referenceCode, referenceCodeType }) => ({
              accountHolder: accountHolder ?? '',
              bankAccountType,
              id,
              notes: notes ?? '',
              referenceCode: referenceCode ?? '',
              referenceCodeType: referenceCodeType,
            }),
          ),
          contacts,
          id,
          internalCode,
          name,
          officers: officers.map(({ subordinate }) => ({
            id: subordinate.id,
            name: subordinate.name,
          })),
          vatNumber: isOfType<PhysicalSubject>(subjectFragment, ['professionalTaxIdCode'])
            ? (subjectFragment.professionalTaxIdCode ?? '')
            : isOfType<{ baseCountryTaxIdCode: string }>(subjectFragment, ['baseCountryTaxIdCode'])
              ? subjectFragment.baseCountryTaxIdCode
              : '',
        };
      }) ?? [];

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
    const { hasNextPage, endCursor } = getQueryState.data?.subject.listSubjects?.pageInfo ?? {};
    if (hasNextPage) {
      setQueryResults((subjects) => ({ ...subjects, afterRef: endCursor }));
    }
  }, [getQueryState.data?.subject.listSubjects?.pageInfo]);

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
};
SubjectField.displayName = 'SubjectField';

const ForwardedSubjectField = forwardRef(SubjectField) as <Multiple extends boolean | undefined = undefined>(
  props: SubjectFieldProps<Multiple>,
  ref: ForwardedRef<HTMLDivElement>,
) => ReactElement;

export { ForwardedSubjectField as SubjectField };
