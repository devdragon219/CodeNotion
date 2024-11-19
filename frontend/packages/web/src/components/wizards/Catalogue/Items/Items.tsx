import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CatalogueFormInput } from '../../../../interfaces/FormInputs/Catalogue';
import { getCatalogueItemsSchema } from '../../../../utils/catalogue/schemas/items';
import { CatalogueItems } from '../../../domains/Catalogue/Items/Items';
import { CatalogueItemsStepProps } from './Items.types';

export const CatalogueItemsStep = ({
  canUseInternalCodes,
  catalogue,
  onBack,
  onChange,
  onError,
  onNext,
  setCanUseInternalCodes,
}: CatalogueItemsStepProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<CatalogueFormInput>({
    defaultValues: catalogue,
    resolver: yupResolver(getCatalogueItemsSchema(canUseInternalCodes, language, t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as CatalogueFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <CatalogueItems
        canUseInternalCodes={canUseInternalCodes}
        control={control}
        errors={errors}
        mode={FormMode.Create}
        setCanUseInternalCodes={setCanUseInternalCodes}
        setValue={setValue}
      />
    </StepForm>
  );
};
