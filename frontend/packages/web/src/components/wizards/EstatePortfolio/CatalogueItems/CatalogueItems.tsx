import { StepForm } from '@realgimm5/frontend-common/components';
import { DocumentsTableRow } from '@realgimm5/frontend-common/interfaces';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { EstatePortfolioFormInput } from '../../../../interfaces/FormInputs/EstatePortfolio';
import { EstatePortfolioCatalogueItemsDocuments } from '../../../domains/EstatePortfolio/CatalogueItemsDocuments/CatalogueItemsDocuments';
import { EstatePortfolioCatalogueItemsStepProps } from './CatalogueItems.types';

export const EstatePortfolioCatalogueItemsStep = ({
  catalogueItemIds,
  estatePortfolio,
  onChange,
  onBack,
  onExport,
}: EstatePortfolioCatalogueItemsStepProps) => {
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

  const handleSelectCatalogueItemsDocuments = useCallback(
    (rows: DocumentsTableRow[]) => {
      setValue('catalogueItemsDocuments', rows);
    },
    [setValue],
  );

  return (
    <StepForm onBack={onBack} onComplete={handleSubmit(onExport)} completeLabel="common.button.export">
      <EstatePortfolioCatalogueItemsDocuments
        catalogueItemIds={catalogueItemIds}
        selectedRows={estatePortfolio.catalogueItemsDocuments}
        onRowsSelected={handleSelectCatalogueItemsDocuments}
      />
    </StepForm>
  );
};
