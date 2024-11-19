import { EntryStatus } from '@realgimm5/frontend-common/gql/types';
import { getArrayDocumentsSchema } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { object } from 'yup';

import {
  getSubjectIdentityDocumentFieldsConfig,
  getSubjectOtherDocumentFieldsConfig,
} from '../getSubjectDocumentFieldsConfig';

export const getSubjectDocumentsSchema = (entryStatus: EntryStatus | null, language: string, t: TFunction) =>
  getSubjectIdentityDocumentsSchema(entryStatus, language, t).concat(
    getSubjectOtherDocumentsSchema(entryStatus, language, t),
  );

export const getSubjectIdentityDocumentsSchema = (entryStatus: EntryStatus | null, language: string, t: TFunction) =>
  object().shape({
    documents: object().shape({
      identities: getArrayDocumentsSchema(language, t, {
        entryStatus,
        fieldsConfig: getSubjectIdentityDocumentFieldsConfig(),
      }),
    }),
  });

export const getSubjectOtherDocumentsSchema = (entryStatus: EntryStatus | null, language: string, t: TFunction) =>
  object().shape({
    documents: object().shape({
      others: getArrayDocumentsSchema(language, t, {
        entryStatus,
        fieldsConfig: getSubjectOtherDocumentFieldsConfig(),
      }),
    }),
  });
