import { Card, CardContent, CardHeader } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { useTabsLocation } from '../../hooks/useTabsLocation';
import { Tabs } from '../Tabs/Tabs';
import { ProfileChangePassword } from './ChangePassword/ChangePassword';
import { ProfileGeneralData } from './GeneralData/GeneralData';
import { ProfileSessions } from './Sessions/Sessions';

export const Profile = () => {
  const { t } = useTranslation();
  const tabsLocation = useTabsLocation();

  return (
    <Card>
      <CardHeader title={t('common.component.profile.title')} titleTypographyProps={{ variant: 'h2' }} />
      <CardContent>
        <Tabs
          {...tabsLocation}
          tabs={[
            {
              label: 'common.component.profile.tab.general_data',
              children: <ProfileGeneralData />,
            },
            {
              label: 'common.component.profile.tab.change_password',
              children: <ProfileChangePassword />,
            },
            {
              label: 'common.component.profile.tab.sessions',
              children: <ProfileSessions />,
            },
          ]}
        />
      </CardContent>
    </Card>
  );
};
