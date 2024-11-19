import { AddCircleOutline, EditTwoTone } from '@mui/icons-material';
import { Grid2, Typography } from '@mui/material';
import { Accordion, SecondaryTable } from '@realgimm5/frontend-common/components';
import { parseDateToString, parseStringToTime } from '@realgimm5/frontend-common/utils';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { getTimeZoneLabel } from '../../../../utils/dateUtils';
import { CalendarAccordionProps } from './Calendar.types';

export const CalendarAccordion = ({ calendar, readonly, onDuplicate, onEdit }: CalendarAccordionProps) => {
  const { t } = useTranslation();

  const handleDuplicate = useCallback(() => {
    onDuplicate(calendar);
  }, [calendar, onDuplicate]);

  const handleEdit = useCallback(() => {
    onEdit(calendar);
  }, [calendar, onEdit]);

  return (
    <Accordion
      title={calendar.name}
      actions={
        !readonly
          ? [
              {
                icon: AddCircleOutline,
                label: 'core.button.duplicate',
                onClick: handleDuplicate,
              },
              {
                icon: EditTwoTone,
                label: 'common.button.edit',
                onClick: handleEdit,
              },
            ]
          : undefined
      }
    >
      <Grid2 container spacing={{ xs: 2, sm: 3 }}>
        <Grid2 size={12}>
          <Typography
            variant="bodyMd"
            sx={(theme) => ({
              color: theme.palette.grey[700],
              fontWeight: 700,
              px: '15px',
            })}
          >
            {t('calendar.field.timezone')}
          </Typography>
          <Typography
            variant="bodyMd"
            sx={(theme) => ({
              color: theme.palette.grey[700],
            })}
          >
            {getTimeZoneLabel(calendar.timeZoneId)}
          </Typography>
        </Grid2>
        <Grid2 size={12}>
          <SecondaryTable
            columns={['calendar.field.day', 'calendar.field.time']}
            rows={[
              calendar.monday,
              calendar.tuesday,
              calendar.wednesday,
              calendar.thursday,
              calendar.friday,
              calendar.saturday,
              calendar.sunday,
            ]
              .filter((it) => !!it)
              .map((it) => [
                t(`common.enum.day_of_week.${it.dayOfWeek}`),
                it.timeRanges
                  .map((timeRange) =>
                    [timeRange.since, timeRange.until]
                      .map((date) => parseDateToString(parseStringToTime(date), 'time'))
                      .join(' - '),
                  )
                  .join(', '),
              ])}
          />
        </Grid2>
        <Grid2 size={12}>
          <SecondaryTable
            columns={[
              'calendar.field.holiday_name',
              'calendar.field.holiday_date',
              'calendar.field.holiday_periodicity',
            ]}
            rows={calendar.holidays.map((holiday) => [
              holiday.name,
              holiday.date,
              t(`common.enum.holiday_periodicity.${holiday.periodicity}`),
            ])}
          />
        </Grid2>
      </Grid2>
    </Accordion>
  );
};
