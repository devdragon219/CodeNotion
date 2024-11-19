import { Chat, Loader } from '@realgimm5/frontend-common/components';
import { useSnackbar } from '@realgimm5/frontend-common/contexts';
import { ContentCategory, ContentType } from '@realgimm5/frontend-common/gql/types';
import {
  getContentTypeOrNull,
  getFullName,
  getStringOrNull,
  parseDocumentsToDocumentFormInputs,
  parseStringToDate,
} from '@realgimm5/frontend-common/utils';
import { useCallback, useMemo, useState } from 'react';
import { useWatch } from 'react-hook-form';

import { useGetTicketRepliesQuery, useSendTicketReplyMutation } from '../../../../gql/RealGimm.Web.Ticket.operation';
import { TicketRepliesProps } from './Replies.types';

export const TicketReplies = ({ control, readonly }: TicketRepliesProps) => {
  const { showError } = useSnackbar();
  const ticketId = useWatch({ control, name: 'ticketId' });
  const [loading, setLoading] = useState(false);
  const [, sendTicketReplyMutation] = useSendTicketReplyMutation();
  const [queryState, reexecuteQuery] = useGetTicketRepliesQuery({
    variables: {
      ticketId: Number(ticketId),
    },
  });
  const messages = useMemo(
    () =>
      queryState.data?.ticket.get?.replies.map((reply) => ({
        attachments: {
          documents: parseDocumentsToDocumentFormInputs(reply.documents),
          images: parseDocumentsToDocumentFormInputs(reply.images),
        },
        messageId: reply.id,
        text: reply.comment ?? '',
        timestamp: parseStringToDate(reply.timestamp),
        user: {
          fullName: getFullName(reply.user?.firstName, reply.user?.lastName, reply.user?.userName),
          userName: reply.user?.userName ?? '',
        },
      })) ?? [],
    [queryState.data],
  );

  const handleSend = useCallback(
    async (message: string, attachments: File[]) => {
      setLoading(true);
      const result = await sendTicketReplyMutation({
        ticketId: Number(ticketId),
        comment: getStringOrNull(message),
        inputs: attachments.map((file) => ({
          content: file,
          contentCategory: ContentCategory.Generic,
          contentType: getContentTypeOrNull(file.type) ?? ContentType.Generic,
          fileName: file.name,
          mimeType: file.type,
          name: `ticket_attachment_${crypto.randomUUID()}`,
        })),
      });
      setLoading(false);
      if (result.data?.ticket.sendReply.isSuccess) {
        reexecuteQuery();
      } else {
        showError(result.data?.ticket.sendReply.validationErrors);
      }
    },
    [reexecuteQuery, sendTicketReplyMutation, showError, ticketId],
  );

  return (
    <>
      {(queryState.fetching || loading) && <Loader />}
      <Chat disabled={readonly} messages={messages} onSend={handleSend} />
    </>
  );
};
