import { ChevronLeft } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardHeader } from '@mui/material';
import { Loader } from '@realgimm5/frontend-common/components';
import { useNavigateBack } from '@realgimm5/frontend-common/hooks';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { TaxConfigTable } from '../../../../../components/tables/TaxConfig/TaxConfig';
import { TAX_CALCULATOR_REVALUATION_COEFFICIENTS_TABLE_CODE } from '../../../../../configs/taxCalculator';
import { useGetAvailableTaxCalculatorsQuery } from '../../../../../gql/RealGimm.Web.TaxConfiguration.operation';

export default function RevaluationCoefficientsHistory() {
  const { t } = useTranslation();
  const goBack = useNavigateBack('/app/settings/tax-management/revaluation-coefficients');
  const [queryState] = useGetAvailableTaxCalculatorsQuery();
  const calculator = useMemo(
    () =>
      queryState.data?.taxConfiguration.availableCalculators.find((calculator) =>
        calculator.configuration.availableMainTables.some(
          ({ code }) => code === TAX_CALCULATOR_REVALUATION_COEFFICIENTS_TABLE_CODE,
        ),
      ),
    [queryState.data?.taxConfiguration.availableCalculators],
  );

  return (
    <Card>
      {queryState.fetching && <Loader />}
      <Box sx={{ px: 1, pt: 2 }}>
        <Button color="secondary" variant="text" startIcon={<ChevronLeft />} onClick={goBack}>
          {t('common.button.back')}
        </Button>
      </Box>
      <CardHeader
        title={t('revaluation_coefficient.title.history')}
        titleTypographyProps={{ variant: 'h1' }}
        subheader={t('revaluation_coefficient.subtitle')}
        subheaderTypographyProps={{ sx: (theme) => ({ color: theme.palette.grey[700] }), variant: 'h5' }}
      />
      <CardContent>
        {calculator && (
          <TaxConfigTable calculator={calculator} tableCode={TAX_CALCULATOR_REVALUATION_COEFFICIENTS_TABLE_CODE} />
        )}
      </CardContent>
    </Card>
  );
}
