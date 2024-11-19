import { useSnackbar } from '@realgimm5/frontend-common/contexts';
import { ContentCategory, ContentType } from '@realgimm5/frontend-common/gql/types';
import { DocumentFormInput } from '@realgimm5/frontend-common/interfaces';
import {
  getDocumentUploadTranslation,
  getDocumentUploadedTranslation,
  parseDocumentFormInputToDocumentInput,
} from '@realgimm5/frontend-common/utils';
import { useTranslation } from 'react-i18next';
import { OperationResult, useClient } from 'urql';

import {
  CanUseEstateInternalCodeDocument,
  CanUseEstateInternalCodeQuery,
  GetEstateInternalCodeDocument,
  GetEstateInternalCodeQuery,
  useAddEstateDocumentsMutation,
  useUpdateEstateDocumentMutation,
} from '../gql/RealGimm.Web.Estate.operation';

export const useEstate = () => {
  const client = useClient();
  const { closeSnackbar, showError, showSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const [, addEstateDocumentsMutation] = useAddEstateDocumentsMutation();
  const [, updateEstateDocumentMutation] = useUpdateEstateDocumentMutation();

  const checkCanUseInternalCode = (
    internalCode: string,
    currentEstateId: number | null,
    onComplete: (result: boolean) => void,
  ) => {
    const checkCanUseInternalCode = async () => {
      if (internalCode.length === 0) {
        onComplete(true);
        return;
      }

      const result: OperationResult<CanUseEstateInternalCodeQuery> = await client.query(
        CanUseEstateInternalCodeDocument,
        {
          currentEstateId,
          internalCode,
        },
      );

      onComplete(result.data?.estate.canUseInternalCode ?? true);
    };

    void checkCanUseInternalCode();
  };

  const getInternalCode = (onComplete: (result: string) => void) => {
    const getInternalCode = async () => {
      const result: OperationResult<GetEstateInternalCodeQuery> = await client.query(GetEstateInternalCodeDocument, {});

      onComplete(result.data?.estate.proposeNewInternalCode ?? '');
    };

    void getInternalCode();
  };

  const addDocumentsSync = async (estateId: number, documents: DocumentFormInput[], images: DocumentFormInput[]) => {
    if (documents.length === 0 && images.length === 0) return Promise.resolve(true);

    const inputs = [
      ...images.map((image) =>
        parseDocumentFormInputToDocumentInput(image, {
          documentNamePrefix: 'estate_image_',
          fallbackContentType: ContentType.Image,
          fallbackCategory: ContentCategory.BldPhoto,
        }),
      ),
      ...documents.map((document) => parseDocumentFormInputToDocumentInput(document)),
    ];

    const result = await addEstateDocumentsMutation({ estateId, inputs });
    if (result.data?.estate.document.addRange.isSuccess) {
      showSnackbar(getDocumentUploadedTranslation([...documents, ...images], t), 'success');
      return Promise.resolve(true);
    } else {
      showError(result.data?.estate.document.addRange.validationErrors, t('core.error.upload'));
      return Promise.resolve(false);
    }
  };

  const addDocumentsAsync = (estateId: number, documents: DocumentFormInput[], images: DocumentFormInput[]) => {
    const addDocumentsAsync = async () => {
      if (documents.length === 0 && images.length === 0) return;
      const snackbarKey = showSnackbar(getDocumentUploadTranslation([...documents, ...images], t), {
        persist: true,
        severity: 'info',
      });
      await addDocumentsSync(estateId, documents, images);
      closeSnackbar(snackbarKey);
    };

    void addDocumentsAsync();
  };

  const updateDocumentSync = async (estateId: number, document: DocumentFormInput) => {
    const input = parseDocumentFormInputToDocumentInput(document);

    const result = await updateEstateDocumentMutation({ estateId, input });
    if (result.data?.estate.document.update.isSuccess) {
      showSnackbar(t('core.feedback.document_updated'), 'success');
      return Promise.resolve(true);
    } else {
      showError(result.data?.estate.document.update.validationErrors, t('core.error.upload'));
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
