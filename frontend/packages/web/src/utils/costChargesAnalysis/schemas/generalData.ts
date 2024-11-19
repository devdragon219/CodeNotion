import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { ParseKeys, TFunction } from 'i18next';
import { array, mixed, object, string } from 'yup';

import { CostChargeAnalysisFilterType } from '../../../enums/CostChargeAnalysisFilterType';
import { getCostChargeAnalysisFilterTypeLabel } from '../getCostChargeAnalysisFilterTypeLabel';

export const getCostChargeAnalysisGeneralDataSchema = (t: TFunction) =>
  object().shape({
    filters: array().of(
      object().shape({
        filterType: string().required(getRequiredTranslation('cost_charge_analysis.field.filter_type', t)),
        value: mixed().test('validValue', function (value) {
          const { filterType } = this.parent as { filterType: CostChargeAnalysisFilterType | null };
          if (!filterType) return true;

          const label = getCostChargeAnalysisFilterTypeLabel(t)(filterType) as ParseKeys;
          const { createError, path } = this;
          switch (filterType) {
            case CostChargeAnalysisFilterType.City:
            case CostChargeAnalysisFilterType.County:
            case CostChargeAnalysisFilterType.Toponymy:
              return !!value || createError({ path, message: getRequiredTranslation(label, t) });
            case CostChargeAnalysisFilterType.Estates:
            case CostChargeAnalysisFilterType.UtilityServices:
            case CostChargeAnalysisFilterType.UtilityTypes:
              return (
                (Array.isArray(value) && value.length !== 0) ||
                createError({ path, message: getRequiredTranslation(label, t) })
              );
          }
        }),
      }),
    ),
  });
