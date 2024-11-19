import { Loader, TransferList } from '@realgimm5/frontend-common/components';
import { EstateUnitStatus, EstateUnitType } from '@realgimm5/frontend-common/gql/types';
import { useMemo } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useGetAllEstateUnitsQuery } from '../../../../gql/RealGimm.Web.EstateUnit.operation';
import { parseAddressToString } from '../../../../utils/addressUtils';
import { EstateUnitGroupEstateUnitsFieldProps } from './EstateUnitsField.types';

export const EstateUnitGroupEstateUnitsField = ({ control, where }: EstateUnitGroupEstateUnitsFieldProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const managementSubject = useWatch({ control, name: 'managementSubject' });
  const [queryState] = useGetAllEstateUnitsQuery({
    variables: {
      where: {
        status: {
          eq: EstateUnitStatus.Existing,
        },
        ...(managementSubject
          ? {
              managementSubjectId: {
                eq: managementSubject.id,
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
                label: 'estate_unit_group.field.estate_unit_internal_code',
                enableColumnFilter: true,
                enableGlobalFilter: true,
                enableSorting: true,
              },
              {
                id: 'name',
                label: 'estate_unit_group.field.estate_unit_name',
                enableColumnFilter: true,
                enableGlobalFilter: true,
                enableSorting: true,
              },
              {
                id: 'address',
                label: 'estate_unit_group.field.estate_unit_address',
                enableColumnFilter: true,
                enableGlobalFilter: true,
                enableSorting: true,
                getRowValue: (row) => parseAddressToString(row.address, language, 'short'),
              },
              {
                id: 'type',
                label: 'estate_unit_group.field.estate_unit_type',
                enableGlobalFilter: true,
                options: Object.values(EstateUnitType),
                getOptionLabel: (option) => t(`common.enum.estate_unit_type.${option as EstateUnitType}`),
              },
            ]}
            empty="estate_unit_group.text.no_selected_estate_units"
            rows={estateUnits}
            titles={{
              left: 'estate_unit_group.section_title.select_estate_units',
              right: 'estate_unit_group.section_title.selected_estate_units',
            }}
            getRowId={({ id }) => String(id)}
          />
        )}
      />
    </>
  );
};
