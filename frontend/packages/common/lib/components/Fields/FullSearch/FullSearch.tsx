import { TuneTwoTone } from '@mui/icons-material';
import { Badge, InputAdornment } from '@mui/material';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { parseSxPropsToArray } from '../../../utils/muiUtils';
import { CheckboxField } from '../Checkbox/Checkbox';
import { SearchField } from '../Search/Search';
import { FullSearchProps } from './FullSearch.types';

export const FullSearch = ({
  areFiltersVisible,
  hasFilters,
  inUseFilters,
  sx,
  value,
  onSearch,
  onToggleFiltersVisible,
}: FullSearchProps) => {
  const { t } = useTranslation();

  const helperText = useMemo(() => {
    switch (inUseFilters) {
      case 0:
        return t('common.component.search.filter.none');
      case 1:
        return t('common.component.search.filter.single');
      default:
        return t('common.component.search.filter.multiple', { count: inUseFilters });
    }
  }, [inUseFilters, t]);

  return (
    <SearchField
      value={value}
      onChange={onSearch}
      debounceDelay={300}
      helperText={helperText}
      placeholder={t('common.component.search.placeholder')}
      slotProps={{
        input: {
          endAdornment: hasFilters && (
            <InputAdornment position="end">
              <Badge variant="dot" invisible={inUseFilters === 0}>
                <CheckboxField
                  checked={areFiltersVisible}
                  icon={<TuneTwoTone />}
                  checkedIcon={<TuneTwoTone />}
                  onClick={onToggleFiltersVisible}
                />
              </Badge>
            </InputAdornment>
          ),
        },
      }}
      sx={[
        (theme) => ({
          '& .MuiFormHelperText-root': {
            ...(inUseFilters === 0
              ? {}
              : {
                  color: theme.palette.blue[500],
                }),
          },
          [theme.breakpoints.up('md')]: {
            maxWidth: '500px',
          },
        }),
        ...parseSxPropsToArray(sx),
      ]}
    />
  );
};
