import { ConfigFunction } from '@realgimm5/frontend-common/gql/types';

export interface ConfigFormInput {
  configId: number | null;
  function: ConfigFunction;
  lastUpdated: Date | null;
  name: string;
  subRows?: ConfigFormInput[];
  value: string;
}
