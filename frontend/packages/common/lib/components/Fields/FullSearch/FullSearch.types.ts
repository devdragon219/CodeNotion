import { SxProps, Theme } from '@mui/material';

export interface FullSearchProps {
  areFiltersVisible: boolean;
  hasFilters: boolean;
  inUseFilters: number;
  sx?: SxProps<Theme>;
  value: string;
  onSearch: (value: string) => void;
  onToggleFiltersVisible: () => void;
}
