import { getDefaultDocumentFieldsConfig, getDocumentsSchema } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';

export const getCatalogueItemDocumentsSchema = (language: string, t: TFunction) =>
  getDocumentsSchema(language, t, {
    fieldsConfig: getDefaultDocumentFieldsConfig(),
  });
