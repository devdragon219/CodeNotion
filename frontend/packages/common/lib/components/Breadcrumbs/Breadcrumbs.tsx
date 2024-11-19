import { ChevronRight } from '@mui/icons-material';
import { Breadcrumbs as MuiBreadcrumbs, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { MenuItem } from '../../interfaces/Menu';
import { isCurrentRoute } from '../../utils/navigationUtils';
import { BreadcrumbsProps } from './Breadcrumbs.types';

export const Breadcrumbs = ({ menu }: BreadcrumbsProps) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const path = useMemo(() => {
    const path: MenuItem[] = [];
    const loopItems = (items: MenuItem[], parents: MenuItem[]) => {
      items.forEach((item) => {
        if (item.type === 'group') {
          if (item.url && isCurrentRoute(pathname, item.url)) {
            path.push(...parents, item);
            loopItems(item.children, parents);
          } else {
            loopItems(item.children, [...parents, item]);
          }
        } else if (isCurrentRoute(pathname, item.url, item.match)) {
          path.push(...parents, item);
        }
      });
    };
    loopItems(
      menu.flatMap((item) => item.children),
      [],
    );

    return path;
  }, [menu, pathname]);

  return (
    <MuiBreadcrumbs
      sx={{ px: 2, '& .MuiBreadcrumbs-separator': { mx: 0.5 } }}
      maxItems={3}
      separator={<ChevronRight />}
    >
      <Typography component={Link} to="/">
        {t('common.component.header.home')}
      </Typography>
      {path.map((item, index) => (
        <Typography key={index}>{t(item.title)}</Typography>
      ))}
    </MuiBreadcrumbs>
  );
};
