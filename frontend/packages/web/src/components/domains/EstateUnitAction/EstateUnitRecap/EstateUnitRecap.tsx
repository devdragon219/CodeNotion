import { Grid2 } from '@mui/material';
import {
  CheckboxField,
  DateField,
  EmptyText,
  Loader,
  SecondaryTable,
  SectionTitle,
  SelectField,
  TextField,
} from '@realgimm5/frontend-common/components';
import { CoordinateType, EstateUnitOwnershipType, EstateUnitType } from '@realgimm5/frontend-common/gql/types';
import { parseStringToDate } from '@realgimm5/frontend-common/utils';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useGetEstateUnitQuery } from '../../../../gql/RealGimm.Web.EstateUnit.operation';
import { parseAddressToString } from '../../../../utils/addressUtils';
import { getCoordinateType } from '../../../../utils/cadastralUnit/getCoordinateType';
import { UsageTypeField } from '../../../core/Fields/UsageType/UsageType';
import { EstateUnitActionEstateUnitRecapProps } from './EstateUnitRecap.types';

export const EstateUnitActionEstateUnitRecap = ({ estateUnitId, onChange }: EstateUnitActionEstateUnitRecapProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const [queryState] = useGetEstateUnitQuery({ variables: { estateUnitId } });
  const estateUnit = useMemo(() => queryState.data?.estateUnit.estateUnit, [queryState.data]);
  const coordinateType = useMemo(() => getCoordinateType(estateUnit?.currentCadastralUnit?.address), [estateUnit]);
  const coordinates = useMemo(() => estateUnit?.currentCadastralUnit?.coordinates ?? [], [estateUnit]);

  useEffect(() => {
    if (estateUnit) {
      onChange(estateUnit);
    }
    // eslint-disable-next-line
  }, [estateUnit]);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {queryState.fetching && <Loader />}
      <SectionTitle value="estate_unit.section_title.estate_unit_general_data" />
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <TextField label={t('estate_unit.field.estate_unit_code')} value={estateUnit?.internalCode} required readonly />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <TextField label={t('estate_unit.field.estate_unit_name')} value={estateUnit?.name} readonly />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <TextField
          label={t('estate_unit.field.address_toponymy')}
          value={parseAddressToString(estateUnit?.address, language)}
          required
          readonly
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <TextField label={t('estate_unit.field.address_indoor_number')} value={estateUnit?.subNumbering} readonly />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <TextField label={t('estate_unit.field.stair')} value={estateUnit?.stair?.description} readonly />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <SelectField
          multiple
          label={t('estate_unit.field.floors')}
          getOptionKey={(option) => `${option.id}`}
          getOptionLabel={(option) => `(${option.position}) ${option.name}`}
          options={estateUnit?.floors ?? []}
          value={estateUnit?.floors}
          readonly
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <TextField
          label={t('estate_unit.field.management_subject')}
          value={estateUnit?.estate.managementSubject.name}
          required
          readonly
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <SelectField
          label={t('estate_unit.field.estate_unit_type')}
          options={Object.values(EstateUnitType)}
          getOptionLabel={(option) => t(`common.enum.estate_unit_type.${option}`)}
          value={estateUnit?.type}
          required
          readonly
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <CheckboxField label={t('estate_unit.field.shared_area')} checked={estateUnit?.sharedArea} readonly disabled />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <SelectField
          label={t('estate_unit.field.ownership_type')}
          options={Object.values(EstateUnitOwnershipType)}
          getOptionLabel={(option) => t(`common.enum.estate_unit_ownership_type.${option}`)}
          value={estateUnit?.ownershipType}
          readonly
          required
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <DateField
          label={t('estate_unit.field.ownership_start_date')}
          value={parseStringToDate(estateUnit?.ownershipStartDate)}
          readonly
          required
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <TextField
          type="number"
          label={t('estate_unit.field.ownership_percentage')}
          value={estateUnit?.ownershipPercent}
          readonly
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <UsageTypeField
          value={estateUnit?.usageType ?? null}
          label={t('component.estate_unit_usage_type_field.label')}
          isFor="estateUnit"
          readonly
        />
      </Grid2>
      <Grid2 size={12}>
        <TextField label={t('estate_unit.field.notes')} value={estateUnit?.notes} readonly multiline />
      </Grid2>
      <SectionTitle value="cadastral_unit.section_title.cadastral_unit_general_data" />
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <TextField
          label={t('estate_unit.field.cadastral_unit_code')}
          value={estateUnit?.currentCadastralUnit?.internalCode}
          readonly
          required
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <DateField
          label={t('estate_unit.field.cadastral_unit_since')}
          value={parseStringToDate(estateUnit?.currentCadastralUnit?.since)}
          readonly
          required
        />
      </Grid2>
      <SectionTitle value="cadastral_unit.section_title.cadastral_coordinates" />
      <Grid2 size={12}>
        {coordinates.length !== 0 ? (
          <SecondaryTable
            {...(coordinateType === CoordinateType.ItalianOrdinary
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
                  rows: coordinates.map((entry) => [
                    entry.level1,
                    t(`common.text.${entry.hasITTavData}`),
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
                  rows: coordinates.map((entry) => [entry.unmanagedOverride]),
                })}
          />
        ) : (
          <EmptyText value="cadastral_unit.text.no_cadastral_coordinates" />
        )}
      </Grid2>
    </Grid2>
  );
};
