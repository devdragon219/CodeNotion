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
  CanUseContractInternalCodeDocument,
  CanUseContractInternalCodeQuery,
  GetContractInternalCodeDocument,
  GetContractInternalCodeQuery,
  useAddContractDocumentsMutation,
  useUpdateContractDocumentMutation,
} from '../gql/RealGimm.Web.Contract.operation';

export const useContract = () => {
  const client = useClient();
  const { closeSnackbar, showError, showSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const [, addContractDocumentsMutation] = useAddContractDocumentsMutation();
  const [, updateContractDocumentMutation] = useUpdateContractDocumentMutation();

  const checkCanUseInternalCode = (
    internalCode: string,
    currentContractId: number | null,
    onComplete: (result: boolean) => void,
  ) => {
    const checkCanUseInternalCode = async () => {
      if (internalCode.length === 0) {
        onComplete(true);
        return;
      }

      const result: OperationResult<CanUseContractInternalCodeQuery> = await client.query(
        CanUseContractInternalCodeDocument,
        {
          currentContractId,
          internalCode,
        },
      );

      onComplete(result.data?.contract.canUseInternalCode ?? true);
    };

    void checkCanUseInternalCode();
  };

  const getInternalCode = (isActiveContract: boolean, onComplete: (result: string) => void) => {
    const getInternalCode = async () => {
      const result: OperationResult<GetContractInternalCodeQuery> = await client.query(
        GetContractInternalCodeDocument,
        {
          isActiveContract,
        },
      );

      onComplete(result.data?.contract.proposeNewInternalCode ?? '');
    };

    void getInternalCode();
  };

  const addDocumentsSync = async (contractId: number, documents: DocumentFormInput[]) => {
    if (documents.length === 0) return Promise.resolve(true);

    const inputs = documents.map((document) => parseDocumentFormInputToDocumentInput(document));

    const result = await addContractDocumentsMutation({
      contractId,
      inputs,
    });
    if (result.data?.contract.document.addRange.isSuccess) {
      showSnackbar(getDocumentUploadedTranslation(documents, t), 'success');
      return Promise.resolve(true);
    } else {
      showError(result.data?.contract.document.addRange.validationErrors, t('core.error.upload'));
      return Promise.resolve(false);
    }
  };

  const addDocumentsAsync = (contractId: number, documents: DocumentFormInput[]) => {
    const addDocumentsAsync = async () => {
      if (documents.length === 0) return;
      const snackbarKey = showSnackbar(getDocumentUploadTranslation(documents, t), { persist: true, severity: 'info' });
      await addDocumentsSync(contractId, documents);
      closeSnackbar(snackbarKey);
    };

    void addDocumentsAsync();
  };

  const updateDocumentSync = async (contractId: number, document: DocumentFormInput) => {
    const input = parseDocumentFormInputToDocumentInput(document);

    const result = await updateContractDocumentMutation({
      contractId,
      input,
    });
    if (result.data?.contract.document.update.isSuccess) {
      showSnackbar(t('core.feedback.document_updated'), 'success');
      return Promise.resolve(true);
    } else {
      showError(result.data?.contract.document.update.validationErrors, t('core.error.upload'));
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
