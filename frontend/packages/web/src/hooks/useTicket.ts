import { useSnackbar } from '@realgimm5/frontend-common/contexts';
import { ContentType, TicketMainType } from '@realgimm5/frontend-common/gql/types';
import { DocumentFormInput } from '@realgimm5/frontend-common/interfaces';
import {
  getDocumentUploadTranslation,
  getDocumentUploadedTranslation,
  parseDocumentFormInputToDocumentInput,
} from '@realgimm5/frontend-common/utils';
import { useTranslation } from 'react-i18next';
import { OperationResult, useClient } from 'urql';

import {
  CanUseTicketInternalCodeDocument,
  CanUseTicketInternalCodeQuery,
  GetTicketInternalCodeDocument,
  GetTicketInternalCodeQuery,
  useAddTicketDocumentsMutation,
  useUpdateTicketDocumentMutation,
} from '../gql/RealGimm.Web.Ticket.operation';

export const useTicket = () => {
  const client = useClient();
  const { closeSnackbar, showError, showSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const [, addTicketDocumentsMutation] = useAddTicketDocumentsMutation();
  const [, updateTicketDocumentMutation] = useUpdateTicketDocumentMutation();

  const checkCanUseInternalCode = (
    internalCode: string,
    currentTicketId: number | null,
    onComplete: (result: boolean) => void,
  ) => {
    const checkCanUseInternalCode = async () => {
      if (internalCode.length === 0) {
        onComplete(true);
        return;
      }

      const result: OperationResult<CanUseTicketInternalCodeQuery> = await client.query(
        CanUseTicketInternalCodeDocument,
        {
          currentTicketId,
          internalCode,
        },
      );

      onComplete(result.data?.ticket.canUseInternalCode ?? true);
    };

    void checkCanUseInternalCode();
  };

  const getInternalCode = (mainType: TicketMainType, onComplete: (result: string) => void) => {
    const getInternalCode = async () => {
      const result: OperationResult<GetTicketInternalCodeQuery> = await client.query(GetTicketInternalCodeDocument, {
        mainType,
      });

      onComplete(result.data?.ticket.proposeNewInternalCode ?? '');
    };

    void getInternalCode();
  };

  const addDocumentsSync = async (ticketId: number, documents: DocumentFormInput[], images: DocumentFormInput[]) => {
    if (documents.length === 0 && images.length === 0) return Promise.resolve(true);

    const inputs = [
      ...images.map((image) =>
        parseDocumentFormInputToDocumentInput(image, {
          documentNamePrefix: 'ticket_image_',
          fallbackContentType: ContentType.Image,
        }),
      ),
      ...documents.map((document) => parseDocumentFormInputToDocumentInput(document)),
    ];

    const result = await addTicketDocumentsMutation({ ticketId, inputs });
    if (result.data?.ticket.document.addRange.isSuccess) {
      showSnackbar(getDocumentUploadedTranslation([...documents, ...images], t), 'success');
      return Promise.resolve(true);
    } else {
      showError(result.data?.ticket.document.addRange.validationErrors, t('core.error.upload'));
      return Promise.resolve(false);
    }
  };

  const addDocumentsAsync = (ticketId: number, documents: DocumentFormInput[], images: DocumentFormInput[]) => {
    const addDocumentsAsync = async () => {
      if (documents.length === 0 && images.length === 0) return;
      const snackbarKey = showSnackbar(getDocumentUploadTranslation([...documents, ...images], t), {
        persist: true,
        severity: 'info',
      });
      await addDocumentsSync(ticketId, documents, images);
      closeSnackbar(snackbarKey);
    };

    void addDocumentsAsync();
  };

  const updateDocumentSync = async (ticketId: number, document: DocumentFormInput) => {
    const input = parseDocumentFormInputToDocumentInput(document);

    const result = await updateTicketDocumentMutation({ ticketId, input });
    if (result.data?.ticket.document.update.isSuccess) {
      showSnackbar(t('core.feedback.document_updated'), 'success');
      return Promise.resolve(true);
    } else {
      showError(result.data?.ticket.document.update.validationErrors, t('core.error.upload'));
      return Promise.resolve(false);
    }
  };

  return {
    checkCanUseInternalCode,
    getInternalCode,
    addDocumentsSync,
    addDocumentsAsync,
    updateDocumentSync,
  };
};
