import { Grid2 } from '@mui/material';
import { Loader, PrimaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { useTable } from '@realgimm5/frontend-common/contexts';
import { EstateUnitStatus } from '@realgimm5/frontend-common/gql/types';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { EstateUnitFragment } from '../../../../../gql/RealGimm.Web.EstateUnit.fragment';
import {
  GetEstateUnitsQueryVariables,
  useGetEstateUnitsQuery,
} from '../../../../../gql/RealGimm.Web.EstateUnit.operation';
import { copyAddressFormInput } from '../../../../../utils/components/addressesField/copyAddressFormInput';
import { getEstateUnitsColumns } from '../../../../../utils/estateUnit/getEstateUnitsColumns';
import { getEstateUnitsFilterInput } from '../../../../../utils/estateUnit/getEstateUnitsFilterInput';
import { getEstateUnitsSortInput } from '../../../../../utils/estateUnit/getEstateUnitsSortInput';
import { CadastralUnitEstateUnitsProps } from './EstateUnits.types';

export const CadastralUnitEstateUnits = ({ setValue }: CadastralUnitEstateUnitsProps) => {
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
        cadastralUnits: {
          any: false,
        },
      },
    }));
  const [queryState] = useGetEstateUnitsQuery({ pause, variables });
  const estateUnits = useMemo(() => queryState.data?.estateUnit.listEstateUnits, [queryState.data]);

  const handleRowSelected = useCallback(
    (row: EstateUnitFragment | null) => {
      setValue('estateUnit', row);
      setValue('address', copyAddressFormInput(row?.address));
    },
    [setValue],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {queryState.fetching && <Loader />}
      <SectionTitle value="cadastral_unit.section_title.select_estate_unit" />
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
