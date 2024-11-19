import { TaxConfigMainTable } from './Main/Main';
import { TaxConfigSubTable } from './Sub/Sub';
import { TaxConfigTableProps } from './TaxConfig.types';

export const TaxConfigTable = ({ subTable, ...props }: TaxConfigTableProps) =>
  subTable ? <TaxConfigSubTable {...props} subTable={subTable} /> : <TaxConfigMainTable {...props} />;
