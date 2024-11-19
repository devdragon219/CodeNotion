/* eslint-disable no-restricted-imports */
import { ChevronRight, ExpandLess, MoreHorizOutlined } from '@mui/icons-material';
import {
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Accordion as MuiAccordion,
  Typography,
} from '@mui/material';
import { MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AccordionProps } from './Accordion.types';

export const Accordion = ({ actions, children, expanded, icon, subtitle, title }: AccordionProps) => {
  const { t } = useTranslation();
  const [isExpanded, setExpanded] = useState(expanded ?? false);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const handleOpen = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  }, []);
  const handleClose = useCallback((event: MouseEvent) => {
    event.stopPropagation();
    setAnchorEl(null);
  }, []);

  const handleActionClick = useCallback(
    (onClick: () => void) => (event: MouseEvent) => {
      handleClose(event);
      onClick();
    },
    [handleClose],
  );

  useEffect(() => {
    if (expanded !== undefined) {
      setExpanded(expanded);
    }
  }, [expanded]);

  const onChange = useCallback(() => {
    setExpanded((isExpanded) => !isExpanded);
  }, []);

  const SubtitleBox = useMemo(
    () => (
      <Box
        sx={(theme) => ({
          borderBottom: `1px solid ${theme.palette.blue['100']}`,
          height: '12px',
          marginTop: '4px',
          position: 'relative',
          width: '100%',
        })}
      >
        <Typography
          variant="caption"
          sx={(theme) => ({
            backgroundColor: theme.palette.common.white,
            color: theme.palette.blue['500'],
            left: 0,
            lineHeight: 'normal',
            paddingRight: 2,
            position: 'absolute',
            top: 0,
          })}
        >
          {subtitle}
        </Typography>
      </Box>
    ),
    [subtitle],
  );

  return (
    <MuiAccordion expanded={isExpanded} disableGutters square variant="elevation" onChange={onChange}>
      <AccordionSummary sx={{ minHeight: '24px', px: 0, '.MuiAccordionSummary-content': { m: 0 } }}>
        <Box sx={{ display: 'flex', flexGrow: 1, gap: '10px' }}>
          {icon}
          {typeof title === 'string' ? (
            <Typography
              variant="bodyMd"
              sx={(theme) => ({
                color: theme.palette.grey['700'],
                height: '24px',
                flexGrow: 1,
              })}
            >
              {title}
            </Typography>
          ) : (
            title
          )}
          {actions && (
            <IconButton size="small" onClick={handleOpen}>
              <MoreHorizOutlined sx={(theme) => ({ color: theme.palette.grey[700] })} />
            </IconButton>
          )}
          {isExpanded ? <ExpandLess /> : <ChevronRight />}
        </Box>
        {!isExpanded && SubtitleBox}
      </AccordionSummary>
      <AccordionDetails>
        {children}
        {isExpanded && SubtitleBox}
      </AccordionDetails>
      {anchorEl && (
        <Menu anchorEl={anchorEl} open onClose={handleClose} variant="selectedMenu">
          {(actions ?? []).map(({ icon: Icon, label, onClick }, index) => (
            <MenuItem key={index} disableGutters onClick={handleActionClick(onClick)}>
              {Icon && (
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
              )}
              <Typography variant="bodySm">{t(label)}</Typography>
            </MenuItem>
          ))}
        </Menu>
      )}
    </MuiAccordion>
  );
};
