import { PriceListDetailFragment } from '../../../gql/RealGimm.Web.PriceList.fragment';
import { TicketQuoteArticleFormInput } from '../../../interfaces/FormInputs/Ticket';

export interface TicketArticleCreateDialogProps {
  priceLists: PriceListDetailFragment[];
  onClose: () => void;
  onSave: (articles: TicketQuoteArticleFormInput[]) => void;
}
