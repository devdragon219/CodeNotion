import { yupResolver } from '@hookform/resolvers/yup';
import { Grid2 } from '@mui/material';
import { Loader, PrimaryTable, SectionTitle, StepForm } from '@realgimm5/frontend-common/components';
import { useTable } from '@realgimm5/frontend-common/contexts';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FacilityContractFragment } from '../../../../gql/RealGimm.Web.FacilityContract.fragment';
import {
  GetFacilityContractsQueryVariables,
  useGetFacilityContractsQuery,
} from '../../../../gql/RealGimm.Web.FacilityContract.operation';
import { TicketFormInput } from '../../../../interfaces/FormInputs/Ticket';
import { getFacilityContractsColumns } from '../../../../utils/facilityContract/getFacilityContractsColumns';
import { getTicketFacilityContractSchema } from '../../../../utils/ticket/schemas/facilityContract';
import { TicketFacilityContractStepProps } from './FacilityContract.types';

export const TicketFacilityContractStep = ({ ticket, onChange, onError, onNext }: TicketFacilityContractStepProps) => {
  const { t } = useTranslation();
  const {
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<TicketFormInput>({
    defaultValues: ticket,
    resolver: yupResolver(getTicketFacilityContractSchema(t)),
  });
  const { initialState, pause, variables, handleFilter, handlePageChange, handleSort, setInitialState } =
    useTable<GetFacilityContractsQueryVariables>((variables) => ({
      ...variables,
      where: {
        ...(variables.where ?? {}),
        ticketChecklists: {
          any: true,
        },
      },
    }));
  const [queryState] = useGetFacilityContractsQuery({ pause, variables });
  const facilityContracts = useMemo(() => queryState.data?.fcltContract.listFcltContracts, [queryState.data]);

  const handleRowSelected = useCallback(
    (row: FacilityContractFragment | null) => {
      setValue('facilityContract', row);
    },
    [setValue],
  );

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as TicketFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (errors.facilityContract) {
      onError(errors.facilityContract.message);
    }
    // eslint-disable-next-line
  }, [errors.facilityContract]);

  return (
    <StepForm onNext={onError} onSubmit={handleSubmit(onNext)}>
      <Grid2 container spacing={{ xs: 2, sm: 3 }}>
        {queryState.fetching && <Loader />}
        <SectionTitle value="ticket.section_title.facility_contract" />
        <Grid2 size={12}>
          <PrimaryTable
            color="secondary"
            columns={getFacilityContractsColumns(t)}
            empty="facility_contract.text.no_facility_contracts"
            initialState={initialState}
            rows={facilityContracts?.nodes ?? []}
            totalCount={facilityContracts?.totalCount ?? 0}
            useRowSelection={false}
            getRowId={({ id }) => String(id)}
            onFilter={handleFilter()}
            onPageChange={handlePageChange(facilityContracts?.pageInfo)}
            onStateChange={setInitialState}
            onSort={handleSort()}
            onRowSelected={handleRowSelected}
          />
        </Grid2>
      </Grid2>
    </StepForm>
  );
};
