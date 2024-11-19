import { ChevronLeft } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardHeader } from '@mui/material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useTable } from '@realgimm5/frontend-common/contexts';
import { useNavigateBack } from '@realgimm5/frontend-common/hooks';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { RawFeature } from '../../../../enums/RawFeature';
import {
  GetUsageTypeDistributionQueryVariables,
  useGetUsageTypeDistributionQuery,
} from '../../../../gql/RealGimm.Web.UsageType.operation';
import { useFeature } from '../../../../hooks/useFeature';
import { getUsageTypeDistributionColumns } from '../../../../utils/usageTypeDistribution/getUsageTypeDistributionColumns';

export default function UsageTypesDistributions() {
  useFeature(RawFeature.ASST_ESTATE_BASE);
  const { t } = useTranslation();
  const goBack = useNavigateBack('/app/home');
  const { variables, pause, initialState, handleFilter, handlePageChange, handleSort, setInitialState } =
    useTable<GetUsageTypeDistributionQueryVariables>((variables) => ({
      ...variables,
      showAll: true,
    }));
  const [queryState] = useGetUsageTypeDistributionQuery({ pause, variables });
  const usageTypesDistributions = useMemo(
    () => queryState.data?.estateUsageType.usageTypeDistribution,
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
      <CardHeader title={t('usage_type_distribution.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <PrimaryTable
          columns={getUsageTypeDistributionColumns()}
          empty="usage_type_distribution.text.no_usage_types"
          rows={usageTypesDistributions?.nodes ?? []}
          totalCount={usageTypesDistributions?.totalCount ?? 0}
          useColumnVisibility={false}
          useRowSelection={false}
          initialState={initialState}
          rowsPerPageOptions={[10]}
          useSelectedRows={false}
          getRowId={({ usageTypeName }) => usageTypeName}
          onFilter={handleFilter()}
          onSort={handleSort()}
          onPageChange={handlePageChange(usageTypesDistributions?.pageInfo)}
          onStateChange={setInitialState}
        />
      </CardContent>
    </Card>
  );
}
