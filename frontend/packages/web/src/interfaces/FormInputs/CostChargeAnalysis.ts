import { CostChargeAnalysisFilterType } from '../../enums/CostChargeAnalysisFilterType';

export interface CostChargeAnalysisAddressFilterValue {
  cityName?: string | null;
  countyName?: string | null;
  id: number;
  numbering?: string | null;
  toponymy?: string | null;
}

export interface CostChargeAnalysisCityFilterValue {
  value: string;
}

export interface CostChargeAnalysisCountyFilterValue {
  value: string;
}

export interface CostChargeAnalysisEstateFilterValue {
  id: number;
  internalCode: string;
}

export interface CostChargeAnalysisUtilityServiceFilterValue {
  id: number;
  utilityContractCode: string;
}

export interface CostChargeAnalysisUtilityTypeFilterValue {
  description: string;
  id: number;
  internalCode: string;
}

export type CostChargeAnalysisFilterFormInput =
  | {
      filterType: null;
      value: null;
    }
  | {
      filterType: CostChargeAnalysisFilterType.City;
      value: CostChargeAnalysisCityFilterValue | null;
    }
  | {
      filterType: CostChargeAnalysisFilterType.County;
      value: CostChargeAnalysisCountyFilterValue | null;
    }
  | {
      filterType: CostChargeAnalysisFilterType.Estates;
      value: CostChargeAnalysisEstateFilterValue[];
    }
  | {
      filterType: CostChargeAnalysisFilterType.Toponymy;
      value: CostChargeAnalysisAddressFilterValue | null;
    }
  | {
      filterType: CostChargeAnalysisFilterType.UtilityServices;
      value: CostChargeAnalysisUtilityServiceFilterValue[];
    }
  | {
      filterType: CostChargeAnalysisFilterType.UtilityTypes;
      value: CostChargeAnalysisUtilityTypeFilterValue[];
    };

export interface CostChargeAnalysisFormInput {
  filters: CostChargeAnalysisFilterFormInput[];
}
