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

import { CatalogueCategoryGeneralDataDialog } from '../../../../../components/dialogs/CatalogueCategory/GeneralData/GeneralData';
import { CatalogueCategorySubCategoriesDialog } from '../../../../../components/dialogs/CatalogueCategory/SubCategories/SubCategories';
import { CatalogueTypeActivities } from '../../../../../components/domains/CatalogueType/Activities/Activities';
import { CatalogueTypeFields } from '../../../../../components/domains/CatalogueType/Fields/Fields';
import { CatalogueTypeGeneralData } from '../../../../../components/domains/CatalogueType/GeneralData/GeneralData';
import { RawFeature } from '../../../../../enums/RawFeature';
import {
  useCreateCatalogueCategoryMutation,
  useUpdateCatalogueCategoryMutation,
} from '../../../../../gql/RealGimm.Web.CatalogueCategory.operation';
import {
  DeleteCatalogueTypeDocument,
  ExportCatalogueTypesDocument,
  GetCatalogueTypeDocument,
  GetCatalogueTypeQuery,
  useUpdateCatalogueTypeMutation,
} from '../../../../../gql/RealGimm.Web.CatalogueType.operation';
import { useCatalogueType } from '../../../../../hooks/useCatalogueType';
import { useFeature } from '../../../../../hooks/useFeature';
import { CatalogueCategoryFormInput } from '../../../../../interfaces/FormInputs/CatalogueCategory';
import {
  CatalogueTypeCatalogueCategoryFormInput,
  CatalogueTypeFormInput,
} from '../../../../../interfaces/FormInputs/CatalogueType';
import { parseCatalogueCategoryFormInputToCatalogueCategoryInput } from '../../../../../utils/catalogueCategory/parseCatalogueCategoryFormInput';
import { parseCatalogueCategoryToCatalogueCategoryFormInput } from '../../../../../utils/catalogueCategory/parseCatalogueCategoryFragment';
import { parseCatalogueTypeFormInputToCatalogueTypeInput } from '../../../../../utils/catalogueType/parseCatalogueTypeFormInput';
import { parseCatalogueTypeToCatalogueTypeFormInput } from '../../../../../utils/catalogueType/parseCatalogueTypeFragment';
import { getCatalogueTypeActivitiesSchema } from '../../../../../utils/catalogueType/schemas/activities';
import { getCatalogueTypeSchema } from '../../../../../utils/catalogueType/schemas/catalogueType';
import { getCatalogueTypeFieldsSchema } from '../../../../../utils/catalogueType/schemas/fields';
import { getCatalogueTypeGeneralDataSchema } from '../../../../../utils/catalogueType/schemas/generalData';

