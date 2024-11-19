import {
  getArrayDocumentsSchema,
  getDefaultDocumentFieldsConfig,
  getDocumentsSchema,
} from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { object } from 'yup';

export const getEstateDocumentsSchema = (language: string, t: TFunction) =>
  getDocumentsSchema(language, t, {
    fieldsConfig: getDefaultDocumentFieldsConfig(),
  });

export const getEstateImagesSchema = (language: string, t: TFunction) =>
  object().shape({
    images: getArrayDocumentsSchema(language, t),
  });

export const getEstateDocumentsAndImagesSchema = (language: string, t: TFunction) =>
  getEstateDocumentsSchema(language, t).concat(getEstateImagesSchema(language, t));
