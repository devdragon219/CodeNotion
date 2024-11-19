import { Grid2 } from '@mui/material';
import {
  RecapSection,
  RecapSectionItem,
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
import { CadastralUnitRecapStepProps } from './Recap.types';

export const CadastralUnitRecapStep = ({ cadastralUnit, onBack, onEdit, onSave }: CadastralUnitRecapStepProps) => {
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
    onSave(cadastralUnit);
  }, [cadastralUnit, onSave]);

  return (
    <>
      <StepContent>
        <Grid2 container spacing={{ xs: 2, sm: 3 }}>
          <SectionTitle value="cadastral_unit.section_title.recap" />
          <Grid2 size={12}>
            <RecapSection
              title="cadastral_unit.tab.estate_unit"
              items={[
                {
                  label: 'cadastral_unit.field.estate_unit_code',
                  value: cadastralUnit.estateUnit?.internalCode,
                },
                {
                  label: 'cadastral_unit.field.estate_unit_type',
                  value: cadastralUnit.estateUnit?.type
                    ? t(`common.enum.estate_unit_type.${cadastralUnit.estateUnit.type}`)
                    : null,
                },
                {
                  label: 'cadastral_unit.field.estate_unit_status',
                  value: cadastralUnit.estateUnit?.status
                    ? t(`common.enum.estate_unit_status.${cadastralUnit.estateUnit.status}`)
                    : null,
                },
                {
                  label: 'cadastral_unit.field.address_toponymy',
                  value: parseAddressToString(cadastralUnit.estateUnit?.address, language),
                },
              ]}
              onEdit={handleEdit(0)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="cadastral_unit.tab.general_data"
              items={[
                {
                  label: 'cadastral_unit.field.cadastral_unit_code',
                  value: cadastralUnit.internalCode,
                },
                {
                  label: 'cadastral_unit.field.address_toponymy',
                  value: parseAddressToString(cadastralUnit.address, language),
                },
                {
                  label: 'cadastral_unit.field.cadastral_unit_type',
                  value: cadastralUnit.estateUnit?.type
                    ? t(`common.enum.estate_unit_type.${cadastralUnit.estateUnit.type}`)
                    : null,
                },
                {
                  label: 'cadastral_unit.field.cadastral_unit_status',
                  value: cadastralUnit.status ? t(`common.enum.cadastral_unit_status.${cadastralUnit.status}`) : null,
                },
                {
                  label: 'cadastral_unit.field.since',
                  value: cadastralUnit.since,
                },
                {
                  label: 'cadastral_unit.section_title.estate',
                  value: [
                    {
                      label: 'cadastral_unit.field.estate_code',
                      value: cadastralUnit.estateUnit?.estate.internalCode,
                    },
                    {
                      label: 'cadastral_unit.field.estate_name',
                      value: cadastralUnit.estateUnit?.estate.name,
                    },
                  ],
                },
              ]}
              onEdit={handleEdit(1)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="cadastral_unit.tab.inspection"
              items={
                cadastralUnit.inspection
                  ? [
                      {
                        label: 'cadastral_unit.field.inspection_macro_zone',
                        value: cadastralUnit.inspection.macroZone,
                      },
                      {
                        label: 'cadastral_unit.field.inspection_micro_zone',
                        value: cadastralUnit.inspection.microZone,
                      },
                      {
                        label: 'cadastral_unit.field.inspection_historical_estate',
                        value: cadastralUnit.inspection.isHistoricalEstate,
                      },
                      {
                        label: 'cadastral_unit.field.inspection_direct_restriction',
                        value: cadastralUnit.inspection.isDirectRestriction,
                      },
                      {
                        label: 'cadastral_unit.field.inspection_protocol_date',
                        value: cadastralUnit.inspection.protocolDate,
                      },
                      {
                        label: 'cadastral_unit.field.inspection_protocol_number',
                        value: cadastralUnit.inspection.protocolNumber,
                      },
                      {
                        label: 'cadastral_unit.field.inspection_date',
                        value: cadastralUnit.inspection.date,
                      },
                      {
                        label: 'cadastral_unit.field.inspection_heading',
                        value: cadastralUnit.inspection.heading,
                      },
                    ]
                  : [
                      {
                        label: 'cadastral_unit.text.no_inspection',
                        value: null,
                      },
                    ]
              }
              onEdit={handleEdit(2)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="cadastral_unit.tab.income"
              items={[
                ...(([EstateUnitType.Building, EstateUnitType.Other].includes(cadastralUnit.estateUnit!.type)
                  ? [
                      {
                        label: 'cadastral_unit.field.income_macro_category',
                        value: cadastralUnit.income.macroCategory,
                      },
                    ]
                  : []) as RecapSectionItem[]),
                {
                  label: 'cadastral_unit.field.income_micro_category',
                  value: cadastralUnit.income.microCategory,
                },
                {
                  label: 'cadastral_unit.field.income_registered_surface',
                  value: cadastralUnit.income.registeredSurface,
                },
                ...(([EstateUnitType.Building, EstateUnitType.Other].includes(cadastralUnit.estateUnit!.type)
                  ? [
                      {
                        label: 'cadastral_unit.field.income_type',
                        value: cadastralUnit.income.incomeType
                          ? t(`common.enum.income_type.${cadastralUnit.income.incomeType}`)
                          : null,
                      },
                      {
                        label: 'cadastral_unit.field.income_cadastral_amount',
                        value: cadastralUnit.income.cadastralAmount,
                      },
                    ]
                  : [
                      {
                        label: 'cadastral_unit.field.income_land_category',
                        value: cadastralUnit.income.cadastralLandCategory?.description,
                      },
                      {
                        label: 'cadastral_unit.field.income_farm_amount',
                        value: parseNumberToCurrency(cadastralUnit.income.cadastralAmount, language),
                      },
                      {
                        label: 'cadastral_unit.field.income_land_amount',
                        value: parseNumberToCurrency(cadastralUnit.income.landAmount, language),
                      },
                      {
                        label: 'cadastral_unit.field.income_market_value',
                        value: parseNumberToCurrency(cadastralUnit.income.marketValue, language),
                      },
                    ]) as RecapSectionItem[]),

                {
                  label: 'cadastral_unit.field.income_metric',
                  value: cadastralUnit.income.metric
                    ? t(`common.enum.income_metric.${cadastralUnit.income.metric}`)
                    : null,
                },
                {
                  label: 'cadastral_unit.field.income_metric_amount',
                  value: cadastralUnit.income.metricAmount,
                },
                {
                  label: 'cadastral_unit.field.income_metric_rented_amount',
                  value: cadastralUnit.income.metricRentedAmount,
                },
              ]}
              onEdit={handleEdit(3)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="cadastral_unit.tab.cadastral_coordinates"
              items={[
                {
                  label: 'cadastral_unit.section_title.cadastral_coordinates',
                  value: cadastralUnit.coordinates.length
                    ? getCoordinateType(cadastralUnit.address) === CoordinateType.ItalianOrdinary
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
                          rows: cadastralUnit.coordinates.map((entry) => [
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
                          rows: cadastralUnit.coordinates.map((entry) => [entry.unmanagedOverride]),
                        }
                    : [
                        {
                          label: 'cadastral_unit.text.no_cadastral_coordinates',
                          value: null,
                        },
                      ],
                },
                {
                  label: 'cadastral_unit.section_title.notes',
                  value: [
                    {
                      label: 'cadastral_unit.field.cadastral_notes',
                      value: cadastralUnit.cadastralNotes,
                    },
                    {
                      label: 'cadastral_unit.field.fiscal_notes',
                      value: cadastralUnit.fiscalNotes,
                    },
                    {
                      label: 'cadastral_unit.field.consortium_notes',
                      value: cadastralUnit.consortiumNotes,
                    },
                  ],
                },
              ]}
              onEdit={handleEdit(4)}
            />
          </Grid2>
        </Grid2>
      </StepContent>
      <StepActions completeLabel="cadastral_unit.dialog.create.save" onBack={onBack} onComplete={handleComplete} />
    </>
  );
};
