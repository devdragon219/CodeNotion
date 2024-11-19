import { Grid2 } from '@mui/material';
import {
  PrimaryTable,
  RecapSection,
  RecapSectionSimpleItem,
  SectionTitle,
  StepActions,
  StepContent,
} from '@realgimm5/frontend-common/components';
import { CoordinateType, EstateUnitType } from '@realgimm5/frontend-common/gql/types';
import { parseNumberToCurrency } from '@realgimm5/frontend-common/utils';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { parseAddressToString } from '../../../../utils/addressUtils';
import { getCoordinateType } from '../../../../utils/cadastralUnit/getCoordinateType';
import { getCountryName } from '../../../../utils/countryUtils';
import { getEstatesColumns } from '../../../../utils/estate/getEstatesColumns';
import { getEstateUnitsColumns } from '../../../../utils/estateUnit/getEstateUnitsColumns';
import { EstateUnitMergeRecapStepProps } from './Recap.types';

export const EstateUnitMergeRecapStep = ({
  estateUnitMerge,
  onBack,
  onEdit,
  onSave,
}: EstateUnitMergeRecapStepProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();

  const handleEdit = useCallback(
    (step: number) => () => {
      onEdit(step);
    },
    [onEdit],
  );

  const handleComplete = useCallback(() => {
    onSave(estateUnitMerge);
  }, [estateUnitMerge, onSave]);

  return (
    <>
      <StepContent>
        <Grid2 container spacing={{ xs: 2, sm: 3 }}>
          <SectionTitle value="estate_unit_merge.tab.recap" />
          <Grid2 size={12}>
            <RecapSection
              title="estate_unit_merge.tab.estate_units"
              items={
                <PrimaryTable
                  color="secondary"
                  columns={getEstateUnitsColumns(language, t, { useFilter: false })}
                  rows={estateUnitMerge.fromEstateUnits}
                  getRowId={({ id }) => String(id)}
                  useColumnVisibility={false}
                  usePagination={false}
                  useRowSelection={false}
                  useSelectedRows={false}
                />
              }
              onEdit={handleEdit(0)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="estate_unit_merge.tab.estate"
              items={
                <PrimaryTable
                  color="secondary"
                  columns={getEstatesColumns(language, t, { useFilter: false })}
                  rows={[estateUnitMerge.toEstateUnit.estate!]}
                  getRowId={({ id }) => String(id)}
                  useColumnVisibility={false}
                  usePagination={false}
                  useRowSelection={false}
                  useSelectedRows={false}
                />
              }
              onEdit={handleEdit(1)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="estate_unit_merge.tab.estate_unit"
              items={[
                {
                  label: 'estate_unit.field.estate_unit_code',
                  value: estateUnitMerge.toEstateUnit.internalCode,
                },
                {
                  label: 'estate_unit.field.estate_unit_name',
                  value: estateUnitMerge.toEstateUnit.name,
                },
                {
                  label: 'estate_unit.field.address_toponymy',
                  value: parseAddressToString(estateUnitMerge.toEstateUnit.address, language),
                },
                {
                  label: 'estate_unit.field.address_indoor_number',
                  value: estateUnitMerge.toEstateUnit.subNumbering,
                },
                {
                  label: 'estate_unit.field.stair',
                  value: estateUnitMerge.toEstateUnit.stair?.description,
                },
                {
                  label: 'estate_unit.field.floors',
                  value: estateUnitMerge.toEstateUnit.floors
                    .map((floor) => `(${floor.position}) ${floor.name}`)
                    .join(', '),
                },
                {
                  label: 'estate_unit.field.management_subject',
                  value: estateUnitMerge.toEstateUnit.estate?.managementSubject.name,
                },
                {
                  label: 'estate_unit.field.estate_unit_type',
                  value: estateUnitMerge.toEstateUnit.estateUnitType
                    ? t(`common.enum.estate_unit_type.${estateUnitMerge.toEstateUnit.estateUnitType}`)
                    : null,
                },
                {
                  label: 'estate_unit.field.shared_area',
                  value: estateUnitMerge.toEstateUnit.sharedArea,
                },
                {
                  label: 'estate_unit.field.ownership_type',
                  value: estateUnitMerge.toEstateUnit.ownershipType
                    ? t(`common.enum.estate_unit_ownership_type.${estateUnitMerge.toEstateUnit.ownershipType}`)
                    : null,
                },
                {
                  label: 'estate_unit.field.ownership_start_date',
                  value: estateUnitMerge.toEstateUnit.ownershipStartDate,
                },
                {
                  label: 'estate_unit.field.ownership_percentage',
                  value: estateUnitMerge.toEstateUnit.ownershipPercent,
                },
                {
                  label: 'estate_unit.field.usage_type',
                  value: estateUnitMerge.toEstateUnit.usageType?.name,
                },
                {
                  label: 'estate_unit.field.notes',
                  value: estateUnitMerge.toEstateUnit.notes,
                },
              ]}
              onEdit={handleEdit(2)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="estate_unit_merge.tab.cadastral_unit"
              items={[
                {
                  label: 'cadastral_unit.section_title.cadastral_unit_general_data',
                  value: [
                    {
                      label: 'cadastral_unit.field.cadastral_unit_code',
                      value: estateUnitMerge.toEstateUnit.cadastralUnit?.internalCode,
                    },
                    {
                      label: 'cadastral_unit.field.since',
                      value: estateUnitMerge.toEstateUnit.cadastralUnit?.since,
                    },
                    {
                      label: 'cadastral_unit.field.address_country',
                      value: estateUnitMerge.toEstateUnit.cadastralUnit?.address?.countryISO
                        ? getCountryName(estateUnitMerge.toEstateUnit.cadastralUnit.address.countryISO, language)
                        : null,
                    },
                    {
                      label: 'cadastral_unit.field.address_city',
                      value: estateUnitMerge.toEstateUnit.cadastralUnit?.address?.city.name,
                    },
                    {
                      label: 'cadastral_unit.field.address_county',
                      value: estateUnitMerge.toEstateUnit.cadastralUnit?.address?.countyName,
                    },
                    {
                      label: 'cadastral_unit.field.address_toponymy',
                      value: [
                        estateUnitMerge.toEstateUnit.cadastralUnit?.address?.toponymy,
                        estateUnitMerge.toEstateUnit.cadastralUnit?.address?.numbering,
                      ].join(', '),
                    },
                    {
                      label: 'cadastral_unit.field.address_postal_code',
                      value: estateUnitMerge.toEstateUnit.cadastralUnit?.address?.localPostCode,
                    },
                  ],
                },
                {
                  label: 'cadastral_unit.section_title.inspection',
                  value: [
                    {
                      label: 'cadastral_unit.field.inspection_macro_zone',
                      value: estateUnitMerge.toEstateUnit.cadastralUnit?.inspection?.macroZone,
                    },
                    {
                      label: 'cadastral_unit.field.inspection_micro_zone',
                      value: estateUnitMerge.toEstateUnit.cadastralUnit?.inspection?.microZone,
                    },
                    {
                      label: 'cadastral_unit.field.inspection_historical_estate',
                      value: estateUnitMerge.toEstateUnit.cadastralUnit?.inspection?.isHistoricalEstate,
                    },
                    {
                      label: 'cadastral_unit.field.inspection_direct_restriction',
                      value: estateUnitMerge.toEstateUnit.cadastralUnit?.inspection?.isDirectRestriction,
                    },
                    {
                      label: 'cadastral_unit.field.inspection_protocol_date',
                      value: estateUnitMerge.toEstateUnit.cadastralUnit?.inspection?.protocolDate,
                    },
                    {
                      label: 'cadastral_unit.field.inspection_protocol_number',
                      value: estateUnitMerge.toEstateUnit.cadastralUnit?.inspection?.protocolNumber,
                    },
                    {
                      label: 'cadastral_unit.field.inspection_date',
                      value: estateUnitMerge.toEstateUnit.cadastralUnit?.inspection?.date,
                    },
                    {
                      label: 'cadastral_unit.field.inspection_heading',
                      value: estateUnitMerge.toEstateUnit.cadastralUnit?.inspection?.heading,
                    },
                  ],
                },
                {
                  label: 'cadastral_unit.section_title.income',
                  value: [
                    ...(([EstateUnitType.Building, EstateUnitType.Other].includes(
                      estateUnitMerge.toEstateUnit.estateUnitType!,
                    )
                      ? [
                          {
                            label: 'cadastral_unit.field.income_macro_category',
                            value: estateUnitMerge.toEstateUnit.cadastralUnit?.income.macroCategory,
                          },
                        ]
                      : []) as RecapSectionSimpleItem[]),
                    {
                      label: 'cadastral_unit.field.income_micro_category',
                      value: estateUnitMerge.toEstateUnit.cadastralUnit?.income.microCategory,
                    },
                    {
                      label: 'cadastral_unit.field.income_registered_surface',
                      value: estateUnitMerge.toEstateUnit.cadastralUnit?.income.registeredSurface,
                    },
                    ...(([EstateUnitType.Building, EstateUnitType.Other].includes(
                      estateUnitMerge.toEstateUnit.estateUnitType!,
                    )
                      ? [
                          {
                            label: 'cadastral_unit.field.income_type',
                            value: estateUnitMerge.toEstateUnit.cadastralUnit?.income.incomeType
                              ? t(
                                  `common.enum.income_type.${estateUnitMerge.toEstateUnit.cadastralUnit.income.incomeType}`,
                                )
                              : null,
                          },
                          {
                            label: 'cadastral_unit.field.income_cadastral_amount',
                            value: estateUnitMerge.toEstateUnit.cadastralUnit?.income.cadastralAmount,
                          },
                        ]
                      : [
                          {
                            label: 'cadastral_unit.field.income_land_category',
                            value:
                              estateUnitMerge.toEstateUnit.cadastralUnit?.income.cadastralLandCategory?.description,
                          },
                          {
                            label: 'cadastral_unit.field.income_farm_amount',
                            value: estateUnitMerge.toEstateUnit.cadastralUnit?.income.cadastralAmount
                              ? parseNumberToCurrency(
                                  estateUnitMerge.toEstateUnit.cadastralUnit.income.cadastralAmount,
                                  language,
                                )
                              : null,
                          },
                          {
                            label: 'cadastral_unit.field.income_land_amount',
                            value: estateUnitMerge.toEstateUnit.cadastralUnit?.income.landAmount
                              ? parseNumberToCurrency(
                                  estateUnitMerge.toEstateUnit.cadastralUnit.income.landAmount,
                                  language,
                                )
                              : null,
                          },
                          {
                            label: 'cadastral_unit.field.income_market_value',
                            value: estateUnitMerge.toEstateUnit.cadastralUnit?.income.marketValue
                              ? parseNumberToCurrency(
                                  estateUnitMerge.toEstateUnit.cadastralUnit.income.marketValue,
                                  language,
                                )
                              : null,
                          },
                        ]) as RecapSectionSimpleItem[]),
                    {
                      label: 'cadastral_unit.field.income_metric',
                      value: estateUnitMerge.toEstateUnit.cadastralUnit?.income.metric
                        ? t(`common.enum.income_metric.${estateUnitMerge.toEstateUnit.cadastralUnit.income.metric}`)
                        : null,
                    },
                    {
                      label: 'cadastral_unit.field.income_metric_amount',
                      value: estateUnitMerge.toEstateUnit.cadastralUnit?.income.metricAmount,
                    },
                    {
                      label: 'cadastral_unit.field.income_metric_rented_amount',
                      value: estateUnitMerge.toEstateUnit.cadastralUnit?.income.metricRentedAmount,
                    },
                  ],
                },
              ]}
              onEdit={handleEdit(3)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="estate_unit_merge.tab.cadastral_coordinates"
              items={[
                {
                  value: estateUnitMerge.toEstateUnit.cadastralUnit?.coordinates.length
                    ? getCoordinateType(estateUnitMerge.toEstateUnit.cadastralUnit.address) ===
                      CoordinateType.ItalianOrdinary
                      ? {
                          columns: [
                            'cadastral_unit.field.coordinate_level1',
                            'cadastral_unit.field.coordinate_table_base',
                            'cadastral_unit.field.coordinate_it_table_match',
                            'cadastral_unit.field.coordinate_it_table_body',
                            'cadastral_unit.field.coordinate_it_table_portion',
                            'cadastral_unit.field.coordinate_level2',
                            'cadastral_unit.field.coordinate_level3',
                            'cadastral_unit.field.coordinate_level4',
                            'cadastral_unit.field.notes',
                          ],
                          rows: estateUnitMerge.toEstateUnit.cadastralUnit.coordinates.map((entry) => [
                            entry.level1,
                            entry.hasITTavData,
                            entry.itTavPartita,
                            entry.itTavCorpo,
                            entry.itTavPorzione,
                            entry.level2,
                            entry.level3,
                            entry.level4,
                            entry.notes,
                          ]),
                        }
                      : {
                          columns: ['cadastral_unit.field.coordinate_unmanaged_override'],
                          rows: estateUnitMerge.toEstateUnit.cadastralUnit.coordinates.map((entry) => [
                            entry.unmanagedOverride,
                          ]),
                        }
                    : [
                        {
                          label: 'cadastral_unit.text.no_cadastral_coordinates',
                          value: null,
                        },
                      ],
                },
              ]}
              onEdit={handleEdit(4)}
            />
          </Grid2>
        </Grid2>
      </StepContent>
      <StepActions completeLabel="estate_unit_merge.action.save" onBack={onBack} onComplete={handleComplete} />
    </>
  );
};
