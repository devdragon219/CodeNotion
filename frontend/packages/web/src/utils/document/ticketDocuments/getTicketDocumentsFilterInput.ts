import { TicketDocumentsFlatOutputFilterInput } from '@realgimm5/frontend-common/gql/types';
import { DocumentsTableRow, TableColumn } from '@realgimm5/frontend-common/interfaces';
import { createObjectFromKey, getTableRangeFilter, parseDateToString } from '@realgimm5/frontend-common/utils';
import { startOfToday } from 'date-fns';

export const getTicketDocumentsFilterInput = (
  { id: columnId }: TableColumn<DocumentsTableRow>,
  value: unknown,
): TicketDocumentsFlatOutputFilterInput => {
  switch (columnId) {
    case 'contentContains':
      return {
        document: {
          contentContains: value as string,
        },
      };
    case 'issueDate':
    case 'since':
    case 'creationDate':
    case 'until':
      return getTableRangeFilter(`document.${columnId}`, value);
    case 'name':
    case 'protocolNumber':
    case 'issuer':
    case 'notes':
    case 'fileName':
    case 'uploaderName':
      return createObjectFromKey(`document.${columnId}`, {
        contains: value,
      });
    case 'expired': {
      return {
        document: value
          ? {
              until: {
                lt: parseDateToString(startOfToday()),
              },
            }
          : {
              or: [
                {
                  until: {
                    eq: null,
                  },
                },
                {
                  until: {
                    gte: parseDateToString(startOfToday()),
                  },
                },
              ],
            },
      };
    }
    default:
      return createObjectFromKey(columnId, {
        contains: value,
      });
  }
};
