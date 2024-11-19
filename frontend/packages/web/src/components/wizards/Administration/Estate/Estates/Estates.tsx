import { Grid2 } from '@mui/material';
import { Loader, PrimaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { useTable } from '@realgimm5/frontend-common/contexts';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { EstateFragment } from '../../../../../gql/RealGimm.Web.Estate.fragment';
import { GetEstatesQueryVariables, useGetEstatesQuery } from '../../../../../gql/RealGimm.Web.Estate.operation';
import { getEstatesColumns } from '../../../../../utils/estate/getEstatesColumns';
import { getEstatesFilterInput } from '../../../../../utils/estate/getEstatesFilterInput';
import { getEstatesSortInput } from '../../../../../utils/estate/getEstatesSortInput';
import { AdministrationEstatesProps } from './Estates.types';

export const AdministrationEstates = ({ setValue }: AdministrationEstatesProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { initialState, pause, variables, handleFilter, handlePageChange, handleSort, setInitialState } =
    useTable<GetEstatesQueryVariables>();
  const [queryState] = useGetEstatesQuery({ pause, variables });
  const estates = useMemo(() => queryState.data?.estate.listEstates, [queryState.data]);

  const handleRowSelected = useCallback(
    (row: EstateFragment | null) => {
      setValue(
        'estate',
        row
          ? {
              id: row.id,
              internalCode: row.internalCode,
              name: row.name!,
              mainUsageTypeName: row.mainUsageType.name,
            }
          : null,
      );
    },
    [setValue],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {queryState.fetching && <Loader />}
      <SectionTitle value="administration.section_title.estate" />
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
