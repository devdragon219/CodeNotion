import { StepForm } from '@realgimm5/frontend-common/components';
import { DocumentsTableRow } from '@realgimm5/frontend-common/interfaces';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { EstatePortfolioFormInput } from '../../../../interfaces/FormInputs/EstatePortfolio';
import { EstatePortfolioEstateUnitsDocuments } from '../../../domains/EstatePortfolio/EstateUnitsDocuments/EstateUnitsDocuments';
import { EstatePortfolioEstateUnitsStepProps } from './EstateUnits.types';

export const EstatePortfolioEstateUnitsStep = ({
  estatePortfolio,
  estateUnitIds,
  onChange,
  onBack,
  onNext,
}: EstatePortfolioEstateUnitsStepProps) => {
  const { handleSubmit, setValue, watch } = useForm<EstatePortfolioFormInput>({
    defaultValues: estatePortfolio,
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as EstatePortfolioFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  const handleSelectEstateUnitsDocuments = useCallback(
    (rows: DocumentsTableRow[]) => {
      setValue('estateUnitsDocuments', rows);
    },
    [setValue],
  );

  return (
    <StepForm onBack={onBack} onNext={onNext} onSubmit={handleSubmit(onNext)}>
      <EstatePortfolioEstateUnitsDocuments
        estateUnitIds={estateUnitIds}
        selectedRows={estatePortfolio.estateUnitsDocuments}
        onRowsSelected={handleSelectEstateUnitsDocuments}
      />
    </StepForm>
  );
};
