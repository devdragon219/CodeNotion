import { yupResolver } from '@hookform/resolvers/yup';
import { ChevronLeft } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardHeader } from '@mui/material';
import { BlockerDialog, CardActions, Form, Loader, Tab, Tabs } from '@realgimm5/frontend-common/components';
import { useOperation, useSnackbar } from '@realgimm5/frontend-common/contexts';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useNavigateBack, useTabsLocation } from '@realgimm5/frontend-common/hooks';
import { StateLocation } from '@realgimm5/frontend-common/interfaces';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { OperationResult, useClient } from 'urql';

import { CadastralUnitUpdateConfirmationDialog } from '../../../../components/dialogs/CadastralUnitUpdate/CadastralUnitUpdate';
import { CadastralUnitCoordinates } from '../../../../components/domains/CadastralUnit/Coordinates/Coordinates';
import { CadastralUnitEstateUnit } from '../../../../components/domains/CadastralUnit/EstateUnit/EstateUnit';
import { CadastralUnitFiscalData } from '../../../../components/domains/CadastralUnit/FiscalData/FiscalData';
import { CadastralUnitGeneralData } from '../../../../components/domains/CadastralUnit/GeneralData/GeneralData';
import { CadastralUnitHistory } from '../../../../components/domains/CadastralUnit/History/History';
import { CadastralUnitIncome } from '../../../../components/domains/CadastralUnit/Income/Income';
import { CadastralUnitInspection } from '../../../../components/domains/CadastralUnit/Inspection/Inspection';
import { CadastralUnitTaxPayments } from '../../../../components/domains/CadastralUnit/TaxPayments/TaxPayments';
import { CadastralUnitUnavailabilities } from '../../../../components/domains/CadastralUnit/Unavailabilities/Unavailabilities';
import { UNSUPPORTED_RAW_FEATURES } from '../../../../configs/features';
import { RawFeature } from '../../../../enums/RawFeature';
import {
  DeleteCadastralUnitDocument,
  ExportCadastralUnitsDocument,
  GetCadastralUnitDocument,
  GetCadastralUnitQuery,
  useUpdateCadastralUnitMutation,
} from '../../../../gql/RealGimm.Web.CadastralUnit.operation';
import { useFeature } from '../../../../hooks/useFeature';
import { CadastralUnitFormInput } from '../../../../interfaces/FormInputs/CadastralUnit';
import { getCoordinateType } from '../../../../utils/cadastralUnit/getCoordinateType';
import { parseCadastralUnitFormInputToCadastralUnitInput } from '../../../../utils/cadastralUnit/parseCadastralUnitFormInput';
import { parseCadastralUnitToCadastralUnitFormInput } from '../../../../utils/cadastralUnit/parseCadastralUnitFragment';
import { getCadastralUnitSchema } from '../../../../utils/cadastralUnit/schemas/cadastralUnit';
import { getCadastralUnitCoordinatesSchema } from '../../../../utils/cadastralUnit/schemas/coordinates';
import { getCadastralUnitFiscalDataSchema } from '../../../../utils/cadastralUnit/schemas/fiscalData';
import { getCadastralUnitGeneralDataSchema } from '../../../../utils/cadastralUnit/schemas/generalData';
import { getCadastralUnitInspectionSchema } from '../../../../utils/cadastralUnit/schemas/inspection';
import { getCadastralUnitUnavailabilitiesSchema } from '../../../../utils/cadastralUnit/schemas/unavailabilities';

