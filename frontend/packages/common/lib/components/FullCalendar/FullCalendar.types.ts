export interface CalendarDateRange {
  end: Date;
  start: Date;
}

export type CalendarEventType = 'recurring' | 'report' | 'schedule';

export interface CalendarEvent {
  date: Date;
  title: string;
  type: CalendarEventType;
  url?: string;
}

export interface FullCalendarProps {
  events?: CalendarEvent[];
  onDateRangeChange?: (range: CalendarDateRange) => void;
  onEventClick?: (event: CalendarEvent) => void;
}
