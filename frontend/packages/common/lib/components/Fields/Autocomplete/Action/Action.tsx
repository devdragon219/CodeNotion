import { MenuItem, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { useAutocomplete } from '../../../../contexts/autocomplete/hook';

export const Action = () => {
  const { t } = useTranslation();
  const { action } = useAutocomplete();

  return (
    action && (
      <MenuItem
        sx={(theme) => ({
          borderTop: `1px solid ${theme.palette.divider}`,
          color: theme.palette.grey[700],
          cursor: 'pointer',
          p: 1,
          mx: '6px',
          mb: '6px',
        })}
        onClick={action.onClick}
      >
        <Typography variant="bodySm">{t(action.title)}</Typography>
      </MenuItem>
    )
  );
};
