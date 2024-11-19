import { TFunction } from 'i18next';

import { getPenaltiesSchema } from '../../penalty/schemas/penalties';

export const getFacilityContractPenaltiesSchema = (t: TFunction) => getPenaltiesSchema({}, t);
