import { Loader, TransferList } from '@realgimm5/frontend-common/components';
import { EstateUnitStatus, EstateUnitType } from '@realgimm5/frontend-common/gql/types';
import { useMemo } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useGetAllEstateUnitsQuery } from '../../../../../gql/RealGimm.Web.EstateUnit.operation';
import { parseAddressToString } from '../../../../../utils/addressUtils';
import { FacilityContractEstateUnitsTransferListProps } from './TransferList.types';

export const FacilityContractEstateUnitsTransferList = ({
  control,
  where,
}: FacilityContractEstateUnitsTransferListProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const estateUnitGroup = useWatch({ control, name: 'originalEstateUnitGroup' });
  const [queryState] = useGetAllEstateUnitsQuery({
    variables: {
      where: {
        status: {
          eq: EstateUnitStatus.Existing,
        },
        estate: {
          catalogueItems: {
            any: true,
          },
        },
        ...(estateUnitGroup
          ? {
              id: {
                in: estateUnitGroup.estateUnits.map(({ id }) => id),
              },
            }
          : {}),
        ...(where ?? {}),
      },
    },
  });
  const estateUnits = useMemo(() => queryState.data?.estateUnit.listEstateUnitsFull ?? [], [queryState.data]);

  return (
    <>
      {queryState.fetching && <Loader />}
      <Controller
        name="estateUnits"
        control={control}
        render={({ field }) => (
          <TransferList
            {...field}
            columns={[
              {
                id: 'internalCode',
                label: 'facility_contract.field.estate_unit_code',
                enableColumnFilter: true,
                enableGlobalFilter: true,
                enableSorting: true,
              },
              {
                id: 'name',
                label: 'facility_contract.field.estate_unit_name',
                enableColumnFilter: true,
                enableGlobalFilter: true,
                enableSorting: true,
              },
              {
                id: 'address',
                label: 'facility_contract.field.estate_unit_address',
                enableColumnFilter: true,
                enableGlobalFilter: true,
                enableSorting: true,
                getRowValue: (row) => parseAddressToString(row.address, language, 'short'),
              },
              {
                id: 'type',
                label: 'facility_contract.field.estate_unit_type',
                enableGlobalFilter: true,
                options: Object.values(EstateUnitType),
                getOptionLabel: (option) => t(`common.enum.estate_unit_type.${option as EstateUnitType}`),
              },
            ]}
            empty="facility_contract.text.no_estate_units_selected"
            rows={estateUnits}
            titles={{
              left: 'facility_contract.section_title.select_estate_units',
              right: 'facility_contract.section_title.selected_estate_units',
            }}
            getRowId={({ id }) => String(id)}
          />
        )}
      />
    </>
  );
};
