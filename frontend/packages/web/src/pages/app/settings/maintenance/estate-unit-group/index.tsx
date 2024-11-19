import { yupResolver } from '@hookform/resolvers/yup';
import { AddCircleOutline, ChevronLeft } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardHeader, Grid2 } from '@mui/material';
import { Alert, BlockerDialog, CardActions, Form, Loader, SectionTitle } from '@realgimm5/frontend-common/components';
import { useOperation, useSnackbar } from '@realgimm5/frontend-common/contexts';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useDebounce, useFieldArray, useNavigateBack } from '@realgimm5/frontend-common/hooks';
import { StateLocation } from '@realgimm5/frontend-common/interfaces';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { OperationResult, useClient } from 'urql';

import { EstateUnitGroupEditEstateUnitsDialog } from '../../../../../components/dialogs/EstateUnitGroup/EstateUnits/EstateUnits';
import { EstateUnitGroupEstateUnitsTable } from '../../../../../components/domains/EstateUnitGroup/EstateUnitsTable/EstateUnitsTable';
import { EstateUnitGroupGeneralData } from '../../../../../components/domains/EstateUnitGroup/GeneralData/GeneralData';
import { RawFeature } from '../../../../../enums/RawFeature';
import { EstateUnitFragment } from '../../../../../gql/RealGimm.Web.EstateUnit.fragment';
import {
  DeleteEstateUnitGroupDocument,
  ExportEstateUnitGroupsDocument,
  GetEstateUnitGroupDocument,
  GetEstateUnitGroupQuery,
  useUpdateEstateUnitGroupMutation,
} from '../../../../../gql/RealGimm.Web.EstateUnitGroup.operation';
import { useEstateUnitGroup } from '../../../../../hooks/useEstateUnitGroup';
import { useFeature } from '../../../../../hooks/useFeature';
import { EstateUnitGroupFormInput } from '../../../../../interfaces/FormInputs/EstateUnitGroup';
import { parseEstateUnitGroupFormInputToEstateUnitGroupInput } from '../../../../../utils/estateUnitGroup/parseEstateUnitGroupFormInput';
import { parseEstateUnitGroupToEstateUnitGroupFormInput } from '../../../../../utils/estateUnitGroup/parseEstateUnitGroupFragment';
import { getEstateUnitGroupSchema } from '../../../../../utils/estateUnitGroup/schemas/estateUnitGroup';

