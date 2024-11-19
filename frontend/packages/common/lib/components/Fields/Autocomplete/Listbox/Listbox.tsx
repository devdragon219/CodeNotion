import { List, MenuItem, Typography } from '@mui/material';
import { HTMLAttributes, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

import { useAutocomplete } from '../../../../contexts/autocomplete/hook';
import { CheckboxField } from '../../Checkbox/Checkbox';
import { Action } from '../Action/Action';

const Listbox = forwardRef<HTMLUListElement, HTMLAttributes<HTMLUListElement>>((props, ref) => {
  const { t } = useTranslation();
  const { hasAllOptionsSelected, hasSomeOptionsSelected, selectAll } = useAutocomplete();

  return (
    <List
      {...props}
      ref={ref}
      className="MuiMenu-list"
      sx={{ display: 'flex', flexDirection: 'column', p: '0 !important' }}
    >
      {selectAll && (
        <MenuItem
          sx={(theme) => ({
            borderBottom: `1px solid ${theme.palette.divider}`,
            color: theme.palette.grey[700],
            cursor: 'pointer',
            p: 1,
            mx: '6px',
            mt: '6px',
          })}
          onClick={selectAll.onClick}
        >
          <CheckboxField checked={hasAllOptionsSelected} indeterminate={hasSomeOptionsSelected} disableRipple />
          <Typography variant="bodySm">{t(selectAll.title)}</Typography>
        </MenuItem>
      )}
      <List
        {...props}
        ref={ref}
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: '6px !important',
        }}
      />
      <Action />
    </List>
  );
});
Listbox.displayName = 'Listbox';

export { Listbox };
