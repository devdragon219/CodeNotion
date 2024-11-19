import { DocumentFormInput } from './Document';

export interface ChatMessageFormInput {
  attachments: {
    documents: DocumentFormInput[];
    images: DocumentFormInput[];
  };
  messageId: number;
  text: string;
  timestamp: Date | null;
  user: {
    fullName: string;
    userName: string;
  };
}
