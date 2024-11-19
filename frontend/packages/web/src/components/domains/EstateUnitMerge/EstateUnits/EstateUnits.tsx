import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EstateUnitMergeFormInput } from '../../../../interfaces/FormInputs/EstateUnitActions';
import { getEstateUnitMergeEstateUnitsSchema } from '../../../../utils/estateUnitActions/schemas/mergeEstateUnits';
import { EstateUnitActionEstateUnitsTransferList } from '../../EstateUnitAction/EstateUnitsTransferList/EstateUnitsTransferList';
import { EstateUnitMergeEstateUnitsStepProps } from './EstateUnits.types';

export const EstateUnitMergeEstateUnitsStep = ({
  estateUnitId,
  estateUnitMerge,
  onChange,
  onError,
  onNext,
}: EstateUnitMergeEstateUnitsStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<EstateUnitMergeFormInput>({
    defaultValues: estateUnitMerge,
    resolver: yupResolver(getEstateUnitMergeEstateUnitsSchema(t)),
  });
  const { fields, replace } = useFieldArray({ control, name: 'fromEstateUnits' });
  const estateUnit = useMemo(() => fields.find((it) => it.id === estateUnitId), [estateUnitId, fields]);

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as EstateUnitMergeFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (errors.fromEstateUnits) {
      onError(errors.fromEstateUnits.message);
    }
    // eslint-disable-next-line
  }, [errors.fromEstateUnits]);

  return (
    <StepForm onNext={onError} onSubmit={handleSubmit(onNext)} sx={{ height: 'calc(100% - 92px)' }}>
      <EstateUnitActionEstateUnitsTransferList estateUnit={estateUnit} value={fields} onChange={replace} />
    </StepForm>
  );
};
