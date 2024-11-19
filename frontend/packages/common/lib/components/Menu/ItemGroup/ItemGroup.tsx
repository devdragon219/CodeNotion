import { FiberManualRecord, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import {
  Box,
  ClickAwayListener,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Theme,
  Typography,
  styled,
  useMediaQuery,
} from '@mui/material';
import classNames from 'classnames';
import { MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { MenuItemGroup } from '../../../interfaces/Menu';
import { isCurrentRoute } from '../../../utils/navigationUtils';
import { Transition } from '../../Transition/Transition';
import { MenuListItem } from '../Item/Item';
import { MenuListItemGroupProps } from './ItemGroup.types';

const Arrow = styled('span')({
  position: 'absolute',
  width: '10px',
  height: '10px',
  top: '19px',
  left: '-6px',
  transform: 'rotate(45deg)',
});

export const MenuListItemGroup = ({ item, level, drawerOpen, onClose }: MenuListItemGroupProps) => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const matchDownMd = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const openMini = useMemo(() => Boolean(anchorEl), [anchorEl]);

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLDivElement> | undefined) => {
      setAnchorEl(null);
      if (drawerOpen) {
        setOpen((open) => !open);
      } else if (event?.currentTarget) {
        setAnchorEl(event.currentTarget);
      }
    },
    [drawerOpen],
  );

  const handleClosePopper = useCallback(() => {
    setOpen(false);
    setAnchorEl(null);
  }, []);

  const handleCollapseButtonClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      handleClick(event);
    },
    [handleClick],
  );

  useEffect(() => {
    const loopItem = (item: MenuItemGroup) => {
      if (item.url && isCurrentRoute(pathname, item.url)) {
        setSelected(true);
      }

      item.children.forEach((child) => {
        if (child.type === 'group') {
          loopItem(child);
        } else if (isCurrentRoute(pathname, child.url, child.match)) {
          setOpen(true);
          setSelected(true);
        }
      });
    };

    setAnchorEl(null);
    setOpen(false);
    setSelected(false);
    loopItem(item);

    // eslint-disable-next-line
  }, [pathname]);

  const menuIcon = useMemo(() => {
    if (level !== 1) {
      return (
        (matchDownMd || drawerOpen) && (
          <ListItemIcon sx={{ minWidth: 0 }}>
            <FiberManualRecord
              sx={{
                width: 5,
                height: 5,
                fontSize: '5px',
              }}
            />
          </ListItemIcon>
        )
      );
    }

    if (!item.icon) return <></>;
    const Icon = item.icon;

    return <Icon sx={{ strokeWidth: 1.5, fontSize: '24px', marginTop: 'auto', marginBottom: 'auto' }} />;
  }, [drawerOpen, item.icon, level, matchDownMd]);

  const collapseIcon = useMemo(() => {
    const iconSX = {
      strokeWidth: 1.5,
      fontSize: '24px !important',
      marginTop: 'auto',
      marginBottom: 'auto',
    };

    if (drawerOpen) {
      return openMini || open ? <KeyboardArrowUp sx={iconSX} /> : <KeyboardArrowDown sx={iconSX} />;
    }
  }, [drawerOpen, openMini, open]);

  const menuChildren = useMemo(
    () =>
      item.children.map((item, index) => {
        switch (item.type) {
          case 'group':
            return (
              <MenuListItemGroup key={index} item={item} level={level + 1} drawerOpen={drawerOpen} onClose={onClose} />
            );
          case 'link':
            return <MenuListItem key={index} item={item} level={level + 1} drawerOpen={drawerOpen} onClose={onClose} />;
        }
      }),
    [item, level, drawerOpen, onClose],
  );

  return (
    <>
      <ListItemButton
        className={classNames({
          'MuiListItemButton-menuItem': level !== 1,
          'MuiListItemButton-menuGroup': level === 1,
          open: drawerOpen,
        })}
        sx={(theme) => ({
          zIndex: 1201,
          mb: open || level !== 1 ? 0.5 : 1,
          ml: level !== 1 && drawerOpen ? `${level * 24}px` : 0,
          gap: '12px',
          ...(drawerOpen && {
            minHeight: 48,
          }),
          [theme.breakpoints.up('md')]: {
            ...(!drawerOpen &&
              level === 1 && {
                width: 48,
                height: 48,
                px: 1,
                justifyContent: 'center',
              }),
          },
        })}
        selected={selected}
        {...(!drawerOpen && { onMouseEnter: handleClick, onMouseLeave: handleClosePopper })}
        {...(item.url
          ? {
              component: Link,
              to: item.url,
              onClick: onClose,
            }
          : {
              onClick: handleClick,
            })}
      >
        {menuIcon}
        {(matchDownMd || drawerOpen || level !== 1) && (
          <ListItemText
            sx={{ m: 0 }}
            primary={
              <Typography variant={level === 1 ? 'h5' : 'bodyMd'} color="inherit" sx={{ whiteSpace: 'pre-wrap' }}>
                {t(item.title)}
              </Typography>
            }
            secondary={
              item.caption && (
                <Typography variant="caption" sx={{ display: 'block' }} gutterBottom>
                  {t(item.caption)}
                </Typography>
              )
            }
          />
        )}
        {collapseIcon ? (
          item.url ? (
            <IconButton sx={{ p: 0, mr: '-4px' }} onClick={handleCollapseButtonClick}>
              {collapseIcon}
            </IconButton>
          ) : (
            collapseIcon
          )
        ) : (
          <></>
        )}

        {!matchDownMd && !drawerOpen && (
          <Popper
            open={openMini}
            anchorEl={anchorEl}
            placement="right-start"
            transition
            style={{
              zIndex: 2001,
            }}
            modifiers={[
              {
                name: 'offset',
                options: {
                  offset: [0, 2],
                },
              },
            ]}
          >
            {({ TransitionProps }) => (
              <Transition type="grow" in={openMini} {...TransitionProps} unmountOnExit>
                <Paper variant="menu" sx={{ position: 'relative' }}>
                  <ClickAwayListener onClickAway={handleClosePopper}>
                    <Box sx={{ p: 1.25 }}>
                      <Arrow className="MuiPaper-arrow" />
                      {menuChildren}
                    </Box>
                  </ClickAwayListener>
                </Paper>
              </Transition>
            )}
          </Popper>
        )}
      </ListItemButton>
      {(matchDownMd || drawerOpen) && (
        <Transition type="collapse" in={open} timeout="auto" unmountOnExit>
          <List
            component="div"
            disablePadding
            sx={{
              position: 'relative',
              mb: 1,
              '&:after': {
                content: "''",
                position: 'absolute',
                left: '32px',
                top: 0,
                height: '100%',
                width: '1px',
              },
            }}
          >
            {menuChildren}
          </List>
        </Transition>
      )}
    </>
  );
};
