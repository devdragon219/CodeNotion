import { Card, CardContent, CardHeader } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { CataloguesTable } from '../../../../components/tables/Catalogues/Catalogues';

export default function Catalogues() {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader title={t('catalogue.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <CataloguesTable />
      </CardContent>
    </Card>
  );
}
