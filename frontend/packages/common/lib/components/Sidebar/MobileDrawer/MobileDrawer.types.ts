import { PropsWithChildren } from 'react';

export type MobileDrawerProps = PropsWithChildren<{
  open: boolean;
  onClose: () => void;
}>;
