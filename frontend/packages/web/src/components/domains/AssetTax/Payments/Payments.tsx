import { Grid2 } from '@mui/material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useTable } from '@realgimm5/frontend-common/contexts';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { RawFeature } from '../../../../enums/RawFeature';
import {
  ExportAssetTaxPaymentsDocument,
  GetAssetTaxPaymentsQueryVariables,
  useGetAssetTaxPaymentsQuery,
} from '../../../../gql/RealGimm.Web.AssetTax.operation';
import { useFeature } from '../../../../hooks/useFeature';
import { getAssetTaxPaymentsColumns } from '../../../../utils/assetTax/getAssetTaxPaymentsColumns';
import { getAssetTaxPaymentsFilterInput } from '../../../../utils/assetTax/getAssetTaxPaymentsFilterInput';
import { AssetTaxPaymentsProps } from './Payments.types';

export const AssetTaxPayments = ({
  expectedDueDate,
  managementSubjectId,
  taxCalculatorId,
  year,
}: AssetTaxPaymentsProps) => {
  const { canRead } = useFeature(RawFeature.ASST_ASSET_TAX_BASE);
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { initialState, pause, variables, handleExport, handleFilter, handlePageChange, handleSort, setInitialState } =
    useTable<GetAssetTaxPaymentsQueryVariables>((variables) => ({
      ...variables,
      taxCalculatorId,
      year,
      managementSubjectId,
      expectedDueDate,
    }));
  const [queryState] = useGetAssetTaxPaymentsQuery({ pause, variables });
  const payments = useMemo(
    () => queryState.data?.assetTax.detailGroupedPayments,
    [queryState.data?.assetTax.detailGroupedPayments],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {queryState.fetching && <Loader />}
      <Grid2 size={12}>
        <PrimaryTable
          color="secondary"
          columns={getAssetTaxPaymentsColumns(language, t)}
          empty="asset_tax.text.no_asset_tax_payments"
          initialState={initialState}
          rows={payments?.nodes ?? []}
          totalCount={payments?.totalCount ?? 0}
          useRowActions={false}
          useRowExpandCollapse
          useRowSelection={false}
          getRowId={(row) => String(row.estateUnitInternalCode ?? row.estateInternalCode ?? row.cityName)}
          getSubRows={(row) => row.subRows}
          onExport={canRead ? handleExport('cityName', ExportAssetTaxPaymentsDocument) : undefined}
          onFilter={handleFilter(getAssetTaxPaymentsFilterInput)}
          onPageChange={handlePageChange(payments?.pageInfo)}
          onSort={handleSort()}
          onStateChange={setInitialState}
        />
      </Grid2>
    </Grid2>
  );
};
