import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EstateUnitFragment } from '../../../../gql/RealGimm.Web.EstateUnit.fragment';
import { EstateUnitSplitFormInput } from '../../../../interfaces/FormInputs/EstateUnitActions';
import { getEstateUnitSplitEstateUnitSchema } from '../../../../utils/estateUnitActions/schemas/splitEstateUnit';
import { EstateUnitActionEstateUnitRecap } from '../../EstateUnitAction/EstateUnitRecap/EstateUnitRecap';
import { EstateUnitActionEstateUnitsTable } from '../../EstateUnitAction/EstateUnitsTable/EstateUnitsTable';
import { EstateUnitSplitEstateUnitStepProps } from './EstateUnit.types';

export const EstateUnitSplitEstateUnitStep = ({
  estateUnitId,
  estateUnitSplit,
  onChange,
  onError,
  onNext,
}: EstateUnitSplitEstateUnitStepProps) => {
  const { t } = useTranslation();
  const {
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<EstateUnitSplitFormInput>({
    defaultValues: estateUnitSplit,
    resolver: yupResolver(getEstateUnitSplitEstateUnitSchema(t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as EstateUnitSplitFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (errors.fromEstateUnit) {
      onError(errors.fromEstateUnit.message);
    }
    // eslint-disable-next-line
  }, [errors.fromEstateUnit]);

  const handleChange = useCallback(
    (estateUnit: EstateUnitFragment | null) => {
      setValue('fromEstateUnit', estateUnit);
    },
    [setValue],
  );

  return (
    <StepForm onNext={onError} onSubmit={handleSubmit(onNext)}>
      {estateUnitId ? (
        <EstateUnitActionEstateUnitRecap estateUnitId={estateUnitId} onChange={handleChange} />
      ) : (
        <EstateUnitActionEstateUnitsTable
          sectionTitle="estate_unit_split.section_title.estate_unit"
          onChange={handleChange}
        />
      )}
    </StepForm>
  );
};
