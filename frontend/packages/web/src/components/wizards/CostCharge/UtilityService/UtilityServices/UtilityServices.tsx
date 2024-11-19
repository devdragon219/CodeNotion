import { Grid2, Typography } from '@mui/material';
import { Loader, PrimaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { useTable } from '@realgimm5/frontend-common/contexts';
import { MouseEvent, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { UtilityServiceFragment } from '../../../../../gql/RealGimm.Web.UtilityService.fragment';
import {
  GetUtilityServicesQueryVariables,
  useGetUtilityServicesQuery,
} from '../../../../../gql/RealGimm.Web.UtilityService.operation';
import { getEmptyCostChargeConsumptionFormInput } from '../../../../../utils/costCharge/initialValues';
import { parseUtilityTypeChargeFieldsToFormViewerFieldFormInputs } from '../../../../../utils/costCharge/parseCostChargeFragment';
import { getUtilityServicesColumns } from '../../../../../utils/utilityService/getUtilityServicesColumns';
import { getUtilityServicesFilterInput } from '../../../../../utils/utilityService/getUtilityServicesFilterInput';
import { getUtilityServicesSortInput } from '../../../../../utils/utilityService/getUtilityServicesSortInput';
import { CostChargeUtilityServicesProps } from './UtilityServices.types';

export const CostChargeUtilityServices = ({
  onShowAllUtilityServiceEstateUnits,
  onShowAllUtilityServiceEstates,
  setValue,
}: CostChargeUtilityServicesProps) => {
  const { t } = useTranslation();
  const { initialState, pause, variables, handleFilter, handlePageChange, handleSort, setInitialState } =
    useTable<GetUtilityServicesQueryVariables>();
  const [queryState] = useGetUtilityServicesQuery({ pause, variables });
  const utilityServices = useMemo(() => queryState.data?.utilityService.listUtilityServices, [queryState.data]);

  const handleRowSelected = useCallback(
    (row: UtilityServiceFragment | null) => {
      setValue('utilityService', row);

      const timeOfUseRateCount = row?.utilityType.timeOfUseRateCount;
      setValue('consumptions.actual', getEmptyCostChargeConsumptionFormInput(timeOfUseRateCount));
      setValue('consumptions.expected', getEmptyCostChargeConsumptionFormInput(timeOfUseRateCount));
      setValue(
        'fields',
        row ? parseUtilityTypeChargeFieldsToFormViewerFieldFormInputs(row.utilityType.chargeFields ?? [], []) : [],
      );
    },
    [setValue],
  );

  const showAllEstatesButton = useCallback(
    (row: UtilityServiceFragment) => {
      const onClick = (e: MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        onShowAllUtilityServiceEstates(row);
      };

      return (
        <Typography variant="link" onClick={onClick}>
          {t('core.button.show_all')}
        </Typography>
      );
    },
    [onShowAllUtilityServiceEstates, t],
  );

  const showAllEstateUnitsButton = useCallback(
    (row: UtilityServiceFragment) => {
      const onClick = (e: MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        onShowAllUtilityServiceEstateUnits(row);
      };

      return (
        <Typography variant="link" onClick={onClick}>
          {t('core.button.show_all')}
        </Typography>
      );
    },
    [onShowAllUtilityServiceEstateUnits, t],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {queryState.fetching && <Loader />}
      <SectionTitle value="cost_charge.section_title.select_utility_service" />
      <Grid2 size={12}>
        <PrimaryTable
          color="secondary"
          columns={getUtilityServicesColumns(t, showAllEstatesButton, showAllEstateUnitsButton)}
          empty="utility_service.text.no_utility_services"
          initialState={initialState}
          rows={utilityServices?.nodes ?? []}
          totalCount={utilityServices?.totalCount ?? 0}
          useRowSelection={false}
          getRowId={({ id }) => String(id)}
          onFilter={handleFilter(getUtilityServicesFilterInput)}
          onPageChange={handlePageChange(utilityServices?.pageInfo)}
          onStateChange={setInitialState}
          onSort={handleSort(getUtilityServicesSortInput)}
          onRowSelected={handleRowSelected}
        />
      </Grid2>
    </Grid2>
  );
};
