import { useMemo } from 'react';

import { DEFAULT_MAX_UPLOADABLE_FILES } from '../configs/defaults';
import { DocumentFormInput } from '../interfaces/FormInputs/Document';

export const useDocumentsCount = (
  documents: DocumentFormInput[],
  maxUploadableFiles = DEFAULT_MAX_UPLOADABLE_FILES,
) => {
  const remainingUploads = useMemo(() => {
    const filesBeingUploadedCount = documents.filter(
      ({ content }) => !!content && !!content.size && content.size > 0,
    ).length;
    return maxUploadableFiles - filesBeingUploadedCount;
  }, [documents, maxUploadableFiles]);

  const remainingDocuments = useMemo(() => {
    const existingDocumentsCount = documents.length;
    return maxUploadableFiles - existingDocumentsCount;
  }, [documents, maxUploadableFiles]);

  const canUploadMoreFiles = useMemo(() => remainingUploads > 0, [remainingUploads]);

  const canAddMoreDocuments = useMemo(() => remainingDocuments > 0, [remainingDocuments]);

  return { canAddMoreDocuments, canUploadMoreFiles, remainingDocuments, remainingUploads };
};
