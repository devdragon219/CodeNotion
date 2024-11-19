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
  CanUseFacilityContractInternalCodeDocument,
  CanUseFacilityContractInternalCodeQuery,
  GetFacilityContractInternalCodeDocument,
  GetFacilityContractInternalCodeQuery,
  useAddFacilityContractDocumentsMutation,
  useUpdateFacilityContractDocumentMutation,
} from '../gql/RealGimm.Web.FacilityContract.operation';

export const useFacilityContract = () => {
  const client = useClient();
  const { closeSnackbar, showError, showSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const [, addFacilityContractDocumentsMutation] = useAddFacilityContractDocumentsMutation();
  const [, updateFacilityContractDocumentMutation] = useUpdateFacilityContractDocumentMutation();

  const checkCanUseInternalCode = (
    internalCode: string,
    currentFacilityContractId: number | null,
    onComplete: (result: boolean) => void,
  ) => {
    const checkCanUseInternalCode = async () => {
      if (internalCode.length === 0) {
        onComplete(true);
        return;
      }

      const result: OperationResult<CanUseFacilityContractInternalCodeQuery> = await client.query(
        CanUseFacilityContractInternalCodeDocument,
        {
          currentFacilityContractId,
          internalCode,
        },
      );

      onComplete(result.data?.fcltContract.canUseInternalCode ?? true);
    };

    void checkCanUseInternalCode();
  };

  const getInternalCode = (onComplete: (result: string) => void) => {
    const getInternalCode = async () => {
      const result: OperationResult<GetFacilityContractInternalCodeQuery> = await client.query(
        GetFacilityContractInternalCodeDocument,
        {},
      );

      onComplete(result.data?.fcltContract.proposeNewInternalCode ?? '');
    };

    void getInternalCode();
  };

  const addDocumentsSync = async (facilityContractId: number, documents: DocumentFormInput[]) => {
    if (documents.length === 0) return Promise.resolve(true);

    const inputs = documents.map((document) => parseDocumentFormInputToDocumentInput(document));

    const result = await addFacilityContractDocumentsMutation({
      facilityContractId,
      inputs,
    });
    if (result.data?.fcltContract.document.addRange.isSuccess) {
      showSnackbar(getDocumentUploadedTranslation(documents, t), 'success');
      return Promise.resolve(true);
    } else {
      showError(result.data?.fcltContract.document.addRange.validationErrors, t('core.error.upload'));
      return Promise.resolve(false);
    }
  };

  const addDocumentsAsync = (facilityContractId: number, documents: DocumentFormInput[]) => {
    const addDocumentsAsync = async () => {
      if (documents.length === 0) return;
      const snackbarKey = showSnackbar(getDocumentUploadTranslation(documents, t), { persist: true, severity: 'info' });
      await addDocumentsSync(facilityContractId, documents);
      closeSnackbar(snackbarKey);
    };

    void addDocumentsAsync();
  };

  const updateDocumentSync = async (facilityContractId: number, document: DocumentFormInput) => {
    const input = parseDocumentFormInputToDocumentInput(document);

    const result = await updateFacilityContractDocumentMutation({
      facilityContractId,
      input,
    });
    if (result.data?.fcltContract.document.update.isSuccess) {
      showSnackbar(t('core.feedback.document_updated'), 'success');
      return Promise.resolve(true);
    } else {
      showError(result.data?.fcltContract.document.update.validationErrors, t('core.error.upload'));
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
