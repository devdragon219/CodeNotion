import { ContentCategoryDomain } from '@realgimm5/frontend-common/enums';
import {
  getContentCategoryGroupOptions,
  getContentCategoryOptions,
  getDefaultDocumentFieldsConfig,
  getDocumentsTableColumns,
} from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';

export const getEstateDocumentsColumns = (t: TFunction) =>
  getDocumentsTableColumns(t, {
    contentCategoryGroupOptions: getContentCategoryGroupOptions(ContentCategoryDomain.Building),
    contentCategoryOptions: getContentCategoryGroupOptions(ContentCategoryDomain.Building).flatMap(
      (contentCategoryGroup) => getContentCategoryOptions(contentCategoryGroup),
    ),
    extraGroupingColumns: [
      {
        id: 'estateInternalCode',
        label: 'document.field.estate',
        enableColumnFilter: true,
        enableGlobalFilter: true,
        enableSorting: true,
      },
    ],
    fieldsConfig: getDefaultDocumentFieldsConfig(),
    useExpiredColumn: true,
    useGroupByContentCategory: true,
    useGroupByContentCategoryGroup: true,
    useSelectableColumn: true,
  });
