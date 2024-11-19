import { yupResolver } from '@hookform/resolvers/yup';
import { Grid2, Typography } from '@mui/material';
import { Loader, PrimaryTable, SectionTitle, StepForm } from '@realgimm5/frontend-common/components';
import { useTable } from '@realgimm5/frontend-common/contexts';
import { MouseEvent, useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { GetContractsQueryVariables, useGetContractsQuery } from '../../../../gql/RealGimm.Web.Contract.operation';
import { ContractFragment } from '../../../../gql/RealGimm.Web.ContractListOutput.fragment';
import { RegistrationPaymentFormInput } from '../../../../interfaces/FormInputs/RegistrationPayment';
import { getContractsColumns } from '../../../../utils/contract/getContractsColumns';
import { getContractsFilterInput } from '../../../../utils/contract/getContractsFilterInput';
import { getContractsSortInput } from '../../../../utils/contract/getContractsSortInput';
import { getRegistrationPaymentContractSchema } from '../../../../utils/registrationPayment/schemas/contract';
import { RegistrationPaymentContractsStepProps } from './Contracts.types';

export const RegistrationPaymentContractsStep = ({
  registrationPayment,
  onChange,
  onError,
  onNext,
  onShowAllLocatedUnits,
}: RegistrationPaymentContractsStepProps) => {
  const { t } = useTranslation();
  const {
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<RegistrationPaymentFormInput>({
    defaultValues: registrationPayment,
    resolver: yupResolver(getRegistrationPaymentContractSchema(t)),
  });
  const { initialState, pause, variables, handleFilter, handlePageChange, handleSort, setInitialState } =
    useTable<GetContractsQueryVariables>();
  const [queryState] = useGetContractsQuery({ pause, variables });
  const contracts = useMemo(() => queryState.data?.contract.listContracts, [queryState.data]);

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as RegistrationPaymentFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (errors.contract) {
      onError(errors.contract.message);
    }
    // eslint-disable-next-line
  }, [errors.contract]);

  const handleRowSelected = useCallback(
    (row: ContractFragment | null) => {
      setValue(
        'contract',
        row
          ? {
              id: row.id,
              internalCode: row.internalCode,
              managementSubjectName: row.managementSubjectName ?? '',
            }
          : null,
      );
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
    <StepForm onNext={onError} onSubmit={handleSubmit(onNext)}>
      <Grid2 container spacing={{ xs: 2, sm: 3 }}>
        {queryState.fetching && <Loader />}
        <SectionTitle value="registration_payment.section_title.contract" />
        <Grid2 size={12}>
          <PrimaryTable
            color="secondary"
            columns={getContractsColumns(false, t, showAllButton)}
            empty="registration_payment.text.no_contracts"
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
