import { startOfToday } from 'date-fns';

import { ContentCategory, DocumentFilterInput } from '../../gql/types';
import { TableColumn } from '../../interfaces/PrimaryTable';
import { parseDateToString } from '../dateUtils';
import { createObjectFromKey } from '../objectUtils';
import { getTableRangeFilter } from '../table/tableUtils';

export const getDocumentsFilterInput = <T>(column: TableColumn<T>, value: unknown): DocumentFilterInput => {
  switch (column.id) {
    case 'contentContains':
      return {
        contentContains: value as string,
      };
    case 'contentCategoryGroup':
      return {
        contentCategoryGroupIn: (Array.isArray(value) ? value : [value]) as string[],
      };
    case 'contentCategory':
      return {
        contentCategory: {
          in: value as ContentCategory[],
        },
      };
    case 'issueDate':
    case 'since':
    case 'creationDate':
    case 'until':
      return getTableRangeFilter(column.id, value);
    case 'expired': {
      return value
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
          };
    }
    default:
      return createObjectFromKey(column.id, {
        contains: value,
      });
  }
};
