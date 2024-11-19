import { FiberManualRecord } from '@mui/icons-material';
import { Box, ListItemButton, ListItemIcon, Typography } from '@mui/material';
import classNames from 'classnames';
import { useCallback, useMemo } from 'react';

import { isTreePathFragment } from '../../../utils/tree/isTreePathFragment';
import { TreeLeafProps } from './Leaf.types';

export const TreeLeaf = ({
  isClickable,
  item,
  level,
  path,
  selectedItems,
  treeLeafIcon,
  onItemClick,
}: TreeLeafProps) => {
  const leafIcon = useMemo(() => {
    const Icon = treeLeafIcon;

    return Icon ? <Icon sx={{ strokeWidth: 1.5, fontSize: '24px', marginTop: 'auto', marginBottom: 'auto' }} /> : null;
  }, [treeLeafIcon]);

  const handleClick = useCallback(() => {
    if (onItemClick) {
      onItemClick(item);
    }
  }, [item, onItemClick]);

  const isHighlighted = useMemo(() => isTreePathFragment(selectedItems, path), [selectedItems, path]);

  return (
    <ListItemButton
      className={classNames('MuiListItemButton-treeLeaf', { highlighted: isHighlighted })}
      sx={{
        mb: 0.5,
        ml: `${level * 36}px`,
      }}
      onClick={handleClick}
      disabled={!isClickable}
    >
      {level > 0 && (
        <ListItemIcon sx={{ minWidth: 0 }}>
          <FiberManualRecord
            sx={{
              width: 5,
              height: 5,
              fontSize: '5px',
            }}
          />
        </ListItemIcon>
      )}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {leafIcon}
        <Typography variant="bodyMd" noWrap sx={{ my: 'auto', ml: leafIcon ? 1 : 0 }}>
          {item.title}
        </Typography>
      </Box>
    </ListItemButton>
  );
};
