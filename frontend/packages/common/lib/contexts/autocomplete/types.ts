import { ParseKeys } from 'i18next';
import { PropsWithChildren } from 'react';

export interface AutocompleteContextProps {
  action?: {
    title: ParseKeys;
    onClick: () => void;
  };
  hasAllOptionsSelected: boolean;
  hasSomeOptionsSelected: boolean;
  selectAll?: {
    title: ParseKeys;
    onClick: () => void;
  };
}

export type AutocompleteProviderProps = PropsWithChildren<{
  action?: {
    title: ParseKeys;
    onClick: () => void;
  };
  hasAllOptionsSelected: boolean;
  hasSomeOptionsSelected: boolean;
  selectAll?: {
    title: ParseKeys;
    onClick: () => void;
  };
}>;
