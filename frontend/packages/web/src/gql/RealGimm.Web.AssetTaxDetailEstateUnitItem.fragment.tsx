// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { AsstAddressFragmentDoc } from './RealGimm.Web.AsstAddress.fragment';
import { CadastralCoordinatesFragmentDoc } from './RealGimm.Web.CadastralCoordinates.fragment';
import { CityFragmentDoc } from './RealGimm.Web.City.fragment';

export type AssetTaxDetailEstateUnitItemFragment = {
  __typename?: 'AssetTaxDetailEstateUnitItem';
  estateUnitInternalCode?: string | null;
  estateUnitOwnershipPercent?: number | null;
  amountPaid: number;
  baseTaxableAmount: number;
  grossCadastralIncome: number;
  actualizedCadastralIncome: number;
  address: {
    __typename?: 'AsstAddress';
    id: number;
    addressType: Types.AsstAddressType;
    cityName?: string | null;
    countryISO?: string | null;
    countyName?: string | null;
    localPostCode?: string | null;
    notes?: string | null;
    numbering?: string | null;
    toponymy?: string | null;
    city?: {
      __typename?: 'City';
      guid: string;
      id: number;
      name: string;
      countyName?: string | null;
      countryName?: string | null;
      countryISO: string;
      cadastralCode?: string | null;
    } | null;
    locationLatLon?: { __typename?: 'GeoJSONPointType'; coordinates?: Array<number> | null } | null;
  };
  cadastralCoordinates: Array<{
    __typename?: 'CadastralCoordinates';
    coordinateType: Types.CoordinateType;
    unmanagedOverride?: string | null;
    level1?: string | null;
    level2?: string | null;
    level3?: string | null;
    level4?: string | null;
    level5?: string | null;
    itTavPartita?: string | null;
    itTavCorpo?: string | null;
    itTavPorzione?: string | null;
    hasITTavData: boolean;
    notes?: string | null;
    id: number;
  }>;
  cadastralUnitIncome?: {
    __typename?: 'CadastralUnitIncome';
    macroCategory?: string | null;
    microCategory?: string | null;
    metricAmount?: number | null;
    type?: Types.IncomeType | null;
  } | null;
  cadastralUnitTaxConfig?: { __typename?: 'CadastralUnitTaxConfig'; id: number; value?: string | null } | null;
};

export const AssetTaxDetailEstateUnitItemFragmentDoc = gql`
  fragment AssetTaxDetailEstateUnitItemFragment on AssetTaxDetailEstateUnitItem {
    address {
      ...AsstAddressFragment
    }
    cadastralCoordinates {
      ...CadastralCoordinatesFragment
    }
    cadastralUnitIncome {
      macroCategory
      microCategory
      metricAmount
      type
    }
    cadastralUnitTaxConfig {
      id
      value
    }
    estateUnitInternalCode
    estateUnitOwnershipPercent
    amountPaid
    baseTaxableAmount
    grossCadastralIncome
    actualizedCadastralIncome
  }
`;
