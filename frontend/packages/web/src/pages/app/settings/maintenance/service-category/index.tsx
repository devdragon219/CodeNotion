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

import { ServiceCategoryGeneralData } from '../../../../../components/domains/ServiceCategory/GeneralData/GeneralData';
import { ServiceCategorySubCategories } from '../../../../../components/domains/ServiceCategory/SubCategories/SubCategories';
import { RawFeature } from '../../../../../enums/RawFeature';
import {
  DeleteServiceCategoryDocument,
  ExportServiceCategoriesDocument,
  GetServiceCategoryDocument,
  GetServiceCategoryQuery,
  useUpdateServiceCategoryMutation,
} from '../../../../../gql/RealGimm.Web.ServiceCategory.operation';
import { useFeature } from '../../../../../hooks/useFeature';
import { useServiceCategory } from '../../../../../hooks/useServiceCategory';
import { CatalogueCategoryFormInput } from '../../../../../interfaces/FormInputs/CatalogueCategory';
import { ServiceCategoryFormInput } from '../../../../../interfaces/FormInputs/ServiceCategory';
import { parseServiceCategoryFormInputToServiceCategoryInput } from '../../../../../utils/serviceCategory/parseServiceCategoryFormInput';
import { parseServiceCategoryToServiceCategoryFormInput } from '../../../../../utils/serviceCategory/parseServiceCategoryFragment';
import { getServiceCategoryGeneralDataSchema } from '../../../../../utils/serviceCategory/schemas/generalData';
import { getServiceCategorySchema } from '../../../../../utils/serviceCategory/schemas/serviceCategory';
import { getServiceCategorySubCategoriesSchema } from '../../../../../utils/serviceCategory/schemas/subCategories';

export default function ServiceCategory() {
  const { canDelete, canRead, canUpdate } = useFeature(RawFeature.FCLT_SERVICE_CATEGORY);
  const { t } = useTranslation();
  const { id } = useParams();
  const { handleDelete, handleExport } = useOperation();
  const { state } = useLocation() as StateLocation;
  const { showError, showSnackbar } = useSnackbar();
  const tabsLocation = useTabsLocation();
  const client = useClient();
  const goBack = useNavigateBack('/app/settings/maintenance/service-categories');
  const { checkCanUseInternalCode } = useServiceCategory();
  const [loading, setLoading] = useState(false);
  const [readonly, setReadonly] = useState(state?.readonly ?? true);
  const [, updateCatalogueCategoryMutation] = useUpdateServiceCategoryMutation();
  const [serviceCategory, setServiceCategory] = useState<ServiceCategoryFormInput>();
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);
  const debouncedServiceCategory = useDebounce(serviceCategory);
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);
  const [canUseInternalCodes, setCanUseInternalCodes] = useState<Record<string, boolean>>({});

  const fetchServiceCategory = useCallback(async () => {
    setLoading(true);
    const result: OperationResult<GetServiceCategoryQuery> = await client.query(GetServiceCategoryDocument, {
      serviceCategoryId: Number(id),
    });
    setLoading(false);
    if (!result.data?.serviceCategory.get) return Promise.reject();
    return parseServiceCategoryToServiceCategoryFormInput(result.data.serviceCategory.get);
  }, [id, client]);

  const {
    control,
    formState: { isValid: canSave, errors, isSubmitted },
    handleSubmit,
    reset,
    setValue,
    watch,
    getValues,
  } = useForm<ServiceCategoryFormInput>({
    defaultValues: fetchServiceCategory,
    resolver: serviceCategory
      ? yupResolver(getServiceCategorySchema(canUseInternalCode, canUseInternalCodes, t))
      : undefined,
  });

  useEffect(() => {
    if (debouncedServiceCategory) {
      checkCanUseInternalCode(
        debouncedServiceCategory.internalCode,
        debouncedServiceCategory.categoryId,
        setCanUseInternalCode,
      );
    }
    // eslint-disable-next-line
  }, [debouncedServiceCategory?.internalCode, debouncedServiceCategory?.categoryId]);

  useEffect(() => {
    window.history.replaceState(null, document.title);
    const { unsubscribe } = watch((formValues) => {
      setServiceCategory(formValues as CatalogueCategoryFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(serviceCategory);
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
    async (category: ServiceCategoryFormInput) => {
      setLoading(true);
      const result = await updateCatalogueCategoryMutation({
        serviceCategoryId: Number(category.categoryId),
        input: parseServiceCategoryFormInputToServiceCategoryInput(category),
      });
      setLoading(false);
      if (result.data?.serviceCategory.update.isSuccess) {
        showSnackbar(t('service_category.feedback.update'), 'success');
        setReadonly(true);
        const updatedCatalogueCategory = await fetchServiceCategory();
        setServiceCategory(updatedCatalogueCategory);
        setSubmitSuccessful(true);
        return Promise.resolve();
      } else {
        showError(result.data?.serviceCategory.update.validationErrors);
        return Promise.reject();
      }
    },
    [fetchServiceCategory, showError, showSnackbar, t, updateCatalogueCategoryMutation],
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
          title={serviceCategory?.name}
          titleTypographyProps={{ variant: 'h2' }}
          action={
            <CardActions
              readonly={readonly}
              onCancel={handleCancel}
              onDelete={
                canDelete ? handleDelete('service_category', DeleteServiceCategoryDocument, onDelete) : undefined
              }
              onEdit={canUpdate ? handleEdit : undefined}
              onExport={canRead ? handleExport(ExportServiceCategoriesDocument) : undefined}
            />
          }
        />
        <CardContent>
          <Tabs
            {...tabsLocation}
            tabs={[
              {
                label: 'service_category.tab.general_data',
                children: serviceCategory && (
                  <ServiceCategoryGeneralData
                    control={control}
                    errors={errors}
                    readonly={readonly}
                    mode={FormMode.Edit}
                  />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  serviceCategory &&
                  !getServiceCategoryGeneralDataSchema(canUseInternalCode, t).isValidSync(serviceCategory),
              },
              {
                label: 'service_category.tab.service_sub_category',
                children: serviceCategory && (
                  <ServiceCategorySubCategories
                    canUseInternalCodes={canUseInternalCodes}
                    control={control}
                    errors={errors}
                    readonly={readonly}
                    mode={FormMode.Edit}
                    setCanUseInternalCodes={setCanUseInternalCodes}
                    setValue={setValue}
                  />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  serviceCategory &&
                  !getServiceCategorySubCategoriesSchema(canUseInternalCodes, t).isValidSync(serviceCategory),
              },
            ]}
          />
        </CardContent>
      </Card>
      <BlockerDialog isBlocked={!readonly} canSave={canSave} onSave={handleWorkingClose} />
    </Form>
  );
}
