import { ChevronLeft } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardHeader } from '@mui/material';
import { Loader, Tab, Tabs } from '@realgimm5/frontend-common/components';
import { useTable } from '@realgimm5/frontend-common/contexts';
import { useNavigateBack, useTabsLocation } from '@realgimm5/frontend-common/hooks';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { AssetTaxesTable } from '../../../../components/tables/AssetTaxes/AssetTaxes';
import { useGetAvailableHistoricalTaxCalculatorsQuery } from '../../../../gql/RealGimm.Web.TaxConfiguration.operation';
import { getAssetTaxTabLabel } from '../../../../utils/assetTax/assetTaxUtils';

export default function AssetTaxesHistory() {
  const { t } = useTranslation();
  const { reset } = useTable();
  const goBack = useNavigateBack('/app/tax-management/asset-taxes');
  const { initialTab, onChange } = useTabsLocation();
  const [queryState] = useGetAvailableHistoricalTaxCalculatorsQuery();
  const tabs = useMemo(
    () =>
      queryState.data?.taxConfiguration.historyAvailableCalculators.map<Tab>((calculator) => ({
        label: getAssetTaxTabLabel(calculator.description),
        children: <AssetTaxesTable currentYear={false} taxCalculatorId={calculator.id} />,
      })) ?? [],
    [queryState.data?.taxConfiguration.historyAvailableCalculators],
  );

  const handleTabChange = useCallback(
    (activeTab: number) => {
      reset();
      onChange(activeTab);
    },
    [onChange, reset],
  );

  return (
    <Card>
      {queryState.fetching && <Loader />}
      <Box sx={{ px: 1, pt: 2 }}>
        <Button color="secondary" variant="text" startIcon={<ChevronLeft />} onClick={goBack}>
          {t('common.button.back')}
        </Button>
      </Box>
      <CardHeader title={t('asset_tax.title.history')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <Tabs initialTab={initialTab} tabs={tabs} onChange={handleTabChange} />
      </CardContent>
    </Card>
  );
}
