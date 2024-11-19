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

import { FacilityContractTemplateGeneralData } from '../../../../../components/domains/FacilityContractTemplate/GeneralData/GeneralData';
import { FacilityContractTemplatePenaltiesField } from '../../../../../components/domains/FacilityContractTemplate/Penalties/Field/Field';
import { FacilityContractTemplateSlasField } from '../../../../../components/domains/FacilityContractTemplate/SLAs/Field/Field';
import { RawFeature } from '../../../../../enums/RawFeature';
import {
  DeleteFacilityContractTemplateDocument,
  ExportFacilityContractTemplatesDocument,
  GetFacilityContractTemplateDocument,
  GetFacilityContractTemplateQuery,
  useUpdateFacilityContractTemplateMutation,
} from '../../../../../gql/RealGimm.Web.FacilityContractTemplate.operation';
import { useFacilityContractTemplate } from '../../../../../hooks/useFacilityContractTemplate';
import { useFeature } from '../../../../../hooks/useFeature';
import { FacilityContractTemplateFormInput } from '../../../../../interfaces/FormInputs/FacilityContractTemplate';
import { parseFacilityContractTemplateFormInputToFacilityContractTemplateInput } from '../../../../../utils/facilityContractTemplate/parseFacilityContractTemplateFormInput';
import { parseFacilityContractTemplateToFacilityContractTemplateFormInput } from '../../../../../utils/facilityContractTemplate/parseFacilityContractTemplateFragment';
import { getFacilityContractTemplateSchema } from '../../../../../utils/facilityContractTemplate/schemas/facilityContractTemplate';
import { getFacilityContractTemplateGeneralDataSchema } from '../../../../../utils/facilityContractTemplate/schemas/generalData';

export default function FacilityContractTemplate() {
  const { canDelete, canUpdate, canRead } = useFeature(RawFeature.FCLT_CONTRACT_TEMPLATES);
  const { t } = useTranslation();
  const { id } = useParams();
  const { handleDelete, handleExport } = useOperation();
  const { state } = useLocation() as StateLocation;
  const { showError, showSnackbar } = useSnackbar();
  const tabsLocation = useTabsLocation();
  const client = useClient();
  const goBack = useNavigateBack('/app/settings/maintenance/facility-contract-templates');
  const { checkCanUseInternalCode } = useFacilityContractTemplate();
  const [loading, setLoading] = useState(false);
  const [readonly, setReadonly] = useState(state?.readonly ?? true);
  const [, updateFacilityContractTemplateMutation] = useUpdateFacilityContractTemplateMutation();
  const [facilityContractTemplate, setFacilityContractTemplate] = useState<FacilityContractTemplateFormInput>();
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);
  const debouncedFacilityContractTemplate = useDebounce(facilityContractTemplate);
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);

  const fetchFacilityContractTemplate = useCallback(async () => {
    setLoading(true);
    const result: OperationResult<GetFacilityContractTemplateQuery> = await client.query(
      GetFacilityContractTemplateDocument,
      {
        facilityContractTemplateId: Number(id),
      },
    );
    setLoading(false);
    if (!result.data?.contractTemplate.get) return Promise.reject();
    return parseFacilityContractTemplateToFacilityContractTemplateFormInput(result.data.contractTemplate.get);
  }, [id, client]);

  const {
    control,
    formState: { isValid: canSave, errors, isSubmitted },
    handleSubmit,
    reset,
    watch,
    getValues,
  } = useForm<FacilityContractTemplateFormInput>({
    defaultValues: fetchFacilityContractTemplate,
    resolver: facilityContractTemplate
      ? yupResolver(getFacilityContractTemplateSchema(canUseInternalCode, t))
      : undefined,
  });

  useEffect(() => {
    if (debouncedFacilityContractTemplate) {
      checkCanUseInternalCode(
        debouncedFacilityContractTemplate.internalCode,
        debouncedFacilityContractTemplate.facilityContractTemplateId,
        setCanUseInternalCode,
      );
    }
    // eslint-disable-next-line
  }, [debouncedFacilityContractTemplate?.internalCode, debouncedFacilityContractTemplate?.facilityContractTemplateId]);

  useEffect(() => {
    window.history.replaceState(null, document.title);
    const { unsubscribe } = watch((formValues) => {
      setFacilityContractTemplate(formValues as FacilityContractTemplateFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(facilityContractTemplate);
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
    async (facilityContractTemplate: FacilityContractTemplateFormInput) => {
      setLoading(true);
      const result = await updateFacilityContractTemplateMutation({
        facilityContractTemplateId: Number(facilityContractTemplate.facilityContractTemplateId),
        input: parseFacilityContractTemplateFormInputToFacilityContractTemplateInput(facilityContractTemplate),
      });
      setLoading(false);
      if (result.data?.contractTemplate.update.isSuccess) {
        showSnackbar(t('facility_contract_template.feedback.update'), 'success');
        setReadonly(true);
        const updatedFacilityContractTemplate = await fetchFacilityContractTemplate();
        setFacilityContractTemplate(updatedFacilityContractTemplate);
        setSubmitSuccessful(true);
        return Promise.resolve();
      } else {
        showError(result.data?.contractTemplate.update.validationErrors);
        return Promise.reject();
      }
    },
    [t, updateFacilityContractTemplateMutation, showSnackbar, fetchFacilityContractTemplate, showError],
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
          title={
            facilityContractTemplate
              ? `${facilityContractTemplate.internalCode} - ${facilityContractTemplate.description}`
              : ''
          }
          titleTypographyProps={{ variant: 'h2' }}
          action={
            <CardActions
              readonly={readonly}
              onCancel={handleCancel}
              onDelete={
                canDelete
                  ? handleDelete('facility_contract_template', DeleteFacilityContractTemplateDocument, onDelete)
                  : undefined
              }
              onEdit={canUpdate ? handleEdit : undefined}
              onExport={canRead ? handleExport(ExportFacilityContractTemplatesDocument) : undefined}
            />
          }
        />
        <CardContent>
          <Tabs
            {...tabsLocation}
            tabs={[
              {
                label: 'facility_contract_template.tab.general_data',
                children: facilityContractTemplate && (
                  <FacilityContractTemplateGeneralData
                    control={control}
                    errors={errors}
                    mode={FormMode.Edit}
                    readonly={readonly}
                  />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  facilityContractTemplate &&
                  !getFacilityContractTemplateGeneralDataSchema(canUseInternalCode, t).isValidSync(
                    facilityContractTemplate,
                  ),
              },
              {
                label: 'facility_contract_template.tab.slas',
                children: facilityContractTemplate && (
                  <FacilityContractTemplateSlasField
                    control={control}
                    errors={errors}
                    mode={FormMode.Edit}
                    readonly={readonly}
                  />
                ),
              },
              {
                label: 'facility_contract_template.tab.penalties',
                children: facilityContractTemplate && (
                  <FacilityContractTemplatePenaltiesField
                    control={control}
                    errors={errors}
                    mode={FormMode.Edit}
                    readonly={readonly}
                  />
                ),
              },
            ]}
          />
        </CardContent>
      </Card>
      <BlockerDialog isBlocked={!readonly} canSave={canSave} onSave={handleWorkingClose} />
    </Form>
  );
}
