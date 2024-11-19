import { TFunction } from 'i18next';

import { CostChargeAnalysisFilterType } from '../../enums/CostChargeAnalysisFilterType';

export const getCostChargeAnalysisFilterTypeLabel = (t: TFunction) => (option: CostChargeAnalysisFilterType) => {
  switch (option) {
    case CostChargeAnalysisFilterType.City:
      return t('cost_charge_analysis.field.city');
    case CostChargeAnalysisFilterType.County:
      return t('cost_charge_analysis.field.county');
    case CostChargeAnalysisFilterType.Estates:
      return t('cost_charge_analysis.field.estate');
    case CostChargeAnalysisFilterType.Toponymy:
      return t('cost_charge_analysis.field.toponymy');
    case CostChargeAnalysisFilterType.UtilityServices:
      return t('cost_charge_analysis.field.utility_service');
    case CostChargeAnalysisFilterType.UtilityTypes:
      return t('cost_charge_analysis.field.utility_type');
  }
};
