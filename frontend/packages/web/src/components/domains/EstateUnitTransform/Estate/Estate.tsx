import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { TableProvider } from '@realgimm5/frontend-common/contexts';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EstateUnitFormInput } from '../../../../interfaces/FormInputs/EstateUnit';
import { getEstateUnitEstateSchema } from '../../../../utils/estateUnit/schemas/estate';
import { EstateUnitActionEstate } from '../../EstateUnitAction/Estate/Estate';
import { EstateUnitTransformEstateStepProps } from './Estate.types';

export const EstateUnitTransformEstateStep = ({
  estateUnitTransform,
  initialState,
  onBack,
  onChange,
  onChangeInitialState,
  onError,
  onNext,
}: EstateUnitTransformEstateStepProps) => {
  const { t } = useTranslation();
  const {
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<EstateUnitFormInput>({
    defaultValues: estateUnitTransform.toEstateUnit,
    resolver: yupResolver(getEstateUnitEstateSchema(t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange({
        ...estateUnitTransform,
        toEstateUnit: formValues as EstateUnitFormInput,
      });
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
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <TableProvider
        key="estate"
        initialState={{
          ...initialState,
          sorting: initialState.sorting ?? [
            {
              desc: false,
              id: 'internalCode',
            },
          ],
        }}
      >
        <EstateUnitActionEstate
          cityName={estateUnitTransform.fromEstateUnit!.address.city!.name}
          keepTopIds={estateUnitTransform.fromEstateUnit!.estate.id}
          setValue={setValue}
          onChange={onChangeInitialState}
        />
      </TableProvider>
    </StepForm>
  );
};
