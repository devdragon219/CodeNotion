import { CostChargeAnalysisPeriod } from '../../enums/CostChargeAnalysisPeriod';
import { CostChargeAnalysisValueFragment } from '../../gql/RealGimm.Web.CostChargeAnalysisValue.fragment';

export const getCostChargeAnalysisValue = (
  value: CostChargeAnalysisValueFragment,
  type: 'consumption' | 'cost',
  period: CostChargeAnalysisPeriod,
) => {
  const getValue = () => {
    if (type === 'consumption') {
      switch (period) {
        case CostChargeAnalysisPeriod.PerHeatingCoolingSurface:
          return value.consumptionPerHeatingCoolingSurface;
        case CostChargeAnalysisPeriod.PerGrossSurface:
          return value.consumptionPerGrossSurface;
        case CostChargeAnalysisPeriod.Total:
          return value.totalConsumption;
      }
    } else {
      switch (period) {
        case CostChargeAnalysisPeriod.PerHeatingCoolingSurface:
          return value.costPerHeatingCoolingSurface;
        case CostChargeAnalysisPeriod.PerGrossSurface:
          return value.costPerGrossSurface;
        case CostChargeAnalysisPeriod.Total:
          return value.totalCost;
      }
    }
  };

  return getValue() ?? 0;
};
