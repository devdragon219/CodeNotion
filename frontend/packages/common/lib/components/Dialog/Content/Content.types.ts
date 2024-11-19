import { PropsWithChildren, ReactNode } from 'react';

export type DialogContentProps = PropsWithChildren<{
  action?: ReactNode;
  fixedHeight?: boolean;
}>;
