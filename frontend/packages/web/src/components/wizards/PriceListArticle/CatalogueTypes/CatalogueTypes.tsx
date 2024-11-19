import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { PriceListArticleFormInput } from '../../../../interfaces/FormInputs/PriceListArticle';
import { getPriceListArticleCatalogueTypesSchema } from '../../../../utils/priceListArticle/schemas/catalogueTypes';
import { PriceListArticleCatalogueTypesTransferList } from '../../../domains/PriceListArticle/CatalogueTypes/TransferList/TransferList';
import { PriceListArticleCatalogueTypesStepProps } from './CatalogueTypes.types';

export const PriceListArticleCatalogueTypesStep = ({
  priceListArticle,
  onBack,
  onChange,
  onError,
  onSave,
}: PriceListArticleCatalogueTypesStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<PriceListArticleFormInput>({
    defaultValues: priceListArticle,
    resolver: yupResolver(getPriceListArticleCatalogueTypesSchema(t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as PriceListArticleFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (errors.catalogueTypes) {
      onError(errors.catalogueTypes.message);
    }
    // eslint-disable-next-line
  }, [errors.catalogueTypes]);

  return (
    <StepForm
      completeLabel="price_list_article.dialog.create.single.save"
      sx={{ height: 'calc(100% - 92px)' }}
      onBack={onBack}
      onComplete={onError}
      onSubmit={handleSubmit(onSave)}
    >
      <PriceListArticleCatalogueTypesTransferList control={control} errors={errors} mode={FormMode.Create} />
    </StepForm>
  );
};
