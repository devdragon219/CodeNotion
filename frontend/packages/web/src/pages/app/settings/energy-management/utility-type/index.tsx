import { yupResolver } from '@hookform/resolvers/yup';
import { ChevronLeft } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardHeader } from '@mui/material';
import { BlockerDialog, CardActions, Form, Loader, Tabs } from '@realgimm5/frontend-common/components';
import { useOperation, useSnackbar } from '@realgimm5/frontend-common/contexts';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useDebounce, useNavigateBack, useTabsLocation } from '@realgimm5/frontend-common/hooks';
import { StateLocation } from '@realgimm5/frontend-common/interfaces';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { OperationResult, useClient } from 'urql';

import { UtilityTypeFields } from '../../../../../components/domains/UtilityType/Fields/Fields';
import { UtilityTypeGeneralData } from '../../../../../components/domains/UtilityType/GeneralData/GeneralData';
import { RawFeature } from '../../../../../enums/RawFeature';
import {
  DeleteUtilityTypeDocument,
  ExportUtilityTypesDocument,
  GetUtilityTypeDocument,
  GetUtilityTypeQuery,
  useUpdateUtilityTypeMutation,
} from '../../../../../gql/RealGimm.Web.UtilityType.operation';
import { useFeature } from '../../../../../hooks/useFeature';
import { useUtilityType } from '../../../../../hooks/useUtilityType';
import { UtilityTypeFormInput } from '../../../../../interfaces/FormInputs/UtilityType';
import { parseUtilityTypeFormInputToUtilityTypeInput } from '../../../../../utils/utilityType/parseUtilityTypeFormInput';
import { parseUtilityTypeToUtilityTypeFormInput } from '../../../../../utils/utilityType/parseUtilityTypeFragment';
import { getUtilityTypeFieldsSchema } from '../../../../../utils/utilityType/schemas/fields';
import { getUtilityTypeGeneralDataSchema } from '../../../../../utils/utilityType/schemas/generalData';
import { getUtilityTypeSchema } from '../../../../../utils/utilityType/schemas/utilityType';

export default function UtilityType() {
  const { canDelete, canRead, canUpdate } = useFeature(RawFeature.NRGY_TYPE_BASE);
  const { t } = useTranslation();
  const { id } = useParams();
  const { handleDelete, handleExport } = useOperation();
  const { state } = useLocation() as StateLocation;
  const { showError, showSnackbar } = useSnackbar();
  const tabsLocation = useTabsLocation();
  const client = useClient();
  const goBack = useNavigateBack('/app/settings/energy-management/utility-types');
  const { checkCanUseInternalCode } = useUtilityType();
  const [loading, setLoading] = useState(false);
  const [readonly, setReadonly] = useState(state?.readonly ?? true);
  const [, updateUtilityTypeMutation] = useUpdateUtilityTypeMutation();
  const [utilityType, setUtilityType] = useState<UtilityTypeFormInput>();
  const debouncedUtilityType = useDebounce(utilityType);
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);

  const fetchUtilityType = useCallback(async () => {
    setLoading(true);
    const result: OperationResult<GetUtilityTypeQuery> = await client.query(GetUtilityTypeDocument, {
      utilityTypeId: Number(id),
    });
    setLoading(false);
    if (!result.data?.utilityType.get) return Promise.reject();
    return parseUtilityTypeToUtilityTypeFormInput(result.data.utilityType.get);
  }, [id, client]);

  const {
    control,
    formState: { isValid: canSave, errors, isSubmitted },
    handleSubmit,
    reset,
    watch,
    getValues,
  } = useForm<UtilityTypeFormInput>({
    defaultValues: fetchUtilityType,
    resolver: utilityType ? yupResolver(getUtilityTypeSchema(canUseInternalCode, t)) : undefined,
  });

  useEffect(() => {
    if (debouncedUtilityType) {
      checkCanUseInternalCode(
        debouncedUtilityType.internalCode,
        debouncedUtilityType.utilityTypeId,
        setCanUseInternalCode,
      );
    }
    // eslint-disable-next-line
  }, [debouncedUtilityType?.internalCode, debouncedUtilityType?.utilityTypeId]);

  useEffect(() => {
    window.history.replaceState(null, document.title);
    const { unsubscribe } = watch((formValues) => {
      setUtilityType(formValues as UtilityTypeFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(utilityType);
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
    async (utilityType: UtilityTypeFormInput) => {
      setLoading(true);
      const result = await updateUtilityTypeMutation({
        utilityTypeId: Number(utilityType.utilityTypeId),
        utilityTypeInput: parseUtilityTypeFormInputToUtilityTypeInput(utilityType),
      });
      setLoading(false);
      if (result.data?.utilityType.update.isSuccess) {
        showSnackbar(t('utility_type.feedback.update'), 'success');
        setReadonly(true);
        const updatedUtilityType = await fetchUtilityType();
        setUtilityType(updatedUtilityType);
        setSubmitSuccessful(true);
        return Promise.resolve();
      } else {
        showError(result.data?.utilityType.update.validationErrors);
        return Promise.reject();
      }
    },
    [updateUtilityTypeMutation, showSnackbar, t, fetchUtilityType, showError],
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
          title={utilityType ? `${utilityType.internalCode} - ${utilityType.description}` : ''}
          titleTypographyProps={{ variant: 'h2' }}
          action={
            <CardActions
              readonly={readonly}
              onCancel={handleCancel}
              onDelete={canDelete ? handleDelete('utility_type', DeleteUtilityTypeDocument, onDelete) : undefined}
              onEdit={canUpdate ? handleEdit : undefined}
              onExport={canRead ? handleExport(ExportUtilityTypesDocument) : undefined}
            />
          }
        />
        <CardContent>
          <Tabs
            {...tabsLocation}
            tabs={[
              {
                label: 'utility_type.tab.general_data',
                children: utilityType && (
                  <UtilityTypeGeneralData control={control} errors={errors} mode={FormMode.Edit} readonly={readonly} />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  utilityType &&
                  !getUtilityTypeGeneralDataSchema(canUseInternalCode, t).isValidSync(utilityType),
              },
              {
                label: 'utility_type.tab.fields',
                children: utilityType && (
                  <UtilityTypeFields control={control} errors={errors} mode={FormMode.Edit} readonly={readonly} />
                ),
                error:
                  !readonly && isSubmitted && utilityType && !getUtilityTypeFieldsSchema(t).isValidSync(utilityType),
              },
            ]}
          />
        </CardContent>
      </Card>
      <BlockerDialog isBlocked={!readonly} canSave={canSave} onSave={handleWorkingClose} />
    </Form>
  );
}
