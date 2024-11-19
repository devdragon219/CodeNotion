import { AutocompleteInputChangeReason } from '@mui/material';
import { AutocompleteField } from '@realgimm5/frontend-common/components';
import { DEFAULT_AUTOCOMPLETE_FETCH_COUNT } from '@realgimm5/frontend-common/configs';
import { SortEnumType } from '@realgimm5/frontend-common/gql/types';
import { useDebounce } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ContractTypeFragment } from '../../../../../gql/RealGimm.Web.ContractType.fragment';
import { useGetContractTypesQuery } from '../../../../../gql/RealGimm.Web.ContractType.operation';
import { ContractFormInput } from '../../../../../interfaces/FormInputs/Contract';
import {
  getEmptyContractBillingFormInput,
  getEmptyContractRegistrationTaxFormInput,
  getEmptyContractRevaluationFormInput,
} from '../../../../../utils/contract/initialValues';
import { ContractTypeFieldProps } from './ContractTypeField.types';

export const ContractTypeField = ({
  control,
  disabled,
  errors,
  isContractActive,
  readonly,
  setValue,
}: ContractTypeFieldProps) => {
  const { t } = useTranslation();
  const billing = useWatch({ control, name: 'billing' });
  const [contractTypeInputValue, setContractTypeInputValue] = useState('');
  const debouncedContractTypeInputValue = useDebounce(contractTypeInputValue);
  const [loading, setLoading] = useState(false);
  const [contractTypes, setContractTypes] = useState<{
    afterRef: string | null | undefined;
    nodes: NonNullable<ContractFormInput['contractType']>[];
  }>({
    afterRef: undefined,
    nodes: [],
  });
  const [getContractTypesState] = useGetContractTypesQuery({
    variables: {
      first: DEFAULT_AUTOCOMPLETE_FETCH_COUNT,
      after: contractTypes.afterRef,
      order: {
        description: SortEnumType.Asc,
      },
      where: {
        isActive: {
          eq: isContractActive,
        },
        ...(debouncedContractTypeInputValue.trim().length
          ? {
              description: {
                contains: debouncedContractTypeInputValue,
              },
            }
          : {}),
      },
    },
    pause: readonly,
  });

  useEffect(() => {
    const nodes = getContractTypesState.data?.contractType.listContractTypes?.nodes ?? [];

    setContractTypes((contractTypes) => ({
      ...contractTypes,
      nodes: contractTypes.afterRef ? [...contractTypes.nodes, ...nodes] : nodes,
    }));

    setLoading(false);
  }, [getContractTypesState.data]);

  const handleContractTypeInputValueChange = useCallback(
    (_: unknown, value: string, reason: AutocompleteInputChangeReason) => {
      setContractTypeInputValue(value);
      if (reason !== 'reset') {
        setContractTypes({ afterRef: null, nodes: [] });
        setLoading(true);
      }
    },
    [],
  );

  const handleLoadMoreContractTypes = useCallback(() => {
    const { hasNextPage, endCursor } = getContractTypesState.data?.contractType.listContractTypes?.pageInfo ?? {};
    if (hasNextPage) {
      setContractTypes((subjects) => ({ ...subjects, afterRef: endCursor }));
    }
  }, [getContractTypesState.data?.contractType.listContractTypes?.pageInfo]);

  const handleContractTypeChange = useCallback(
    (onChange: (value: ContractTypeFragment | null) => void) => (value: ContractTypeFragment | null) => {
      onChange(value);

      setValue('billing', getEmptyContractBillingFormInput(value?.isRentChargeApplicable ?? false, billing));
      setValue(
        'registrationTax',
        getEmptyContractRegistrationTaxFormInput(
          value?.isRegistrationTax,
          !!value?.registrationTaxIncomeType,
          value?.registrationTaxIncomeType,
          value?.registrationTaxPercent,
          value?.registrationTaxTenantPercent,
        ),
      );
      setValue(
        'revaluation',
        getEmptyContractRevaluationFormInput(
          value?.isRevaluationApplicable,
          value?.isAbsoluteRevaluation,
          value?.revaluationRatePercent,
        ),
      );
    },
    [billing, setValue],
  );

  return (
    <Controller
      name="contractType"
      control={control}
      render={({ field }) => (
        <AutocompleteField
          {...field}
          onChange={handleContractTypeChange(field.onChange)}
          label={t('contract.field.contract_type')}
          options={contractTypes.nodes}
          error={!!errors.contractType}
          helperText={errors.contractType?.message}
          loading={loading}
          getOptionKey={(option) => option.id}
          getOptionLabel={(option) => option.description}
          inputValue={contractTypeInputValue}
          onInputChange={handleContractTypeInputValueChange}
          onLoadMore={handleLoadMoreContractTypes}
          disabled={disabled}
          readonly={readonly}
          required
        />
      )}
    />
  );
};
