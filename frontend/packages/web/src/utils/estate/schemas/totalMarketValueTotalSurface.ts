import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { number, object } from 'yup';

export const getEstateTotalMarketValueTotalSurfaceSchema = (t: TFunction) =>
  object().shape({
    totalSurfaceAreaSqM: number().required(getRequiredTranslation('estate.field.total_surface', t)),
  });
