import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { DocumentFormInput } from '../../../../interfaces/FormInputs/Document';
import { getDocumentsTableColumns } from '../../../../utils/documentsTable/getDocumentsTableColumns';
import { PrimaryTable } from '../../../Tables/Primary/Primary';
import { DocumentFieldTableProps } from './Table.types';

export const DocumentFieldTable = ({ fieldsConfig, rows, onDelete }: DocumentFieldTableProps) => {
  const { t } = useTranslation();

  const getRowId = useCallback(({ guid }: DocumentFormInput) => String(guid), []);

  const handleDelete = useCallback(
    (rows: DocumentFormInput | DocumentFormInput[], onComplete: () => void) => {
      const row = Array.isArray(rows) ? rows[0] : rows;
      onDelete?.(row);
      onComplete();
    },
    [onDelete],
  );

  return (
    <PrimaryTable
      color="secondary"
      columns={getDocumentsTableColumns<DocumentFormInput>(t, { fieldsConfig, useFilter: false })}
      enableColumnResizing={false}
      getRowId={getRowId}
      rows={rows}
      rowActionsVariant="inline"
      useColumnVisibility={false}
      usePagination={false}
      useRowSelection={false}
      useSelectedRows={false}
      onDelete={onDelete ? handleDelete : undefined}
    />
  );
};
