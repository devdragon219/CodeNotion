import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { TableProvider } from '@realgimm5/frontend-common/contexts';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EstateUnitFragment } from '../../../../gql/RealGimm.Web.EstateUnit.fragment';
import { EstateUnitTransformFormInput } from '../../../../interfaces/FormInputs/EstateUnitActions';
import { getEstateUnitTransformFromEstateUnitSchema } from '../../../../utils/estateUnitActions/schemas/transformFromEstateUnit';
import { EstateUnitActionEstateUnitRecap } from '../../EstateUnitAction/EstateUnitRecap/EstateUnitRecap';
import { EstateUnitActionEstateUnitsTable } from '../../EstateUnitAction/EstateUnitsTable/EstateUnitsTable';
import { EstateUnitTransformFromEstateUnitStepProps } from './FromEstateUnit.types';

export const EstateUnitTransformFromEstateUnitStep = ({
  estateUnitId,
  estateUnitTransform,
  initialState,
  onChange,
  onChangeInitialState,
  onError,
  onNext,
}: EstateUnitTransformFromEstateUnitStepProps) => {
  const { t } = useTranslation();
  const {
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<EstateUnitTransformFormInput>({
    defaultValues: estateUnitTransform,
    resolver: yupResolver(getEstateUnitTransformFromEstateUnitSchema(t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as EstateUnitTransformFormInput);
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
      <TableProvider
        key="estate-unit"
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
        {estateUnitId ? (
          <EstateUnitActionEstateUnitRecap estateUnitId={estateUnitId} onChange={handleChange} />
        ) : (
          <EstateUnitActionEstateUnitsTable
            sectionTitle="estate_unit_transform.section_title.estate_unit"
            onChange={handleChange}
            onChangeInitialState={onChangeInitialState}
          />
        )}
      </TableProvider>
    </StepForm>
  );
};
