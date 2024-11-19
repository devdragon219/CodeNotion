import { AutocompleteOwnerState, AutocompleteRenderOptionState, MenuItem, Typography } from '@mui/material';
import { HTMLAttributes } from 'react';

import { CheckboxField } from '../../Checkbox/Checkbox';

export const Option = <
  Value,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>(
  props: HTMLAttributes<HTMLLIElement>,
  option: Value,
  { index, selected }: AutocompleteRenderOptionState,
  { getOptionLabel, multiple }: AutocompleteOwnerState<Value, Multiple, DisableClearable, FreeSolo>,
) => (
  <MenuItem {...props} key={index}>
    {multiple && <CheckboxField key={`${index}_checkbox`} checked={selected} disableRipple />}
    <Typography key={`${index}_typography`} variant="bodySm">
      {getOptionLabel(option)}
    </Typography>
  </MenuItem>
);
