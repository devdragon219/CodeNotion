import { CloseDialog, Dialog, Stepper } from '@realgimm5/frontend-common/components';
import { useDebounce, useStepper } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useServiceCategory } from '../../../hooks/useServiceCategory';
import { getEmptyServiceCategoryFormInput } from '../../../utils/serviceCategory/initialValues';
import { getServiceCategorySchema } from '../../../utils/serviceCategory/schemas/serviceCategory';
import { ServiceCategoryGeneralDataStep } from './GeneralData/GeneralData';
import { ServiceCategoryDialogProps } from './ServiceCategory.types';
import { ServiceCategorySubCategoriesStep } from './SubCategories/SubCategories';

export const ServiceCategoryCreateDialog = ({ onClose, onSave }: ServiceCategoryDialogProps) => {
  const { t } = useTranslation();
  const { activeStep, error, handleBack, handleError, handleNext } = useStepper();
  const { checkCanUseInternalCode } = useServiceCategory();
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);
  const [serviceCategory, setServiceCategory] = useState(getEmptyServiceCategoryFormInput());
  const debouncedServiceCategory = useDebounce(serviceCategory);
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);
  const [canUseInternalCodes, setCanUseInternalCodes] = useState<Record<string, boolean>>({});

  useEffect(() => {
    checkCanUseInternalCode(
      debouncedServiceCategory.internalCode,
      debouncedServiceCategory.categoryId,
      setCanUseInternalCode,
    );
    // eslint-disable-next-line
  }, [debouncedServiceCategory.internalCode, debouncedServiceCategory.categoryId]);

  const canSave = useMemo(
    () => getServiceCategorySchema(canUseInternalCode, canUseInternalCodes, t).isValidSync(serviceCategory),
    [canUseInternalCode, canUseInternalCodes, serviceCategory, t],
  );

  const openCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(true);
  }, []);
  const closeCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(false);
  }, []);

  const handleWorkingClose = useCallback(() => {
    onSave(serviceCategory);
  }, [serviceCategory, onSave]);
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
    <Dialog fullScreen open title="service_category.dialog.create.title" onClose={openCloseConfirmationDialog}>
      <Stepper
        activeStep={activeStep}
        error={error}
        steps={[
          {
            label: 'service_category.tab.general_data',
            children: (
              <ServiceCategoryGeneralDataStep
                canUseInternalCode={canUseInternalCode}
                serviceCategory={serviceCategory}
                onChange={setServiceCategory}
                onError={handleError}
                onNext={handleNext}
              />
            ),
          },
          {
            label: 'service_category.tab.service_sub_category',
            children: (
              <ServiceCategorySubCategoriesStep
                canUseInternalCodes={canUseInternalCodes}
                serviceCategory={serviceCategory}
                onBack={handleBack}
                onChange={setServiceCategory}
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
