import { DocumentsTableRow } from '@realgimm5/frontend-common/interfaces';

export interface EstatePortfolioEstateProps {
  estateId: number;
  selectedRows?: DocumentsTableRow[];
  onRowsSelected?: (rows: DocumentsTableRow[]) => void;
}