export default function CadastralUnit() {
  const { canDelete, canRead, canUpdate } = useFeature(RawFeature.ASST_CADASTRALUNIT_BASE);
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
  const goBack = useNavigateBack('/app/real-estate/cadastral-units');
  const [isVariation, setVariation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [readonly, setReadonly] = useState(state?.readonly ?? true);
  const [isUpdateConfirmationDialogOpen, setUpdateConfirmationDialogOpen] = useState(false);
  const [, updateCadastralUnitMutation] = useUpdateCadastralUnitMutation();
  const [cadastralUnit, setCadastralUnit] = useState<CadastralUnitFormInput>();
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);

  const coordinateType = useMemo(() => getCoordinateType(cadastralUnit?.address), [cadastralUnit?.address]);
  const referenceFields = useMemo(
    () => cadastralUnit?.taxCalculators.map(({ fields }) => fields[0][0]),
    [cadastralUnit],
  );

  const fetchCadastralUnit = useCallback(async () => {
    setLoading(true);
    const result: OperationResult<GetCadastralUnitQuery> = await client.query(GetCadastralUnitDocument, {
      cadastralUnitId: Number(id),
    });
    setLoading(false);
    if (!result.data?.cadastralUnit.cadastralUnit) return Promise.reject();
    return parseCadastralUnitToCadastralUnitFormInput(result.data.cadastralUnit.cadastralUnit, t);
  }, [client, id, t]);

  const {
    control,
    formState: { isValid: canSave, errors, isSubmitted },
    handleSubmit,
    reset,
    setValue,
    watch,
    getValues,
  } = useForm<CadastralUnitFormInput>({
    defaultValues: fetchCadastralUnit,
    resolver: cadastralUnit
      ? yupResolver(getCadastralUnitSchema(coordinateType, language, t, { referenceFields, variation: isVariation }))
      : undefined,
  });

  useEffect(() => {
    window.history.replaceState(null, document.title);
    const { unsubscribe } = watch((formValues) => {
      setCadastralUnit(formValues as CadastralUnitFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(cadastralUnit);
      setSubmitSuccessful(false);
    }
    // eslint-disable-next-line
  }, [isSubmitSuccessful]);

  const handleCloseUpdateConfirmationDialog = useCallback(() => {
    setUpdateConfirmationDialogOpen(false);
    setVariation(false);
  }, []);
  const handleOpenUpdateConfirmationDialog = useCallback(() => {
    setUpdateConfirmationDialogOpen(true);
  }, []);

  const handleCancel = useCallback(() => {
    reset();
    setReadonly(true);
  }, [reset]);
  const handleEdit = useCallback(() => {
    setReadonly(false);
  }, []);

  const onSubmit = useCallback(
    async (cadastralUnit: CadastralUnitFormInput) => {
      setLoading(true);
      const result = await updateCadastralUnitMutation({
        cadastralUnitId: Number(cadastralUnit.cadastralUnitId),
        cadastralUnitInput: parseCadastralUnitFormInputToCadastralUnitInput(cadastralUnit, isVariation),
        isVariation,
      });
      setLoading(false);
      if (result.data?.cadastralUnit.updateCadastralUnit.isSuccess) {
        handleCloseUpdateConfirmationDialog();
        showSnackbar(t('cadastral_unit.feedback.update'), 'success');
        setReadonly(true);
        const updatedCadastralUnit = await fetchCadastralUnit();
        setCadastralUnit(updatedCadastralUnit);
        setSubmitSuccessful(true);
        return Promise.resolve();
      } else {
        showError(result.data?.cadastralUnit.updateCadastralUnit.validationErrors);
        return Promise.reject();
      }
    },
    [
      isVariation,
      t,
      updateCadastralUnitMutation,
      showSnackbar,
      fetchCadastralUnit,
      showError,
      handleCloseUpdateConfirmationDialog,
    ],
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
      <CadastralUnitUpdateConfirmationDialog
        control={control}
        errors={errors}
        isVariation={isVariation}
        open={isUpdateConfirmationDialogOpen}
        onChange={setVariation}
        onClose={handleCloseUpdateConfirmationDialog}
        onSave={handleSubmit(onSubmit)}
      />
      <Card>
        <Box sx={{ px: 1, pt: 2 }}>
          <Button color="secondary" variant="text" startIcon={<ChevronLeft />} onClick={goBack}>
            {t('common.button.back')}
          </Button>
        </Box>
        <CardHeader
          title={cadastralUnit?.internalCode}
          titleTypographyProps={{ variant: 'h2' }}
          action={
            <CardActions
              readonly={readonly}
              onCancel={handleCancel}
              onDelete={canDelete ? handleDelete('cadastral_unit', DeleteCadastralUnitDocument, onDelete) : undefined}
              onEdit={canUpdate ? handleEdit : undefined}
              onExport={canRead ? handleExport(ExportCadastralUnitsDocument) : undefined}
              onSave={handleSubmit(handleOpenUpdateConfirmationDialog)}
            />
          }
        />
        <CardContent>
          <Tabs
            {...tabsLocation}
            tabs={[
              {
                label: 'cadastral_unit.tab.general_data',
                children: cadastralUnit && (
                  <CadastralUnitGeneralData
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
                  cadastralUnit &&
                  !getCadastralUnitGeneralDataSchema(language, t).isValidSync(cadastralUnit),
              },
              {
                label: 'cadastral_unit.tab.inspection',
                children: cadastralUnit && (
                  <CadastralUnitInspection
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
                  cadastralUnit &&
                  !getCadastralUnitInspectionSchema(language, t).isValidSync(cadastralUnit),
              },
              {
                label: 'cadastral_unit.tab.income',
                children: cadastralUnit && (
                  <CadastralUnitIncome control={control} errors={errors} mode={FormMode.Edit} readonly={readonly} />
                ),
              },
              {
                label: 'cadastral_unit.tab.estate_unit',
                children: cadastralUnit && (
                  <CadastralUnitEstateUnit control={control} mode={FormMode.Edit} readonly={readonly} />
                ),
              },
              {
                label: 'cadastral_unit.tab.cadastral_coordinates',
                children: cadastralUnit && (
                  <CadastralUnitCoordinates
                    control={control}
                    errors={errors}
                    mode={FormMode.Edit}
                    readonly={readonly}
                  />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  cadastralUnit &&
                  !getCadastralUnitCoordinatesSchema(coordinateType, t).isValidSync(cadastralUnit),
              },
              {
                label: 'cadastral_unit.tab.unavailability',
                children: cadastralUnit && <CadastralUnitUnavailabilities control={control} readonly={readonly} />,
                error:
                  !readonly &&
                  isSubmitted &&
                  cadastralUnit &&
                  !getCadastralUnitUnavailabilitiesSchema(language, t).isValidSync(cadastralUnit),
              },
              {
                label: 'cadastral_unit.tab.history',
                children: cadastralUnit && <CadastralUnitHistory control={control} readonly={readonly} />,
              },
              ...((UNSUPPORTED_RAW_FEATURES.includes(RawFeature.ASST_ASSET_TAX_BASE)
                ? []
                : [
                    {
                      label: 'cadastral_unit.tab.fiscal_data',
                      children: cadastralUnit && (
                        <CadastralUnitFiscalData control={control} errors={errors} readonly={readonly} />
                      ),
                      error:
                        !readonly &&
                        isSubmitted &&
                        cadastralUnit &&
                        !getCadastralUnitFiscalDataSchema(t, referenceFields).isValidSync(cadastralUnit),
                    },
                    {
                      label: 'cadastral_unit.tab.tax_payments',
                      children: cadastralUnit && <CadastralUnitTaxPayments control={control} />,
                    },
                  ]) as Tab[]),
            ]}
          />
        </CardContent>
      </Card>
      <BlockerDialog isBlocked={!readonly} canSave={canSave} onSave={handleWorkingClose} />
    </Form>
  );
}
