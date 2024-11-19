import { memo } from 'react';
import isEqual from 'react-fast-compare';

import { FullSearch } from '../../../../Fields/FullSearch/FullSearch';
import { ToolbarSearchProps } from './Search.types';

const ToolbarSearch = ({ columnFilters, hasMultilineToolbar, ...props }: ToolbarSearchProps) => (
  <FullSearch
    {...props}
    inUseFilters={columnFilters}
    sx={
      hasMultilineToolbar
        ? (theme) => ({
            '& .MuiFormHelperText-root': {
              [theme.breakpoints.up('md')]: {
                position: 'absolute',
                bottom: '-19px',
              },
            },
          })
        : undefined
    }
  />
);

const memoized = memo(ToolbarSearch, isEqual) as typeof ToolbarSearch;
export { memoized as ToolbarSearch };
