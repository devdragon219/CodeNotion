import { Card, CardContent, CardHeader } from '@mui/material';
import { Loader, Tab, Tabs } from '@realgimm5/frontend-common/components';
import { useTable } from '@realgimm5/frontend-common/contexts';
import { useTabsLocation } from '@realgimm5/frontend-common/hooks';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { TaxConfigTable } from '../../../../../components/tables/TaxConfig/TaxConfig';
import { TAX_CALCULATOR_REVALUATION_COEFFICIENTS_TABLE_CODE } from '../../../../../configs/taxCalculator';
import { useGetAvailableTaxCalculatorsQuery } from '../../../../../gql/RealGimm.Web.TaxConfiguration.operation';
import { getTaxConfigTableName } from '../../../../../utils/components/taxConfig/taxConfigUtils';

export default function TaxRates() {
  const { t } = useTranslation();
  const { reset } = useTable();
  const { initialTab, onChange } = useTabsLocation();
  const [queryState] = useGetAvailableTaxCalculatorsQuery();
  const tabs = useMemo(
    () =>
      queryState.data?.taxConfiguration.availableCalculators.flatMap((calculator) =>
        calculator.configuration.availableMainTables
          .filter(({ code }) => code !== TAX_CALCULATOR_REVALUATION_COEFFICIENTS_TABLE_CODE)
          .map<Tab>((table) => ({
            label: getTaxConfigTableName(calculator.description, table.code),
            children: <TaxConfigTable calculator={calculator} tableCode={table.code} />,
          })),
      ) ?? [],
    [queryState.data?.taxConfiguration.availableCalculators],
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
      <CardHeader title={t('tax_rate.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <Tabs initialTab={initialTab} tabs={tabs} onChange={handleTabChange} />
      </CardContent>
    </Card>
  );
}
