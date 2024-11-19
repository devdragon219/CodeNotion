import { StepForm } from '@realgimm5/frontend-common/components';
import { DocumentsTableRow } from '@realgimm5/frontend-common/interfaces';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { EstatePortfolioFormInput } from '../../../../interfaces/FormInputs/EstatePortfolio';
import { EstatePortfolioEstateDocuments } from '../../../domains/EstatePortfolio/EstateDocuments/EstateDocuments';
import { EstatePortfolioEstateStepProps } from './Estate.types';

export const EstatePortfolioEstateStep = ({
  estateId,
  estatePortfolio,
  onChange,
  onNext,
}: EstatePortfolioEstateStepProps) => {
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

  const handleSelectEstateDocuments = useCallback(
    (rows: DocumentsTableRow[]) => {
      setValue('estateDocuments', rows);
    },
    [setValue],
  );

  return (
    <StepForm onNext={onNext} onSubmit={handleSubmit(onNext)}>
      <EstatePortfolioEstateDocuments
        estateId={estateId}
        selectedRows={estatePortfolio.estateDocuments}
        onRowsSelected={handleSelectEstateDocuments}
      />
    </StepForm>
  );
};
