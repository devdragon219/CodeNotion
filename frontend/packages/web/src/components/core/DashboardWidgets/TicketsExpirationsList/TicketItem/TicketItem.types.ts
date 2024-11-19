export interface TicketItemProps {
  ticket: {
    ticketId: number;
    internalCode: string;
    description: string;
    daysToExpiration: number;
  };
  useMockData?: boolean;
}
