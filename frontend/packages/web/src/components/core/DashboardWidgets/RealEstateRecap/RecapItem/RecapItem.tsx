import { DomainTwoTone } from '@mui/icons-material';
import { Box, ListItem, ListItemIcon, Typography } from '@mui/material';
import { DEFAULT_BORDER_RADIUS } from '@realgimm5/frontend-common/configs';
import { useTranslation } from 'react-i18next';

import { RealEstateRecapWidgetItemProps } from './RecapItem.types';

export const RealEstateRecapWidgetItem = ({ label, value }: RealEstateRecapWidgetItemProps) => {
  const { t } = useTranslation();

  return (
    <ListItem
      sx={(theme) => ({
        backgroundColor: theme.palette.background.paper,
        flex: 1,
        p: 2,
        border: `1px solid ${theme.palette.blue[200]}`,
        borderRadius: `${DEFAULT_BORDER_RADIUS}px`,
        gap: 2,
        overflow: 'hidden',
        [theme.breakpoints.down('lg')]: {
          p: 1,
          gap: 1,
        },
      })}
    >
      <ListItemIcon
        sx={(theme) => ({
          p: 2,
          backgroundColor: theme.palette.blue[100],
          border: `1px solid ${theme.palette.blue[200]}`,
          borderRadius: 2,
          [theme.breakpoints.down('lg')]: {
            minWidth: 0,
            p: 0.5,
          },
        })}
      >
        <DomainTwoTone color="primary" />
      </ListItemIcon>
      <Box
        sx={(theme) => ({
          m: 0,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          color: theme.palette.grey[700],
        })}
      >
        <Typography variant="h4">{value.toLocaleString()}</Typography>
        <Typography
          variant="bodySm"
          sx={(theme) => ({
            [theme.breakpoints.down('lg')]: {
              lineHeight: 1.2,
            },
          })}
        >
          {t(label)}
        </Typography>
      </Box>
    </ListItem>
  );
};
