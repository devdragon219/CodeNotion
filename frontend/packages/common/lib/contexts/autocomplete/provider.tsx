import { AutocompleteContext } from './context';
import { AutocompleteProviderProps } from './types';

export const AutocompleteProvider = ({ children, ...props }: AutocompleteProviderProps) => (
  <AutocompleteContext.Provider value={props}>{children}</AutocompleteContext.Provider>
);
