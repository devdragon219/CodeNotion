import { Grid2, Theme } from '@mui/material';
import { Loader, PrimaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { useTable } from '@realgimm5/frontend-common/contexts';
import { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { EstateFragment } from '../../../../gql/RealGimm.Web.Estate.fragment';
import { GetEstatesQueryVariables, useGetEstatesQuery } from '../../../../gql/RealGimm.Web.Estate.operation';
import { FloorFormInput } from '../../../../interfaces/FormInputs/Floor';
import { getEstatesColumns } from '../../../../utils/estate/getEstatesColumns';
import { getEstatesFilterInput } from '../../../../utils/estate/getEstatesFilterInput';
import { getEstatesSortInput } from '../../../../utils/estate/getEstatesSortInput';
import { EstateUnitActionEstateProps } from './Estate.types';

export const EstateUnitActionEstate = ({ cityName, keepTopIds, onChange, setValue }: EstateUnitActionEstateProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { initialState, pause, variables, handleFilter, handlePageChange, handleSort, setInitialState } =
    useTable<GetEstatesQueryVariables>((variables) => ({
      ...variables,
      keepTopIds,
      where: {
        ...(variables.where ?? {}),
        addresses: {
          some: {
            cityName: {
              eq: cityName,
            },
          },
        },
      },
    }));
  const [queryState] = useGetEstatesQuery({ pause, variables });
  const estates = useMemo(() => queryState.data?.estate.listEstates, [queryState.data]);

  useEffect(() => {
    onChange?.(initialState);
    // eslint-disable-next-line
  }, [initialState]);

  const handleRowSelected = useCallback(
    (row: EstateFragment | null) => {
      setValue('estate', row);
      setValue('address', null);
      setValue('floors', [] as FloorFormInput[]);
      setValue('stair', null);
    },
    [setValue],
  );

  const handleRowStyle = useCallback(
    (row: EstateFragment, theme: Theme) =>
      (Array.isArray(keepTopIds) ? keepTopIds : [keepTopIds]).includes(row.id)
        ? {
            borderBottom: `2px solid ${theme.palette.grey[400]}`,
          }
        : {},
    [keepTopIds],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {queryState.fetching && <Loader />}
      <SectionTitle value="estate_unit.section_title.estate" />
      <Grid2 size={12}>
        <PrimaryTable
          color="secondary"
          columns={getEstatesColumns(language, t)}
          empty="estate.text.no_estates"
          initialState={initialState}
          rows={estates?.nodes ?? []}
          totalCount={estates?.totalCount ?? 0}
          useRowSelection={false}
          getRowId={({ id }) => String(id)}
          getRowStyle={handleRowStyle}
          onFilter={handleFilter(getEstatesFilterInput)}
          onPageChange={handlePageChange(estates?.pageInfo)}
          onStateChange={setInitialState}
          onSort={handleSort(getEstatesSortInput)}
          onRowSelected={handleRowSelected}
        />
      </Grid2>
    </Grid2>
  );
};
