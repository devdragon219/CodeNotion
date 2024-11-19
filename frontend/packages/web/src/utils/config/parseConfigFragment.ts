import { parseStringToDate } from '@realgimm5/frontend-common/utils';

import { ConfigFragment } from '../../gql/RealGimm.Web.Config.fragment';
import { ConfigFormInput } from '../../interfaces/FormInputs/Config';

export const parseConfigToConfigFormInput = (config: ConfigFragment): ConfigFormInput => ({
  configId: config.id,
  function: config.function,
  name: config.name,
  value: config.value ?? '',
  lastUpdated: parseStringToDate(config.lastUpdated),
});
