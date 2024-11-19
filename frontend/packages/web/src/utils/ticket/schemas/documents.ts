import {
  getArrayDocumentsSchema,
  getDefaultDocumentFieldsConfig,
  getDocumentsSchema,
} from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { object } from 'yup';

export const getTicketDocumentsSchema = (language: string, t: TFunction) =>
  getDocumentsSchema(language, t, {
    fieldsConfig: getDefaultDocumentFieldsConfig(),
  });

export const getTicketImagesSchema = (language: string, t: TFunction) =>
  object().shape({
    images: getArrayDocumentsSchema(language, t),
  });

export const getTicketDocumentsAndImagesSchema = (language: string, t: TFunction) =>
  getTicketDocumentsSchema(language, t).concat(getTicketImagesSchema(language, t));
