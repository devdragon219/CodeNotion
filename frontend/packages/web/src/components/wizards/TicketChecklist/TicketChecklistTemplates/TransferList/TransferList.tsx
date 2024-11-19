import { Loader, TransferList } from '@realgimm5/frontend-common/components';
import { useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useGetAllTicketChecklistTemplatesQuery } from '../../../../../gql/RealGimm.Web.TicketChecklistTemplate.operation';
import { getTicketChecklistTemplatesColumns } from '../../../../../utils/ticketChecklistTemplate/getTicketChecklistTemplatesColumns';
import { TicketChecklistTemplatesTransferListProps } from './TransferList.types';

export const TicketChecklistTemplatesTransferList = ({
  catalogueTypeIds,
  control,
}: TicketChecklistTemplatesTransferListProps) => {
  const { t } = useTranslation();
  const [queryState] = useGetAllTicketChecklistTemplatesQuery({
    variables: {
      where: {
        catalogueTypeId: {
          in: catalogueTypeIds,
        },
      },
    },
  });
  const ticketChecklistTemplates = useMemo(
    () => queryState.data?.ticketChecklistTemplate.listTicketChecklistTemplatesFull ?? [],
    [queryState.data],
  );

  return (
    <>
      {queryState.fetching && <Loader />}
      <Controller
        name="ticketChecklistTemplates"
        control={control}
        render={({ field }) => (
          <TransferList
            {...field}
            columns={getTicketChecklistTemplatesColumns(t)}
            empty="ticket_checklist.text.no_ticket_checklist_templates_selected"
            rows={ticketChecklistTemplates}
            titles={{
              left: 'ticket_checklist.section_title.select_ticket_checklist_templates',
              right: 'ticket_checklist.section_title.selected_ticket_checklist_templates',
            }}
            getRowId={({ id }) => String(id)}
          />
        )}
      />
    </>
  );
};
