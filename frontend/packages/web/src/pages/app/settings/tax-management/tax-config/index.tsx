import { yupResolver } from '@hookform/resolvers/yup';
import { ChevronLeft } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardHeader, Grid2 } from '@mui/material';
import { BlockerDialog, CardActions, Form, Loader } from '@realgimm5/frontend-common/components';
import { useOperation, useSnackbar } from '@realgimm5/frontend-common/contexts';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useNavigateBack } from '@realgimm5/frontend-common/hooks';
import { StateLocation } from '@realgimm5/frontend-common/interfaces';
import { ParseKeys } from 'i18next';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { OperationResult, useClient } from 'urql';

import { TaxConfigGeneralData } from '../../../../../components/domains/TaxConfig/GeneralData/GeneralData';
import { TaxConfigSubTable } from '../../../../../components/domains/TaxConfig/SubTable/SubTable';
import { TAX_CALCULATOR_REVALUATION_COEFFICIENTS_TABLE_CODE } from '../../../../../configs/taxCalculator';
import { RawFeature } from '../../../../../enums/RawFeature';
import { TaxCalculatorFragment } from '../../../../../gql/RealGimm.Web.TaxCalculator.fragment';
import { TaxConfigValueBundleFragment } from '../../../../../gql/RealGimm.Web.TaxConfigValueBundle.fragment';
import {
  DeleteTaxConfigMainTableValueDocument,
  ExportTaxConfigMainTableValuesDocument,
  GetTaxConfigMainTableValueDocument,
  GetTaxConfigMainTableValueQuery,
  useUpdateTaxConfigMainTableValueMutation,
} from '../../../../../gql/RealGimm.Web.TaxConfiguration.operation';
import { useFeature } from '../../../../../hooks/useFeature';
import { TaxConfigFormInput } from '../../../../../interfaces/FormInputs/TaxConfig';
import { parseTaxConfigFormInputToTaxConfigInput } from '../../../../../utils/components/taxConfig/parseTaxConfigFormInput';
import { parseTaxConfigValueToTaxConfigValueFormInput } from '../../../../../utils/components/taxConfig/parseTaxConfigValueFragment';
import { getTaxConfigSchema } from '../../../../../utils/components/taxConfig/schemas/taxConfig';
import {
  getTaxConfigTableName,
  getTaxConfigValueFeedbackBaseKey,
  getTaxConfigValueTitle,
} from '../../../../../utils/components/taxConfig/taxConfigUtils';

