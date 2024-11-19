import { CloseDialog, Dialog, Stepper } from '@realgimm5/frontend-common/components';
import { useDebounce, useStepper } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useCatalogueCategory } from '../../../hooks/useCatalogueCategory';
import { getEmptyCatalogueCategoryFormInput } from '../../../utils/catalogueCategory/initialValues';
import { getCatalogueCategorySchema } from '../../../utils/catalogueCategory/schemas/catalogueCategory';
import { CatalogueCategoryDialogProps } from './CatalogueCategory.types';
import { CatalogueCategoryGeneralDataStep } from './GeneralData/GeneralData';
import { CatalogueCategorySubcategoriesStep } from './SubCategories/SubCategories';

export const CatalogueCategoryCreateDialog = ({ onClose, onSave }: CatalogueCategoryDialogProps) => {
  const { t } = useTranslation();
  const { activeStep, error, handleBack, handleError, handleNext } = useStepper();
  const { checkCanUseInternalCode } = useCatalogueCategory();
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);
  const [catalogueCategory, setCatalogueCategory] = useState(getEmptyCatalogueCategoryFormInput());
  const debouncedCatalogueCategory = useDebounce(catalogueCategory);
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);
  const [canUseInternalCodes, setCanUseInternalCodes] = useState<Record<string, boolean>>({});

  useEffect(() => {
    checkCanUseInternalCode(
      debouncedCatalogueCategory.internalCode,
      debouncedCatalogueCategory.categoryId,
      setCanUseInternalCode,
    );
    // eslint-disable-next-line
  }, [debouncedCatalogueCategory.internalCode, debouncedCatalogueCategory.categoryId]);

  const canSave = useMemo(
    () => getCatalogueCategorySchema(canUseInternalCode, canUseInternalCodes, t).isValidSync(catalogueCategory),
    [canUseInternalCode, canUseInternalCodes, catalogueCategory, t],
  );

  const openCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(true);
  }, []);
  const closeCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(false);
  }, []);

  const handleWorkingClose = useCallback(() => {
    onSave(catalogueCategory);
  }, [catalogueCategory, onSave]);
  const handleDestructiveClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return isCloseConfirmationDialogOpen ? (
    <CloseDialog
      canSave={canSave}
      onCancel={closeCloseConfirmationDialog}
      onSave={handleWorkingClose}
      onClose={handleDestructiveClose}
    />
  ) : (
    <Dialog fullScreen open title="catalogue_category.dialog.create.title" onClose={openCloseConfirmationDialog}>
      <Stepper
        activeStep={activeStep}
        error={error}
        steps={[
          {
            label: 'catalogue_category.tab.general_data',
            children: (
              <CatalogueCategoryGeneralDataStep
                canUseInternalCode={canUseInternalCode}
                catalogueCategory={catalogueCategory}
                onChange={setCatalogueCategory}
                onError={handleError}
                onNext={handleNext}
              />
            ),
          },
          {
            label: 'catalogue_category.tab.catalogue_sub_category',
            children: (
              <CatalogueCategorySubcategoriesStep
                canUseInternalCodes={canUseInternalCodes}
                catalogueCategory={catalogueCategory}
                onBack={handleBack}
                onChange={setCatalogueCategory}
                onError={handleError}
                onSave={onSave}
                setCanUseInternalCodes={setCanUseInternalCodes}
              />
            ),
          },
        ]}
      />
    </Dialog>
  );
};
