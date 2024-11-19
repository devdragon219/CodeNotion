export interface CloseDialogProps {
  canSave: boolean;
  onSave: () => void;
  onCancel: () => void;
  onClose?: () => void;
}
