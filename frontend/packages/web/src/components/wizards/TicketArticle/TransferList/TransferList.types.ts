import { PriceListDetailFragment } from '../../../../gql/RealGimm.Web.PriceList.fragment';
import { TicketQuoteArticleFormInput } from '../../../../interfaces/FormInputs/Ticket';

export interface TicketArticlesTransferListStepProps {
  articles: TicketQuoteArticleFormInput[];
  priceLists: PriceListDetailFragment[];
  onChange: (articles: TicketQuoteArticleFormInput[]) => void;
  onError: (error?: boolean | string) => void;
  onNext: () => void;
}
