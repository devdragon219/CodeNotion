import { DocumentsTableRow } from '@realgimm5/frontend-common/interfaces';

export interface EstatePortfolioEstateUnitsDocumentsProps {
  estateUnitIds: number[];
  selectedRows?: DocumentsTableRow[];
  onRowsSelected?: (rows: DocumentsTableRow[]) => void;
}
