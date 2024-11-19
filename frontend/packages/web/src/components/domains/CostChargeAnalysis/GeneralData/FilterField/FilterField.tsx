import { Grid2 } from '@mui/material';
import { SelectField } from '@realgimm5/frontend-common/components';
import { CostChargeAnalysisFiltersInput } from '@realgimm5/frontend-common/gql/types';
import { useCallback, useMemo } from 'react';
import { Controller, ControllerProps, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CostChargeAnalysisFilterType } from '../../../../../enums/CostChargeAnalysisFilterType';
import {
  CostChargeAnalysisAddressFilterValue,
  CostChargeAnalysisCityFilterValue,
  CostChargeAnalysisCountyFilterValue,
  CostChargeAnalysisEstateFilterValue,
  CostChargeAnalysisFormInput,
  CostChargeAnalysisUtilityServiceFilterValue,
  CostChargeAnalysisUtilityTypeFilterValue,
} from '../../../../../interfaces/FormInputs/CostChargeAnalysis';
import { getCostChargeAnalysisFilterTypeLabel } from '../../../../../utils/costChargesAnalysis/getCostChargeAnalysisFilterTypeLabel';
import { parseCostChargeAnalysisFormInputToCostChargeAnalysisFiltersInput } from '../../../../../utils/costChargesAnalysis/parseCostChargeAnalysisFormInput';
import { CostChargeAnalysisCityField } from './CityField/CityField';
import { CostChargeAnalysisCountyField } from './CountyField/CountyField';
import { CostChargeAnalysisEstatesField } from './EstatesField/EstatesField';
import { CostChargeAnalysisFilterFieldProps } from './FilterField.types';
import { CostChargeAnalysisToponymyField } from './ToponymyField/ToponymyField';
import { CostChargeAnalysisUtilityServicesField } from './UtilityServicesField/UtilityServicesField';
import { CostChargeAnalysisUtilityTypesField } from './UtilityTypesField/UtilityTypesField';

export const CostChargeAnalysisFilterField = ({
  control,
  errors,
  index,
  setValue,
}: CostChargeAnalysisFilterFieldProps) => {
  const { t } = useTranslation();
  const fields = useWatch({ control, name: 'filters' });
  const filterType = useWatch({ control, name: `filters.${index}.filterType` });

  const filterTypes = useMemo(() => {
    const existingFilterTypes = fields.slice(0, index).map(({ filterType }) => filterType);

    return Object.values(CostChargeAnalysisFilterType).filter(
      (filterType) => !existingFilterTypes.includes(filterType),
    );
  }, [fields, index]);

  const filters = useMemo(
    (): CostChargeAnalysisFiltersInput =>
      parseCostChargeAnalysisFormInputToCostChargeAnalysisFiltersInput({
        filters: fields.slice(0, index),
      }),
    [fields, index],
  );

  const handleFilterTypeChange = useCallback(
    (onChange: (filterType: CostChargeAnalysisFilterType | null) => void) =>
      (filterType: CostChargeAnalysisFilterType | null) => {
        onChange(filterType);

        if (filterType) {
          switch (filterType) {
            case CostChargeAnalysisFilterType.City:
            case CostChargeAnalysisFilterType.County:
            case CostChargeAnalysisFilterType.Toponymy:
              setValue(`filters.${index}.value`, null);
              break;
            case CostChargeAnalysisFilterType.Estates:
            case CostChargeAnalysisFilterType.UtilityServices:
            case CostChargeAnalysisFilterType.UtilityTypes:
              setValue(`filters.${index}.value`, []);
          }
        } else {
          setValue(`filters.${index}.value`, null);
        }
      },
    [index, setValue],
  );

  const renderFilterValueField = useCallback<
    ControllerProps<CostChargeAnalysisFormInput, `filters.${number}.value`>['render']
  >(
    ({ field }) => {
      if (!filterType) return <></>;

      const props = {
        ...field,
        filters,
        label: getCostChargeAnalysisFilterTypeLabel(t)(filterType),
        error: !!errors.filters?.[index]?.value,
        helperText: errors.filters?.[index]?.value?.message,
      };

      switch (filterType) {
        case CostChargeAnalysisFilterType.City:
          return <CostChargeAnalysisCityField {...props} value={field.value as CostChargeAnalysisCityFilterValue} />;
        case CostChargeAnalysisFilterType.County:
          return (
            <CostChargeAnalysisCountyField {...props} value={field.value as CostChargeAnalysisCountyFilterValue} />
          );
        case CostChargeAnalysisFilterType.Estates:
          return (
            <CostChargeAnalysisEstatesField {...props} value={field.value as CostChargeAnalysisEstateFilterValue[]} />
          );
        case CostChargeAnalysisFilterType.Toponymy:
          return (
            <CostChargeAnalysisToponymyField {...props} value={field.value as CostChargeAnalysisAddressFilterValue} />
          );
        case CostChargeAnalysisFilterType.UtilityServices:
          return (
            <CostChargeAnalysisUtilityServicesField
              {...props}
              value={field.value as CostChargeAnalysisUtilityServiceFilterValue[]}
            />
          );
        case CostChargeAnalysisFilterType.UtilityTypes:
          return (
            <CostChargeAnalysisUtilityTypesField
              {...props}
              value={field.value as CostChargeAnalysisUtilityTypeFilterValue[]}
            />
          );
      }
    },
    [errors.filters, filterType, filters, index, t],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name={`filters.${index}.filterType`}
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('cost_charge_analysis.field.filter_type')}
              onChange={handleFilterTypeChange(field.onChange)}
              options={filterTypes}
              getOptionLabel={getCostChargeAnalysisFilterTypeLabel(t)}
              error={!!errors.filters?.[index]?.filterType}
              helperText={errors.filters?.[index]?.filterType?.message}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller name={`filters.${index}.value`} control={control} render={renderFilterValueField} />
      </Grid2>
    </Grid2>
  );
};
