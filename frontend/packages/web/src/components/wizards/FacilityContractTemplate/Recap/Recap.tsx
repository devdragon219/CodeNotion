import { Grid2 } from '@mui/material';
import { RecapSection, SectionTitle, StepActions, StepContent } from '@realgimm5/frontend-common/components';
import { useCallback } from 'react';

import { FacilityContractTemplateCatalogueTypesTable } from '../../../domains/FacilityContractTemplate/CatalogueTypes/Table/Table';
import { FacilityContractTemplateRecapStepProps } from './Recap.types';

export const FacilityContractTemplateRecapStep = ({
  facilityContractTemplate,
  onBack,
  onEdit,
  onSave,
}: FacilityContractTemplateRecapStepProps) => {
  const handleEdit = useCallback(
    (step: number) => () => {
      onEdit(step);
    },
    [onEdit],
  );

  const handleComplete = useCallback(() => {
    onSave(facilityContractTemplate);
  }, [facilityContractTemplate, onSave]);

  return (
    <>
      <StepContent>
        <Grid2 container spacing={{ xs: 2, sm: 3 }}>
          <SectionTitle value="facility_contract_template.section_title.recap" />
          <Grid2 size={12}>
            <RecapSection
              title="facility_contract_template.tab.general_data"
              items={[
                {
                  grid: 4,
                  label: 'facility_contract_template.field.internal_code',
                  value: facilityContractTemplate.internalCode,
                },
                {
                  grid: 4,
                  label: 'facility_contract_template.field.description',
                  value: facilityContractTemplate.description,
                },
                {
                  grid: 4,
                  label: 'facility_contract_template.field.contract_type',
                  value: facilityContractTemplate.facilityContractType?.name,
                },
              ]}
              onEdit={handleEdit(0)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="facility_contract_template.tab.catalogue_types"
              items={
                <FacilityContractTemplateCatalogueTypesTable
                  catalogueTypes={facilityContractTemplate.catalogueTypes}
                  useRowExpandCollapse={false}
                />
              }
              onEdit={handleEdit(1)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="facility_contract_template.tab.slas"
              items={[
                {
                  value: {
                    columns: ['sla.field.internal_code', 'sla.field.description'],
                    rows: facilityContractTemplate.slas.map((entry) => [entry.internalCode, entry.description]),
                  },
                },
              ]}
              onEdit={handleEdit(2)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="facility_contract_template.tab.penalties"
              items={[
                {
                  value: {
                    columns: ['penalty.field.internal_code', 'penalty.field.description'],
                    rows: facilityContractTemplate.penalties.map((entry) => [entry.internalCode, entry.description]),
                  },
                },
              ]}
              onEdit={handleEdit(3)}
            />
          </Grid2>
        </Grid2>
      </StepContent>
      <StepActions
        completeLabel="facility_contract_template.dialog.create.save"
        onBack={onBack}
        onComplete={handleComplete}
      />
    </>
  );
};
