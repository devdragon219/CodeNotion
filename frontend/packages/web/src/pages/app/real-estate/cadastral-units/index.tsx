import { Card, CardContent, CardHeader } from '@mui/material';
import { Tabs } from '@realgimm5/frontend-common/components';
import { useTable } from '@realgimm5/frontend-common/contexts';
import { CadastralUnitStatus } from '@realgimm5/frontend-common/gql/types';
import { useTabsLocation } from '@realgimm5/frontend-common/hooks';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { CadastralUnitsTable } from '../../../../components/tables/CadastralUnits/CadastralUnits';

export default function CadastralUnits() {
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
      <CardHeader title={t('cadastral_unit.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <Tabs
          initialTab={initialTab}
          tabs={[
            {
              label: 'core.text.outstanding',
              children: <CadastralUnitsTable status={CadastralUnitStatus.Existing} />,
            },
            {
              label: 'common.text.all',
              children: <CadastralUnitsTable />,
            },
          ]}
          onChange={handleTabChange}
        />
      </CardContent>
    </Card>
  );
}
