import { useSnackbar } from '@realgimm5/frontend-common/contexts';
import { BirthSex, ContentCategory } from '@realgimm5/frontend-common/gql/types';
import { DocumentFormInput } from '@realgimm5/frontend-common/interfaces';
import {
  getDocumentUploadTranslation,
  getDocumentUploadedTranslation,
  parseDateToString,
  parseDocumentFormInputToDocumentInput,
} from '@realgimm5/frontend-common/utils';
import { useTranslation } from 'react-i18next';
import { OperationResult, useClient } from 'urql';

import {
  CanBeGroupLeaderDocument,
  CanBeGroupLeaderQuery,
  CanUseInterGroupSignatureDocument,
  CanUseInterGroupSignatureQuery,
  CanUseSubjectInternalCodeDocument,
  CanUseSubjectInternalCodeQuery,
  CheckItalianTaxIdDocument,
  CheckItalianTaxIdQuery,
  GetSubjectInternalCodeDocument,
  GetSubjectInternalCodeQuery,
  useAddSubjectDocumentsMutation,
  useUpdateSubjectDocumentMutation,
} from '../gql/RealGimm.Web.Subject.operation';

export const useSubject = () => {
  const client = useClient();
  const { closeSnackbar, showError, showSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const [, addSubjectDocumentsMutation] = useAddSubjectDocumentsMutation();
  const [, updateSubjectDocumentMutation] = useUpdateSubjectDocumentMutation();

  const checkCanBeGroupLeader = (
    managementSubjectId: number | null,
    subjectId: number | null,
    onComplete: (result: boolean) => void,
  ) => {
    const checkCanBeGroupLeader = async () => {
      if (!managementSubjectId) {
        onComplete(true);
        return;
      }

      const result: OperationResult<CanBeGroupLeaderQuery> = await client.query(CanBeGroupLeaderDocument, {
        managementSubjectId,
        subjectId,
      });

      onComplete(result.data?.subject.canBeGroupLeader ?? true);
    };

    void checkCanBeGroupLeader();
  };

  const checkCanUseInternalCode = (
    internalCode: string,
    currentSubjectId: number | null,
    onComplete: (result: boolean) => void,
  ) => {
    const checkCanUseInternalCode = async () => {
      if (internalCode.length === 0) {
        onComplete(true);
        return;
      }

      const result: OperationResult<CanUseSubjectInternalCodeQuery> = await client.query(
        CanUseSubjectInternalCodeDocument,
        {
          currentSubjectId,
          internalCode,
        },
      );

      onComplete(result.data?.subject.canUseInternalCode ?? true);
    };

    void checkCanUseInternalCode();
  };

  const checkCanUseInterGroupSignature = (
    signature: string,
    companyGroupId: number | null,
    currentSubjectId: number | null,
    onComplete: (result: boolean) => void,
  ) => {
    const checkCanUseInterGroupSignature = async () => {
      if (!companyGroupId || signature.length === 0) {
        onComplete(true);
        return;
      }

      const result: OperationResult<CanUseInterGroupSignatureQuery> = await client.query(
        CanUseInterGroupSignatureDocument,
        {
          currentSubjectId,
          companyGroupId,
          signature,
        },
      );

      onComplete(result.data?.subject.canUseInterGroupSignature ?? true);
    };

    void checkCanUseInterGroupSignature();
  };

  const checkItalianTaxId = (
    taxId: string,
    firstName: string,
    lastName: string,
    birthSex: BirthSex | null,
    birthDate: Date | null,
    cityIstatCode: string,
    onComplete: (result: boolean) => void,
  ) => {
    const checkItalianTaxId = async () => {
      if ([firstName, lastName, taxId, cityIstatCode].some((it) => it.length === 0) || !birthSex || !birthDate) {
        onComplete(true);
        return;
      }

      const result: OperationResult<CheckItalianTaxIdQuery> = await client.query(CheckItalianTaxIdDocument, {
        firstName,
        lastName,
        gender: birthSex === BirthSex.Female ? 'F' : 'M',
        birthDate: parseDateToString(birthDate),
        cityIstatCode,
        taxId,
      });

      onComplete(result.data?.subject.checkItalianTaxID ?? true);
    };

    void checkItalianTaxId();
  };

  const getInternalCode = (onComplete: (result: string) => void) => {
    const getInternalCode = async () => {
      const result: OperationResult<GetSubjectInternalCodeQuery> = await client.query(
        GetSubjectInternalCodeDocument,
        {},
      );

      onComplete(result.data?.subject.proposeNewInternalCode ?? '');
    };

    void getInternalCode();
  };

  const addDocumentsSync = async (
    subjectId: number,
    identityDocuments: DocumentFormInput[],
    otherDocuments: DocumentFormInput[],
  ) => {
    if (identityDocuments.length === 0 && otherDocuments.length === 0) return Promise.resolve(true);

    const inputs = [
      ...identityDocuments.map((document) =>
        parseDocumentFormInputToDocumentInput(document, {
          fallbackCategory: ContentCategory.SbjIdentityNational,
          fallbackIssueDate: document.since,
        }),
      ),
      ...otherDocuments.map((document) =>
        parseDocumentFormInputToDocumentInput(document, {
          fallbackCategory: ContentCategory.SbjOther,
          fallbackIssueDate: document.since,
        }),
      ),
    ];

    const result = await addSubjectDocumentsMutation({ subjectId, inputs });
    if (result.data?.subject.document.addRange.isSuccess) {
      showSnackbar(getDocumentUploadedTranslation([...identityDocuments, ...otherDocuments], t), 'success');
      return Promise.resolve(true);
    } else {
      showError(result.data?.subject.document.addRange.validationErrors, t('core.error.upload'));
      return Promise.resolve(false);
    }
  };

  const addDocumentsAsync = (
    subjectId: number,
    identityDocuments: DocumentFormInput[],
    otherDocuments: DocumentFormInput[],
  ) => {
    const addDocumentsAsync = async () => {
      if (identityDocuments.length === 0 && otherDocuments.length === 0) return;
      const snackbarKey = showSnackbar(getDocumentUploadTranslation([...identityDocuments, ...otherDocuments], t), {
        persist: true,
        severity: 'info',
      });
      await addDocumentsSync(subjectId, identityDocuments, otherDocuments);
      closeSnackbar(snackbarKey);
    };

    void addDocumentsAsync();
  };

  const updateDocumentSync = async (
    subjectId: number,
    document: DocumentFormInput,
    fallbackCategory: ContentCategory.SbjIdentityNational | ContentCategory.SbjOther,
  ) => {
    const input = parseDocumentFormInputToDocumentInput(document, {
      fallbackCategory,
      fallbackIssueDate: document.since,
    });

    const result = await updateSubjectDocumentMutation({ subjectId, input });
    if (result.data?.subject.document.update.isSuccess) {
      showSnackbar(t('core.feedback.document_updated'), 'success');
      return Promise.resolve(true);
    } else {
      showError(result.data?.subject.document.update.validationErrors, t('core.error.upload'));
      return Promise.resolve(false);
    }
  };

  return {
    checkCanBeGroupLeader,
    checkCanUseInternalCode,
    checkCanUseInterGroupSignature,
    checkItalianTaxId,
    getInternalCode,
    addDocumentsSync,
    addDocumentsAsync,
    updateDocumentSync,
  };
};
