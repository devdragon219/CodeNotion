import { DocumentsTableRow } from '@realgimm5/frontend-common/interfaces';

export interface EstatePortfolioCatalogueItemsDocumentsProps {
  catalogueItemIds: number[];
  selectedRows?: DocumentsTableRow[];
  onRowsSelected?: (rows: DocumentsTableRow[]) => void;
}
