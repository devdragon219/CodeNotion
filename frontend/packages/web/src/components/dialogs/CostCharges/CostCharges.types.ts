import { DocumentFormInput } from '@realgimm5/frontend-common/interfaces';

export interface CostChargesCreateDialogProps {
  onClose: () => void;
  onSave: (value: DocumentFormInput) => void;
}
