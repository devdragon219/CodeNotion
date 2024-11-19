import { ContentCategoryDomain } from '@realgimm5/frontend-common/enums';
import {
  getContentCategoryGroupOptions,
  getContentCategoryOptions,
  getDefaultDocumentFieldsConfig,
  getDocumentsTableColumns,
} from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';

export const getContractDocumentsColumns = (t: TFunction, useSelectableColumn = true) =>
  getDocumentsTableColumns(t, {
    contentCategoryGroupOptions: getContentCategoryGroupOptions(ContentCategoryDomain.Building),
    contentCategoryOptions: getContentCategoryGroupOptions(ContentCategoryDomain.Building).flatMap(
      (contentCategoryGroup) => getContentCategoryOptions(contentCategoryGroup),
    ),
    extraGroupingColumns: [
      {
        id: 'contractInternalCode',
        label: 'document.field.contract',
        enableColumnFilter: true,
        enableGlobalFilter: true,
        enableSorting: true,
      },
    ],
    fieldsConfig: getDefaultDocumentFieldsConfig(),
    useExpiredColumn: true,
    useGroupByContentCategory: true,
    useGroupByContentCategoryGroup: true,
    useSelectableColumn,
  });
