import { Grid2 } from '@mui/material';
import { RecapSection, SectionTitle, StepActions, StepContent } from '@realgimm5/frontend-common/components';
import { useCallback } from 'react';

import {
  getTaxConfigFieldLabel,
  getTaxConfigFieldValue,
  getTaxConfigTableName,
} from '../../../../utils/components/taxConfig/taxConfigUtils';
import { TaxConfigRecapStepProps } from './Recap.types';

export const TaxConfigRecapStep = ({
  calculator,
  config,
  subTables,
  onBack,
  onEdit,
  onSave,
}: TaxConfigRecapStepProps) => {
  const handleEdit = useCallback(
    (step: number) => () => {
      onEdit(step);
    },
    [onEdit],
  );

  const handleComplete = useCallback(() => {
    onSave(config);
  }, [config, onSave]);

  return (
    <>
      <StepContent>
        <Grid2 container spacing={{ xs: 2, sm: 3 }}>
          <SectionTitle value="tax_config.section_title.recap" />
          <Grid2 size={12}>
            <RecapSection
              title="tax_config.section_title.general_data"
              items={config.table.fields.map((field) => ({
                label: field.label,
                value: getTaxConfigFieldValue(field),
              }))}
              onEdit={handleEdit(0)}
            />
          </Grid2>
          {subTables.map((subTable, index) => (
            <Grid2 key={index} size={12}>
              <RecapSection
                title={getTaxConfigTableName(calculator, subTable.code)}
                items={[
                  {
                    value: {
                      columns: subTable.columns.map(({ code }) => getTaxConfigFieldLabel(code)),
                      rows: config.subTables[subTable.code].map((row) => row.fields.map(getTaxConfigFieldValue)),
                    },
                  },
                ]}
                onEdit={handleEdit(index + 1)}
              />
            </Grid2>
          ))}
        </Grid2>
      </StepContent>
      <StepActions completeLabel="common.button.save" onBack={onBack} onComplete={handleComplete} />
    </>
  );
};
