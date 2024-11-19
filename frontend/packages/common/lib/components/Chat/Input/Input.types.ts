export interface InputProps {
  disabled?: boolean;
  onSend: (message: string, attachments: File[]) => void;
}
