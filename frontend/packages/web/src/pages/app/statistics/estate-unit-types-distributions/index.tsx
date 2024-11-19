import { ChevronLeft } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardHeader } from '@mui/material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useTable } from '@realgimm5/frontend-common/contexts';
import { useNavigateBack } from '@realgimm5/frontend-common/hooks';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { RawFeature } from '../../../../enums/RawFeature';
import {
  GetEstateUnitTypeDistributionQueryVariables,
  useGetEstateUnitTypeDistributionQuery,
} from '../../../../gql/RealGimm.Web.EstateUnit.operation';
import { useFeature } from '../../../../hooks/useFeature';
import { getEstateUnitTypeDistributionColumns } from '../../../../utils/estateUnitTypeDistribution/getEstateUnitTypeDistributionColumns';

export default function EstateUnitTypesDistributions() {
  useFeature(RawFeature.ASST_ESTATEUNIT_BASE);
  const { t } = useTranslation();
  const goBack = useNavigateBack('/app/home');
  const { variables, pause, initialState, handleFilter, handlePageChange, handleSort, setInitialState } =
    useTable<GetEstateUnitTypeDistributionQueryVariables>((variables) => ({
      ...variables,
      showAll: true,
    }));
  const [queryState] = useGetEstateUnitTypeDistributionQuery({ pause, variables });
  const usageTypesDistributions = useMemo(
    () => queryState.data?.estateUnit.estateUnitTypeDistribution,
    [queryState.data],
  );

  return (
    <Card>
      {queryState.fetching && <Loader />}
      <Box sx={{ px: 1, pt: 2 }}>
        <Button color="secondary" variant="text" startIcon={<ChevronLeft />} onClick={goBack}>
          {t('common.button.back')}
        </Button>
      </Box>
      <CardHeader title={t('estate_unit_type_distribution.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <PrimaryTable
          columns={getEstateUnitTypeDistributionColumns(t)}
          empty="estate_unit_type_distribution.text.no_estate_unit_types"
          rows={usageTypesDistributions?.nodes ?? []}
          totalCount={usageTypesDistributions?.totalCount ?? 0}
          useColumnVisibility={false}
          useRowSelection={false}
          initialState={initialState}
          rowsPerPageOptions={[10]}
          useSelectedRows={false}
          getRowId={({ estateUnitType }) => estateUnitType}
          onFilter={handleFilter()}
          onSort={handleSort()}
          onPageChange={handlePageChange(usageTypesDistributions?.pageInfo)}
          onStateChange={setInitialState}
        />
      </CardContent>
    </Card>
  );
}
