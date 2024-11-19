import { Card, CardContent, CardHeader } from '@mui/material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useTable } from '@realgimm5/frontend-common/contexts';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { RawFeature } from '../../../../../enums/RawFeature';
import {
  ExportRevaluationDataDocument,
  GetRevaluationDataQueryVariables,
  useGetRevaluationDataQuery,
} from '../../../../../gql/RealGimm.Web.RevaluationData.operation';
import { useFeature } from '../../../../../hooks/useFeature';
import { getRevaluationDataColumns } from '../../../../../utils/revaluationData/getRevaluationDataColumns';
import { getRevaluationDataFilterInput } from '../../../../../utils/revaluationData/getRevaluationDataFilterInput';

export default function RevaluationData() {
  const { canRead } = useFeature(RawFeature.COMMON_REVALUATIONDATA);
  const { t } = useTranslation();
  const { initialState, pause, variables, handleExport, handleFilter, handlePageChange, handleSort, setInitialState } =
    useTable<GetRevaluationDataQueryVariables>();
  const [queryState] = useGetRevaluationDataQuery({ pause, variables });
  const revaluationData = useMemo(() => queryState.data?.revaluationData.listRevaluationData, [queryState.data]);

  return (
    <Card>
      {queryState.fetching && <Loader />}
      <CardHeader title={t('revaluation_data.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <PrimaryTable
          columns={getRevaluationDataColumns(t)}
          empty="revaluation_data.text.no_revaluations"
          rows={revaluationData?.nodes ?? []}
          initialState={initialState}
          totalCount={revaluationData?.totalCount ?? 0}
          getRowId={({ id }) => String(id)}
          onExport={canRead ? handleExport('id', ExportRevaluationDataDocument) : undefined}
          onFilter={handleFilter(getRevaluationDataFilterInput)}
          onPageChange={handlePageChange(revaluationData?.pageInfo)}
          onSort={handleSort()}
          onStateChange={setInitialState}
          useColumnVisibility={false}
        />
      </CardContent>
    </Card>
  );
}
