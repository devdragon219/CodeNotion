import { QuoteHistoryEntryFragment } from '../../../../gql/RealGimm.Web.QuoteHistoryEntry.fragment';
import { TicketHistoryEntryFragment } from '../../../../gql/RealGimm.Web.TicketHistoryEntry.fragment';

export interface TicketHistoryProps {
  history: TicketHistoryEntryFragment[] | QuoteHistoryEntryFragment[];
  readonly?: boolean;
}
