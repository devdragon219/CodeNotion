import { PropsWithChildren } from 'react';

export type DeletableFieldProps = PropsWithChildren<{
  iconPositionAbsolute?: boolean;
  onDelete: () => void;
}>;
