import { Box, Typography } from '@mui/material';
import { DashboardWidgetContainer, SecondaryTable, SelectField } from '@realgimm5/frontend-common/components';
import { DashboardWidgetProps } from '@realgimm5/frontend-common/interfaces';
import { parseStringToDate } from '@realgimm5/frontend-common/utils';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DashboardWidgetPeriod } from '../../../../enums/DashboardWidgetPeriod';
import { useGetChecklistTicketsMandatoryByLawQuery } from '../../../../gql/RealGimm.Web.Ticket.operation';
import { getDateRangeForDashboardWidgetPeriod } from '../../../../utils/components/dashboardBuilder/getDateRangeForDashboardWidgetPeriod';

const WidgetPeriods = [
  DashboardWidgetPeriod.Month,
  DashboardWidgetPeriod.Quarter,
  DashboardWidgetPeriod.Semester,
  DashboardWidgetPeriod.Year,
] as const;
type WidgetPeriod = (typeof WidgetPeriods)[number];

const mockData = [
  {
    catalogueTypeName: 'Estintore',
    internalCode: 'SM0020',
    dueDate: new Date(),
  },
];

export const TicketsMandatoryByLawListWidget = ({ useMockData }: DashboardWidgetProps) => {
  const { t } = useTranslation();
  const [period, setPeriod] = useState<WidgetPeriod>(DashboardWidgetPeriod.Month);
  const [queryState] = useGetChecklistTicketsMandatoryByLawQuery({
    pause: useMockData,
    variables: getDateRangeForDashboardWidgetPeriod(period),
  });

  const data = useMemo(() => {
    if (useMockData) return mockData;

    const tickets = queryState.data?.ticket.listTickets?.nodes;
    return (
      tickets?.map(({ catalogueType, internalCode, dueDate }) => ({
        catalogueTypeName: catalogueType.name,
        dueDate: parseStringToDate(dueDate),
        internalCode,
      })) ?? []
    );
  }, [queryState.data?.ticket.listTickets?.nodes, useMockData]);

  const handlePeriodChange = useCallback((value: WidgetPeriod | null) => {
    setPeriod(value ?? DashboardWidgetPeriod.Month);
  }, []);

  return (
    <DashboardWidgetContainer
      isLoading={queryState.fetching}
      useBoxShadow={false}
      sx={{
        justifyContent: 'flex-start',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 1,
          px: 2,
        }}
      >
        <Typography variant="h3" sx={(theme) => ({ color: theme.palette.grey[700] })}>
          {t('component.dashboard_widget.tickets_mandatory_by_law_list.title')}
        </Typography>
        <SelectField
          variant="standard"
          options={Object.values(WidgetPeriods)}
          getOptionLabel={(option) => t(`core.enum.dashboard_widget_last_period.${option}`)}
          onChange={handlePeriodChange}
          value={period}
          size="small"
          fullWidth={false}
          useSortedOptions={false}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', maxHeight: '500px', px: 2 }}>
        <SecondaryTable
          columns={[
            'component.dashboard_widget.tickets_mandatory_by_law_list.catalogue_type',
            'component.dashboard_widget.tickets_mandatory_by_law_list.ticket_code',
            'component.dashboard_widget.tickets_mandatory_by_law_list.date',
          ]}
          rows={data.map(({ catalogueTypeName, dueDate, internalCode }) => [catalogueTypeName, internalCode, dueDate])}
          sx={{ tableLayout: 'fixed' }}
        />
      </Box>
    </DashboardWidgetContainer>
  );
};
