import { ContentCategoryDomain } from '@realgimm5/frontend-common/enums';
import {
  getContentCategoryGroupOptions,
  getContentCategoryOptions,
  getDefaultDocumentFieldsConfig,
  getDocumentsTableColumns,
} from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';

export const getFacilityContractDocumentsColumns = (t: TFunction, useSelectableColumn = true) =>
  getDocumentsTableColumns(t, {
    contentCategoryGroupOptions: getContentCategoryGroupOptions(ContentCategoryDomain.Building),
    contentCategoryOptions: getContentCategoryGroupOptions(ContentCategoryDomain.Building).flatMap(
      (contentCategoryGroup) => getContentCategoryOptions(contentCategoryGroup),
    ),
    extraGroupingColumns: [
      {
        id: 'fcltContractInternalCode',
        label: 'document.field.facility_contract',
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