export default function CatalogueType() {
  const { canDelete, canUpdate, canRead } = useFeature(RawFeature.ASST_CATALOGUE_CONFIG);
  const { t } = useTranslation();
  const { id } = useParams();
  const { handleDelete, handleExport } = useOperation();
  const { state } = useLocation() as StateLocation;
  const { showError, showSnackbar } = useSnackbar();
  const tabsLocation = useTabsLocation();
  const client = useClient();
  const goBack = useNavigateBack('/app/settings/real-estate/catalogue-types');
  const { checkCanUseInternalCode } = useCatalogueType();
  const [loading, setLoading] = useState(false);
  const [readonly, setReadonly] = useState(state?.readonly ?? true);
  const [, createCatalogueCategoryMutation] = useCreateCatalogueCategoryMutation();
  const [, updateCatalogueCategoryMutation] = useUpdateCatalogueCategoryMutation();
  const [createCatalogueCategoryDialogProps, setCreateCatalogueCategoryDialogProps] = useState<{
    open: boolean;
    onComplete?: () => void;
  }>({
    open: false,
  });
  const [createCatalogueSubCategoryDialogProps, setCreateCatalogueSubCategoryDialogProps] =
    useState<CatalogueCategoryFormInput | null>(null);
  const [, updateCatalogueTypeMutation] = useUpdateCatalogueTypeMutation();
  const [catalogueType, setCatalogueType] = useState<CatalogueTypeFormInput>();
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);
  const debouncedCatalogueType = useDebounce(catalogueType);
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);

  const fetchCatalogueType = useCallback(async () => {
    setLoading(true);
    const result: OperationResult<GetCatalogueTypeQuery> = await client.query(GetCatalogueTypeDocument, {
      catalogueTypeId: Number(id),
    });
    setLoading(false);
    if (!result.data?.catalogueType.get) return Promise.reject();
    return parseCatalogueTypeToCatalogueTypeFormInput(result.data.catalogueType.get);
  }, [id, client]);

  const {
    control,
    formState: { isValid: canSave, errors, isSubmitted },
    handleSubmit,
    reset,
    setValue,
    watch,
    getValues,
  } = useForm<CatalogueTypeFormInput>({
    defaultValues: fetchCatalogueType,
    resolver: catalogueType ? yupResolver(getCatalogueTypeSchema(canUseInternalCode, t)) : undefined,
  });

  useEffect(() => {
    if (debouncedCatalogueType) {
      checkCanUseInternalCode(
        debouncedCatalogueType.internalCode,
        debouncedCatalogueType.catalogueTypeId,
        setCanUseInternalCode,
      );
    }
    // eslint-disable-next-line
  }, [debouncedCatalogueType?.internalCode, debouncedCatalogueType?.catalogueTypeId]);

  useEffect(() => {
    window.history.replaceState(null, document.title);
    const { unsubscribe } = watch((formValues) => {
      setCatalogueType(formValues as CatalogueTypeFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(catalogueType);
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

  const openCreateCatalogueCategoryDialog = useCallback((onComplete: () => void) => {
    setCreateCatalogueCategoryDialogProps({
      open: true,
      onComplete,
    });
  }, []);
  const closeCreateCatalogueCategoryDialog = useCallback(() => {
    setCreateCatalogueCategoryDialogProps({
      open: false,
    });
  }, []);
  const handleSaveCatalogueCategory = useCallback(
    async (value: CatalogueCategoryFormInput) => {
      setLoading(true);
      const result = await createCatalogueCategoryMutation({
        input: parseCatalogueCategoryFormInputToCatalogueCategoryInput(value),
      });
      setLoading(false);
      if (result.data?.catalogueCategory.add.isSuccess) {
        const category = parseCatalogueCategoryToCatalogueCategoryFormInput(result.data.catalogueCategory.add.value!);
        showSnackbar(t('catalogue_category.feedback.create.single'), 'success');
        setValue('category', category);
        setValue('subCategory', null);
        createCatalogueCategoryDialogProps.onComplete?.();
        closeCreateCatalogueCategoryDialog();
      } else {
        showError(result.data?.catalogueCategory.add.validationErrors);
      }
    },
    [
      createCatalogueCategoryDialogProps,
      t,
      setValue,
      createCatalogueCategoryMutation,
      showSnackbar,
      closeCreateCatalogueCategoryDialog,
      showError,
    ],
  );

  const openCreateCatalogueSubCategoryDialog = useCallback((input: CatalogueTypeCatalogueCategoryFormInput) => {
    setCreateCatalogueSubCategoryDialogProps(input as CatalogueCategoryFormInput);
  }, []);
  const closeCreateCatalogueSubCategoryDialog = useCallback(() => {
    setCreateCatalogueSubCategoryDialogProps(null);
  }, []);
  const handleSaveCatalogueSubCategory = useCallback(
    async (value: CatalogueCategoryFormInput) => {
      setLoading(true);
      const result = await updateCatalogueCategoryMutation({
        catalogueCategoryId: value.categoryId!,
        input: parseCatalogueCategoryFormInputToCatalogueCategoryInput(value),
      });
      setLoading(false);
      if (result.data?.catalogueCategory.update.isSuccess) {
        const category = parseCatalogueCategoryToCatalogueCategoryFormInput(
          result.data.catalogueCategory.update.value!,
        );
        const subCategory =
          category.subCategories.find(({ internalCode }) =>
            value.subCategories.some((it) => it.internalCode === internalCode && it.subCategoryId === null),
          ) ?? null;
        showSnackbar(t('catalogue_category.feedback.update'), 'success');
        setValue('category', category);
        setValue('subCategory', subCategory);
        closeCreateCatalogueSubCategoryDialog();
      } else {
        showError(result.data?.catalogueCategory.update.validationErrors);
      }
    },
    [t, setValue, updateCatalogueCategoryMutation, showSnackbar, closeCreateCatalogueSubCategoryDialog, showError],
  );

  const onSubmit = useCallback(
    async (catalogueType: CatalogueTypeFormInput) => {
      setLoading(true);
      const result = await updateCatalogueTypeMutation({
        catalogueTypeId: Number(catalogueType.catalogueTypeId),
        catalogueTypeInput: parseCatalogueTypeFormInputToCatalogueTypeInput(catalogueType),
      });
      setLoading(false);
      if (result.data?.catalogueType.update.isSuccess) {
        showSnackbar(t('catalogue_type.feedback.update'), 'success');
        setReadonly(true);
        const updatedCatalogueType = await fetchCatalogueType();
        setCatalogueType(updatedCatalogueType);
        setSubmitSuccessful(true);
        return Promise.resolve();
      } else {
        showError(result.data?.catalogueType.update.validationErrors);
        return Promise.reject();
      }
    },
    [t, updateCatalogueTypeMutation, showSnackbar, fetchCatalogueType, showError],
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
      {createCatalogueCategoryDialogProps.open && (
        <CatalogueCategoryGeneralDataDialog
          onClose={closeCreateCatalogueCategoryDialog}
          onSave={handleSaveCatalogueCategory}
        />
      )}
      {createCatalogueSubCategoryDialogProps && (
        <CatalogueCategorySubCategoriesDialog
          input={createCatalogueSubCategoryDialogProps}
          mode={FormMode.Create}
          readonly
          useSubCategories={false}
          onClose={closeCreateCatalogueSubCategoryDialog}
          onSave={handleSaveCatalogueSubCategory}
        />
      )}
      <Card>
        <Box sx={{ px: 1, pt: 2 }}>
          <Button color="secondary" variant="text" startIcon={<ChevronLeft />} onClick={goBack}>
            {t('common.button.back')}
          </Button>
        </Box>
        <CardHeader
          title={catalogueType?.name}
          titleTypographyProps={{ variant: 'h2' }}
          action={
            <CardActions
              readonly={readonly}
              onCancel={handleCancel}
              onDelete={canDelete ? handleDelete('catalogue_type', DeleteCatalogueTypeDocument, onDelete) : undefined}
              onEdit={canUpdate ? handleEdit : undefined}
              onExport={canRead ? handleExport(ExportCatalogueTypesDocument) : undefined}
            />
          }
        />
        <CardContent>
          <Tabs
            {...tabsLocation}
            tabs={[
              {
                label: 'catalogue_type.tab.general_data',
                children: catalogueType && (
                  <CatalogueTypeGeneralData
                    control={control}
                    errors={errors}
                    mode={FormMode.Edit}
                    readonly={readonly}
                    onAddCatalogueCategory={openCreateCatalogueCategoryDialog}
                    onAddCatalogueSubCategory={openCreateCatalogueSubCategoryDialog}
                    setValue={setValue}
                  />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  catalogueType &&
                  !getCatalogueTypeGeneralDataSchema(canUseInternalCode, t).isValidSync(catalogueType),
              },
              {
                label: 'catalogue_type.tab.fields',
                children: catalogueType && (
                  <CatalogueTypeFields control={control} errors={errors} mode={FormMode.Edit} readonly={readonly} />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  catalogueType &&
                  !getCatalogueTypeFieldsSchema(t).isValidSync(catalogueType),
              },
              {
                label: 'catalogue_type.tab.activities',
                children: catalogueType && (
                  <CatalogueTypeActivities control={control} errors={errors} mode={FormMode.Edit} readonly={readonly} />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  catalogueType &&
                  !getCatalogueTypeActivitiesSchema(t).isValidSync(catalogueType),
              },
            ]}
          />
        </CardContent>
      </Card>
      <BlockerDialog isBlocked={!readonly} canSave={canSave} onSave={handleWorkingClose} />
    </Form>
  );
}
