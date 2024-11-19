import { Card, CardContent, CardHeader } from '@mui/material';
import { Tabs } from '@realgimm5/frontend-common/components';
import { useTable } from '@realgimm5/frontend-common/contexts';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { RegistryCommunicationGroupsTable } from '../../../../components/tables/RegistryCommunicationGroups/RegistryCommunicationGroups';

export default function RegistryCommunicationGroups() {
  const { t } = useTranslation();
  const { reset } = useTable();
  const navigate = useNavigate();
  const { type } = useParams();

  const handleTabChange = useCallback(
    (activeTab: number) => {
      reset();
      navigate(`/app/asset-management/registry-communications/${activeTab === 0 ? 'temporary' : 'confirmed'}`, {
        replace: true,
      });
    },
    [navigate, reset],
  );

  return (
    <Card>
      <CardHeader title={t('registry_communication.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <Tabs
          initialTab={type === 'temporary' ? 0 : 1}
          tabs={[
            {
              label: 'registry_communication.tab.temporary',
              children: <RegistryCommunicationGroupsTable isConfirmed={false} />,
            },
            {
              label: 'registry_communication.tab.confirmed',
              children: <RegistryCommunicationGroupsTable isConfirmed />,
            },
          ]}
          onChange={handleTabChange}
        />
      </CardContent>
    </Card>
  );
}
