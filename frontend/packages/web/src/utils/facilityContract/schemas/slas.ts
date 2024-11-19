import { TFunction } from 'i18next';

import { getSlasSchema } from '../../sla/schemas/slas';

export const getFacilityContractSlasSchema = (t: TFunction) => getSlasSchema({}, t);
