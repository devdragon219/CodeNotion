export interface ToolbarSearchProps {
  areFiltersVisible: boolean;
  columnFilters: number;
  hasFilters: boolean;
  hasMultilineToolbar: boolean;
  value: string;
  onSearch: (value: string) => void;
  onToggleFiltersVisible: () => void;
}
