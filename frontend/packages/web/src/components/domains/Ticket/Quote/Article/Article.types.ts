import { TicketQuoteArticleFormInput } from '../../../../../interfaces/FormInputs/Ticket';

export interface ArticlesFieldValues {
  articles: TicketQuoteArticleFormInput[];
}

export interface ArticleDialogInput {
  article: TicketQuoteArticleFormInput;
  index: number;
}

export interface ArticleDialogProps {
  input?: ArticleDialogInput;
  onClose: () => void;
  onSave: (value: TicketQuoteArticleFormInput[] | ArticleDialogInput) => void;
}
