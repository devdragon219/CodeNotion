import { CloseDialog, Dialog, Stepper } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useDebounce, useStepper } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { usePriceListArticle } from '../../../hooks/usePriceListArticle';
import { getEmptyPriceListArticleFormInput } from '../../../utils/priceListArticle/initialValues';
import { getPriceListArticleSchema } from '../../../utils/priceListArticle/schemas/priceListArticle';
import { PriceListArticleCatalogueTypesStep } from './CatalogueTypes/CatalogueTypes';
import { PriceListArticleGeneralDataStep } from './GeneralData/GeneralData';
import { PriceListArticleCreateDialogProps } from './PriceListArticle.types';

export const PriceListArticleCreateDialog = ({ priceList, onClose, onSave }: PriceListArticleCreateDialogProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { activeStep, error, handleBack, handleError, handleNext } = useStepper();
  const { checkCanUseInternalCode } = usePriceListArticle();
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);
  const [priceListArticle, setPriceListArticle] = useState(getEmptyPriceListArticleFormInput(priceList));
  const debouncedPriceListArticle = useDebounce(priceListArticle);
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);

  useEffect(() => {
    checkCanUseInternalCode(
      debouncedPriceListArticle.internalCode,
      debouncedPriceListArticle.priceListArticleId,
      setCanUseInternalCode,
    );
    // eslint-disable-next-line
  }, [debouncedPriceListArticle.internalCode, debouncedPriceListArticle.priceListArticleId]);

  const canSave = useMemo(
    () => getPriceListArticleSchema(canUseInternalCode, language, FormMode.Create, t).isValidSync(priceListArticle),
    [canUseInternalCode, language, t, priceListArticle],
  );

  const openCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(true);
  }, []);
  const closeCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(false);
  }, []);

  const handleWorkingClose = useCallback(() => {
    onSave(priceListArticle);
  }, [priceListArticle, onSave]);
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
    <Dialog fullScreen open title="price_list_article.dialog.create.single.title" onClose={openCloseConfirmationDialog}>
      <Stepper
        activeStep={activeStep}
        error={error}
        steps={[
          {
            label: 'price_list_article.tab.general_data',
            children: (
              <PriceListArticleGeneralDataStep
                canUseInternalCode={canUseInternalCode}
                priceListArticle={priceListArticle}
                usePriceList={!priceList}
                onChange={setPriceListArticle}
                onError={handleError}
                onNext={handleNext}
              />
            ),
          },
          {
            label: 'price_list_article.tab.catalogue_types',
            children: (
              <PriceListArticleCatalogueTypesStep
                priceListArticle={priceListArticle}
                onBack={handleBack}
                onChange={setPriceListArticle}
                onError={handleError}
                onSave={onSave}
              />
            ),
          },
        ]}
      />
    </Dialog>
  );
};
