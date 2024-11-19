import { yupResolver } from '@hookform/resolvers/yup';
import { ChevronLeft } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardHeader } from '@mui/material';
import { BlockerDialog, CardActions, Form, Loader, Tabs } from '@realgimm5/frontend-common/components';
import { TableProvider, useOperation, useSnackbar } from '@realgimm5/frontend-common/contexts';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { EstateUnitStatus } from '@realgimm5/frontend-common/gql/types';
import { useNavigateBack, useTabsLocation } from '@realgimm5/frontend-common/hooks';
import { StateLocation } from '@realgimm5/frontend-common/interfaces';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { OperationResult, useClient } from 'urql';

import { EstateUnitCadastralUnit } from '../../../../components/domains/EstateUnit/CadastralUnit/CadastralUnit';
import { EstateUnitDocuments } from '../../../../components/domains/EstateUnit/Documents/Documents';
import { EstateUnitEstate } from '../../../../components/domains/EstateUnit/Estate/Estate';
import { EstateUnitGeneralData } from '../../../../components/domains/EstateUnit/GeneralData/GeneralData';
import { EstateUnitOfficialAct } from '../../../../components/domains/EstateUnit/OfficialAct/OfficialAct';
import { EstateUnitRepossession } from '../../../../components/domains/EstateUnit/Repossession/Repossession';
import { EstateUnitSurfaces } from '../../../../components/domains/EstateUnit/Surfaces/Surfaces';
import { EstateUnitActions } from '../../../../components/domains/EstateUnitActions/EstateUnitActions';
import { EstateSubUnitsTable } from '../../../../components/tables/EstateSubUnits/EstateSubUnits';
import { CadastralUnitCreateDialog } from '../../../../components/wizards/CadastralUnit/CadastralUnit';
import { RawFeature } from '../../../../enums/RawFeature';
import { useCreateCadastralUnitMutation } from '../../../../gql/RealGimm.Web.CadastralUnit.operation';
import { EstateUnitFragment } from '../../../../gql/RealGimm.Web.EstateUnit.fragment';
import {
  DeleteEstateUnitDocument,
  ExportEstateUnitsDocument,
  GetEstateUnitDocument,
  GetEstateUnitQuery,
  useUpdateEstateUnitMutation,
} from '../../../../gql/RealGimm.Web.EstateUnit.operation';
import { useFeature } from '../../../../hooks/useFeature';
import { CadastralUnitFormInput } from '../../../../interfaces/FormInputs/CadastralUnit';
import { EstateUnitFormInput } from '../../../../interfaces/FormInputs/EstateUnit';
import { parseCadastralUnitFormInputToCadastralUnitInput } from '../../../../utils/cadastralUnit/parseCadastralUnitFormInput';
import { parseEstateUnitFormInputToEstateUnitInput } from '../../../../utils/estateUnit/parseEstateUnitFormInput';
import { parseEstateUnitToEstateUnitFormInput } from '../../../../utils/estateUnit/parseEstateUnitFragment';
import { getEstateUnitDocumentsSchema } from '../../../../utils/estateUnit/schemas/documents';
import { getEstateUnitEstateSchema } from '../../../../utils/estateUnit/schemas/estate';
import { getEstateUnitSchema } from '../../../../utils/estateUnit/schemas/estateUnit';
import { getEstateUnitGeneralDataSchema } from '../../../../utils/estateUnit/schemas/generalData';
import { getEstateUnitOfficialActSchema } from '../../../../utils/estateUnit/schemas/officialAct';
import { getEstateUnitRepossessionSchema } from '../../../../utils/estateUnit/schemas/repossession';

