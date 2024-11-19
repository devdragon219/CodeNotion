import { IncomeType } from '@realgimm5/frontend-common/gql/types';

import { AsstAddressFragment } from '../../gql/RealGimm.Web.AsstAddress.fragment';
import { CadastralCoordinatesFragment } from '../../gql/RealGimm.Web.CadastralCoordinates.fragment';

export interface AssetTaxPaymentFormInput {
  actualizedCadastralIncome?: number | null;
  address?: AsstAddressFragment | null;
  amountPaid?: number | null;
  baseTaxableAmount?: number | null;
  cadastralCoordinates?: CadastralCoordinatesFragment[] | null;
  cadastralUnitIncome?: {
    macroCategory?: string | null;
    microCategory?: string | null;
    metricAmount?: number | null;
    type?: IncomeType | null;
  } | null;
  cadastralUnitTaxConfig?: {
    value?: string | null;
  } | null;
  cityName?: string | null;
  estatesCount?: number | null;
  estateInternalCode?: string | null;
  estateUnitsCount?: number | null;
  estateUnitInternalCode?: string | null;
  estateUnitOwnershipPercent?: number | null;
  grossCadastralIncome?: number | null;
  subRows?: AssetTaxPaymentFormInput[];
  totalActualizedCadastralIncome?: number | null;
  totalAmountPaid?: number | null;
  totalBaseTaxableAmount?: number | null;
  totalGrossCadastralIncome?: number | null;
}
