import { yupResolver } from '@hookform/resolvers/yup';
import { ChevronLeft } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardHeader } from '@mui/material';
import { BlockerDialog, CardActions, Form, Loader, Tabs } from '@realgimm5/frontend-common/components';
import { useOperation, useSnackbar } from '@realgimm5/frontend-common/contexts';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useNavigateBack, useTabsLocation } from '@realgimm5/frontend-common/hooks';
import { StateLocation } from '@realgimm5/frontend-common/interfaces';
import { parseStringToDate } from '@realgimm5/frontend-common/utils';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { OperationResult, useClient } from 'urql';

import { CostChargeGeneralData } from '../../../../components/domains/CostCharge/GeneralData/GeneralData';
import { CostChargeUtilityService } from '../../../../components/domains/CostCharge/UtilityService/UtilityService';
import { RawFeature } from '../../../../enums/RawFeature';
import {
  DeleteCostChargeDocument,
  ExportCostChargesDocument,
  GetCostChargeDocument,
  GetCostChargeQuery,
  useUpdateCostChargeMutation,
} from '../../../../gql/RealGimm.Web.CostCharge.operation';
import { useFeature } from '../../../../hooks/useFeature';
import { CostChargeFormInput } from '../../../../interfaces/FormInputs/CostCharge';
import { parseCostChargeFormInputToCostChargeInput } from '../../../../utils/costCharge/parseCostChargeFormInput';
import { parseCostChargeToCostChargeFormInput } from '../../../../utils/costCharge/parseCostChargeFragment';
import { getCostChargeSchema } from '../../../../utils/costCharge/schemas/costCharge';
import { getCostChargeGeneralDataSchema } from '../../../../utils/costCharge/schemas/generalData';

export default function CostCharge() {
  const { canDelete, canRead, canUpdate } = useFeature(RawFeature.NRGY_COSTCHARGE_BASE);
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
  const goBack = useNavigateBack('/app/energy-management/cost-charges');
  const [loading, setLoading] = useState(false);
  const [readonly, setReadonly] = useState(state?.readonly ?? true);
  const [, updateCostChargeMutation] = useUpdateCostChargeMutation();
  const [costCharge, setCostCharge] = useState<CostChargeFormInput>();
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);

  const fetchCostCharge = useCallback(async () => {
    setLoading(true);
    const result: OperationResult<GetCostChargeQuery> = await client.query(GetCostChargeDocument, {
      costChargeId: Number(id),
    });
    setLoading(false);
    if (!result.data?.costCharge.get) return Promise.reject();
    return parseCostChargeToCostChargeFormInput(result.data.costCharge.get);
  }, [id, client]);

  const {
    control,
    formState: { isValid: canSave, errors, isSubmitted },
    handleSubmit,
    reset,
    setValue,
    watch,
    getValues,
  } = useForm<CostChargeFormInput>({
    defaultValues: fetchCostCharge,
    resolver: costCharge
      ? yupResolver(getCostChargeSchema(parseStringToDate(costCharge.utilityService?.activationDate), language, t))
      : undefined,
  });

  useEffect(() => {
    window.history.replaceState(null, document.title);
    const { unsubscribe } = watch((formValues) => {
      setCostCharge(formValues as CostChargeFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(costCharge);
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
    async (costCharge: CostChargeFormInput) => {
      setLoading(true);
      const result = await updateCostChargeMutation({
        costChargeId: Number(costCharge.costChargeId),
        costChargeInput: parseCostChargeFormInputToCostChargeInput(costCharge),
      });
      setLoading(false);
      if (result.data?.costCharge.update.isSuccess) {
        showSnackbar(t('cost_charge.feedback.update'), 'success');
        setReadonly(true);
        const updatedCostCharge = await fetchCostCharge();
        setCostCharge(updatedCostCharge);
        setSubmitSuccessful(true);
        return Promise.resolve();
      } else {
        showError(result.data?.costCharge.update.validationErrors);
        return Promise.reject();
      }
    },
    [updateCostChargeMutation, showSnackbar, t, fetchCostCharge, showError],
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
      <Card>
        <Box sx={{ px: 1, pt: 2 }}>
          <Button color="secondary" variant="text" startIcon={<ChevronLeft />} onClick={goBack}>
            {t('common.button.back')}
          </Button>
        </Box>
        <CardHeader
          title={[costCharge?.invoiceNumber].filter((it) => !!it).join(' | ')}
          titleTypographyProps={{ variant: 'h2' }}
          subheader={[
            costCharge?.utilityService?.utilityType.internalCode,
            costCharge?.utilityService?.utilityType.description,
          ]
            .filter((it) => !!it)
            .join(' - ')}
          subheaderTypographyProps={{ sx: (theme) => ({ color: theme.palette.blue[500] }), variant: 'bodyMd' }}
          action={
            <CardActions
              readonly={readonly}
              onCancel={handleCancel}
              onDelete={canDelete ? handleDelete('cost_charge', DeleteCostChargeDocument, onDelete) : undefined}
              onEdit={canUpdate ? handleEdit : undefined}
              onExport={canRead ? handleExport(ExportCostChargesDocument) : undefined}
            />
          }
        />
        <CardContent>
          <Tabs
            {...tabsLocation}
            tabs={[
              {
                label: 'cost_charge.tab.general_data',
                children: costCharge && (
                  <CostChargeGeneralData
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
                  costCharge &&
                  !getCostChargeGeneralDataSchema(
                    parseStringToDate(costCharge.utilityService?.activationDate),
                    language,
                    t,
                  ).isValidSync(costCharge),
              },
              {
                label: 'cost_charge.tab.utility_service',
                children: costCharge && <CostChargeUtilityService control={control} readonly={readonly} />,
              },
            ]}
          />
        </CardContent>
      </Card>
      <BlockerDialog isBlocked={!readonly} canSave={canSave} onSave={handleWorkingClose} />
    </Form>
  );
}
