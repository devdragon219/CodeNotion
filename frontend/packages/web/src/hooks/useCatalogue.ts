import { useSnackbar } from '@realgimm5/frontend-common/contexts';
import { DocumentFormInput } from '@realgimm5/frontend-common/interfaces';
import {
  getDocumentUploadTranslation,
  getDocumentUploadedTranslation,
  parseDocumentFormInputToDocumentInput,
} from '@realgimm5/frontend-common/utils';
import { useTranslation } from 'react-i18next';

import {
  useAddCatalogueDocumentsMutation,
  useUpdateCatalogueDocumentMutation,
} from '../gql/RealGimm.Web.Catalogue.operation';

export const useCatalogue = () => {
  const { closeSnackbar, showError, showSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const [, addCatalogueDocumentsMutation] = useAddCatalogueDocumentsMutation();
  const [, updateCatalogueDocumentMutation] = useUpdateCatalogueDocumentMutation();

  const addDocumentsSync = async (catalogueTypeId: number, estateId: number, documents: DocumentFormInput[]) => {
    if (documents.length === 0) return Promise.resolve(true);

    const inputs = documents.map((document) => parseDocumentFormInputToDocumentInput(document));

    const result = await addCatalogueDocumentsMutation({
      catalogueTypeId,
      estateId,
      inputs,
    });
    if (result.data?.catalogue.document.addRange.isSuccess) {
      showSnackbar(getDocumentUploadedTranslation(documents, t), 'success');
      return Promise.resolve(true);
    } else {
      showError(result.data?.catalogue.document.addRange.validationErrors, t('core.error.upload'));
      return Promise.resolve(false);
    }
  };

  const addDocumentsAsync = (catalogueTypeId: number, estateId: number, documents: DocumentFormInput[]) => {
    const addDocumentsAsync = async () => {
      if (documents.length === 0) return;
      const snackbarKey = showSnackbar(getDocumentUploadTranslation(documents, t), { persist: true, severity: 'info' });
      await addDocumentsSync(catalogueTypeId, estateId, documents);
      closeSnackbar(snackbarKey);
    };

    void addDocumentsAsync();
  };

  const updateDocumentSync = async (catalogueTypeId: number, estateId: number, document: DocumentFormInput) => {
    const input = parseDocumentFormInputToDocumentInput(document);

    const result = await updateCatalogueDocumentMutation({
      catalogueTypeId,
      estateId,
      input,
    });
    if (result.data?.catalogue.document.update.isSuccess) {
      showSnackbar(t('core.feedback.document_updated'), 'success');
      return Promise.resolve(true);
    } else {
      showError(result.data?.catalogue.document.update.validationErrors, t('core.error.upload'));
      return Promise.resolve(false);
    }
  };

  return {
    addDocumentsSync,
    addDocumentsAsync,
    updateDocumentSync,
  };
};
