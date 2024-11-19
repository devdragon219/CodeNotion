import { Grid2 } from '@mui/material';
import { Loader, SelectField, StepActions, StepContent, Tab, Tabs } from '@realgimm5/frontend-common/components';
import { ParseKeys } from 'i18next';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { CostChargeAnalysisFilterType } from '../../../../enums/CostChargeAnalysisFilterType';
import { useGetCostChargeAnalysisQuery } from '../../../../gql/RealGimm.Web.CostCharge.operation';
import {
  CostChargeAnalysisEstateFilterValue,
  CostChargeAnalysisUtilityServiceFilterValue,
  CostChargeAnalysisUtilityTypeFilterValue,
} from '../../../../interfaces/FormInputs/CostChargeAnalysis';
import { parseCostChargeAnalysisFormInputToCostChargeAnalysisFiltersInput } from '../../../../utils/costChargesAnalysis/parseCostChargeAnalysisFormInput';
import { CostChargeAnalysisResultsStepProps } from './Results.types';
import { CostChargeAnalysisResultTab } from './Tab/Tab';

export const CostChargeAnalysisResultsStep = ({
  costChargesAnalysis,
  onBack,
  onComplete,
}: CostChargeAnalysisResultsStepProps) => {
  const { t } = useTranslation();
  const [queryState] = useGetCostChargeAnalysisQuery({
    variables: {
      filters: parseCostChargeAnalysisFormInputToCostChargeAnalysisFiltersInput(costChargesAnalysis),
    },
  });
  const analysis = useMemo(() => queryState.data?.costCharge.analysis, [queryState.data?.costCharge.analysis]);

  const estates = useMemo(
    () =>
      (costChargesAnalysis.filters.find(({ filterType }) => filterType === CostChargeAnalysisFilterType.Estates)
        ?.value ?? []) as CostChargeAnalysisEstateFilterValue[],
    [costChargesAnalysis.filters],
  );
  const utilityTypes = useMemo(
    () =>
      (costChargesAnalysis.filters.find(({ filterType }) => filterType === CostChargeAnalysisFilterType.UtilityTypes)
        ?.value ?? []) as CostChargeAnalysisUtilityTypeFilterValue[],
    [costChargesAnalysis.filters],
  );
  const utilityServices = useMemo(
    () =>
      (costChargesAnalysis.filters.find(({ filterType }) => filterType === CostChargeAnalysisFilterType.UtilityServices)
        ?.value ?? []) as CostChargeAnalysisUtilityServiceFilterValue[],
    [costChargesAnalysis.filters],
  );

  const tabs = useMemo(
    () =>
      analysis?.map<Tab>(({ key, value }) => ({
        label: t(`common.enum.cost_charge_analysis_category.${key}`) as unknown as ParseKeys,
        children: <CostChargeAnalysisResultTab result={value} />,
      })) ?? [],
    [analysis, t],
  );

  return (
    <>
      {queryState.fetching && <Loader />}
      <StepContent sx={{ pt: 1 }}>
        {analysis && (
          <Grid2 container spacing={{ xs: 2, sm: 3 }}>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <SelectField
                multiple
                label={t('cost_charge_analysis.field.estate')}
                options={estates}
                getOptionKey={(option) => String(option.id)}
                getOptionLabel={(option) => option.internalCode}
                value={estates}
                readonly
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <SelectField
                multiple
                label={t('cost_charge_analysis.field.utility_type')}
                options={utilityTypes}
                getOptionKey={(option) => String(option.id)}
                getOptionLabel={(option) => `${option.internalCode} - ${option.description}`}
                value={utilityTypes}
                readonly
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <SelectField
                multiple
                label={t('cost_charge_analysis.field.utility_service')}
                options={utilityServices}
                getOptionKey={(option) => String(option.id)}
                getOptionLabel={(option) => option.utilityContractCode}
                value={utilityServices}
                readonly
              />
            </Grid2>
            <Grid2 size={12}>
              <Tabs tabs={tabs} />
            </Grid2>
          </Grid2>
        )}
      </StepContent>
      <StepActions completeLabel="cost_charge_analysis.action.complete" onBack={onBack} onComplete={onComplete} />
    </>
  );
};
