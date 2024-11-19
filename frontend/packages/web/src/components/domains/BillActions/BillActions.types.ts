export interface BillActionsProps {
  isTemporary: boolean;
  onFinalize: () => void;
  onGenerate: () => void;
}
