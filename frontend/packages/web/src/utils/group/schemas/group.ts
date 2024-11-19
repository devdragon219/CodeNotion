import { TFunction } from 'i18next';

import { getGroupGeneralDataSchema } from './generalData';

export const getGroupSchema = (t: TFunction) => getGroupGeneralDataSchema(t);
