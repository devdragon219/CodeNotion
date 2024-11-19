import { SxProps, Theme } from '@mui/material';
import { Header } from '@tanstack/react-table';

export interface TableHeaderFilterCellProps<T> {
  areFiltersVisible: boolean;
  header: Header<T, unknown>;
  sx: SxProps<Theme>;
  onResetColumnFilters: () => void;
}
