import { AddCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import {
  DateField,
  EmptyText,
  RepeatableField,
  SecondaryTable,
  SectionTitle,
  SelectField,
  TextField,
} from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { EstateOwnership, EstateStatus, EstateType, PersonType } from '@realgimm5/frontend-common/gql/types';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { StairFormInput } from '../../../../interfaces/FormInputs/Stair';
import { getEmptyEstateStairFormInput } from '../../../../utils/estate/initialValues';
import { SubjectField } from '../../../core/Fields/Subject/Subject';
import { UsageTypeField } from '../../../core/Fields/UsageType/UsageType';
import { FloorField } from './FloorField/FloorField';
import { EstateGeneralDataProps } from './GeneralData.types';
import { MainUsageTypeField } from './MainUsageTypeField/MainUsageTypeField';
import { ManagementOrgUnitField } from './ManagementOrgUnitField/ManagementOrgUnitField';
import { StairDialog } from './StairDialog/StairDialog';
import { StairDialogInput } from './StairDialog/StairDialog.types';
import { StairField } from './StairField/StairField';

export const EstateGeneralData = ({
  control,
  errors,
  initialFloors,
  mode,
  readonly,
  onAddFloor,
  setValue,
}: EstateGeneralDataProps) => {
  const { t } = useTranslation();
  const status = useWatch({ control, name: 'status' });
  const { fields, append, remove, update } = useFieldArray({ control, name: 'stairs' });
  const [stairDialogProps, setStairDialogProps] = useState<{
    input?: StairDialogInput;
    open: boolean;
  }>({ open: false });

  useEffect(() => {
    if (status !== EstateStatus.Decommissioned) {
      setValue('decommissioningDate', null);
    }
    // eslint-disable-next-line
  }, [status]);

  const handleCloseStairDialog = useCallback(() => {
    setStairDialogProps({ open: false });
  }, []);
  const handleEditStair = useCallback(
    (index: number) => {
      setStairDialogProps({ input: { stair: fields[index], index }, open: true });
    },
    [fields],
  );
  const handleSaveStair = useCallback(
    (value: StairFormInput[] | StairDialogInput) => {
      if (Array.isArray(value)) {
        append(value);
      } else {
        update(value.index, value.stair);
      }
      handleCloseStairDialog();
    },
    [append, update, handleCloseStairDialog],
  );

  const handleAddStair = useCallback(() => {
    if (mode === FormMode.Create) {
      append(getEmptyEstateStairFormInput());
    } else {
      setStairDialogProps({ open: true });
    }
  }, [mode, append]);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {mode === FormMode.Create && <SectionTitle value="estate.section_title.general_data" />}
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="estateType"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('estate.field.estate_type')}
              options={Object.values(EstateType)}
              getOptionLabel={(option) => t(`common.enum.estate_type.${option}`)}
              error={!!errors.estateType}
              helperText={errors.estateType?.message}
              required
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('estate.field.estate_name')}
              error={!!errors.name}
              helperText={errors.name?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="internalCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('estate.field.estate_code')}
              error={!!errors.internalCode}
              helperText={errors.internalCode?.message}
              required
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="externalCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('estate.field.external_estate_code')}
              error={!!errors.externalCode}
              helperText={errors.externalCode?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: mode === FormMode.Create ? 6 : 4 }}>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('estate.field.estate_status')}
              options={Object.values(EstateStatus)}
              getOptionLabel={(option) => t(`common.enum.estate_status.${option}`)}
              error={!!errors.status}
              helperText={errors.status?.message}
              required
              disabled={mode === FormMode.Create}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      {mode === FormMode.Edit && (
        <Grid2 size={{ xs: 12, sm: 4 }}>
          <Controller
            name="decommissioningDate"
            control={control}
            render={({ field }) => (
              <DateField
                {...field}
                label={t('estate.field.disused_date')}
                error={!!errors.decommissioningDate}
                helperText={errors.decommissioningDate?.message}
                disabled={status !== EstateStatus.Decommissioned}
                required={status === EstateStatus.Decommissioned}
                readonly={readonly}
              />
            )}
          />
        </Grid2>
      )}
      <Grid2 size={{ xs: 12, sm: mode === FormMode.Create ? 6 : 4 }}>
        <Controller
          name="ownership"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('estate.field.ownership')}
              options={Object.values(EstateOwnership)}
              getOptionLabel={(option) => t(`common.enum.estate_ownership.${option}`)}
              error={!!errors.ownership}
              helperText={errors.ownership?.message}
              required
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <MainUsageTypeField control={control} errors={errors} readonly={readonly} />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="usageType"
          control={control}
          render={({ field }) => (
            <UsageTypeField
              {...field}
              label={t('component.estate_usage_type_field.label')}
              error={!!errors.usageType}
              helperText={errors.usageType?.message}
              readonly={readonly}
              isFor="estate"
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="buildYear"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              maxLength={4}
              label={t('estate.field.build_year')}
              error={!!errors.buildYear}
              helperText={errors.buildYear?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="surfaceAreaSqM"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label={t('estate.field.estate_surface')}
              error={!!errors.surfaceAreaSqM}
              helperText={errors.surfaceAreaSqM?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="managementSubject"
          control={control}
          render={({ field }) => (
            <SubjectField
              {...field}
              label={t('estate.field.management_subject')}
              error={!!errors.managementSubject}
              helperText={errors.managementSubject?.message}
              required
              readonly={readonly}
              where={{
                personType: {
                  eq: PersonType.ManagementSubject,
                },
              }}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <ManagementOrgUnitField control={control} errors={errors} readonly={readonly} />
      </Grid2>
      <Grid2 size={12}>
        <Controller
          name="notes"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              multiline
              label={t('estate.field.notes')}
              error={!!errors.notes}
              helperText={errors.notes?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <SectionTitle value="estate.section_title.stairs" />
      {fields.length !== 0 ? (
        <Grid2 size={12}>
          {mode === FormMode.Create ? (
            <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
              {fields.map(({ key }, index) => (
                <RepeatableField key={key} index={index} onDelete={remove}>
                  <StairField control={control} errors={errors} index={index} />
                </RepeatableField>
              ))}
            </Stack>
          ) : (
            <SecondaryTable
              columns={['estate.field.stair']}
              rows={fields.map((entry) => [entry.description])}
              onRowDelete={readonly ? undefined : remove}
              onRowEdit={readonly ? undefined : handleEditStair}
            />
          )}
        </Grid2>
      ) : mode === FormMode.Edit ? (
        <EmptyText value="estate.text.no_stairs" />
      ) : (
        <></>
      )}
      {stairDialogProps.open && (
        <StairDialog input={stairDialogProps.input} onClose={handleCloseStairDialog} onSave={handleSaveStair} />
      )}
      {!readonly && (
        <Grid2 size={12}>
          <Button color="secondary" variant="contained" startIcon={<AddCircleOutline />} onClick={handleAddStair}>
            {t('estate.action.add_stairs')}
          </Button>
        </Grid2>
      )}
      <SectionTitle value="estate.section_title.floors" />
      <Grid2 size={12}>
        <FloorField
          control={control}
          errors={errors}
          initialFloors={initialFloors}
          readonly={readonly}
          onAddFloor={onAddFloor}
        />
      </Grid2>
    </Grid2>
  );
};
