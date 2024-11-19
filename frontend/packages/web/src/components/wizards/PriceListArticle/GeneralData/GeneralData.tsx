import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { usePriceListArticle } from '../../../../hooks/usePriceListArticle';
import { PriceListArticleFormInput } from '../../../../interfaces/FormInputs/PriceListArticle';
import { getPriceListArticleGeneralDataSchema } from '../../../../utils/priceListArticle/schemas/generalData';
import { PriceListArticleGeneralData } from '../../../domains/PriceListArticle/GeneralData/GeneralData';
import { PriceListArticleGeneralDataStepProps } from './GeneralData.types';

export const PriceListArticleGeneralDataStep = ({
  canUseInternalCode,
  priceListArticle,
  usePriceList,
  onChange,
  onError,
  onNext,
}: PriceListArticleGeneralDataStepProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { getInternalCode } = usePriceListArticle();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<PriceListArticleFormInput>({
    defaultValues: priceListArticle,
    resolver: yupResolver(getPriceListArticleGeneralDataSchema(canUseInternalCode, language, FormMode.Create, t)),
  });

  useEffect(() => {
    if (priceListArticle.internalCode === '') {
      getInternalCode((internalCode) => {
        setValue('internalCode', internalCode);
      });
    }

    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as PriceListArticleFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onNext={onError} onSubmit={handleSubmit(onNext)}>
      <PriceListArticleGeneralData
        control={control}
        errors={errors}
        mode={FormMode.Create}
        usePriceList={usePriceList}
      />
    </StepForm>
  );
};
