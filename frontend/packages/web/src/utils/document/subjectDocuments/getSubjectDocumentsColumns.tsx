import { ContentCategory } from '@realgimm5/frontend-common/gql/types';
import { getDocumentsTableColumns } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';

import { getSubjectDocumentFieldsConfig } from '../../subject/getSubjectDocumentFieldsConfig';

export const getSubjectDocumentsColumns = (t: TFunction) =>
  getDocumentsTableColumns(t, {
    contentCategoryOptions: [
      ContentCategory.SbjIdentityNational,
      ContentCategory.SbjIdentityPassport,
      ContentCategory.SbjOther,
    ],
    extraGroupingColumns: [
      {
        id: 'subjectInternalCode',
        label: 'document.field.subject',
        enableColumnFilter: true,
        enableGlobalFilter: true,
        enableSorting: true,
      },
    ],
    fieldsConfig: getSubjectDocumentFieldsConfig(),
    useExpiredColumn: true,
    useSelectableColumn: true,
  });
