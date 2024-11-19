import { Grid2 } from '@mui/material';
import { CheckboxField, EmptyText, PrimaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { PerformedActivityStatus } from '@realgimm5/frontend-common/gql/types';
import { Controller, useWatch } from 'react-hook-form';

import { TicketPerformedActivitiesProps } from './PerformedActivities.types';

export const TicketPerformedActivities = ({ control, readonly }: TicketPerformedActivitiesProps) => {
  const performedActivities = useWatch({ control, name: 'performedActivities' });

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <SectionTitle value="ticket.section_title.performed_activities" />
      {performedActivities.length !== 0 ? (
        <Grid2 size={12}>
          <PrimaryTable
            color="secondary"
            columns={[
              {
                id: 'status',
                label: 'ticket.field.activity_status',
                getRowValue: (_, index) => (
                  <Controller
                    name={`performedActivities.${index}.status`}
                    control={control}
                    render={({ field }) => (
                      <CheckboxField
                        value={field.value === PerformedActivityStatus.PerformedSuccessfully}
                        onChange={(_, checked) => {
                          field.onChange(
                            checked
                              ? PerformedActivityStatus.PerformedSuccessfully
                              : PerformedActivityStatus.ToBePerformed,
                          );
                        }}
                        readonly={readonly}
                      />
                    )}
                  />
                ),
              },
              {
                id: 'ordering',
                label: 'ticket.field.activity_number',
                enableColumnFilter: true,
                enableGlobalFilter: true,
                enableSorting: true,
              },
              {
                id: 'name',
                label: 'ticket.field.activity_name',
                enableColumnFilter: true,
                enableGlobalFilter: true,
                enableSorting: true,
              },
            ]}
            rows={performedActivities}
            totalCount={performedActivities.length}
            useRowSelection={false}
            useColumnVisibility={false}
            getRowId={(row) => String(row.activityId)}
          />
        </Grid2>
      ) : readonly ? (
        <EmptyText value="ticket.text.no_performed_activities" />
      ) : (
        <></>
      )}
    </Grid2>
  );
};
