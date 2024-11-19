import {
  CalendarTicketOutputFilterInput,
  TicketMainType,
  TicketMasterStatus,
} from '@realgimm5/frontend-common/gql/types';
import { createObjectFromKey } from '@realgimm5/frontend-common/utils';

export const getTicketsCalendarFilterInput = (
  searchInput: string,
  mainTypes: TicketMainType[],
  masterStatuses: TicketMasterStatus[],
  isExcludedFromMaintenanceContract: boolean | null,
): CalendarTicketOutputFilterInput | undefined => {
  const where: CalendarTicketOutputFilterInput = {
    and:
      mainTypes.length !== 0 || masterStatuses.length !== 0 || isExcludedFromMaintenanceContract !== null
        ? [
            ...(mainTypes.length !== 0
              ? [
                  {
                    mainType: {
                      in: mainTypes,
                    },
                  },
                ]
              : []),
            ...(masterStatuses.length !== 0
              ? [
                  {
                    masterStatus: {
                      in: masterStatuses,
                    },
                  },
                ]
              : []),
            ...(isExcludedFromMaintenanceContract !== null
              ? [
                  {
                    isExcludedFromMaintenanceContract: {
                      eq: isExcludedFromMaintenanceContract,
                    },
                  },
                ]
              : []),
          ]
        : undefined,
    or:
      searchInput.trim().length !== 0
        ? ['description', 'internalCode', 'requestor', 'supplierSubjectName', 'workOrderReference'].map((key) =>
            createObjectFromKey(key, {
              contains: searchInput,
            }),
          )
        : undefined,
  };

  return Object.keys(where).length !== 0 ? where : undefined;
};
