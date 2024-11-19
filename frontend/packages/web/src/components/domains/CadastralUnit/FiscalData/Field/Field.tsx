import { Accordion, FormViewer } from '@realgimm5/frontend-common/components';
import { FormViewerFieldFormInput } from '@realgimm5/frontend-common/interfaces';
import { useCallback, useMemo } from 'react';
import { Controller } from 'react-hook-form';

import { CadastralUnitTaxCalculatorFieldProps } from './Field.types';

export const CadastralUnitTaxCalculatorField = ({
  control,
  errors,
  index,
  readonly,
  taxCalculator,
}: CadastralUnitTaxCalculatorFieldProps) => {
  const canUseTaxCalculatorField = useMemo(() => taxCalculator.fields[0][0], [taxCalculator.fields]);
  const disabled = useCallback(
    (field: FormViewerFieldFormInput) =>
      !readonly &&
      field.templateTypeId !== canUseTaxCalculatorField.templateTypeId &&
      canUseTaxCalculatorField.value !== 'true',
    [canUseTaxCalculatorField.templateTypeId, canUseTaxCalculatorField.value, readonly],
  );
  const required = useCallback(
    (field: FormViewerFieldFormInput) => {
      if (
        field.templateTypeId === canUseTaxCalculatorField.templateTypeId ||
        canUseTaxCalculatorField.value === 'true'
      ) {
        return field.isMandatory;
      }

      return false;
    },
    [canUseTaxCalculatorField.templateTypeId, canUseTaxCalculatorField.value],
  );

  return (
    <Accordion title={taxCalculator.name}>
      <Controller
        name={`taxCalculators.${index}.fields`}
        control={control}
        render={({ field }) => (
          <FormViewer
            {...field}
            disabled={disabled}
            errors={errors.taxCalculators?.[index]}
            readonly={readonly}
            required={required}
          />
        )}
      />
    </Accordion>
  );
};
