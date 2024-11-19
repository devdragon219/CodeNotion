import { ChatMessageFormInput } from '../../interfaces/FormInputs/Chat';

export interface ChatProps {
  disabled?: boolean;
  messages: ChatMessageFormInput[];
  onSend: (message: string, attachments: File[]) => void;
}
