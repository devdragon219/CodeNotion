import { ContentCategoryDomain } from '@realgimm5/frontend-common/enums';
import { DocumentsTableRow, TableColumn } from '@realgimm5/frontend-common/interfaces';
import {
  getContentCategoryGroupOptions,
  getContentCategoryOptions,
  getDefaultDocumentFieldsConfig,
  getDocumentsTableColumns,
} from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';

export const getCatalogueDocumentsColumns = (t: TFunction, useEstateColumn = true, useSelectableColumn = true) =>
  getDocumentsTableColumns(t, {
    contentCategoryGroupOptions: getContentCategoryGroupOptions(ContentCategoryDomain.Catalogue),
    contentCategoryOptions: getContentCategoryGroupOptions(ContentCategoryDomain.Catalogue).flatMap(
      (contentCategoryGroup) => getContentCategoryOptions(contentCategoryGroup),
    ),
    extraColumns: [
      {
        id: 'catalogueItemInternalCode',
        label: 'document.field.catalogue_item',
        enableColumnFilter: true,
        enableGlobalFilter: true,
      },
    ],
    extraGroupingColumns: [
      ...((useEstateColumn
        ? [
            {
              id: 'estateInternalCode',
              label: 'document.field.estate',
              enableColumnFilter: true,
              enableGlobalFilter: true,
              enableSorting: true,
            },
          ]
        : []) as TableColumn<DocumentsTableRow>[]),
      {
        id: 'categoryName',
        label: 'document.field.catalogue_category',
        enableColumnFilter: true,
        enableGlobalFilter: true,
      },
      {
        id: 'subCategoryName',
        label: 'document.field.catalogue_sub_category',
        enableColumnFilter: true,
        enableGlobalFilter: true,
        getRowValue: (row) => ('subCategoryName' in row ? (row.subCategoryName ?? t('core.text.uncategorized')) : ''),
      },
      {
        id: 'catalogueTypeName',
        label: 'document.field.catalogue_type',
        enableColumnFilter: true,
        enableGlobalFilter: true,
      },
    ],
    fieldsConfig: getDefaultDocumentFieldsConfig(),
    useExpiredColumn: true,
    useGroupByContentCategory: true,
    useGroupByContentCategoryGroup: true,
    useSelectableColumn,
  });
