import { Card, CardContent, CardHeader } from '@mui/material';
import { Tabs } from '@realgimm5/frontend-common/components';
import { useTable } from '@realgimm5/frontend-common/contexts';
import { EstateUnitStatus } from '@realgimm5/frontend-common/gql/types';
import { useTabsLocation } from '@realgimm5/frontend-common/hooks';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { EstateUnitActions } from '../../../../components/domains/EstateUnitActions/EstateUnitActions';
import { EstateUnitsTable } from '../../../../components/tables/EstateUnits/EstateUnits';

export default function EstateUnits() {
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
      <CardHeader title={t('estate_unit.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <Tabs
          initialTab={initialTab}
          tabs={[
            {
              label: 'core.text.outstanding',
              children: <EstateUnitsTable customActions={<EstateUnitActions />} status={EstateUnitStatus.Existing} />,
            },
            {
              label: 'common.text.all',
              children: <EstateUnitsTable customActions={<EstateUnitActions />} />,
            },
          ]}
          onChange={handleTabChange}
        />
      </CardContent>
    </Card>
  );
}
