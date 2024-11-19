import { Card, CardContent, CardHeader } from '@mui/material';
import { Tabs } from '@realgimm5/frontend-common/components';
import { OrgUnitType } from '@realgimm5/frontend-common/gql/types';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { OrgUnits } from '../../../../components/domains/OrgUnits/OrgUnits';

export default function OrganizationalUnits() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { type } = useParams();

  const handleTabChange = useCallback(
    (activeTab: number) => {
      navigate(`/app/registry/organizational-units/${activeTab === 0 ? 'management' : 'geographical'}`, {
        replace: true,
      });
    },
    [navigate],
  );

  return (
    <Card>
      <CardHeader title={t('org_unit.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <Tabs
          initialTab={type === 'management' ? 0 : 1}
          tabs={[
            {
              label: 'org_unit.tab.management',
              children: <OrgUnits orgUnitType={OrgUnitType.ManagementHierarchy} />,
            },
            {
              label: 'org_unit.tab.geographical',
              children: <OrgUnits orgUnitType={OrgUnitType.GeographicalHierarchy} />,
            },
          ]}
          onChange={handleTabChange}
        />
      </CardContent>
    </Card>
  );
}
