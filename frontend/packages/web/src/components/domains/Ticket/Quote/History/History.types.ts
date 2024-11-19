import { QuoteHistoryEntryFragment } from '../../../../../gql/RealGimm.Web.QuoteHistoryEntry.fragment';

export interface HistoryDialogProps {
  history: QuoteHistoryEntryFragment[];
  onClose: () => void;
}
