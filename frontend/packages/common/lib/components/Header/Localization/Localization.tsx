import { GTranslate } from '@mui/icons-material';
import {
  ClickAwayListener,
  Grid2,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Popper,
  Typography,
} from '@mui/material';
import { ParseKeys } from 'i18next';
import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DEFAULT_BORDER_RADIUS } from '../../../configs/defaults';
import { Transition } from '../../Transition/Transition';

export const Localization = () => {
  const { i18n, t } = useTranslation();

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleListItemClick = useCallback(
    (lng: string) => {
      void i18n.changeLanguage(lng);
      setOpen(false);
    },
    [i18n],
  );

  const handleToggle = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  const handleClose = useCallback((event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && !anchorRef.current.contains(event.target as HTMLElement)) {
      setOpen(false);
    }
  }, []);

  return (
    <>
      <IconButton ref={anchorRef} color="tertiary" size="large" onClick={handleToggle}>
        <GTranslate />
      </IconButton>

      <Popper placement="bottom-end" open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Transition type="grow" position="top" in={open} {...TransitionProps} unmountOnExit>
              <Paper variant="elevation">
                <List
                  component="nav"
                  sx={(theme) => ({
                    width: '100%',
                    minWidth: 200,
                    maxWidth: 280,
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: `${DEFAULT_BORDER_RADIUS}px`,
                    p: 2,
                    [theme.breakpoints.down('md')]: {
                      maxWidth: 250,
                    },
                  })}
                >
                  {Object.keys(i18n.options.resources ?? {}).map((lng) => (
                    <ListItemButton
                      key={lng}
                      selected={lng === i18n.language}
                      onClick={() => {
                        handleListItemClick(lng);
                      }}
                    >
                      <ListItemText
                        primary={
                          <Grid2 container>
                            <Typography variant="bodyMd">{t(`common.language.${lng}` as ParseKeys)}</Typography>
                          </Grid2>
                        }
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Paper>
            </Transition>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
};
