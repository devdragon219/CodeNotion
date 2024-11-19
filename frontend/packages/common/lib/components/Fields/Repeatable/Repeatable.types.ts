import { PropsWithChildren } from 'react';

export type RepeatableFieldProps = PropsWithChildren<{
  iconPositionAbsolute?: boolean;
  index: number;
  onDelete?: (index: number) => void;
}>;
