import { ContentCategoryDomain } from '@realgimm5/frontend-common/enums';
import {
  getContentCategoryGroupOptions,
  getContentCategoryOptions,
  getDefaultDocumentFieldsConfig,
  getDocumentsTableColumns,
} from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';

export const getCatalogueItemDocumentsColumns = (t: TFunction) =>
  getDocumentsTableColumns(t, {
    contentCategoryGroupOptions: getContentCategoryGroupOptions(ContentCategoryDomain.Catalogue),
    contentCategoryOptions: getContentCategoryGroupOptions(ContentCategoryDomain.Catalogue).flatMap(
      (contentCategoryGroup) => getContentCategoryOptions(contentCategoryGroup),
    ),
    fieldsConfig: getDefaultDocumentFieldsConfig(),
    useExpiredColumn: true,
    useGroupByContentCategory: true,
    useGroupByContentCategoryGroup: true,
  });
