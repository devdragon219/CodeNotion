import { TableColumn } from '@realgimm5/frontend-common/interfaces';

import { CalendarFragment } from '../../gql/RealGimm.Web.Calendar.fragment';
import { getTimeZoneLabel, getTimeZones } from '../dateUtils';

export const getCalendarsColumns = (): TableColumn<CalendarFragment>[] => [
  {
    id: 'name',
    label: 'calendar.field.name',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'timeZoneId',
    label: 'calendar.field.timezone',
    options: getTimeZones(),
    useSortedOptions: false,
    getOptionLabel: (option) => getTimeZoneLabel(option as string),
    multiple: true,
    enableColumnFilter: true,
    enableSorting: true,
  },
];
