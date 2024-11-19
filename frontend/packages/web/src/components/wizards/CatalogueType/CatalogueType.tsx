import { CloseDialog, Dialog, Loader, Stepper } from '@realgimm5/frontend-common/components';
import { useSnackbar } from '@realgimm5/frontend-common/contexts';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useDebounce, useStepper } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  useCreateCatalogueCategoryMutation,
  useUpdateCatalogueCategoryMutation,
} from '../../../gql/RealGimm.Web.CatalogueCategory.operation';
import { useCatalogueType } from '../../../hooks/useCatalogueType';
import { CatalogueCategoryFormInput } from '../../../interfaces/FormInputs/CatalogueCategory';
import { CatalogueTypeCatalogueCategoryFormInput } from '../../../interfaces/FormInputs/CatalogueType';
import { parseCatalogueCategoryFormInputToCatalogueCategoryInput } from '../../../utils/catalogueCategory/parseCatalogueCategoryFormInput';
import { parseCatalogueCategoryToCatalogueCategoryFormInput } from '../../../utils/catalogueCategory/parseCatalogueCategoryFragment';
import { getEmptyCatalogueTypeFormInput } from '../../../utils/catalogueType/initialValues';
import { getCatalogueTypeSchema } from '../../../utils/catalogueType/schemas/catalogueType';
import { CatalogueCategoryGeneralDataDialog } from '../../dialogs/CatalogueCategory/GeneralData/GeneralData';
import { CatalogueCategorySubCategoriesDialog } from '../../dialogs/CatalogueCategory/SubCategories/SubCategories';
import { CatalogueTypeActivitiesStep } from './Activities/Activities';
import { CatalogueTypeCreateDialogProps } from './CatalogueType.types';
import { CatalogueTypeFieldsStep } from './Fields/Fields';
import { CatalogueTypeGeneralDataStep } from './GeneralData/GeneralData';
import { CatalogueTypeRecapStep } from './Recap/Recap';

export const CatalogueTypeCreateDialog = ({ onClose, onSave }: CatalogueTypeCreateDialogProps) => {
  const { t } = useTranslation();
  const { showError, showSnackbar } = useSnackbar();
  const { activeStep, error, handleBack, handleEdit, handleError, handleNext } = useStepper();
  const { checkCanUseInternalCode } = useCatalogueType();
  const [loading, setLoading] = useState(false);
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
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);
  const [catalogueType, setCatalogueType] = useState(getEmptyCatalogueTypeFormInput());
  const debouncedCatalogueType = useDebounce(catalogueType);
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);

  useEffect(() => {
    checkCanUseInternalCode(
      debouncedCatalogueType.internalCode,
      debouncedCatalogueType.catalogueTypeId,
      setCanUseInternalCode,
    );
    // eslint-disable-next-line
  }, [debouncedCatalogueType.internalCode, debouncedCatalogueType.catalogueTypeId]);

  const canSave = useMemo(
    () => getCatalogueTypeSchema(canUseInternalCode, t).isValidSync(catalogueType),
    [canUseInternalCode, catalogueType, t],
  );

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
        setCatalogueType((catalogueType) => ({
          ...catalogueType,
          category,
          subCategory: null,
        }));
        createCatalogueCategoryDialogProps.onComplete?.();
        closeCreateCatalogueCategoryDialog();
      } else {
        showError(result.data?.catalogueCategory.add.validationErrors);
      }
    },
    [
      createCatalogueCategoryDialogProps,
      t,
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
        showSnackbar(t('catalogue_category.feedback.update'), 'success');
        const subCategory =
          category.subCategories.find(({ internalCode }) =>
            value.subCategories.some((it) => it.internalCode === internalCode && it.subCategoryId === null),
          ) ?? null;
        setCatalogueType((catalogueType) => ({
          ...catalogueType,
          category,
          subCategory,
        }));
        closeCreateCatalogueSubCategoryDialog();
      } else {
        showError(result.data?.catalogueCategory.update.validationErrors);
      }
    },
    [t, updateCatalogueCategoryMutation, showSnackbar, closeCreateCatalogueSubCategoryDialog, showError],
  );

  const openCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(true);
  }, []);
  const closeCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(false);
  }, []);

  const handleWorkingClose = useCallback(() => {
    onSave(catalogueType);
  }, [catalogueType, onSave]);
  const handleDestructiveClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return createCatalogueCategoryDialogProps.open || createCatalogueSubCategoryDialogProps ? (
    <>
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
    </>
  ) : isCloseConfirmationDialogOpen ? (
    <CloseDialog
      canSave={canSave}
      onCancel={closeCloseConfirmationDialog}
      onSave={handleWorkingClose}
      onClose={handleDestructiveClose}
    />
  ) : (
    <Dialog fullScreen open title="catalogue_type.dialog.create.title" onClose={openCloseConfirmationDialog}>
      <Stepper
        activeStep={activeStep}
        error={error}
        steps={[
          {
            label: 'catalogue_type.tab.general_data',
            children: (
              <CatalogueTypeGeneralDataStep
                canUseInternalCode={canUseInternalCode}
                catalogueType={catalogueType}
                onAddCatalogueCategory={openCreateCatalogueCategoryDialog}
                onAddCatalogueSubCategory={openCreateCatalogueSubCategoryDialog}
                onChange={setCatalogueType}
                onError={handleError}
                onNext={handleNext}
              />
            ),
          },
          {
            label: 'catalogue_type.tab.fields',
            children: (
              <CatalogueTypeFieldsStep
                catalogueType={catalogueType}
                onBack={handleBack}
                onChange={setCatalogueType}
                onError={handleError}
                onNext={handleNext}
              />
            ),
          },
          {
            label: 'catalogue_type.tab.activities',
            children: (
              <CatalogueTypeActivitiesStep
                catalogueType={catalogueType}
                onBack={handleBack}
                onChange={setCatalogueType}
                onError={handleError}
                onNext={handleNext}
              />
            ),
          },
          {
            label: 'catalogue_type.tab.recap',
            children: (
              <CatalogueTypeRecapStep
                catalogueType={catalogueType}
                onBack={handleBack}
                onEdit={handleEdit}
                onSave={onSave}
              />
            ),
          },
        ]}
      />
    </Dialog>
  );
};
