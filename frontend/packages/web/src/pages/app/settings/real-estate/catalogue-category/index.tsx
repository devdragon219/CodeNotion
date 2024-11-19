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

import { CatalogueCategoryGeneralData } from '../../../../../components/domains/CatalogueCategory/GeneralData/GeneralData';
import { CatalogueCategorySubCategories } from '../../../../../components/domains/CatalogueCategory/SubCategories/SubCategories';
import { RawFeature } from '../../../../../enums/RawFeature';
import {
  DeleteCatalogueCategoryDocument,
  GetCatalogueCategoryDocument,
  GetCatalogueCategoryQuery,
  useUpdateCatalogueCategoryMutation,
} from '../../../../../gql/RealGimm.Web.CatalogueCategory.operation';
import { useCatalogueCategory } from '../../../../../hooks/useCatalogueCategory';
import { useFeature } from '../../../../../hooks/useFeature';
import { CatalogueCategoryFormInput } from '../../../../../interfaces/FormInputs/CatalogueCategory';
import { parseCatalogueCategoryFormInputToCatalogueCategoryInput } from '../../../../../utils/catalogueCategory/parseCatalogueCategoryFormInput';
import { parseCatalogueCategoryToCatalogueCategoryFormInput } from '../../../../../utils/catalogueCategory/parseCatalogueCategoryFragment';
import { getCatalogueCategorySchema } from '../../../../../utils/catalogueCategory/schemas/catalogueCategory';
import { getCatalogueCategoryGeneralDataSchema } from '../../../../../utils/catalogueCategory/schemas/generalData';
import { getCatalogueCategorySubCategoriesSchema } from '../../../../../utils/catalogueCategory/schemas/subCategories';

export default function CatalogueCategory() {
  const { canDelete, canUpdate } = useFeature(RawFeature.ASST_CATALOGUE_CONFIG);
  const { t } = useTranslation();
  const { id } = useParams();
  const { handleDelete } = useOperation();
  const { state } = useLocation() as StateLocation;
  const { showError, showSnackbar } = useSnackbar();
  const tabsLocation = useTabsLocation();
  const client = useClient();
  const goBack = useNavigateBack('/app/settings/real-estate/catalogue-categories');
  const { checkCanUseInternalCode } = useCatalogueCategory();
  const [loading, setLoading] = useState(false);
  const [readonly, setReadonly] = useState(state?.readonly ?? true);
  const [, updateCatalogueCategoryMutation] = useUpdateCatalogueCategoryMutation();
  const [catalogueCategory, setCatalogueCategory] = useState<CatalogueCategoryFormInput>();
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);
  const debouncedCatalogueCategory = useDebounce(catalogueCategory);
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);
  const [canUseInternalCodes, setCanUseInternalCodes] = useState<Record<string, boolean>>({});

  const fetchCatalogueCategory = useCallback(async () => {
    setLoading(true);
    const result: OperationResult<GetCatalogueCategoryQuery> = await client.query(GetCatalogueCategoryDocument, {
      catalogueCategoryId: Number(id),
    });
    setLoading(false);
    if (!result.data?.catalogueCategory.get) return Promise.reject();
    return parseCatalogueCategoryToCatalogueCategoryFormInput(result.data.catalogueCategory.get);
  }, [id, client]);

  const {
    control,
    formState: { isValid: canSave, errors, isSubmitted },
    handleSubmit,
    reset,
    setValue,
    watch,
    getValues,
  } = useForm<CatalogueCategoryFormInput>({
    defaultValues: fetchCatalogueCategory,
    resolver: catalogueCategory
      ? yupResolver(getCatalogueCategorySchema(canUseInternalCode, canUseInternalCodes, t))
      : undefined,
  });

  useEffect(() => {
    if (debouncedCatalogueCategory) {
      checkCanUseInternalCode(
        debouncedCatalogueCategory.internalCode,
        debouncedCatalogueCategory.categoryId,
        setCanUseInternalCode,
      );
    }
    // eslint-disable-next-line
  }, [debouncedCatalogueCategory?.internalCode, debouncedCatalogueCategory?.categoryId]);

  useEffect(() => {
    window.history.replaceState(null, document.title);
    const { unsubscribe } = watch((formValues) => {
      setCatalogueCategory(formValues as CatalogueCategoryFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(catalogueCategory);
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
    async (category: CatalogueCategoryFormInput) => {
      setLoading(true);
      const result = await updateCatalogueCategoryMutation({
        catalogueCategoryId: Number(category.categoryId),
        input: parseCatalogueCategoryFormInputToCatalogueCategoryInput(category),
      });
      setLoading(false);
      if (result.data?.catalogueCategory.update.isSuccess) {
        showSnackbar(t('catalogue_category.feedback.update'), 'success');
        setReadonly(true);
        const updatedCatalogueCategory = await fetchCatalogueCategory();
        setCatalogueCategory(updatedCatalogueCategory);
        setSubmitSuccessful(true);
        return Promise.resolve();
      } else {
        showError(result.data?.catalogueCategory.update.validationErrors);
        return Promise.reject();
      }
    },
    [fetchCatalogueCategory, showError, showSnackbar, t, updateCatalogueCategoryMutation],
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
          title={catalogueCategory?.name}
          titleTypographyProps={{ variant: 'h2' }}
          action={
            <CardActions
              readonly={readonly}
              onCancel={handleCancel}
              onDelete={
                canDelete ? handleDelete('catalogue_category', DeleteCatalogueCategoryDocument, onDelete) : undefined
              }
              onEdit={canUpdate ? handleEdit : undefined}
            />
          }
        />
        <CardContent>
          <Tabs
            {...tabsLocation}
            tabs={[
              {
                label: 'catalogue_category.tab.general_data',
                children: catalogueCategory && (
                  <CatalogueCategoryGeneralData
                    control={control}
                    errors={errors}
                    readonly={readonly}
                    mode={FormMode.Edit}
                  />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  catalogueCategory &&
                  !getCatalogueCategoryGeneralDataSchema(canUseInternalCode, t).isValidSync(catalogueCategory),
              },
              {
                label: 'catalogue_category.tab.catalogue_sub_category',
                children: catalogueCategory && (
                  <CatalogueCategorySubCategories
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
                  catalogueCategory &&
                  !getCatalogueCategorySubCategoriesSchema(canUseInternalCodes, t).isValidSync(catalogueCategory),
              },
            ]}
          />
        </CardContent>
      </Card>
      <BlockerDialog isBlocked={!readonly} canSave={canSave} onSave={handleWorkingClose} />
    </Form>
  );
}
