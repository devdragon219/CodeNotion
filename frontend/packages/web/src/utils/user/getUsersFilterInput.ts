import { UserFilterInput, UserType } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { createObjectFromKey } from '@realgimm5/frontend-common/utils';

import { UserFragment } from '../../gql/RealGimm.Web.User.fragment';

export const getUsersFilterInput = ({ id: columnId }: TableColumn<UserFragment>, value: unknown): UserFilterInput => {
  switch (columnId) {
    case 'fullName':
      return {
        or: [
          {
            firstName: {
              contains: value as string,
            },
          },
          {
            lastName: {
              contains: value as string,
            },
          },
        ],
      };
    case 'status':
    case 'officeAccess':
      return {
        [columnId]: {
          in: value,
        },
      };
    case 'type':
      return {
        type: {
          eq: value as UserType,
        },
      };
    default:
      return createObjectFromKey(columnId, {
        contains: value,
      });
  }
};
