import { AddCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import {
  EmptyText,
  RepeatableField,
  SecondaryTable,
  SectionTitle,
  TextField,
} from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { CoordinateType } from '@realgimm5/frontend-common/gql/types';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback, useMemo, useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CadastralCoordinateFormInput } from '../../../../interfaces/FormInputs/CadastralUnit';
import { getCoordinateType } from '../../../../utils/cadastralUnit/getCoordinateType';
import { getEmptyCadastralCoordinatesFormInput } from '../../../../utils/cadastralUnit/initialValues';
import { CadastralUnitCoordinatesProps } from './Coordinates.types';
import { CoordinatesDialog } from './Dialog/Dialog';
import { CoordinatesDialogInput } from './Dialog/Dialog.types';
import { CoordinatesField } from './Field/Field';

export const CadastralUnitCoordinates = ({
  control,
  errors,
  iconPositionAbsolute,
  mode,
  readonly,
  useNotes = true,
}: CadastralUnitCoordinatesProps) => {
  const { t } = useTranslation();
  const address = useWatch({ control, name: 'address' });
  const { fields, append, remove, update } = useFieldArray({ control, name: 'coordinates' });
  const coordinateType = useMemo(() => getCoordinateType(address), [address]);

  const [coordinatesDialogProps, setCoordinatesDialogProps] = useState<{
    input?: CoordinatesDialogInput;
    open: boolean;
  }>({ open: false });

  const handleCloseCoordinatesDialog = useCallback(() => {
    setCoordinatesDialogProps({ open: false });
  }, []);
  const handleEditCoordinates = useCallback(
    (index: number) => {
      setCoordinatesDialogProps({
        input: { coordinates: fields[index], index },
        open: true,
      });
    },
    [fields],
  );
  const handleSaveCoordinates = useCallback(
    (value: CadastralCoordinateFormInput[] | CoordinatesDialogInput) => {
      if (Array.isArray(value)) {
        append(value);
      } else {
        update(value.index, value.coordinates);
      }
      handleCloseCoordinatesDialog();
    },
    [append, update, handleCloseCoordinatesDialog],
  );

  const handleAddCoordinates = useCallback(() => {
    if (mode === FormMode.Create) {
      append(getEmptyCadastralCoordinatesFormInput(coordinateType));
    } else {
      setCoordinatesDialogProps({ open: true });
    }
  }, [coordinateType, mode, append]);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <SectionTitle value="cadastral_unit.section_title.cadastral_coordinates" />
      {fields.length !== 0 ? (
        <Grid2 size={12}>
          {mode === FormMode.Create ? (
            <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
              {fields.map(({ key }, index) => (
                <RepeatableField key={key} iconPositionAbsolute={iconPositionAbsolute} index={index} onDelete={remove}>
                  <CoordinatesField control={control} errors={errors} index={index} readonly={readonly} />
                </RepeatableField>
              ))}
            </Stack>
          ) : (
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
                    rows: fields.map((entry) => [
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
                    rows: fields.map((entry) => [entry.unmanagedOverride]),
                  })}
              onRowDelete={readonly ? undefined : remove}
              onRowEdit={readonly ? undefined : handleEditCoordinates}
            />
          )}
        </Grid2>
      ) : mode === FormMode.Edit ? (
        <EmptyText value="cadastral_unit.text.no_cadastral_coordinates" />
      ) : (
        <></>
      )}
      {coordinatesDialogProps.open && (
        <CoordinatesDialog
          coordinateType={coordinateType}
          input={coordinatesDialogProps.input}
          onClose={handleCloseCoordinatesDialog}
          onSave={handleSaveCoordinates}
        />
      )}
      {!readonly && (
        <Grid2 size={12}>
          <Button color="secondary" variant="contained" startIcon={<AddCircleOutline />} onClick={handleAddCoordinates}>
            {t('cadastral_unit.action.add_cadastral_coordinates')}
          </Button>
        </Grid2>
      )}
      {useNotes && (
        <>
          <SectionTitle value="cadastral_unit.section_title.notes" />
          <Grid2 size={12}>
            <Controller
              name="cadastralNotes"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  multiline
                  label={t('cadastral_unit.field.cadastral_notes')}
                  error={!!errors.cadastralNotes}
                  helperText={errors.cadastralNotes?.message}
                  readonly={readonly}
                />
              )}
            />
          </Grid2>
          <Grid2 size={12}>
            <Controller
              name="fiscalNotes"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  multiline
                  label={t('cadastral_unit.field.fiscal_notes')}
                  error={!!errors.fiscalNotes}
                  helperText={errors.fiscalNotes?.message}
                  readonly={readonly}
                />
              )}
            />
          </Grid2>
          <Grid2 size={12}>
            <Controller
              name="consortiumNotes"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  multiline
                  label={t('cadastral_unit.field.consortium_notes')}
                  error={!!errors.consortiumNotes}
                  helperText={errors.consortiumNotes?.message}
                  readonly={readonly}
                />
              )}
            />
          </Grid2>
        </>
      )}
    </Grid2>
  );
};
