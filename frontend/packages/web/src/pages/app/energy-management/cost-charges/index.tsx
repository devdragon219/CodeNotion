import { Card, CardContent, CardHeader } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { CostChargesTable } from '../../../../components/tables/CostCharges/CostCharges';

export default function CostCharges() {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader title={t('cost_charge.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <CostChargesTable />
      </CardContent>
    </Card>
  );
}
