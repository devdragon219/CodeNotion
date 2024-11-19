import { yupResolver } from '@hookform/resolvers/yup';
import { CheckCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import {
  CloseDialog,
  DateField,
  Dialog,
  DialogContent,
  Form,
  SectionTitle,
  SelectField,
  TextField,
} from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { OccupantType, SubjectRelationType } from '@realgimm5/frontend-common/gql/types';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useEstateSubUnit } from '../../../../hooks/useEstateSubUnit';
import { EstateSubUnitFormInput } from '../../../../interfaces/FormInputs/EstateSubUnit';
import { getEmptyEstateSubUnitFormInput } from '../../../../utils/estateSubUnit/initialValues';
import { getEstateSubUnitSchema } from '../../../../utils/estateSubUnit/schemas/estateSubUnit';
import { OrgUnitField } from '../../../core/Fields/OrgUnit/OrgUnit';
import { SubjectField } from '../../../core/Fields/Subject/Subject';
import { UsageTypeField } from '../../../core/Fields/UsageType/UsageType';
import { EstateSubUnitDialogProps } from './Dialog.types';

export const EstateSubUnitDialog = ({
  estateSubUnit,
  estateUnit,
  readonly,
  onClose,
  onSave,
}: EstateSubUnitDialogProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { getInternalCode } = useEstateSubUnit();
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);
  const {
    control,
    formState: { isValid: canSave, errors },
    handleSubmit,
    setValue,
    getValues,
  } = useForm<EstateSubUnitFormInput>({
    defaultValues: estateSubUnit ?? getEmptyEstateSubUnitFormInput(estateUnit.estateUnitId!),
    resolver: yupResolver(getEstateSubUnitSchema(language, t)),
  });
  const occupantType = useWatch({ control, name: 'occupantType' });

  useEffect(() => {
    if (!estateSubUnit) {
      getInternalCode(estateUnit.estateUnitId!, (internalCode) => {
        setValue('internalCode', internalCode);
      });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (occupantType !== OccupantType.CompanyGroupMember) {
      setValue('occupant', null);
      setValue('orgUnit', null);
    }
    // eslint-disable-next-line
  }, [occupantType]);

  const onSubmit = useCallback(
    (formValues: EstateSubUnitFormInput) => {
      onSave(formValues, estateSubUnit ? FormMode.Edit : FormMode.Create);
    },
    [estateSubUnit, onSave],
  );

  const openCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(true);
  }, []);
  const closeCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(false);
  }, []);

  const handleWorkingClose = useCallback(() => {
    onSave(getValues(), estateSubUnit ? FormMode.Edit : FormMode.Create);
  }, [estateSubUnit, getValues, onSave]);

  const handleDestructiveClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const occupant = useWatch({ control, name: 'occupant' });

  return isCloseConfirmationDialogOpen ? (
    <CloseDialog
      canSave={canSave}
      onCancel={closeCloseConfirmationDialog}
      onSave={handleWorkingClose}
      onClose={handleDestructiveClose}
    />
  ) : (
    <Dialog
      open
      onClose={openCloseConfirmationDialog}
      title={`estate_sub_unit.dialog.${estateSubUnit ? 'edit' : 'create'}.title`}
    >
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          action={
            <Button
              color="primary"
              variant="contained"
              startIcon={<CheckCircleOutline />}
              {...(readonly ? { onClick: onClose } : { type: 'submit' })}
            >
              {t(readonly ? 'core.button.close' : 'common.button.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }}>
            <SectionTitle value="estate_sub_unit.section_title.estate_sub_unit" />
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Controller
                name="internalCode"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('estate_sub_unit.field.internal_code')}
                    error={!!errors.internalCode}
                    helperText={errors.internalCode?.message}
                    readonly={readonly}
                    disabled
                    required
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Controller
                name="occupantType"
                control={control}
                render={({ field }) => (
                  <SelectField
                    {...field}
                    label={t('estate_sub_unit.field.occupant_type')}
                    options={Object.values(OccupantType)}
                    getOptionLabel={(option) => t(`common.enum.occupant_type.${option}`)}
                    error={!!errors.occupantType}
                    helperText={errors.occupantType?.message}
                    readonly={readonly}
                    required
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Controller
                name="occupant"
                control={control}
                render={({ field }) => (
                  <SubjectField
                    {...field}
                    label={t('estate_sub_unit.field.occupant')}
                    error={!!errors.occupant}
                    helperText={errors.occupant?.message}
                    disabled={occupantType !== OccupantType.CompanyGroupMember}
                    readonly={readonly}
                    where={{
                      relationSubordinates: {
                        some: {
                          relationType: {
                            eq: SubjectRelationType.CompanyGroup,
                          },
                          main: {
                            id: { eq: estateUnit.estate?.managementSubject.id },
                          },
                        },
                      },
                    }}
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Controller
                name="orgUnit"
                control={control}
                render={({ field }) => (
                  <OrgUnitField
                    {...field}
                    label={t('estate_sub_unit.field.org_unit')}
                    error={!!errors.orgUnit}
                    helperText={errors.orgUnit?.message}
                    disabled={!occupant}
                    readonly={readonly}
                    parentSubjectId={occupant?.id}
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Controller
                name="usageType"
                control={control}
                render={({ field }) => (
                  <UsageTypeField
                    {...field}
                    label={t('estate_sub_unit.field.usage_type')}
                    error={!!errors.usageType}
                    helperText={errors.usageType?.message}
                    readonly={readonly}
                    required
                    isFor="estateSubUnit"
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Controller
                name="since"
                control={control}
                render={({ field }) => (
                  <DateField
                    {...field}
                    label={t('estate_sub_unit.field.since')}
                    error={!!errors.since}
                    helperText={errors.since?.message}
                    readonly={readonly}
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Controller
                name="until"
                control={control}
                render={({ field }) => (
                  <DateField
                    {...field}
                    label={t('estate_sub_unit.field.until')}
                    error={!!errors.until}
                    helperText={errors.until?.message}
                    readonly={readonly}
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Controller
                name="surfaceSqM"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    label={t('estate_sub_unit.field.surface')}
                    error={!!errors.surfaceSqM}
                    helperText={errors.surfaceSqM?.message}
                    readonly={readonly}
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Controller
                name="occupancyPercent"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    maxLength={3}
                    label={t('estate_sub_unit.field.occupancy_percentage')}
                    error={!!errors.occupancyPercent}
                    helperText={errors.occupancyPercent?.message}
                    readonly={readonly}
                  />
                )}
              />
            </Grid2>
            <Grid2 size={12}>
              <Controller
                name="notes"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    multiline
                    label={t('estate_sub_unit.field.notes')}
                    error={!!errors.notes}
                    helperText={errors.notes?.message}
                    readonly={readonly}
                  />
                )}
              />
            </Grid2>
          </Grid2>
        </DialogContent>
      </Form>
    </Dialog>
  );
};
