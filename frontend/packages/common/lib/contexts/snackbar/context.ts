import { createContext } from 'react';

import { SnackbarContextProps } from './types';

const SnackbarContext = createContext<SnackbarContextProps | null>(null);
SnackbarContext.displayName = 'Snackbar Context';

export { SnackbarContext };