export default function EstateUnitGroup() {
  const { canDelete, canRead, canUpdate } = useFeature(RawFeature.FCLT_ESTATE_UNIT_GROUP_BASE);
  const { t } = useTranslation();
  const { id } = useParams();
  const { handleDelete, handleExport } = useOperation();
  const { state } = useLocation() as StateLocation;
  const { showError, showSnackbar } = useSnackbar();
  const client = useClient();
  const goBack = useNavigateBack('/app/settings/maintenance/estate-unit-groups');
  const { checkCanUseInternalCode } = useEstateUnitGroup();
  const [loading, setLoading] = useState(false);
  const [readonly, setReadonly] = useState(state?.readonly ?? true);
  const [, updateEstateUnitGroupMutation] = useUpdateEstateUnitGroupMutation();
  const [estateUnitGroup, setEstateUnitGroup] = useState<EstateUnitGroupFormInput>();
  const debouncedEstateUnitGroup = useDebounce(estateUnitGroup);
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);
  const [isEstateUnitGroupEstateUnitsDialogOpen, setEstateUnitGroupEstateUnitsDialogOpen] = useState(false);

  const fetchEstateUnitGroup = useCallback(async () => {
    setLoading(true);
    const result: OperationResult<GetEstateUnitGroupQuery> = await client.query(GetEstateUnitGroupDocument, {
      estateUnitGroupId: Number(id),
    });
    setLoading(false);
    if (!result.data?.estateUnitGroup.get) return Promise.reject();
    return parseEstateUnitGroupToEstateUnitGroupFormInput(result.data.estateUnitGroup.get);
  }, [id, client]);

  const {
    control,
    formState: { isValid: canSave, errors },
    handleSubmit,
    reset,
    watch,
    getValues,
    setValue,
  } = useForm<EstateUnitGroupFormInput>({
    defaultValues: fetchEstateUnitGroup,
    resolver: estateUnitGroup ? yupResolver(getEstateUnitGroupSchema(canUseInternalCode, t)) : undefined,
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'estateUnits' });

  useEffect(() => {
    if (debouncedEstateUnitGroup) {
      checkCanUseInternalCode(
        debouncedEstateUnitGroup.internalCode,
        debouncedEstateUnitGroup.estateUnitGroupId,
        setCanUseInternalCode,
      );
    }
    // eslint-disable-next-line
  }, [debouncedEstateUnitGroup?.internalCode, debouncedEstateUnitGroup?.estateUnitGroupId]);

  useEffect(() => {
    window.history.replaceState(null, document.title);
    const { unsubscribe } = watch((formValues) => {
      setEstateUnitGroup(formValues as EstateUnitGroupFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(estateUnitGroup);
      setSubmitSuccessful(false);
    }
    // eslint-disable-next-line
  }, [isSubmitSuccessful]);

  const handleCancel = useCallback(() => {
    reset();
    setReadonly(true);
  }, [reset]);
  const handleEdit = useCallback(() => {
    setReadonly(false);
  }, []);

  const onSubmit = useCallback(
    async (estateUnitGroup: EstateUnitGroupFormInput) => {
      setLoading(true);
      const result = await updateEstateUnitGroupMutation({
        estateUnitGroupId: Number(estateUnitGroup.estateUnitGroupId),
        input: parseEstateUnitGroupFormInputToEstateUnitGroupInput(estateUnitGroup),
      });
      setLoading(false);
      if (result.data?.estateUnitGroup.update.isSuccess) {
        showSnackbar(t('estate_unit_group.feedback.update'), 'success');
        setReadonly(true);
        const updatedEstateUnitGroup = await fetchEstateUnitGroup();
        setEstateUnitGroup(updatedEstateUnitGroup);
        setSubmitSuccessful(true);
        return Promise.resolve();
      } else {
        showError(result.data?.estateUnitGroup.update.validationErrors);
        return Promise.reject();
      }
    },
    [updateEstateUnitGroupMutation, showSnackbar, t, fetchEstateUnitGroup, showError],
  );

  const handleWorkingClose = useCallback(() => {
    const values = getValues();
    return onSubmit(values);
  }, [onSubmit, getValues]);

  const onDelete = useCallback(() => {
    setReadonly(true);
    goBack();
  }, [goBack]);

  const handleOpenEstateUnitsDialog = useCallback(() => {
    setEstateUnitGroupEstateUnitsDialogOpen(true);
  }, []);
  const handleCloseEstateUnitsDialog = useCallback(() => {
    setEstateUnitGroupEstateUnitsDialogOpen(false);
  }, []);
  const handleSaveEstateUnits = useCallback(
    (estateUnits: EstateUnitFragment[]) => {
      append(estateUnits);
      handleCloseEstateUnitsDialog();
    },
    [handleCloseEstateUnitsDialog, append],
  );

  return (
    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
      {loading && <Loader />}
      <Card>
        <Box sx={{ px: 1, pt: 2 }}>
          <Button color="secondary" variant="text" startIcon={<ChevronLeft />} onClick={goBack}>
            {t('common.button.back')}
          </Button>
        </Box>
        <CardHeader
          title={estateUnitGroup ? `${estateUnitGroup.internalCode} - ${estateUnitGroup.name}` : ''}
          titleTypographyProps={{ variant: 'h2' }}
          action={
            <CardActions
              readonly={readonly}
              onCancel={handleCancel}
              onDelete={
                canDelete ? handleDelete('estate_unit_group', DeleteEstateUnitGroupDocument, onDelete) : undefined
              }
              onEdit={canUpdate ? handleEdit : undefined}
              onExport={canRead ? handleExport(ExportEstateUnitGroupsDocument) : undefined}
            />
          }
        />
        <CardContent>
          {estateUnitGroup && (
            <Grid2 container spacing={{ xs: 2, sm: 3 }}>
              {isEstateUnitGroupEstateUnitsDialogOpen && (
                <EstateUnitGroupEditEstateUnitsDialog
                  estateUnitGroup={estateUnitGroup}
                  onClose={handleCloseEstateUnitsDialog}
                  onSave={handleSaveEstateUnits}
                />
              )}
              <Grid2 size={12}>
                <EstateUnitGroupGeneralData
                  control={control}
                  errors={errors}
                  readonly={readonly}
                  mode={FormMode.Edit}
                  setValue={setValue}
                />
              </Grid2>
              <SectionTitle
                actions={
                  !readonly ? (
                    <Button
                      color="secondary"
                      variant="contained"
                      startIcon={<AddCircleOutline />}
                      onClick={handleOpenEstateUnitsDialog}
                    >
                      {t('estate_unit_group.action.add_estate_units')}
                    </Button>
                  ) : undefined
                }
                value="estate_unit_group.section_title.estate_units"
              />
              {errors.estateUnits?.message && (
                <Grid2 size={12}>
                  <Alert severity="error" message={errors.estateUnits.message} />
                </Grid2>
              )}
              <Grid2 size={12}>
                <EstateUnitGroupEstateUnitsTable estateUnits={fields} onRowDelete={readonly ? undefined : remove} />
              </Grid2>
            </Grid2>
          )}
        </CardContent>
      </Card>
      <BlockerDialog isBlocked={!readonly} canSave={canSave} onSave={handleWorkingClose} />
    </Form>
  );
}
