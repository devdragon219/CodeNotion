import { Trend } from '@realgimm5/frontend-common/gql/types';

export interface ExpenseItemProps {
  index: number;
  trend: Trend;
  value: number;
}
