import { DatesSetArg, EventClickArg, MoreLinkArg } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import Calendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Button, ClickAwayListener, IconButton, Popper, Stack, Typography } from '@mui/material';
import { add, format, sub } from 'date-fns';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { SORTED_CALENDAR_VIEWS } from '../../configs/calendar';
import { CalendarView } from '../../enums/CalendarView';
import { getDateLocale } from '../../i18n/i18n';
import { SelectField } from '../Fields/Select/Select';
import { Transition } from '../Transition/Transition';
import { DayCell } from './DayCell/DayCell';
import { DayHeader } from './DayHeader/DayHeader';
import { Event } from './Event/Event';
import { CalendarEvent, FullCalendarProps } from './FullCalendar.types';
import { MoreEvents } from './MoreEvents/MoreEvents';
import { MoreLink } from './MoreLink/MoreLink';
import { NoEvents } from './NoEvents/NoEvents';
import { SlotLabel } from './SlotLabel/SlotLabel';

const FullCalendarView = {
  [CalendarView.Day]: 'timeGridDay',
  [CalendarView.List]: 'listMonth',
  [CalendarView.Month]: 'dayGridMonth',
  [CalendarView.Week]: 'timeGridWeek',
};

export const FullCalendar = ({ events, onDateRangeChange, onEventClick }: FullCalendarProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState(CalendarView.Month);
  const [popperProps, setPopperProps] = useState<
    | {
        open: false;
      }
    | {
        anchorEl: Element;
        date: Date;
        events: CalendarEvent[];
        open: true;
      }
  >({
    open: false,
  });
  const calendarRef = useRef<Calendar>(null);

  useEffect(() => {
    if (!calendarRef.current) return;

    const handleDatesSet = ({ end, start }: DatesSetArg) => {
      onDateRangeChange?.({
        end: sub(end, { seconds: 1 }),
        start,
      });
    };

    const calendarApi = calendarRef.current.getApi();
    calendarApi.on('datesSet', handleDatesSet);
    calendarApi.changeView(FullCalendarView[currentView]);

    return () => {
      calendarApi.off('datesSet', handleDatesSet);
    };
    // eslint-disable-next-line
  }, []);

  const calendarEvents = useMemo(
    () =>
      events?.map((event) => ({
        extendedProps: event,
        start: event.date,
        title: event.title,
      })),
    [events],
  );

  const title = useMemo(() => {
    if (currentView === CalendarView.Day) {
      return format(currentDate, 'MMMM yyyy - EEEE dd', {
        locale: getDateLocale(language),
      });
    }

    const date = currentView === CalendarView.Week ? add(currentDate, { days: 3 }) : currentDate;

    return format(date, 'MMMM yyyy', {
      locale: getDateLocale(language),
    });
  }, [currentDate, currentView, language]);

  const handleTodayClick = useCallback(() => {
    if (!calendarRef.current) return;

    const calendarApi = calendarRef.current.getApi();
    calendarApi.today();
    setCurrentDate(calendarApi.view.currentStart);
  }, []);

  const handleCalendarViewChange = useCallback((value: CalendarView | null) => {
    if (!value || !calendarRef.current) return;

    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView(FullCalendarView[value]);
    setCurrentDate(calendarApi.view.currentStart);
    setCurrentView(value);
  }, []);

  const handlePrevClick = useCallback(() => {
    if (!calendarRef.current) return;

    const calendarApi = calendarRef.current.getApi();
    calendarApi.prev();
    setCurrentDate(calendarApi.getDate());
  }, []);

  const handleNextClick = useCallback(() => {
    if (!calendarRef.current) return;

    const calendarApi = calendarRef.current.getApi();
    calendarApi.next();
    setCurrentDate(calendarApi.getDate());
  }, []);

  const handleEventClick = useCallback(
    ({ event, jsEvent }: EventClickArg) => {
      jsEvent.preventDefault();

      const evt = event.extendedProps as CalendarEvent;
      if (evt.url) {
        navigate(evt.url);
      } else {
        onEventClick?.(evt);
      }
    },
    [navigate, onEventClick],
  );

  const handleMoreLinkClick = useCallback(({ allSegs, date, jsEvent }: MoreLinkArg) => {
    jsEvent.stopPropagation();
    setPopperProps({
      anchorEl: jsEvent.currentTarget as Element,
      date,
      events: allSegs.map(({ event }) => event.extendedProps as CalendarEvent),
      open: true,
    });
    return '';
  }, []);
  const handleClosePopper = useCallback(() => {
    setPopperProps({ open: false });
  }, []);
  const handleClickAway = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (popperProps.open && !popperProps.anchorEl.contains(event.target as HTMLElement)) {
        handleClosePopper();
      }
    },
    [handleClosePopper, popperProps],
  );

  return (
    <Stack spacing={{ xs: 3, sm: 4 }}>
      <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
        <Button color="tertiary" variant="outlined" onClick={handleTodayClick}>
          {t('common.component.calendar.today')}
        </Button>
        <Stack
          direction="row"
          spacing={1}
          sx={(theme) => ({
            color: theme.palette.grey[700],
            textTransform: 'capitalize',
          })}
        >
          <IconButton onClick={handlePrevClick}>
            <ChevronLeft />
          </IconButton>
          <Typography variant="h2">{title}</Typography>
          <IconButton onClick={handleNextClick}>
            <ChevronRight />
          </IconButton>
        </Stack>
        <SelectField
          sx={{
            '.MuiSelect-select.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input': {
              py: '12px !important',
            },
          }}
          fullWidth={false}
          options={SORTED_CALENDAR_VIEWS}
          useSortedOptions={false}
          getOptionLabel={(option) => t(`common.enum.calendar_view.${option}`)}
          value={currentView}
          onChange={handleCalendarViewChange}
        />
      </Stack>
      <Calendar
        ref={calendarRef}
        allDaySlot={false}
        dayCellContent={DayCell()}
        dayHeaders={currentView !== CalendarView.Day}
        dayHeaderContent={DayHeader(language)}
        dayMaxEvents={3}
        eventClick={handleEventClick}
        eventContent={Event(language)}
        eventMaxStack={currentView === CalendarView.Week ? 1 : 5}
        events={calendarEvents}
        firstDay={1}
        fixedWeekCount={false}
        headerToolbar={false}
        height="auto"
        initialDate={currentDate}
        initialView={FullCalendarView[currentView]}
        locale={language}
        moreLinkContent={MoreLink(t)}
        moreLinkClick={handleMoreLinkClick}
        noEventsContent={NoEvents(t)}
        plugins={[dayGridPlugin, listPlugin, timeGridPlugin]}
        slotLabelContent={SlotLabel(language)}
      />
      {popperProps.open && (
        <Popper
          placement="bottom-start"
          anchorEl={popperProps.anchorEl}
          open
          transition
          modifiers={[
            {
              name: 'offset',
              options: {
                offset: [0, -32],
              },
            },
          ]}
          sx={{ zIndex: 1000 }}
        >
          {({ TransitionProps }) => (
            <ClickAwayListener onClickAway={handleClickAway}>
              <Transition type="grow" in={popperProps.open} position="top-left" {...TransitionProps} unmountOnExit>
                <MoreEvents date={popperProps.date} events={popperProps.events} onClose={handleClosePopper} />
              </Transition>
            </ClickAwayListener>
          )}
        </Popper>
      )}
    </Stack>
  );
};
