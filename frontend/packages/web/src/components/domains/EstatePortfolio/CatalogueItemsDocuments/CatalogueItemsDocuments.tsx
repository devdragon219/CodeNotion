import { DocumentsTable } from '@realgimm5/frontend-common/components';
import { useTranslation } from 'react-i18next';

import {
  GetCatalogueItemsDocumentsDocument,
  GetCatalogueItemsDocumentsQueryVariables,
} from '../../../../gql/RealGimm.Web.CatalogueItem.operation';
import { getCatalogueDocumentsColumns } from '../../../../utils/document/catalogueDocuments/getCatalogueDocumentsColumns';
import { getCatalogueDocumentsFilterInput } from '../../../../utils/document/catalogueDocuments/getCatalogueDocumentsFilterInput';
import { EstatePortfolioCatalogueItemsDocumentsProps } from './CatalogueItemsDocuments.types';

export const EstatePortfolioCatalogueItemsDocuments = ({
  catalogueItemIds,
  selectedRows,
  onRowsSelected,
}: EstatePortfolioCatalogueItemsDocumentsProps) => {
  const { t } = useTranslation();

  return (
    <DocumentsTable<GetCatalogueItemsDocumentsQueryVariables>
      color="secondary"
      columns={getCatalogueDocumentsColumns(t, false, !!onRowsSelected)}
      documentsKey="listDocuments"
      query={GetCatalogueItemsDocumentsDocument}
      useDownload={!onRowsSelected}
      defaultVariables={(variables) => ({
        ...variables,
        catalogueItemIds,
      })}
      initialState={
        selectedRows
          ? {
              rowSelection: selectedRows.reduce<Record<string, boolean>>(
                (acc, row) => ({
                  ...acc,
                  [String(row.cmisId ?? row.guid)]: true,
                }),
                {},
              ),
            }
          : undefined
      }
      onFilter={getCatalogueDocumentsFilterInput}
      onRowsSelected={onRowsSelected}
    />
  );
};
