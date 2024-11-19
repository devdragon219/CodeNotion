import { Loader, TransferList } from '@realgimm5/frontend-common/components';
import { EstateUnitStatus } from '@realgimm5/frontend-common/gql/types';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useGetAllEstateUnitsQuery } from '../../../../gql/RealGimm.Web.EstateUnit.operation';
import { parseAddressToString } from '../../../../utils/addressUtils';
import { EstateUnitActionEstateUnitsTransferListProps } from './EstateUnitsTransferList.types';

export const EstateUnitActionEstateUnitsTransferList = ({
  estateUnit,
  value,
  onChange,
}: EstateUnitActionEstateUnitsTransferListProps) => {
  const {
    i18n: { language },
  } = useTranslation();
  const [queryState] = useGetAllEstateUnitsQuery({
    variables: {
      where: {
        status: {
          eq: EstateUnitStatus.Existing,
        },
        ...(estateUnit
          ? {
              address: {
                cityName: {
                  eq: estateUnit.address.city?.name,
                },
              },
            }
          : {}),
      },
    },
  });

  const estateUnits = useMemo(() => queryState.data?.estateUnit.listEstateUnitsFull ?? [], [queryState.data]);

  return (
    <>
      {queryState.fetching && <Loader />}
      <TransferList
        columns={[
          {
            id: 'internalCode',
            label: 'estate_unit.field.estate_unit_code',
            enableColumnFilter: true,
            enableGlobalFilter: true,
            enableSorting: true,
            size: 50,
          },
          {
            id: 'name',
            label: 'estate_unit.field.estate_unit_name',
            enableColumnFilter: true,
            enableGlobalFilter: true,
            enableSorting: true,
            size: 50,
          },
          {
            id: 'address',
            label: 'estate_unit.field.address_toponymy',
            enableColumnFilter: true,
            enableGlobalFilter: true,
            enableSorting: true,
            size: 50,
            getRowValue: (row) => parseAddressToString(row.address, language, 'short'),
          },
        ]}
        empty="estate_unit_merge.text.no_selected_estate_units"
        fixedValues={estateUnit ? [estateUnit] : undefined}
        rows={estateUnits}
        titles={{
          left: 'estate_unit_merge.section_title.select_estate_units',
          right: 'estate_unit_merge.section_title.selected_estate_units',
        }}
        value={value}
        getRowId={({ id }) => String(id)}
        onChange={onChange}
      />
    </>
  );
};
