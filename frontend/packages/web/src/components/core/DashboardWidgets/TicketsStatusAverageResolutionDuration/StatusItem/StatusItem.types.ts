import { TicketMasterStatus } from '@realgimm5/frontend-common/gql/types';
import { Duration } from 'date-fns';

export interface TicketsStatusAverageResolutionDurationStatusItemProps {
  status: TicketMasterStatus;
  value: Duration | null;
}
