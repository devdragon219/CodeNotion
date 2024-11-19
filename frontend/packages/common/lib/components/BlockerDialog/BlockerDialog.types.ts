export interface BlockerDialogProps {
  isBlocked: boolean;
  canSave?: boolean;
  onSave?: () => Promise<void>;
}
