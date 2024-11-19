import { Card, CardContent, CardHeader } from '@mui/material';
import { Tabs } from '@realgimm5/frontend-common/components';
import { useTable } from '@realgimm5/frontend-common/contexts';
import { EntryStatus } from '@realgimm5/frontend-common/gql/types';
import { useTabsLocation } from '@realgimm5/frontend-common/hooks';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { ContractsTable } from '../../../../components/tables/Contracts/Contracts';

export default function Contracts() {
  const { t } = useTranslation();
  const { type } = useParams();
  const { reset } = useTable();
  const { initialTab, onChange } = useTabsLocation();
  const isActive = useMemo(() => type === 'active', [type]);

  const handleTabChange = useCallback(
    (activeTab: number) => {
      reset();
      onChange(activeTab);
    },
    [onChange, reset],
  );

  return (
    <Card>
      <CardHeader
        title={t(`contract.title.${isActive ? 'active' : 'passive'}`)}
        titleTypographyProps={{ variant: 'h1' }}
      />
      <CardContent>
        <Tabs
          initialTab={initialTab}
          tabs={[
            {
              label: 'core.text.outstanding',
              children: <ContractsTable isActive={isActive} status={EntryStatus.Working} />,
            },
            {
              label: 'common.text.all',
              children: <ContractsTable isActive={isActive} />,
            },
          ]}
          onChange={handleTabChange}
        />
      </CardContent>
    </Card>
  );
}
