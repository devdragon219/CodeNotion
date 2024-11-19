import { Button, Stack } from '@mui/material';
import { memo } from 'react';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';

import { ToolbarRowExpandCollapseProps } from './RowExpandCollapse.types';

const ToolbarRowExpandCollapse = ({ onCollapse, onExpand }: ToolbarRowExpandCollapseProps) => {
  const { t } = useTranslation();

  return (
    <Stack direction="row" spacing={1}>
      <Button size="large" variant="outlined" color="tertiary" onClick={onExpand}>
        {t('common.component.table.expand')}
      </Button>
      <Button size="large" variant="outlined" color="tertiary" onClick={onCollapse}>
        {t('common.component.table.collapse')}
      </Button>
    </Stack>
  );
};

const memoized = memo(ToolbarRowExpandCollapse, isEqual) as typeof ToolbarRowExpandCollapse;
export { memoized as ToolbarRowExpandCollapse };
