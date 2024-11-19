import { Loader, TransferList } from '@realgimm5/frontend-common/components';
import { useMemo } from 'react';
import { Controller } from 'react-hook-form';

import { useGetAllPriceListsQuery } from '../../../../../gql/RealGimm.Web.PriceList.operation';
import { FacilityContractPriceListsTransferListProps } from './TransferList.types';

export const FacilityContractPriceListsTransferList = ({
  control,
  where,
}: FacilityContractPriceListsTransferListProps) => {
  const [queryState] = useGetAllPriceListsQuery({
    variables: {
      where,
    },
  });
  const priceLists = useMemo(() => queryState.data?.priceList.listPriceListsFull ?? [], [queryState.data]);

  return (
    <>
      {queryState.fetching && <Loader />}
      <Controller
        name="priceLists"
        control={control}
        render={({ field }) => (
          <TransferList
            {...field}
            columns={[
              {
                id: 'internalCode',
                label: 'facility_contract.field.price_list_code',
                enableColumnFilter: true,
                enableGlobalFilter: true,
                enableSorting: true,
              },
              {
                id: 'name',
                label: 'facility_contract.field.price_list_name',
                enableColumnFilter: true,
                enableGlobalFilter: true,
                enableSorting: true,
              },
            ]}
            empty="facility_contract.text.no_price_lists_selected"
            rows={priceLists}
            titles={{
              left: 'facility_contract.section_title.select_price_lists',
              right: 'facility_contract.section_title.selected_price_lists',
            }}
            getRowId={({ id }) => String(id)}
          />
        )}
      />
    </>
  );
};
