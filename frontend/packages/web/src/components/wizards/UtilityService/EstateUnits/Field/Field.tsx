import { Loader, TransferList } from '@realgimm5/frontend-common/components';
import { EstateUnitType } from '@realgimm5/frontend-common/gql/types';
import { useMemo } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useGetAllEstateUnitsQuery } from '../../../../../gql/RealGimm.Web.EstateUnit.operation';
import { parseAddressToString } from '../../../../../utils/addressUtils';
import { parseCadastralCoordinatesToString } from '../../../../../utils/cadastralUnit/parseCadastralCoordinatesToString';
import { EstateUnitsFieldProps } from './Field.types';

export const EstateUnitsField = ({ control }: EstateUnitsFieldProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const estates = useWatch({ control, name: 'estates' });
  const [queryState] = useGetAllEstateUnitsQuery({
    variables: {
      where: {
        estate: {
          id: {
            in: estates.map(({ id }) => id),
          },
        },
      },
    },
  });
  const estateUnits = useMemo(
    () =>
      (queryState.data?.estateUnit.listEstateUnitsFull ?? []).map((estateUnit) => ({
        address: estateUnit.address,
        cadastralUnitCoordinates: parseCadastralCoordinatesToString(estateUnit.currentCadastralUnit?.coordinates),
        estateId: estateUnit.estate.id,
        id: estateUnit.id,
        internalCode: estateUnit.internalCode,
        name: estateUnit.name ?? '',
        subNumbering: estateUnit.subNumbering ?? '',
        type: estateUnit.type,
        usageTypeName: estateUnit.usageType.name,
      })),
    [queryState.data],
  );

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
                label: 'utility_service.field.estate_unit_code',
                enableColumnFilter: true,
                enableGlobalFilter: true,
                enableSorting: true,
              },
              {
                id: 'name',
                label: 'utility_service.field.estate_unit_name',
                enableColumnFilter: true,
                enableGlobalFilter: true,
                enableSorting: true,
              },
              {
                id: 'address',
                label: 'utility_service.field.address_toponymy',
                enableColumnFilter: true,
                enableGlobalFilter: true,
                enableSorting: true,
                getRowValue: (row) => parseAddressToString(row.address, language, 'short'),
              },
              {
                id: 'type',
                label: 'utility_service.field.estate_unit_type',
                enableColumnFilter: true,
                options: Object.values(EstateUnitType),
                multiple: true,
                getOptionLabel: (option) => t(`common.enum.estate_unit_type.${option as EstateUnitType}`),
              },
            ]}
            empty="utility_service.text.no_estate_units"
            rows={estateUnits}
            titles={{
              left: 'utility_service.section_title.select_estate_units',
              right: 'utility_service.section_title.selected_estate_units',
            }}
            getRowId={({ id }) => String(id)}
          />
        )}
      />
    </>
  );
};
