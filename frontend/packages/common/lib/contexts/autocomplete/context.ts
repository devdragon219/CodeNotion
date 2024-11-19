import { createContext } from 'react';

import { AutocompleteContextProps } from './types';

const AutocompleteContext = createContext<AutocompleteContextProps | null>(null);
AutocompleteContext.displayName = 'Autocomplete Context';

export { AutocompleteContext };
