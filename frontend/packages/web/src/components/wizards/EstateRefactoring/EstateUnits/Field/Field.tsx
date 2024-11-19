import { Loader, TransferList } from '@realgimm5/frontend-common/components';
import { useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useGetAllEstateUnitsQuery } from '../../../../../gql/RealGimm.Web.EstateUnit.operation';
import { parseAddressToString } from '../../../../../utils/addressUtils';
import { EstateUnitsFieldProps } from './Field.types';

export const EstateUnitsField = ({ control, estateId }: EstateUnitsFieldProps) => {
  const {
    i18n: { language },
  } = useTranslation();
  const [queryState] = useGetAllEstateUnitsQuery({
    variables: {
      where: {
        estate: {
          id: {
            eq: estateId,
          },
        },
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
                label: 'estate_unit.field.estate_unit_code',
                enableColumnFilter: true,
                enableGlobalFilter: true,
                enableSorting: true,
              },
              {
                id: 'name',
                label: 'estate_unit.field.estate_unit_name',
                enableColumnFilter: true,
                enableGlobalFilter: true,
                enableSorting: true,
              },
              {
                id: 'address',
                label: 'estate_unit.field.address_toponymy',
                enableColumnFilter: true,
                enableGlobalFilter: true,
                enableSorting: true,
                getRowValue: (row) => parseAddressToString(row.address, language, 'short'),
              },
            ]}
            empty="estate.text.no_refactorings"
            rows={estateUnits}
            titles={{
              left: 'estate.section_title.select_estate_unit',
              right: 'estate.section_title.selected_estate_unit',
            }}
            getRowId={({ id }) => String(id)}
          />
        )}
      />
    </>
  );
};
