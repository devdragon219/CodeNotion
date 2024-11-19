import { SxProps, Theme } from '@mui/material';
import { Header } from '@tanstack/react-table';
import { ChangeEvent } from 'react';

export interface TableHeaderCellProps<T> {
  checkbox: {
    indeterminate: boolean;
    checked: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  };
  color?: 'primary' | 'secondary';
  header: Header<T, unknown>;
  sx: SxProps<Theme>;
}
