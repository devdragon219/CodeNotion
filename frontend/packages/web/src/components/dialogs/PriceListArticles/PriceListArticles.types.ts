import { DocumentFormInput } from '@realgimm5/frontend-common/interfaces';

export interface PriceListArticlesCreateDialogProps {
  onClose: () => void;
  onSave: (value: DocumentFormInput) => void;
}
