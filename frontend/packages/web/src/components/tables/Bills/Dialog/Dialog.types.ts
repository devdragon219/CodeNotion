export interface FinalizeBillsDialogProps {
  isActive: boolean;
  onClose: () => void;
  onSave: (billIds: number[]) => void;
}
