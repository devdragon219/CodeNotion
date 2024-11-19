import { DocumentsTable } from '@realgimm5/frontend-common/components';
import { useTranslation } from 'react-i18next';

import {
  GetEstateDocumentsDocument,
  GetEstateDocumentsQueryVariables,
} from '../../../../gql/RealGimm.Web.Estate.operation';
import { getEstateDocumentsColumns } from '../../../../utils/estate/getEstateDocumentsColumns';
import { EstatePortfolioEstateProps } from './EstateDocuments.types';

export const EstatePortfolioEstateDocuments = ({
  estateId,
  selectedRows,
  onRowsSelected,
}: EstatePortfolioEstateProps) => {
  const { t } = useTranslation();

  return (
    <DocumentsTable<GetEstateDocumentsQueryVariables>
      color="secondary"
      columns={getEstateDocumentsColumns(t, !!onRowsSelected)}
      query={GetEstateDocumentsDocument}
      useDownload={!onRowsSelected}
      defaultVariables={(variables) => ({
        ...variables,
        estateId,
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
      onRowsSelected={onRowsSelected}
    />
  );
};
