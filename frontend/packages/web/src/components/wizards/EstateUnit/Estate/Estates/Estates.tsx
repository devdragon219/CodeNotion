import { Grid2 } from '@mui/material';
import { Loader, PrimaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { useTable } from '@realgimm5/frontend-common/contexts';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ALLOWED_ESTATE_OWNERSHIPS } from '../../../../../configs/ownership';
import { EstateFragment } from '../../../../../gql/RealGimm.Web.Estate.fragment';
import { GetEstatesQueryVariables, useGetEstatesQuery } from '../../../../../gql/RealGimm.Web.Estate.operation';
import { FloorFormInput } from '../../../../../interfaces/FormInputs/Floor';
import { getEstatesColumns } from '../../../../../utils/estate/getEstatesColumns';
import { getEstatesFilterInput } from '../../../../../utils/estate/getEstatesFilterInput';
import { getEstatesSortInput } from '../../../../../utils/estate/getEstatesSortInput';
import { EstateUnitEstatesProps } from './Estates.types';

export const EstateUnitEstates = ({ setValue }: EstateUnitEstatesProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { initialState, pause, variables, handleFilter, handlePageChange, handleSort, setInitialState } =
    useTable<GetEstatesQueryVariables>((variables) => ({
      ...variables,
      where: {
        ...(variables.where ?? {}),
        ownership: {
          in: ALLOWED_ESTATE_OWNERSHIPS,
        },
      },
    }));
  const [queryState] = useGetEstatesQuery({ pause, variables });
  const estates = useMemo(() => queryState.data?.estate.listEstates, [queryState.data]);

  const handleRowSelected = useCallback(
    (row: EstateFragment | null) => {
      setValue('estate', row);
      setValue('address', null);
      setValue('floors', [] as FloorFormInput[]);
      setValue('stair', null);
    },
    [setValue],
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
