import { Card, CardContent, CardHeader } from '@mui/material';
import { Tabs } from '@realgimm5/frontend-common/components';
import { useTable } from '@realgimm5/frontend-common/contexts';
import { useTabsLocation } from '@realgimm5/frontend-common/hooks';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { PriceListArticlesTable } from '../../../../components/tables/PriceListArticles/PriceListArticles';

export default function PriceListArticles() {
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
      <CardHeader title={t('price_list_article.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <Tabs
          initialTab={initialTab}
          tabs={[
            {
              label: 'core.text.outstanding',
              children: <PriceListArticlesTable outstanding />,
            },
            {
              label: 'common.text.all',
              children: <PriceListArticlesTable />,
            },
          ]}
          onChange={handleTabChange}
        />
      </CardContent>
    </Card>
  );
}
