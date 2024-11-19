import { Loader, TransferList } from '@realgimm5/frontend-common/components';
import { useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useGetAllCitiesQuery } from '../../../../gql/RealGimm.Web.City.operation';
import { getCountryName, getSortedCountryCodes } from '../../../../utils/countryUtils';
import { OrgUnitCitiesFieldProps } from './CitiesField.types';

export const OrgUnitCitiesField = ({ control }: OrgUnitCitiesFieldProps) => {
  const {
    i18n: { language },
  } = useTranslation();
  const [queryState] = useGetAllCitiesQuery();
  const cities = useMemo(() => queryState.data?.city.listCitiesFull ?? [], [queryState.data]);

  return (
    <>
      {queryState.fetching && <Loader />}
      <Controller
        name="cities"
        control={control}
        render={({ field }) => (
          <TransferList
            {...field}
            columns={[
              {
                id: 'name',
                label: 'org_unit.field.city',
                enableColumnFilter: true,
                enableGlobalFilter: true,
                enableSorting: true,
              },
              {
                id: 'countyName',
                label: 'org_unit.field.county',
                enableColumnFilter: true,
                enableGlobalFilter: true,
                enableSorting: true,
                getRowValue: (row) => row.countyName,
              },
              {
                id: 'countryISO',
                label: 'org_unit.field.country',
                options: getSortedCountryCodes(language),
                enableColumnFilter: true,
                getOptionLabel: (countryCode: unknown) => getCountryName(countryCode as string, language),
              },
            ]}
            empty="org_unit.dialog.cities.no_associated_cities"
            rows={cities}
            titles={{
              left: 'org_unit.dialog.cities.associable_cities',
              right: 'org_unit.dialog.cities.associated_cities',
            }}
            getRowId={({ id }) => String(id)}
          />
        )}
      />
    </>
  );
};
