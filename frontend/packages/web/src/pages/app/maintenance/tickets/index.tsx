import { Card, CardContent, CardHeader } from '@mui/material';
import { Tabs } from '@realgimm5/frontend-common/components';
import { useTable } from '@realgimm5/frontend-common/contexts';
import { TicketMainType } from '@realgimm5/frontend-common/gql/types';
import { useTabsLocation } from '@realgimm5/frontend-common/hooks';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { TicketsTable } from '../../../../components/tables/Tickets/Tickets';

export default function Tickets() {
  const { t } = useTranslation();
  const { type } = useParams();
  const { reset } = useTable();
  const { initialTab, onChange } = useTabsLocation();
  const status = useMemo(() => {
    switch (type) {
      case 'expired':
        return 'expired';
      case 'expiring':
        return 'expiring';
      default:
        return undefined;
    }
  }, [type]);

  const handleTabChange = useCallback(
    (activeTab: number) => {
      reset();
      onChange(activeTab);
    },
    [onChange, reset],
  );

  return (
    <Card>
      <CardHeader title={t(`ticket.title.${status ?? 'activities'}`)} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <Tabs
          initialTab={initialTab}
          tabs={[
            {
              label: 'common.text.all',
              children: <TicketsTable status={status} />,
            },
            {
              label: 'ticket.tab.tickets',
              children: <TicketsTable mainType={TicketMainType.Issue} status={status} />,
            },
            {
              label: 'ticket.tab.maintenance_preventative',
              children: <TicketsTable mainType={TicketMainType.ChecklistPreventative} status={status} />,
            },
            {
              label: 'ticket.tab.maintenance_on_condition',
              children: <TicketsTable mainType={TicketMainType.ChecklistOnTriggerCondition} status={status} />,
            },
          ]}
          onChange={handleTabChange}
        />
      </CardContent>
    </Card>
  );
}
