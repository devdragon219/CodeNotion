import { yupResolver } from '@hookform/resolvers/yup';
import { Grid2 } from '@mui/material';
import { Loader, PrimaryTable, SectionTitle, StepForm } from '@realgimm5/frontend-common/components';
import { useTable } from '@realgimm5/frontend-common/contexts';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { TicketChecklistFragment } from '../../../../gql/RealGimm.Web.TicketChecklist.fragment';
import {
  GetTicketChecklistsQueryVariables,
  useGetTicketChecklistsQuery,
} from '../../../../gql/RealGimm.Web.TicketChecklist.operation';
import { TicketFormInput } from '../../../../interfaces/FormInputs/Ticket';
import { getTicketTicketChecklistSchema } from '../../../../utils/ticket/schemas/ticketChecklist';
import { getTicketChecklistsColumns } from '../../../../utils/ticketChecklist/getTicketChecklistsColumns';
import { TicketTicketChecklistStepProps } from './TicketChecklist.types';

export const TicketTicketChecklistStep = ({
  ticket,
  onBack,
  onChange,
  onError,
  onNext,
}: TicketTicketChecklistStepProps) => {
  const { t } = useTranslation();
  const {
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<TicketFormInput>({
    defaultValues: ticket,
    resolver: yupResolver(getTicketTicketChecklistSchema(t)),
  });
  const { initialState, pause, variables, handleFilter, handlePageChange, handleSort, setInitialState } =
    useTable<GetTicketChecklistsQueryVariables>((variables) => ({
      ...variables,
      where: {
        ...(variables.where ?? {}),
        contract: {
          id: {
            eq: ticket.facilityContract?.id,
          },
        },
        estateUnitId: {
          eq: ticket.locationEstateUnit?.id,
        },
      },
    }));
  const [queryState] = useGetTicketChecklistsQuery({ pause, variables });
  const ticketChecklists = useMemo(() => queryState.data?.ticketChecklist.listTicketChecklists, [queryState.data]);

  const handleRowSelected = useCallback(
    (row: TicketChecklistFragment | null) => {
      setValue('ticketChecklist', row);
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
    if (errors.ticketChecklist) {
      onError(errors.ticketChecklist.message);
    }
    // eslint-disable-next-line
  }, [errors.ticketChecklist]);

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <Grid2 container spacing={{ xs: 2, sm: 3 }}>
        {queryState.fetching && <Loader />}
        <SectionTitle value="ticket.section_title.ticket_checklist" />
        <Grid2 size={12}>
          <PrimaryTable
            color="secondary"
            columns={getTicketChecklistsColumns(t)}
            empty="ticket_checklist.text.no_ticket_checklists"
            initialState={initialState}
            rows={ticketChecklists?.nodes ?? []}
            totalCount={ticketChecklists?.totalCount ?? 0}
            useRowSelection={false}
            getRowId={({ id }) => String(id)}
            onFilter={handleFilter()}
            onPageChange={handlePageChange(ticketChecklists?.pageInfo)}
            onStateChange={setInitialState}
            onSort={handleSort()}
            onRowSelected={handleRowSelected}
          />
        </Grid2>
      </Grid2>
    </StepForm>
  );
};
