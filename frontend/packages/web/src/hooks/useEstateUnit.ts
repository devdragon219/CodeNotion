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
  GetEstateUnitInternalCodeByAlreadyInUseInternalCodesDocument,
  GetEstateUnitInternalCodeByAlreadyInUseInternalCodesQuery,
  GetEstateUnitInternalCodeDocument,
  GetEstateUnitInternalCodeQuery,
  useAddEstateUnitDocumentsMutation,
  useUpdateEstateUnitDocumentMutation,
} from '../gql/RealGimm.Web.EstateUnit.operation';

export const useEstateUnit = () => {
  const client = useClient();
  const { closeSnackbar, showError, showSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const [, addEstateUnitDocumentsMutation] = useAddEstateUnitDocumentsMutation();
  const [, updateEstateUnitDocumentMutation] = useUpdateEstateUnitDocumentMutation();

  const getInternalCode = (estateId: number, onComplete: (result: string) => void) => {
    const getInternalCode = async () => {
      const result: OperationResult<GetEstateUnitInternalCodeQuery> = await client.query(
        GetEstateUnitInternalCodeDocument,
        {
          estateId,
        },
      );

      onComplete(result.data?.estateUnit.proposeNewInternalCode ?? '');
    };

    void getInternalCode();
  };

  const getInternalCodeByAlreadyInUseInternalCodes = (
    estateId: number,
    alreadyInUseInternalCodes: string[],
    onComplete: (result: string) => void,
  ) => {
    const getInternalCodeByAlreadyInUseInternalCodes = async () => {
      const result: OperationResult<GetEstateUnitInternalCodeByAlreadyInUseInternalCodesQuery> = await client.query(
        GetEstateUnitInternalCodeByAlreadyInUseInternalCodesDocument,
        {
          estateId,
          alreadyInUseInternalCodes,
        },
      );

      onComplete(result.data?.estateUnit.proposeNewInternalCodeExceptOccupied ?? '');
    };

    void getInternalCodeByAlreadyInUseInternalCodes();
  };

  const addDocumentsSync = async (estateUnitId: number, documents: DocumentFormInput[]) => {
    if (documents.length === 0) return Promise.resolve(true);

    const inputs = documents.map((document) => parseDocumentFormInputToDocumentInput(document));

    const result = await addEstateUnitDocumentsMutation({
      estateUnitId,
      inputs,
    });
    if (result.data?.estateUnit.document.addRange.isSuccess) {
      showSnackbar(getDocumentUploadedTranslation(documents, t), 'success');
      return Promise.resolve(true);
    } else {
      showError(result.data?.estateUnit.document.addRange.validationErrors, t('core.error.upload'));
      return Promise.resolve(false);
    }
  };

  const addDocumentsAsync = (estateUnitId: number, documents: DocumentFormInput[]) => {
    const addDocumentsAsync = async () => {
      if (documents.length === 0) return;
      const snackbarKey = showSnackbar(getDocumentUploadTranslation(documents, t), { persist: true, severity: 'info' });
      await addDocumentsSync(estateUnitId, documents);
      closeSnackbar(snackbarKey);
    };

    void addDocumentsAsync();
  };

  const updateDocumentSync = async (estateUnitId: number, document: DocumentFormInput) => {
    const input = parseDocumentFormInputToDocumentInput(document);

    const result = await updateEstateUnitDocumentMutation({
      estateUnitId,
      input,
    });
    if (result.data?.estateUnit.document.update.isSuccess) {
      showSnackbar(t('core.feedback.document_updated'), 'success');
      return Promise.resolve(true);
    } else {
      showError(result.data?.estateUnit.document.update.validationErrors, t('core.error.upload'));
      return Promise.resolve(false);
    }
  };

  return {
    getInternalCode,
    getInternalCodeByAlreadyInUseInternalCodes,
    addDocumentsSync,
    addDocumentsAsync,
    updateDocumentSync,
  };
};
