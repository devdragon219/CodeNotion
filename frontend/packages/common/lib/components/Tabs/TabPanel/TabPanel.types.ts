import { PropsWithChildren } from 'react';

export type TabPanelProps = PropsWithChildren<{
  index: number;
  selected: boolean;
}>;
