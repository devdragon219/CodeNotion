/* eslint-disable no-restricted-imports */
import { SnackbarProvider as NotistackProvider, useSnackbar as useNotistack } from 'notistack';
import { PropsWithChildren, useCallback } from 'react';

import { SnackbarContent } from '../../components/SnackbarContent/SnackbarContent';
import { Transition } from '../../components/Transition/Transition';
import { ValidationError } from '../../gql/types';
import { SnackbarContext } from './context';
import { SnackbarContextProps, SnackbarOptions } from './types';

const SnackbarContentProvider = ({ children }: PropsWithChildren) => {
  const { closeSnackbar, enqueueSnackbar } = useNotistack();

  const showError = useCallback(
    (errors?: (ValidationError | null)[] | null, message?: string) => {
      return enqueueSnackbar({
        errors: (errors ?? []).filter((error) => !!error),
        message,
      });
    },
    [enqueueSnackbar],
  );

  const showSnackbar = useCallback(
    (message: string, options: SnackbarOptions = 'info') => {
      return enqueueSnackbar(
        message,
        typeof options === 'object'
          ? options
          : {
              severity: options,
            },
      );
    },
    [enqueueSnackbar],
  );

  const contextValue: SnackbarContextProps = {
    closeSnackbar,
    showError,
    showSnackbar,
  };

  return <SnackbarContext.Provider value={contextValue}>{children}</SnackbarContext.Provider>;
};

export const SnackbarProvider = ({ children }: PropsWithChildren) => (
  <NotistackProvider
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    autoHideDuration={5000}
    Components={{
      default: SnackbarContent,
    }}
    TransitionComponent={(props) => <Transition {...props} type="slide" direction="left" />}
  >
    <SnackbarContentProvider>{children}</SnackbarContentProvider>
  </NotistackProvider>
);
