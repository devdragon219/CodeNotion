import { Grid2 } from '@mui/material';
import { EmptyText, SecondaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { getFullName, parseNumberToCurrency, parseStringToDate } from '@realgimm5/frontend-common/utils';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { QuoteHistoryEntryFragment } from '../../../../gql/RealGimm.Web.QuoteHistoryEntry.fragment';
import { TicketHistoryEntryFragment } from '../../../../gql/RealGimm.Web.TicketHistoryEntry.fragment';
import { TicketHistoryProps } from './History.types';

export const TicketHistory = ({ history, readonly }: TicketHistoryProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();

  const getEntryTypeDescription = useCallback(
    (entry: TicketHistoryEntryFragment | QuoteHistoryEntryFragment) => {
      if (
        (entry.__typename === 'MasterStatusUpdatedQuoteHistoryEntry' ||
          entry.__typename === 'MasterStatusUpdatedTicketHistoryEntry') &&
        !entry.oldMasterStatus
      ) {
        return t(`ticket.history.${entry.__typename}.initial`);
      }

      const getOptions = () => {
        switch (entry.__typename) {
          case 'AmountUpdatedQuoteHistoryEntry':
            return {
              oldAmount: parseNumberToCurrency(entry.oldAmount, language),
              newAmount: parseNumberToCurrency(entry.newAmount, language),
            };
          case 'ApprovedAmountUpdatedQuoteHistoryEntry':
            return {
              oldApprovedAmount: parseNumberToCurrency(entry.oldApprovedAmount, language),
              newApprovedAmount: parseNumberToCurrency(entry.newApprovedAmount, language),
            };
          case 'ConvertedToExcludedFromMaintenanceContractTicketHistoryEntry':
            return {};
          case 'MasterStatusUpdatedQuoteHistoryEntry':
            return {
              oldMasterStatus: entry.oldMasterStatus
                ? t(`common.enum.quote_master_status.${entry.oldMasterStatus}`).toLowerCase()
                : '',
              newMasterStatus: t(`common.enum.quote_master_status.${entry.newMasterStatus}`).toLowerCase(),
            };
          case 'MasterStatusUpdatedTicketHistoryEntry':
            return {
              oldMasterStatus: entry.oldMasterStatus
                ? t(`common.enum.ticket_master_status.${entry.oldMasterStatus}`).toLowerCase()
                : '',
              newMasterStatus: t(`common.enum.ticket_master_status.${entry.newMasterStatus}`).toLowerCase(),
            };
          case 'NewReminderTicketHistoryEntry':
            return {
              reminderSummary: entry.reminderSummary,
            };
          case 'NewReplyTicketHistoryEntry':
            return {
              userName: getFullName(entry.user?.firstName, entry.user?.lastName, entry.user?.userName),
            };
          case 'ReminderDeletedTicketHistoryEntry':
            return {
              reminderSummary: entry.reminderSummary,
            };
          case 'ReminderUpdatedTicketHistoryEntry':
            return {
              oldReminderSummary: entry.oldReminderSummary,
              newReminderSummary: entry.newReminderSummary,
            };
        }
      };

      return t(`ticket.history.${entry.__typename}.description`, getOptions());
    },
    [language, t],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <SectionTitle value="ticket.section_title.history" />
      {history.length === 0 && readonly ? (
        <EmptyText value="ticket.text.no_history" />
      ) : (
        <Grid2 size={12}>
          <SecondaryTable
            columns={[
              'ticket.field.history_date',
              'ticket.field.history_type',
              'ticket.field.history_type_description',
              'ticket.field.history_user',
            ]}
            rows={history.map((entry) => [
              parseStringToDate(entry.timestamp),
              t(`ticket.history.${entry.__typename}.title`),
              getEntryTypeDescription(entry),
              getFullName(entry.user?.firstName, entry.user?.lastName, entry.user?.userName),
            ])}
          />
        </Grid2>
      )}
    </Grid2>
  );
};
