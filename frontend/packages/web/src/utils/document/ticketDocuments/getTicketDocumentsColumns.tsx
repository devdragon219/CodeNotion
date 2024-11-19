import { getDocumentsTableColumns } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';

import { getTicketDocumentFieldsConfig } from '../../ticket/getTicketDocumentFieldsConfig';

export const getTicketDocumentsColumns = (t: TFunction) =>
  getDocumentsTableColumns(t, {
    extraGroupingColumns: [
      {
        id: 'ticketInternalCode',
        label: 'document.field.ticket',
        enableColumnFilter: true,
        enableGlobalFilter: true,
        enableSorting: true,
      },
    ],
    fieldsConfig: getTicketDocumentFieldsConfig(),
    useExpiredColumn: true,
    useSelectableColumn: true,
  });
