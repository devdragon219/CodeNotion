import { yupResolver } from '@hookform/resolvers/yup';
import { Loader, StepForm, TransferList } from '@realgimm5/frontend-common/components';
import { parseStringToLocalizedDate } from '@realgimm5/frontend-common/utils';
import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useGetAllContractsQuery } from '../../../../../gql/RealGimm.Web.Contract.operation';
import { ContractVariationTransferFormInput } from '../../../../../interfaces/FormInputs/ContractActions';
import { getContractTransferVariationContractsSchema } from '../../../../../utils/contractActions/schemas/contractTransfer';
import { ContractsStepProps } from './Contracts.types';

export const ContractsStep = ({
  contract,
  contractTransfer,
  isContractActive,
  onBack,
  onChange,
  onError,
  onNext,
}: ContractsStepProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<ContractVariationTransferFormInput>({
    defaultValues: contractTransfer,
    resolver: yupResolver(getContractTransferVariationContractsSchema(t)),
  });
  const [queryState] = useGetAllContractsQuery({
    variables: {
      where: {
        managementSubjectId: {
          eq: contract.managementSubject?.id,
        },
        type: {
          isActive: {
            eq: isContractActive,
          },
        },
      },
    },
  });
  const contracts = useMemo(
    () =>
      queryState.data?.contract.listContractsFull.map((contract) => ({
        counterpartName: contract.counterparts.find(({ isMainCounterpart }) => isMainCounterpart)?.subject.name,
        effectStartDate: parseStringToLocalizedDate(contract.effectStartDate, language),
        id: contract.id,
        internalCode: contract.internalCode,
        typeDescription: contract.type.description,
      })) ?? [],
    [language, queryState.data?.contract.listContractsFull],
  );

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as ContractVariationTransferFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (errors.contracts) {
      onError(errors.contracts.message);
    }
    // eslint-disable-next-line
  }, [errors.contracts]);

  return (
    <StepForm sx={{ height: 'calc(100% - 92px)' }} onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      {queryState.fetching && <Loader />}
      <Controller
        name="contracts"
        control={control}
        render={({ field }) => (
          <TransferList
            {...field}
            columns={[
              {
                id: 'internalCode',
                label: 'contract.field.contract_code',
                enableColumnFilter: true,
                enableGlobalFilter: true,
                enableSorting: true,
              },
              {
                id: 'counterpartName',
                label: 'contract.field.counterpart_main',
                enableColumnFilter: true,
                enableGlobalFilter: true,
                enableSorting: true,
              },
              {
                id: 'typeDescription',
                label: 'contract.field.contract_type',
                enableColumnFilter: true,
                enableGlobalFilter: true,
                enableSorting: true,
              },
              {
                id: 'effectStartDate',
                type: 'date',
                label: 'contract.field.effect_date',
                enableColumnFilter: true,
                enableGlobalFilter: true,
                enableSorting: true,
              },
            ]}
            empty="contract.text.no_subjects"
            fixedValues={[contractTransfer.contracts[0]]}
            rows={contracts}
            titles={{
              left: 'contract.section_title.contracts',
              right: 'contract.section_title.selected_contracts',
            }}
            getRowId={({ id }) => String(id)}
          />
        )}
      />
    </StepForm>
  );
};
