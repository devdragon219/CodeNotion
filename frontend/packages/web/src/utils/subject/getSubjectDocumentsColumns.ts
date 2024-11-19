import { ContentCategory } from '@realgimm5/frontend-common/gql/types';
import { getDocumentsTableColumns } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';

import {
  getSubjectIdentityDocumentFieldsConfig,
  getSubjectOtherDocumentFieldsConfig,
} from './getSubjectDocumentFieldsConfig';

export const getSubjectIdentityDocumentsColumns = (t: TFunction) =>
  getDocumentsTableColumns(t, {
    contentCategoryOptions: [ContentCategory.SbjIdentityNational, ContentCategory.SbjIdentityPassport],
    fieldsConfig: getSubjectIdentityDocumentFieldsConfig(),
    useFilter: false,
  });

export const getSubjectOtherDocumentsColumns = (t: TFunction) =>
  getDocumentsTableColumns(t, {
    contentCategoryOptions: [ContentCategory.SbjOther],
    fieldsConfig: getSubjectOtherDocumentFieldsConfig(),
    useFilter: false,
  });
