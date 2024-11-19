import { Grid2 } from '@mui/material';
import { SectionTitle } from '@realgimm5/frontend-common/components';
import { useWatch } from 'react-hook-form';

import { CadastralUnitTaxCalculatorField } from './Field/Field';
import { CadastralUnitFiscalDataProps } from './FiscalData.types';

export const CadastralUnitFiscalData = ({ control, errors, readonly }: CadastralUnitFiscalDataProps) => {
  const taxCalculators = useWatch({ control, name: 'taxCalculators' });

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {taxCalculators.length === 0 ? (
        <SectionTitle value="cadastral_unit.section_title.no_fiscal_data" sx={{ justifyContent: 'center' }} />
      ) : (
        <>
          <SectionTitle value="cadastral_unit.section_title.fiscal_data" />
          {taxCalculators.map((taxCalculator, index) => (
            <Grid2 size={12} key={taxCalculator.taxCalculatorId}>
              <CadastralUnitTaxCalculatorField
                control={control}
                errors={errors}
                index={index}
                readonly={readonly}
                taxCalculator={taxCalculator}
              />
            </Grid2>
          ))}
        </>
      )}
    </Grid2>
  );
};
