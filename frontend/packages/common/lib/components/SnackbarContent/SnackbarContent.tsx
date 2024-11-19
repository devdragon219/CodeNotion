/* eslint-disable no-restricted-imports */
import { Cancel } from '@mui/icons-material';
import { Alert, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import { SnackbarContent as NotistackContent, useSnackbar as useNotistack } from 'notistack';
import { forwardRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { SnackbarContentProps } from './SnackbarContent.types';

const SnackbarContent = forwardRef<HTMLDivElement, SnackbarContentProps>(
  ({ errors, id, message, severity, style }, ref) => {
    const { t } = useTranslation();
    const { closeSnackbar } = useNotistack();

    const handleClose = useCallback(() => {
      closeSnackbar(id);
    }, [id, closeSnackbar]);

    return (
      <NotistackContent ref={ref} style={style}>
        <Alert
          icon={false}
          variant="filled"
          onClose={handleClose}
          severity={errors ? 'error' : severity}
          slots={{ closeIcon: Cancel }}
          sx={{ width: '100%' }}
        >
          {errors ? (
            <Stack direction="column">
              <Typography variant="bodySm">{message ?? t('common.error.generic')}</Typography>
              {errors.length !== 0 && (
                <List dense>
                  {errors.map((error, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        key={index}
                        primary={error.errorMessage}
                        primaryTypographyProps={{ variant: 'bodySm' }}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </Stack>
          ) : (
            <Typography variant="bodySm">{message}</Typography>
          )}
        </Alert>
      </NotistackContent>
    );
  },
);
SnackbarContent.displayName = 'SnackbarContent';

export { SnackbarContent };
