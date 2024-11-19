import { Grid2, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Dialog } from '../Dialog/Dialog';
import { ConfirmationDialogProps } from './ConfirmationDialog.types';

export const ConfirmationDialog = ({
  actions,
  children,
  icon: Icon,
  title,
  description,
  type,
  ...props
}: ConfirmationDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog {...props} maxWidth="sm" PaperProps={{ sx: { height: 'auto' } }}>
      <Grid2 container spacing={3} sx={{ textAlign: 'center' }}>
        <Grid2 size={12}>
          <Icon
            sx={(theme) => ({
              fontSize: '120px',
              ...(type
                ? {
                    color: type === 'danger' ? theme.palette.danger[300] : theme.palette.yellow[500],
                  }
                : {}),
            })}
          />
        </Grid2>
        <Grid2 size={12}>
          <Typography variant="h2" sx={(theme) => ({ color: theme.palette.grey[700], whiteSpace: 'pre-wrap' })}>
            {t(title)}
          </Typography>
        </Grid2>
        {description && (
          <Grid2 size={12}>
            <Typography variant="bodyLg" sx={(theme) => ({ color: theme.palette.grey[700], whiteSpace: 'pre-wrap' })}>
              {t(description)}
            </Typography>
          </Grid2>
        )}
        {children && <Grid2 size={12}>{children}</Grid2>}
        <Grid2 size={12} sx={{ pb: 4 }}>
          <Stack direction="row" sx={{ justifyContent: 'center' }} spacing={3}>
            {actions}
          </Stack>
        </Grid2>
      </Grid2>
    </Dialog>
  );
};