export default function EstateUnit() {
  const { canDelete, canRead, canUpdate } = useFeature(RawFeature.ASST_ESTATEUNIT_BASE);
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { id } = useParams();
  const { handleDelete, handleExport } = useOperation();
  const { state } = useLocation() as StateLocation;
  const { showError, showSnackbar } = useSnackbar();
  const tabsLocation = useTabsLocation();
  const client = useClient();
  const goBack = useNavigateBack('/app/real-estate/estate-units');
  const [loading, setLoading] = useState(false);
  const [readonly, setReadonly] = useState(state?.readonly ?? true);
  const [isCadastralUnitCreateDialogOpen, setCreateCadastralUnitDialogOpen] = useState(false);
  const [, createCadastralUnitMutation] = useCreateCadastralUnitMutation();
  const [, updateEstateUnitMutation] = useUpdateEstateUnitMutation();
  const [estateUnit, setEstateUnit] = useState<EstateUnitFormInput>();
  const [estateUnitFragment, setEstateUnitFragment] = useState<EstateUnitFragment>();
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);

  const fetchEstateUnit = useCallback(async () => {
    setLoading(true);
    const result: OperationResult<GetEstateUnitQuery> = await client.query(GetEstateUnitDocument, {
      estateUnitId: Number(id),
    });
    setLoading(false);
    if (!result.data?.estateUnit.estateUnit) return Promise.reject();
    setEstateUnitFragment(result.data.estateUnit.estateUnit);
    return parseEstateUnitToEstateUnitFormInput(result.data.estateUnit.estateUnit);
  }, [id, client]);

  const {
    control,
    formState: { isValid: canSave, errors, isSubmitted },
    handleSubmit,
    reset,
    setValue,
    watch,
    getValues,
  } = useForm<EstateUnitFormInput>({
    defaultValues: fetchEstateUnit,
    resolver: estateUnit ? yupResolver(getEstateUnitSchema(language, t)) : undefined,
  });

  useEffect(() => {
    window.history.replaceState(null, document.title);
    const { unsubscribe } = watch((formValues) => {
      setEstateUnit(formValues as EstateUnitFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(estateUnit);
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

  const handleOpenCadastralUnitCreateDialog = useCallback(() => {
    setCreateCadastralUnitDialogOpen(true);
  }, []);
  const handleCloseCadastralUnitCreateDialog = useCallback(() => {
    setCreateCadastralUnitDialogOpen(false);
  }, []);
  const handleSaveCreateCadastralUnit = useCallback(
    async (cadastralUnit: CadastralUnitFormInput) => {
      setLoading(true);
      const result = await createCadastralUnitMutation({
        cadastralUnitInput: parseCadastralUnitFormInputToCadastralUnitInput(cadastralUnit),
      });
      setLoading(false);
      if (result.data?.cadastralUnit.addCadastralUnit.isSuccess) {
        showSnackbar(t('cadastral_unit.feedback.create'), 'success');
        handleCloseCadastralUnitCreateDialog();
        const updatedEstateUnit = await fetchEstateUnit();
        setEstateUnit(updatedEstateUnit);
        setSubmitSuccessful(true);
      } else {
        showError(result.data?.cadastralUnit.addCadastralUnit.validationErrors);
      }
    },
    [t, createCadastralUnitMutation, handleCloseCadastralUnitCreateDialog, fetchEstateUnit, showSnackbar, showError],
  );

  const onSubmit = useCallback(
    async (estateUnit: EstateUnitFormInput) => {
      setLoading(true);
      const result = await updateEstateUnitMutation({
        estateUnitId: Number(estateUnit.estateUnitId),
        estateUnitInput: parseEstateUnitFormInputToEstateUnitInput(estateUnit),
      });
      setLoading(false);
      if (result.data?.estateUnit.update.isSuccess) {
        showSnackbar(t('estate_unit.feedback.update'), 'success');
        setReadonly(true);
        const updatedEstateUnit = await fetchEstateUnit();
        setEstateUnit(updatedEstateUnit);
        setSubmitSuccessful(true);
        return Promise.resolve();
      } else {
        showError(result.data?.estateUnit.update.validationErrors);
      }
      return Promise.reject();
    },
    [updateEstateUnitMutation, showSnackbar, t, fetchEstateUnit, showError],
  );

  const title = useMemo(
    () => (estateUnit ? `${estateUnit.internalCode}${estateUnit.name.length ? ` - ${estateUnit.name}` : ''}` : ''),
    [estateUnit],
  );

  const handleWorkingClose = useCallback(() => {
    const values = getValues();
    return onSubmit(values);
  }, [onSubmit, getValues]);

  const onDelete = useCallback(() => {
    setReadonly(true);
    goBack();
  }, [goBack]);

  return (
    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
      {loading && <Loader />}
      {isCadastralUnitCreateDialogOpen && (
        <CadastralUnitCreateDialog
          estateUnit={estateUnitFragment}
          onClose={handleCloseCadastralUnitCreateDialog}
          onSave={handleSaveCreateCadastralUnit}
        />
      )}
      <Card>
        <Box sx={{ px: 1, pt: 2 }}>
          <Button color="secondary" variant="text" startIcon={<ChevronLeft />} onClick={goBack}>
            {t('common.button.back')}
          </Button>
        </Box>
        <CardHeader
          title={title}
          titleTypographyProps={{ variant: 'h2' }}
          action={
            <CardActions
              leftActions={
                estateUnit?.status === EstateUnitStatus.Existing && <EstateUnitActions estateUnitId={Number(id)} />
              }
              readonly={readonly}
              onCancel={handleCancel}
              onDelete={canDelete ? handleDelete('estate_unit', DeleteEstateUnitDocument, onDelete) : undefined}
              onEdit={
                canUpdate &&
                estateUnit?.status &&
                [EstateUnitStatus.Existing, EstateUnitStatus.Disused].includes(estateUnit.status)
                  ? handleEdit
                  : undefined
              }
              onExport={canRead ? handleExport(ExportEstateUnitsDocument) : undefined}
            />
          }
        />
        <CardContent>
          <Tabs
            {...tabsLocation}
            tabs={[
              {
                label: 'estate_unit.tab.general_data',
                children: estateUnit && (
                  <EstateUnitGeneralData
                    control={control}
                    errors={errors}
                    mode={FormMode.Edit}
                    readonly={readonly}
                    setValue={setValue}
                  />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  estateUnit &&
                  !getEstateUnitGeneralDataSchema(language, t).isValidSync(estateUnit),
              },
              {
                label: 'estate_unit.tab.official_act',
                children: estateUnit && (
                  <EstateUnitOfficialAct
                    control={control}
                    errors={errors}
                    mode={FormMode.Edit}
                    readonly={readonly}
                    setValue={setValue}
                  />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  estateUnit &&
                  !getEstateUnitOfficialActSchema(language, t).isValidSync(estateUnit),
              },
              {
                label: 'estate_unit.tab.estate',
                children: estateUnit && <EstateUnitEstate control={control} mode={FormMode.Edit} readonly={readonly} />,
                error: !readonly && isSubmitted && estateUnit && !getEstateUnitEstateSchema(t).isValidSync(estateUnit),
              },
              {
                label: 'estate_unit.tab.cadastral_unit',
                children: estateUnit && (
                  <EstateUnitCadastralUnit
                    control={control}
                    errors={errors}
                    readonly={readonly}
                    onAdd={handleOpenCadastralUnitCreateDialog}
                  />
                ),
              },
              {
                label: 'estate_unit.tab.estate_sub_units',
                children: estateUnit && (
                  <TableProvider
                    key="estate-sub-units"
                    initialState={{
                      sorting: [
                        {
                          desc: false,
                          id: 'internalCode',
                        },
                      ],
                    }}
                  >
                    <EstateSubUnitsTable estateUnit={estateUnit} readonly={!readonly} />
                  </TableProvider>
                ),
              },
              {
                label: 'estate_unit.tab.surface',
                children: estateUnit && <EstateUnitSurfaces control={control} readonly={readonly} />,
              },
              {
                label: 'estate_unit.tab.repossession',
                children: estateUnit && (
                  <EstateUnitRepossession control={control} errors={errors} readonly={readonly} />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  estateUnit &&
                  !getEstateUnitRepossessionSchema(language, t).isValidSync(estateUnit),
              },
              {
                label: 'estate_unit.tab.documents',
                children: estateUnit && (
                  <EstateUnitDocuments control={control} errors={errors} mode={FormMode.Edit} readonly={readonly} />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  estateUnit &&
                  !getEstateUnitDocumentsSchema(language, t).isValidSync(estateUnit),
              },
            ]}
          />
        </CardContent>
      </Card>
      <BlockerDialog isBlocked={!readonly} canSave={canSave} onSave={handleWorkingClose} />
    </Form>
  );
}