export default function TaxConfig() {
  const { canDelete, canRead, canUpdate } = useFeature(RawFeature.COMMON_TAX_RATES);
  const { t } = useTranslation();
  const { calculatorId, tableCode, tableValueId } = useParams();
  const { handleDelete, handleExport } = useOperation();
  const { state } = useLocation() as StateLocation;
  const { showError, showSnackbar } = useSnackbar();
  const client = useClient();
  const goBack = useNavigateBack(
    `/app/settings/tax-management/${tableCode === TAX_CALCULATOR_REVALUATION_COEFFICIENTS_TABLE_CODE ? 'revaluation-coefficients/history' : 'tax-rates'}`,
  );
  const [loading, setLoading] = useState(false);
  const [readonly, setReadonly] = useState(state?.readonly ?? true);
  const [, updateTaxConfigMainTableValue] = useUpdateTaxConfigMainTableValueMutation();
  const [taxCalculator, setTaxCalculator] = useState<TaxCalculatorFragment>();
  const [taxConfig, setTaxConfig] = useState<TaxConfigFormInput>();
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);
  const table = useMemo(
    () => taxCalculator?.configuration.availableMainTables.find(({ code }) => code === tableCode),
    [tableCode, taxCalculator?.configuration.availableMainTables],
  );
  const subTables = useMemo(
    () => taxCalculator?.configuration.availableSubTables.find(({ key }) => key === tableCode)?.value ?? [],
    [tableCode, taxCalculator?.configuration.availableSubTables],
  );

  const fetchTaxConfig = useCallback(async () => {
    setLoading(true);
    const result: OperationResult<GetTaxConfigMainTableValueQuery> = await client.query(
      GetTaxConfigMainTableValueDocument,
      {
        calculatorId,
        tableCode,
        tableValueId: Number(tableValueId),
      },
    );
    setLoading(false);
    setTaxCalculator(result.data?.taxConfiguration.tableValueBundle?.calculator);
    return parseTaxConfigValueToTaxConfigValueFormInput(
      result.data?.taxConfiguration.tableValueBundle as TaxConfigValueBundleFragment,
      String(tableCode),
    );
  }, [client, calculatorId, tableCode, tableValueId]);

  const {
    control,
    formState: { isValid: canSave, errors },
    handleSubmit,
    reset,
    watch,
    getValues,
  } = useForm<TaxConfigFormInput>({
    defaultValues: fetchTaxConfig,
    resolver: taxConfig ? yupResolver(getTaxConfigSchema(subTables, t)) : undefined,
  });

  useEffect(() => {
    window.history.replaceState(null, document.title);
    const { unsubscribe } = watch((formValues) => {
      setTaxConfig(formValues as TaxConfigFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(taxConfig);
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
    async (taxConfig: TaxConfigFormInput) => {
      setLoading(true);
      const result = await updateTaxConfigMainTableValue({
        calculatorId: String(calculatorId),
        tableCode: String(tableCode),
        tableValueId: Number(taxConfig.table.taxConfigValueId),
        input: parseTaxConfigFormInputToTaxConfigInput(taxConfig),
      });
      setLoading(false);
      if (result.data?.taxConfiguration.updateTableValue.isSuccess) {
        showSnackbar(
          t(
            `${getTaxConfigValueFeedbackBaseKey(taxCalculator!.description, String(tableCode))}.feedback.update` as ParseKeys,
          ),
          'success',
        );
        setReadonly(true);
        const updatedTaxConfig = await fetchTaxConfig();
        setTaxConfig(updatedTaxConfig);
        setSubmitSuccessful(true);
        return Promise.resolve();
      } else {
        showError(result.data?.taxConfiguration.updateTableValue.validationErrors);
        return Promise.reject();
      }
    },
    [updateTaxConfigMainTableValue, calculatorId, tableCode, showSnackbar, t, taxCalculator, fetchTaxConfig, showError],
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
          title={taxConfig ? getTaxConfigValueTitle(taxConfig.table) : undefined}
          titleTypographyProps={{ variant: 'h2' }}
          subheader={taxCalculator ? t(getTaxConfigTableName(taxCalculator.description, String(tableCode))) : undefined}
          subheaderTypographyProps={{ sx: (theme) => ({ color: theme.palette.blue[500] }), variant: 'bodyMd' }}
          action={
            <CardActions
              readonly={readonly}
              onCancel={handleCancel}
              onDelete={
                canDelete && table?.canAddRemoveRows
                  ? handleDelete(
                      getTaxConfigValueFeedbackBaseKey(String(taxCalculator?.description), String(tableCode)),
                      DeleteTaxConfigMainTableValueDocument,
                      onDelete,
                      () => ({
                        calculatorId: String(calculatorId),
                        tableValueId: Number(tableValueId),
                      }),
                    )
                  : undefined
              }
              onEdit={canUpdate ? handleEdit : undefined}
              onExport={
                canRead
                  ? handleExport(ExportTaxConfigMainTableValuesDocument, {
                      calculatorId: String(calculatorId),
                      tableCode: String(tableCode),
                      where: {
                        id: {
                          eq: Number(tableValueId),
                        },
                      },
                    })
                  : undefined
              }
            />
          }
        />
        <CardContent>
          {taxCalculator && taxConfig && (
            <Grid2 container spacing={{ xs: 2, sm: 3 }}>
              <Grid2 size={12}>
                <TaxConfigGeneralData control={control} errors={errors} mode={FormMode.Edit} readonly={readonly} />
              </Grid2>
              {subTables.map((subTable, index) => (
                <Grid2 key={index} size={12}>
                  <TaxConfigSubTable
                    calculator={taxCalculator.description}
                    control={control}
                    errors={errors}
                    mode={FormMode.Edit}
                    readonly={readonly}
                    subTable={subTable}
                  />
                </Grid2>
              ))}
            </Grid2>
          )}
        </CardContent>
      </Card>
      <BlockerDialog isBlocked={!readonly} canSave={canSave} onSave={handleWorkingClose} />
    </Form>
  );
}
