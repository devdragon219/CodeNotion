import { createContext } from 'react';

import { ThemeContextProps } from './types';

const ThemeContext = createContext<ThemeContextProps | null>(null);
ThemeContext.displayName = 'Theme Context';

export { ThemeContext };
