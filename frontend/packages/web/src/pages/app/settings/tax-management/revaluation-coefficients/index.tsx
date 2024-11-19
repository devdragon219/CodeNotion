import { Button, Card, CardContent, CardHeader } from '@mui/material';
import { Loader } from '@realgimm5/frontend-common/components';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { TaxConfigTable } from '../../../../../components/tables/TaxConfig/TaxConfig';
import { TAX_CALCULATOR_REVALUATION_COEFFICIENTS_TABLE_CODE } from '../../../../../configs/taxCalculator';
import { useGetAvailableTaxCalculatorsQuery } from '../../../../../gql/RealGimm.Web.TaxConfiguration.operation';

export default function RevaluationCoefficients() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [queryState] = useGetAvailableTaxCalculatorsQuery();
  const calculator = useMemo(
    () =>
      queryState.data?.taxConfiguration.availableCalculators.find((calculator) =>
        calculator.configuration.availableSubTables.some(
          ({ key }) => key === TAX_CALCULATOR_REVALUATION_COEFFICIENTS_TABLE_CODE,
        ),
      ),
    [queryState.data?.taxConfiguration.availableCalculators],
  );

  const handleShowHistory = useCallback(() => {
    navigate('/app/settings/tax-management/revaluation-coefficients/history');
  }, [navigate]);

  return (
    <Card>
      {queryState.fetching && <Loader />}
      <CardHeader
        title={t('revaluation_coefficient.title.current')}
        titleTypographyProps={{ variant: 'h1' }}
        subheader={t('revaluation_coefficient.subtitle')}
        subheaderTypographyProps={{ sx: (theme) => ({ color: theme.palette.grey[700] }), variant: 'h5' }}
        action={
          <Button variant="text" onClick={handleShowHistory}>
            {t('revaluation_coefficient.action.show_history')}
          </Button>
        }
      />
      <CardContent>
        {calculator && (
          <TaxConfigTable
            calculator={calculator}
            subTable={{
              code: 'coefficients',
              year: new Date().getFullYear(),
            }}
            tableCode={TAX_CALCULATOR_REVALUATION_COEFFICIENTS_TABLE_CODE}
          />
        )}
      </CardContent>
    </Card>
  );
}
