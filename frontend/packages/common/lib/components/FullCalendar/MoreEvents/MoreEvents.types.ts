import { CalendarEvent } from '../FullCalendar.types';

export interface MoreEventsProps {
  date: Date;
  events: CalendarEvent[];
  onClose: () => void;
}
