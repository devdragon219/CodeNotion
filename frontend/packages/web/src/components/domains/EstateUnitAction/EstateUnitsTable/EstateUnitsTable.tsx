import { Grid2 } from '@mui/material';
import { Loader, PrimaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { useTable } from '@realgimm5/frontend-common/contexts';
import { EstateUnitStatus } from '@realgimm5/frontend-common/gql/types';
import { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { EstateUnitFragment } from '../../../../gql/RealGimm.Web.EstateUnit.fragment';
import {
  GetEstateUnitsQueryVariables,
  useGetEstateUnitsQuery,
} from '../../../../gql/RealGimm.Web.EstateUnit.operation';
import { getEstateUnitsColumns } from '../../../../utils/estateUnit/getEstateUnitsColumns';
import { getEstateUnitsFilterInput } from '../../../../utils/estateUnit/getEstateUnitsFilterInput';
import { getEstateUnitsSortInput } from '../../../../utils/estateUnit/getEstateUnitsSortInput';
import { EstateUnitActionEstateUnitsTableProps } from './EstateUnitsTable.types';

export const EstateUnitActionEstateUnitsTable = ({
  sectionTitle,
  onChange,
  onChangeInitialState,
}: EstateUnitActionEstateUnitsTableProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { initialState, pause, variables, handleFilter, handlePageChange, handleSort, setInitialState } =
    useTable<GetEstateUnitsQueryVariables>((variables) => ({
      ...variables,
      where: {
        ...(variables.where ?? {}),
        status: {
          eq: EstateUnitStatus.Existing,
        },
      },
    }));
  const [queryState] = useGetEstateUnitsQuery({ pause, variables });
  const estateUnits = useMemo(() => queryState.data?.estateUnit.listEstateUnits, [queryState.data]);

  useEffect(() => {
    onChangeInitialState?.(initialState);
    // eslint-disable-next-line
  }, [initialState]);

  const handleRowSelected = useCallback(
    (estateUnit: EstateUnitFragment | null) => {
      onChange(estateUnit);
    },
    [onChange],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {queryState.fetching && <Loader />}
      <SectionTitle value={sectionTitle} />
      <Grid2 size={12}>
        <PrimaryTable
          color="secondary"
          columns={getEstateUnitsColumns(language, t).filter(({ id }) => id !== 'status')}
          empty="estate_unit.text.no_estate_units"
          initialState={initialState}
          rows={estateUnits?.nodes ?? []}
          totalCount={estateUnits?.totalCount ?? 0}
          useRowSelection={false}
          getRowId={({ id }) => String(id)}
          onFilter={handleFilter(getEstateUnitsFilterInput)}
          onPageChange={handlePageChange(estateUnits?.pageInfo)}
          onStateChange={setInitialState}
          onSort={handleSort(getEstateUnitsSortInput)}
          onRowSelected={handleRowSelected}
        />
      </Grid2>
    </Grid2>
  );
};
