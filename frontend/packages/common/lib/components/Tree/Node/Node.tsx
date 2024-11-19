import { FiberManualRecord, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Box, Icon, IconButton, List, ListItemButton, ListItemIcon, Paper, Popper, Typography } from '@mui/material';
import classNames from 'classnames';
import { MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { isTreePathFragment } from '../../../utils/tree/isTreePathFragment';
import { Transition } from '../../Transition/Transition';
import { TreeLeaf } from '../Leaf/Leaf';
import { TreeNodeProps } from './Node.types';

export const TreeNode = ({
  item,
  level,
  path,
  selectedItems,
  tooltipTextCollapse,
  tooltipTextExpand,
  treeLeafIcon,
  treeNodeIcon,
  onItemClick,
}: TreeNodeProps) => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (path.every((item) => selectedItems.slice(0, path.length).includes(item))) {
      setIsOpen(true);
    }
    // eslint-disable-next-line
  }, [selectedItems]);

  const handleClick = useCallback(() => {
    if (!item.hasClickAction) {
      setIsOpen((isOpen) => !isOpen);
      return;
    }

    if (onItemClick) {
      onItemClick(item);
    }
  }, [item, onItemClick]);

  const handleCollapseButtonMouseEnter = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  }, []);

  const handleCollapseButtonMouseLeave = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
  }, []);

  const handleCollapseButtonClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsOpen((isOpen) => !isOpen);
  }, []);

  const stopEventPropagation = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  }, []);

  const nodeIcon = useMemo(() => {
    const Icon = treeNodeIcon;

    return Icon ? <Icon sx={{ strokeWidth: 1.5, fontSize: '24px', marginTop: 'auto', marginBottom: 'auto' }} /> : null;
  }, [treeNodeIcon]);

  const leafIcon = useMemo(() => {
    const Icon = treeLeafIcon;

    return Icon ? <Icon sx={{ strokeWidth: 1.5, fontSize: '24px', marginTop: 'auto', marginBottom: 'auto' }} /> : null;
  }, [treeLeafIcon]);

  const collapseIcon = useMemo(() => {
    const iconSX = {
      strokeWidth: 1.5,
      fontSize: '24px',
      marginTop: 'auto',
      marginBottom: 'auto',
    };

    return isOpen ? <KeyboardArrowUp sx={iconSX} /> : <KeyboardArrowDown sx={iconSX} />;
  }, [isOpen]);

  const isHighlighted = useMemo(() => isTreePathFragment(selectedItems, path), [selectedItems, path]);

  const isClickable = useMemo(() => {
    if (item.type === 'node') return !!item.hasClickAction || item.children.length > 0;

    return !!item.hasClickAction;
  }, [item]);

  if (item.type === 'leaf')
    return (
      <TreeLeaf
        item={item}
        level={level}
        path={[...path]}
        selectedItems={selectedItems}
        onItemClick={onItemClick}
        isClickable={isClickable}
        treeLeafIcon={treeLeafIcon}
      />
    );

  return (
    <>
      <ListItemButton
        className={classNames('MuiListItemButton-treeNode', {
          highlighted: isHighlighted,
        })}
        sx={{
          mb: isOpen || level !== 0 ? 0.5 : 1,
          ml: `${level * 36}px`,
          pr: 1,
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
          {item.hasClickAction ? leafIcon : nodeIcon}
          <Typography variant={level === 0 ? 'h5' : 'bodyMd'} sx={{ my: 'auto', ml: leafIcon || nodeIcon ? 1 : 0 }}>
            {item.title}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', ml: 'auto' }}>
          {item.hasClickAction ? (
            <>
              <IconButton
                onClick={handleCollapseButtonClick}
                onMouseEnter={handleCollapseButtonMouseEnter}
                onMouseOver={stopEventPropagation}
                onMouseLeave={handleCollapseButtonMouseLeave}
                onMouseDown={stopEventPropagation}
                onMouseUp={stopEventPropagation}
                onMouseOut={stopEventPropagation}
              >
                {collapseIcon}
              </IconButton>
              <Popper open={!!anchorEl} anchorEl={anchorEl} placement="top-start" transition>
                {({ TransitionProps }) => (
                  <Transition type="grow" in={!!anchorEl} {...TransitionProps} unmountOnExit>
                    <Paper
                      variant="outlined"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '8px !important',
                        padding: '5px 10px',
                      }}
                    >
                      <Typography variant="bodySm" sx={(theme) => ({ color: theme.palette.grey[700] })}>
                        {isOpen
                          ? t(tooltipTextCollapse ?? 'common.component.tree.tooltip.collapse')
                          : t(tooltipTextExpand ?? 'common.component.tree.tooltip.expand')}
                      </Typography>
                    </Paper>
                  </Transition>
                )}
              </Popper>
            </>
          ) : (
            <Icon sx={{ marginRight: '4px' }}>{collapseIcon}</Icon>
          )}
        </Box>
      </ListItemButton>
      {!!item.children.length && (
        <Transition type="collapse" in={isOpen}>
          <List component="div" disablePadding sx={level === 0 ? { mb: 1 } : {}}>
            {item.children.map((child, index) => (
              <TreeNode
                key={index}
                item={child}
                level={level + 1}
                path={[...path, `${index}`]}
                selectedItems={selectedItems}
                onItemClick={onItemClick}
                tooltipTextExpand={tooltipTextExpand}
                tooltipTextCollapse={tooltipTextCollapse}
                treeNodeIcon={treeNodeIcon}
                treeLeafIcon={treeLeafIcon}
              />
            ))}
          </List>
        </Transition>
      )}
    </>
  );
};
