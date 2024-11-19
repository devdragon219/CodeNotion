import { DocumentsTable } from '@realgimm5/frontend-common/components';
import { useTranslation } from 'react-i18next';

import {
  GetEstateUnitDocumentsQueryVariables,
  GetEstateUnitsDocumentsDocument,
} from '../../../../gql/RealGimm.Web.EstateUnit.operation';
import { getEstateUnitDocumentsColumns } from '../../../../utils/document/estateUnitDocuments/getEstateUnitDocumentsColumns';
import { getEstateUnitDocumentsFilterInput } from '../../../../utils/document/estateUnitDocuments/getEstateUnitDocumentsFilterInput';
import { EstatePortfolioEstateUnitsDocumentsProps } from './EstateUnitsDocuments.types';

export const EstatePortfolioEstateUnitsDocuments = ({
  estateUnitIds,
  selectedRows,
  onRowsSelected,
}: EstatePortfolioEstateUnitsDocumentsProps) => {
  const { t } = useTranslation();

  return (
    <DocumentsTable<GetEstateUnitDocumentsQueryVariables>
      color="secondary"
      columns={getEstateUnitDocumentsColumns(t, !!onRowsSelected)}
      documentsKey="listDocuments"
      query={GetEstateUnitsDocumentsDocument}
      useDownload={!onRowsSelected}
      defaultVariables={(variables) => ({
        ...variables,
        estateUnitIds,
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
      onFilter={getEstateUnitDocumentsFilterInput}
      onRowsSelected={onRowsSelected}
    />
  );
};
