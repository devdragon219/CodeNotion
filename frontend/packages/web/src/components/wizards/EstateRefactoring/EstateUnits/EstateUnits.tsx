import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EstateRefactoringFormInput } from '../../../../interfaces/FormInputs/Estate';
import { getEstateRefactoringEstateUnitsSchema } from '../../../../utils/estate/schemas/refactoringEstateUnits';
import { EstateRefactoringEstateUnitsStepProps } from './EstateUnits.types';
import { EstateUnitsField } from './Field/Field';

export const EstateRefactoringEstateUnitsStep = ({
  estateRefactoring,
  estateId,
  index,
  onBack,
  onChange,
  onError,
  onSave,
}: EstateRefactoringEstateUnitsStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<EstateRefactoringFormInput>({
    defaultValues: estateRefactoring,
    resolver: yupResolver(getEstateRefactoringEstateUnitsSchema(t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as EstateRefactoringFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (errors.estateUnits) {
      onError(errors.estateUnits.message);
    }
    // eslint-disable-next-line
  }, [errors.estateUnits]);

  const onSubmit = useCallback(
    (estateRefactoring: EstateRefactoringFormInput) => {
      onSave(estateRefactoring, index);
    },
    [index, onSave],
  );

  return (
    <StepForm
      completeLabel="common.button.save"
      sx={{ height: 'calc(100% - 92px)' }}
      onBack={onBack}
      onComplete={onError}
      onSubmit={handleSubmit(onSubmit)}
    >
      <EstateUnitsField control={control} estateId={estateId} />
    </StepForm>
  );
};
