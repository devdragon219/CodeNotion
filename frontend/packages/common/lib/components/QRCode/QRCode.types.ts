import { ParseKeys } from 'i18next';

export interface QRCodeProps {
  value: string;
  size?: number;
  title?: ParseKeys;
  isDownloadable?: boolean;
}
