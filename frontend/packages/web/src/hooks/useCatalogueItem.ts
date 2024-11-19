import { useSnackbar } from '@realgimm5/frontend-common/contexts';
import { DocumentFormInput } from '@realgimm5/frontend-common/interfaces';
import {
  getDocumentUploadTranslation,
  getDocumentUploadedTranslation,
  parseDocumentFormInputToDocumentInput,
} from '@realgimm5/frontend-common/utils';
import { useTranslation } from 'react-i18next';
import { OperationResult, useClient } from 'urql';

import {
  CanUseCatalogueItemInternalCodeDocument,
  CanUseCatalogueItemInternalCodeQuery,
  GetCatalogueItemInternalCodeDocument,
  GetCatalogueItemInternalCodeQuery,
  useAddCatalogueItemDocumentsMutation,
  useUpdateCatalogueItemDocumentMutation,
} from '../gql/RealGimm.Web.CatalogueItem.operation';

export const useCatalogueItem = () => {
  const client = useClient();
  const { closeSnackbar, showError, showSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const [, addCatalogueItemDocumentsMutation] = useAddCatalogueItemDocumentsMutation();
  const [, updateCatalogueItemDocumentMutation] = useUpdateCatalogueItemDocumentMutation();

  const checkCanUseInternalCode = (
    internalCode: string,
    currentCatalogueItemId: number | null,
    catalogueItemInternalCodes: string[],
    onComplete: (result: boolean) => void,
  ) => {
    const checkCanUseInternalCode = async () => {
      if (internalCode.length === 0) {
        onComplete(true);
        return;
      }

      if (catalogueItemInternalCodes.includes(internalCode)) {
        onComplete(false);
        return;
      }

      const result: OperationResult<CanUseCatalogueItemInternalCodeQuery> = await client.query(
        CanUseCatalogueItemInternalCodeDocument,
        {
          currentCatalogueItemId,
          internalCode,
        },
      );

      onComplete(result.data?.catalogueItem.canUseInternalCode ?? true);
    };

    void checkCanUseInternalCode();
  };

  const getInternalCode = (additionallyOccupiedCodes: string[], onComplete: (result: string) => void) => {
    const getInternalCode = async () => {
      const result: OperationResult<GetCatalogueItemInternalCodeQuery> = await client.query(
        GetCatalogueItemInternalCodeDocument,
        {
          additionallyOccupiedCodes,
        },
      );

      onComplete(result.data?.catalogueItem.proposeNewInternalCode ?? '');
    };

    void getInternalCode();
  };

  const addDocumentsSync = async (catalogueItemId: number, documents: DocumentFormInput[]) => {
    if (documents.length === 0) return Promise.resolve(true);

    const inputs = documents.map((document) => parseDocumentFormInputToDocumentInput(document));

    const result = await addCatalogueItemDocumentsMutation({
      catalogueItemId,
      inputs,
    });
    if (result.data?.catalogueItem.document.addRange.isSuccess) {
      showSnackbar(getDocumentUploadedTranslation(documents, t), 'success');
      return Promise.resolve(true);
    } else {
      showError(result.data?.catalogueItem.document.addRange.validationErrors, t('core.error.upload'));
      return Promise.resolve(false);
    }
  };

  const addDocumentsAsync = (catalogueItemId: number, documents: DocumentFormInput[]) => {
    const addDocumentsAsync = async () => {
      if (documents.length === 0) return;
      const snackbarKey = showSnackbar(getDocumentUploadTranslation(documents, t), { persist: true, severity: 'info' });
      await addDocumentsSync(catalogueItemId, documents);
      closeSnackbar(snackbarKey);
    };

    void addDocumentsAsync();
  };

  const updateDocumentSync = async (catalogueItemId: number, document: DocumentFormInput) => {
    const input = parseDocumentFormInputToDocumentInput(document);

    const result = await updateCatalogueItemDocumentMutation({
      catalogueItemId,
      input,
    });
    if (result.data?.catalogueItem.document.update.isSuccess) {
      showSnackbar(t('core.feedback.document_updated'), 'success');
      return Promise.resolve(true);
    } else {
      showError(result.data?.catalogueItem.document.update.validationErrors, t('core.error.upload'));
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
