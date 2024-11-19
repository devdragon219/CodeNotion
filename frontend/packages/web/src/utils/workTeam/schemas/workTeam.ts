import { TFunction } from 'i18next';

import { getWorkersSchema } from '../../components/worker/schemas/workers';
import { getWorkTeamGeneralDataSchema } from './generalData';

export const getWorkTeamSchema = (canUseInternalCode: boolean, language: string, t: TFunction) =>
  getWorkTeamGeneralDataSchema(canUseInternalCode, language, t).concat(getWorkersSchema(language, t));
