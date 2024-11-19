import { AutocompleteInputChangeReason } from '@mui/material';
import { AutocompleteField } from '@realgimm5/frontend-common/components';
import { DEFAULT_AUTOCOMPLETE_FETCH_COUNT } from '@realgimm5/frontend-common/configs';
import { SortEnumType } from '@realgimm5/frontend-common/gql/types';
import { useDebounce } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useGetRegistrationOfficesQuery } from '../../../../../../gql/RealGimm.Web.RegistrationOffice.operation';
import { ContractRegistrationTaxFormInput } from '../../../../../../interfaces/FormInputs/Contract';
import { RegistrationOfficeFieldProps } from './RegistrationOfficeField.types';

export const RegistrationOfficeField = ({ control, errors, readonly }: RegistrationOfficeFieldProps) => {
  const { t } = useTranslation();
  const [taxOfficeInputValue, setTaxOfficeInputValue] = useState('');
  const debouncedTaxOfficeInputValue = useDebounce(taxOfficeInputValue);
  const [loading, setLoading] = useState(false);
  const [registrationOffices, setRegistrationOffices] = useState<{
    afterRef: string | null | undefined;
    nodes: NonNullable<ContractRegistrationTaxFormInput['registrationOffice']>[];
  }>({
    afterRef: undefined,
    nodes: [],
  });
  const [getRegistrationOfficesState] = useGetRegistrationOfficesQuery({
    variables: {
      first: DEFAULT_AUTOCOMPLETE_FETCH_COUNT,
      after: registrationOffices.afterRef,
      order: {
        description: SortEnumType.Asc,
      },
      where: {
        ...(debouncedTaxOfficeInputValue.trim().length
          ? {
              description: {
                contains: debouncedTaxOfficeInputValue,
              },
            }
          : {}),
      },
    },
    pause: readonly,
  });

  useEffect(() => {
    const nodes =
      getRegistrationOfficesState.data?.registrationOffice.listRegistrationOffices?.nodes?.map(
        (registrationOffice) => ({
          description: registrationOffice.description,
          externalCode: registrationOffice.externalCode,
          id: registrationOffice.id,
          countyName: registrationOffice.city?.countyName ?? '',
        }),
      ) ?? [];

    setRegistrationOffices((registrationOffices) => ({
      ...registrationOffices,
      nodes: registrationOffices.afterRef ? [...registrationOffices.nodes, ...nodes] : nodes,
    }));

    setLoading(false);
  }, [getRegistrationOfficesState.data]);

  const handleTaxOfficeInputValueChange = useCallback(
    (_: unknown, value: string, reason: AutocompleteInputChangeReason) => {
      setTaxOfficeInputValue(value);
      if (reason !== 'reset') {
        setRegistrationOffices({ afterRef: null, nodes: [] });
        setLoading(true);
      }
    },
    [],
  );

  const handleLoadMoreRegistrationOffices = useCallback(() => {
    const { hasNextPage, endCursor } =
      getRegistrationOfficesState.data?.registrationOffice.listRegistrationOffices?.pageInfo ?? {};
    if (hasNextPage) {
      setRegistrationOffices((cities) => ({ ...cities, afterRef: endCursor }));
    }
  }, [getRegistrationOfficesState.data?.registrationOffice.listRegistrationOffices?.pageInfo]);

  return (
    <Controller
      name="registrationTax.registrationOffice"
      control={control}
      render={({ field }) => (
        <AutocompleteField
          {...field}
          label={t('contract.field.registration_tax_office_city')}
          options={registrationOffices.nodes}
          getOptionKey={(option) => option.id}
          getOptionLabel={(option) => option.description}
          error={!!errors.registrationTax?.registrationOffice}
          helperText={errors.registrationTax?.registrationOffice?.message}
          loading={loading}
          inputValue={taxOfficeInputValue}
          onInputChange={handleTaxOfficeInputValueChange}
          onLoadMore={handleLoadMoreRegistrationOffices}
          readonly={readonly}
          required
        />
      )}
    />
  );
};
