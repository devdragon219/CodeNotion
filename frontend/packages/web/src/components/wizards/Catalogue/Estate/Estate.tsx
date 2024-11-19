import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CatalogueFormInput } from '../../../../interfaces/FormInputs/Catalogue';
import { getCatalogueEstateSchema } from '../../../../utils/catalogue/schemas/estate';
import { CatalogueEstate } from '../../../domains/Catalogue/Estate/Estate';
import { CatalogueEstateStepProps } from './Estate.types';
import { CatalogueEstates } from './Estates/Estates';

export const CatalogueEstateStep = ({ catalogue, estate, onChange, onError, onNext }: CatalogueEstateStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<CatalogueFormInput>({
    defaultValues: catalogue,
    resolver: yupResolver(getCatalogueEstateSchema(t)),
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

  useEffect(() => {
    if (errors.estate) {
      onError(errors.estate.message);
    }
    // eslint-disable-next-line
  }, [errors.estate]);

  return (
    <StepForm onNext={onError} onSubmit={handleSubmit(onNext)}>
      {estate ? <CatalogueEstate control={control} mode={FormMode.Create} /> : <CatalogueEstates setValue={setValue} />}
    </StepForm>
  );
};
