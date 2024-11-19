import { SxProps, Theme } from '@mui/material';
import { ChangeEventHandler, MouseEvent } from 'react';

export interface TablePaginationToolbarProps {
  count: number;
  page: number;
  rowsPerPage: number;
  rowsPerPageOptions?: number[];
  sx?: SxProps<Theme>;
  onPageChange: (event: MouseEvent<HTMLButtonElement> | null, page: number) => void;
  onRowsPerPageChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}
