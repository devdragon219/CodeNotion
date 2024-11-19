import { Button, Card, CardContent, CardHeader } from '@mui/material';
import { Loader, Tab, Tabs } from '@realgimm5/frontend-common/components';
import { useTable } from '@realgimm5/frontend-common/contexts';
import { useTabsLocation } from '@realgimm5/frontend-common/hooks';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { AssetTaxesTable } from '../../../../components/tables/AssetTaxes/AssetTaxes';
import { useGetAvailableTaxCalculatorsQuery } from '../../../../gql/RealGimm.Web.TaxConfiguration.operation';
import { getAssetTaxTabLabel } from '../../../../utils/assetTax/assetTaxUtils';

export default function AssetTaxes() {
  const { t } = useTranslation();
  const { reset } = useTable();
  const navigate = useNavigate();
  const { initialTab, onChange } = useTabsLocation();
  const [queryState] = useGetAvailableTaxCalculatorsQuery();
  const tabs = useMemo(
    () =>
      queryState.data?.taxConfiguration.availableCalculators.map<Tab>((calculator) => ({
        label: getAssetTaxTabLabel(calculator.description),
        children: <AssetTaxesTable currentYear taxCalculatorId={calculator.id} />,
      })) ?? [],
    [queryState.data?.taxConfiguration.availableCalculators],
  );

  const handleGoToHistory = useCallback(() => {
    navigate('/app/tax-management/asset-taxes/history');
  }, [navigate]);

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
      <CardHeader
        title={t('asset_tax.title.current')}
        titleTypographyProps={{ variant: 'h1' }}
        action={
          <Button variant="text" onClick={handleGoToHistory}>
            {t('asset_tax.action.show_history')}
          </Button>
        }
      />
      <CardContent>
        <Tabs initialTab={initialTab} tabs={tabs} onChange={handleTabChange} />
      </CardContent>
    </Card>
  );
}
