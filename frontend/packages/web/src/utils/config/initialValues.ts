import { ConfigFunction } from '@realgimm5/frontend-common/gql/types';

import { ConfigFormInput } from '../../interfaces/FormInputs/Config';

export const getEmptyConfigFormInput = (): ConfigFormInput => ({
  configId: null,
  function: ConfigFunction.CmisEndpoint,
  lastUpdated: null,
  name: '',
  value: '',
});
