import { Card, CardContent, CardHeader } from '@mui/material';
import { Tabs } from '@realgimm5/frontend-common/components';
import { useTable } from '@realgimm5/frontend-common/contexts';
import { useTabsLocation } from '@realgimm5/frontend-common/hooks';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { BillsTable } from '../../../../components/tables/Bills/Bills';

export default function Bills() {
  const { t } = useTranslation();
  const { reset } = useTable();
  const { type } = useParams();
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
        title={t(`bill.title.${isActive ? 'active' : 'passive'}_bills`)}
        titleTypographyProps={{ variant: 'h1' }}
      />
      <CardContent>
        <Tabs
          initialTab={initialTab}
          tabs={[
            {
              label: 'bill.tab.temporary',
              children: <BillsTable isActive={isActive} isTemporary />,
            },
            {
              label: 'bill.tab.definitive',
              children: <BillsTable isActive={isActive} isTemporary={false} />,
            },
            {
              label: 'bill.tab.all',
              children: <BillsTable isActive={isActive} />,
            },
          ]}
          onChange={handleTabChange}
        />
      </CardContent>
    </Card>
  );
}
