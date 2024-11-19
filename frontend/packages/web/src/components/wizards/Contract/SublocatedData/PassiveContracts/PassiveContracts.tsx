import { yupResolver } from '@hookform/resolvers/yup';
import { Grid2, Typography } from '@mui/material';
import { Loader, PrimaryTable, SectionTitle, StepForm } from '@realgimm5/frontend-common/components';
import { useTable } from '@realgimm5/frontend-common/contexts';
import { MouseEvent, useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { GetContractsQueryVariables, useGetContractsQuery } from '../../../../../gql/RealGimm.Web.Contract.operation';
import { ContractFragment } from '../../../../../gql/RealGimm.Web.ContractListOutput.fragment';
import { ContractFormInput } from '../../../../../interfaces/FormInputs/Contract';
import { getContractsColumns } from '../../../../../utils/contract/getContractsColumns';
import { getContractsFilterInput } from '../../../../../utils/contract/getContractsFilterInput';
import { getContractsSortInput } from '../../../../../utils/contract/getContractsSortInput';
import { getContractSublocatedDataSchema } from '../../../../../utils/contract/schemas/sublocatedData';
import { parseContractToSublocatedContractFormInput } from '../../../../../utils/contract/sublocatedContractUtils';
import { ContractSublocatedDataPassiveContractsSubStepProps } from './PassiveContracts.types';

export const ContractSublocatedDataPassiveContractsSubStep = ({
  contract,
  onBack,
  onChange,
  onError,
  onNext,
  onShowAllLocatedUnits,
}: ContractSublocatedDataPassiveContractsSubStepProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const {
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<ContractFormInput>({
    defaultValues: contract,
    resolver: yupResolver(getContractSublocatedDataSchema(true, language, t)),
  });
  const { initialState, pause, variables, handleFilter, handlePageChange, handleSort, setInitialState } =
    useTable<GetContractsQueryVariables>((variables) => ({
      ...variables,
      where: {
        ...(variables.where ?? {}),
        type: {
          ...(variables.where?.type ?? {}),
          isActive: {
            eq: false,
          },
        },
      },
    }));
  const [queryState] = useGetContractsQuery({ pause, variables });
  const contracts = useMemo(() => queryState.data?.contract.listContracts, [queryState.data]);

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as ContractFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (errors.sublocatedContract) {
      onError(errors.sublocatedContract.message);
    }
    // eslint-disable-next-line
  }, [errors.sublocatedContract]);

  const handleRowSelected = useCallback(
    (row: ContractFragment | null) => {
      setValue('sublocatedContract', row ? parseContractToSublocatedContractFormInput(row) : null);
    },
    [setValue],
  );

  const showAllButton = useCallback(
    (row: ContractFragment) => {
      const onClick = (e: MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        onShowAllLocatedUnits(row);
      };

      return (
        <Typography variant="link" onClick={onClick}>
          {t('core.button.show_all')}
        </Typography>
      );
    },
    [t, onShowAllLocatedUnits],
  );

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <Grid2 container spacing={{ xs: 2, sm: 3 }}>
        {queryState.fetching && <Loader />}
        <SectionTitle value="contract.section_title.select_sublocated_data" />
        <Grid2 size={12}>
          <PrimaryTable
            color="secondary"
            columns={getContractsColumns(false, t, showAllButton)}
            empty="contract.text.no_passive_contracts"
            initialState={initialState}
            rows={contracts?.nodes ?? []}
            totalCount={contracts?.totalCount ?? 0}
            useRowSelection={false}
            getRowId={({ id }) => String(id)}
            onFilter={handleFilter(getContractsFilterInput)}
            onPageChange={handlePageChange(contracts?.pageInfo)}
            onStateChange={setInitialState}
            onSort={handleSort(getContractsSortInput)}
            onRowSelected={handleRowSelected}
          />
        </Grid2>
      </Grid2>
    </StepForm>
  );
};
