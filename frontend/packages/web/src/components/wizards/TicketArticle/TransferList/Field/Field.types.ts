import { Control, UseFormSetValue } from 'react-hook-form';

import { PriceListDetailFragment } from '../../../../../gql/RealGimm.Web.PriceList.fragment';
import { TicketQuoteFormInput } from '../../../../../interfaces/FormInputs/Ticket';

export interface ArticlesTransferListProps {
  control: Control<TicketQuoteFormInput>;
  priceList: PriceListDetailFragment;
  setValue: UseFormSetValue<TicketQuoteFormInput>;
}
