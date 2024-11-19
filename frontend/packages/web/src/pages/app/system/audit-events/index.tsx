import { Card, CardContent, CardHeader } from '@mui/material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useTable } from '@realgimm5/frontend-common/contexts';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AuditEventDialog } from '../../../../components/dialogs/AuditEvent/AuditEvent';
import { RawFeature } from '../../../../enums/RawFeature';
import {
  GetAuditEventsQueryVariables,
  useGetAuditEventsQuery,
} from '../../../../gql/RealGimm.Web.AuditEvent.operation';
import { AuditLogFragment } from '../../../../gql/RealGimm.Web.AuditLog.fragment';
import { useFeature } from '../../../../hooks/useFeature';
import { getAuditEventsColumns } from '../../../../utils/auditEvents/getAuditEventsColumns';

export default function AuditEvents() {
  const { t } = useTranslation();
  const { canRead } = useFeature(RawFeature.ADMIN_AUDIT_LOG);
  const { initialState, pause, variables, handleFilter, handlePageChange, handleSort, setInitialState } =
    useTable<GetAuditEventsQueryVariables>();
  const [queryState] = useGetAuditEventsQuery({ pause, variables });
  const events = useMemo(() => queryState.data?.admin.listAuditEvents, [queryState.data]);
  const [detailDialogProps, setDetailDialogProps] = useState<{
    open: boolean;
    eventDetail?: string;
  }>({ open: false });

  const handleOpenDetailDialog = useCallback((row: AuditLogFragment) => {
    setDetailDialogProps({ open: true, eventDetail: row.auditData ?? '' });
  }, []);

  const handleCloseDetailDialog = useCallback(() => {
    setDetailDialogProps({ open: false });
  }, []);

  return (
    <Card>
      {queryState.fetching && <Loader />}
      <CardHeader title={t('audit_event.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <PrimaryTable
          columns={getAuditEventsColumns()}
          empty="audit_event.text.no_audit_events"
          initialState={initialState}
          rows={events?.nodes ?? []}
          totalCount={events?.totalCount ?? 0}
          getRowId={({ id }) => String(id)}
          onFilter={handleFilter()}
          onPageChange={handlePageChange(events?.pageInfo)}
          onSort={handleSort()}
          onStateChange={setInitialState}
          onView={canRead ? handleOpenDetailDialog : undefined}
          useColumnVisibility={false}
        />
      </CardContent>
      {detailDialogProps.open && (
        <AuditEventDialog event={detailDialogProps.eventDetail ?? ''} onClose={handleCloseDetailDialog} />
      )}
    </Card>
  );
}
