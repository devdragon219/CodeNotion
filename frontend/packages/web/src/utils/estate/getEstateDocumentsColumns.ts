import { ContentCategoryDomain } from '@realgimm5/frontend-common/enums';
import {
  getContentCategoryGroupOptions,
  getContentCategoryOptions,
  getDefaultDocumentFieldsConfig,
  getDocumentsTableColumns,
} from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';

export const getEstateDocumentsColumns = (t: TFunction, useSelectableColumn?: boolean) =>
  getDocumentsTableColumns(t, {
    contentCategoryGroupOptions: getContentCategoryGroupOptions(ContentCategoryDomain.Building),
    contentCategoryOptions: getContentCategoryGroupOptions(ContentCategoryDomain.Building).flatMap(
      (contentCategoryGroup) => getContentCategoryOptions(contentCategoryGroup),
    ),
    fieldsConfig: getDefaultDocumentFieldsConfig(),
    useExpiredColumn: true,
    useGroupByContentCategory: true,
    useGroupByContentCategoryGroup: true,
    useSelectableColumn,
  });
