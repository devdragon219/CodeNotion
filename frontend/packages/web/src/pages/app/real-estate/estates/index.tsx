import { Card, CardContent, CardHeader } from '@mui/material';
import { Tabs } from '@realgimm5/frontend-common/components';
import { useTable } from '@realgimm5/frontend-common/contexts';
import { EstateStatus } from '@realgimm5/frontend-common/gql/types';
import { useTabsLocation } from '@realgimm5/frontend-common/hooks';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { EstatesTable } from '../../../../components/tables/Estates/Estates';

export default function Estates() {
  const { t } = useTranslation();
  const { reset } = useTable();
  const { initialTab, onChange } = useTabsLocation();

  const handleTabChange = useCallback(
    (activeTab: number) => {
      reset();
      onChange(activeTab);
    },
    [onChange, reset],
  );

  return (
    <Card>
      <CardHeader title={t('estate.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <Tabs
          initialTab={initialTab}
          tabs={[
            {
              label: 'core.text.outstanding',
              children: <EstatesTable status={EstateStatus.Operational} />,
            },
            {
              label: 'common.text.all',
              children: <EstatesTable />,
            },
          ]}
          onChange={handleTabChange}
        />
      </CardContent>
    </Card>
  );
}
