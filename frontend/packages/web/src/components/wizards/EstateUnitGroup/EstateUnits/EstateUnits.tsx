import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EstateUnitGroupFormInput } from '../../../../interfaces/FormInputs/EstateUnitGroup';
import { getEstateUnitGroupEstateUnitsSchema } from '../../../../utils/estateUnitGroup/schemas/estateUnits';
import { EstateUnitGroupEstateUnitsField } from '../../../domains/EstateUnitGroup/EstateUnitsField/EstateUnitsField';
import { EstateUnitGroupEstateUnitsStepProps } from './EstateUnits.types';

export const EstateUnitGroupEstateUnitsStep = ({
  estateUnitGroup,
  onBack,
  onChange,
  onError,
  onSave,
}: EstateUnitGroupEstateUnitsStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<EstateUnitGroupFormInput>({
    defaultValues: estateUnitGroup,
    resolver: yupResolver(getEstateUnitGroupEstateUnitsSchema(t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as EstateUnitGroupFormInput);
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

  return (
    <StepForm
      completeLabel="estate_unit_group.dialog.create.save"
      sx={{ height: 'calc(100% - 92px)' }}
      onBack={onBack}
      onNext={onError}
      onSubmit={handleSubmit(onSave)}
    >
      <EstateUnitGroupEstateUnitsField control={control} />
    </StepForm>
  );
};
