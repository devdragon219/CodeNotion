import { TicketQuoteArticleFormInput } from '../../../../interfaces/FormInputs/Ticket';

export interface TicketArticlesTableStepProps {
  articles: TicketQuoteArticleFormInput[];
  onBack: () => void;
  onChange: (articles: TicketQuoteArticleFormInput[]) => void;
  onError: (error?: boolean | string) => void;
  onSave: (articles: TicketQuoteArticleFormInput[]) => void;
}
