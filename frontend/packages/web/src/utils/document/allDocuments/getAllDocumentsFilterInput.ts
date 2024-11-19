import { ContentCategory, DocumentRowFilterInput } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { createObjectFromKey, getTableRangeFilter, parseDateToString } from '@realgimm5/frontend-common/utils';
import { startOfToday } from 'date-fns';

import { DocumentRowFragment } from '../../../gql/RealGimm.Web.DocumentRow.fragment';

export const getAllDocumentsFilterInput = (
  { id: columnId }: TableColumn<DocumentRowFragment>,
  value: unknown,
): DocumentRowFilterInput => {
  switch (columnId) {
    case 'contentContains':
      return {
        document: {
          contentContains: value as string,
        },
      };
    case 'document.identityType':
      return {
        document: {
          contentCategory: {
            in: value as ContentCategory[],
          },
        },
      };
    case 'document.contentCategory': {
      const contentCategories = Object.values(ContentCategory);

      return {
        document: {
          contentCategory: {
            in: (value as string[]).flatMap((value) =>
              contentCategories.includes(value as ContentCategory)
                ? [value]
                : contentCategories.filter((it) => it.startsWith(value)),
            ) as ContentCategory[],
          },
        },
      };
    }
    case 'document.since':
    case 'document.until':
    case 'document.issueDate':
    case 'document.creationDate':
      return getTableRangeFilter(columnId, value);
    case 'document.expired': {
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
